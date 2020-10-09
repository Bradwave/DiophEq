// COEFFICIENTS & LINE
let a = 17, b = 7, c = 77;
let x1, x2, y1, y2;
let p1, p2;

// SOLUTIONS
let sol = [];

// SLIDERS
let s1, s2, s3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  centerOrigin();

  searchSolutions();
  calcLine();

  setSliders();
  textFont('Georgia');
  
  noLoop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  centerOrigin();
  redraw();
}

function setSliders() {
  s1 = select('#aSlider');
  s1.position(60, 80);

  s2 = select('#bSlider');
  s2.position(60, 120);

  s3 = select('#cSlider');
  s3.position(60, 160);
}

function updateEquation(value, id) {
  a = id == 1 ? parseInt(value) : a;
  b = id == 2 ? parseInt(value) : b;
  c = id == 3 ? parseInt(value) : c;

  calcLine();
  searchSolutions();
  redraw();
}

function calcLine() {
  x1 = (- GRID.yMax * b + c) / a;
  x1 = x1 < GRID.xMin ? GRID.xMin : (x1 > GRID.xMax ? GRID.xMax : x1);

  x2 = (- GRID.yMin * b + c) / a;
  x2 = x2 < GRID.xMin ? GRID.xMin : (x2 > GRID.xMax ? GRID.xMax : x2);

  y1 = (- x1 * a + c) / b;
  y2 = (- x2 * a + c) / b;
}

function searchSolutions() {
  sol = [];
  for (let x0 = GRID.xMin; x0 <= GRID.xMax; x0++) {
    let y0 = (-a * x0 + c) / b;
    if (Number.isInteger(y0) && (y0 >= GRID.yMin && y0 <= GRID.yMax))
      sol.push({ x: x0, y: y0 })
  }
}

function drawLine() {
  stroke(255);
  strokeWeight(2);

  p1 = toScreenCoord(x1, y1);
  p2 = toScreenCoord(x2, y2);
  line(p1.x, p1.y, p2.x, p2.y);
}

function drawSolutions() {
  sol.forEach(p => {
    stroke('red');
    strokeWeight(10);

    let sp = toScreenCoord(p.x, p.y);
    point(sp.x, sp.y);

    fill(255);
    strokeWeight(0);

    textSize(14);
    text('(' + p.x + ', ' + p.y + ')', sp.x + 10, sp.y - 9);
  });
}

function drawAxis() {
  stroke(100);
  strokeWeight(1);

  // X AXIS
  let p1 = toScreenCoord(0, GRID.yMax);
  let p2 = toScreenCoord(0, GRID.yMin);
  line(p1.x, p1.y, p2.x, p2.y);

  // Y AXIS
  p1 = toScreenCoord(GRID.xMin, 0);
  p2 = toScreenCoord(GRID.xMax, 0);
  line(p1.x, p1.y, p2.x, p2.y);
}

function drawGrid() {
  stroke(120);
  strokeWeight(2);

  for (let i = Math.floor(borders.xMin); i < Math.floor(borders.xMax) + 1; i++) {
    for (let j = Math.floor(borders.yMin); j < Math.floor(borders.yMax) + 1; j++) {
      if (i % gridSkip == 0 && j % gridSkip == 0) {
        let p = toScreenCoord(i, j);
        point(p.x, p.y);
      }
    }
  }
}

function drawFormula() {
  fill(255)
    .strokeWeight(0)
    .textSize(24);
  text(a + ' x + ' + b + ' y = ' + c, 20, 40);
  text('a: ', 20, 100);
  text('b: ', 20, 140);
  text('c: ', 20, 180);
}

function draw() {
  background(0);
  drawAxis();
  drawGrid();
  drawLine();
  drawSolutions();
  drawFormula();
}