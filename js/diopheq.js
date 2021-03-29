// COEFFICIENTS & LINE
let a = 17, b = 7, c = 77;
let x1, x2, y1, y2;

// SOLUTIONS
let sol = [];

// SLIDERS
let s1, s2, s3;

// COLORS
let colCheck;
let fgColor = 255, bgColor = 0;
let ht1Color = Math.abs(fgColor - 155);
let ht2Color = Math.abs(fgColor - 135);
let accentColor = 'red';

function setup() {
  createCanvas(windowWidth, windowHeight);
  centerOrigin();

  searchSolutions();
  calcLine();

  setSliders();
  setCheckbox();

  textFont('Georgia');

  noLoop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  centerOrigin();
  redraw();
}

/**
 * Sets default behaviour of the sliders.
 */
function setSliders() {
  s1 = select('#aSlider');
  s1.position(60, 80);

  s2 = select('#bSlider');
  s2.position(60, 120);

  s3 = select('#cSlider');
  s3.position(60, 160);
}

/**
 * Sets default behaviour of the checkbox.
 */
function setCheckbox() {
  colCheck = createCheckbox(' Inverti colori', false);
  colCheck.style("color: #ffffff")
  colCheck.position(10, height - 30);
  colCheck.changed(invertColors);
}

/**
 * Inverts the colors used.
 */
function invertColors() {
  bgColor = [fgColor, fgColor = bgColor][0];
  ht1Color = Math.abs(fgColor - 155);
  ht2Color = Math.abs(fgColor - 135);

  let textCol = colCheck.checked() ? "color: #000000" : "color: #ffffff";
  s1.style(textCol);
  s2.style(textCol);
  s3.style(textCol);
  colCheck.style(textCol);

  redraw();
}

/**
 * Updates the value of the coefficient of the Diophantine equation.
 * @param {Number} value 
 * @param {Number} id 
 */
function updateEquation(value, id) {
  a = id == 1 ? parseInt(value) : a;
  b = id == 2 ? parseInt(value) : b;
  c = id == 3 ? parseInt(value) : c;

  calcLine();
  searchSolutions();
  redraw();
}

/**
 * Calculates the endpoints of the line defined by the Diophantine equation.
 */
function calcLine() {
  x1 = (- GRID.yMax * b + c) / a;
  x1 = x1 < GRID.xMin ? GRID.xMin : (x1 > GRID.xMax ? GRID.xMax : x1);

  x2 = (- GRID.yMin * b + c) / a;
  x2 = x2 < GRID.xMin ? GRID.xMin : (x2 > GRID.xMax ? GRID.xMax : x2);

  y1 = (- x1 * a + c) / b;
  y2 = (- x2 * a + c) / b;
}

/**
 * Searches for solution using a brute-force method.
 * Not elegant but easy to implement.
 */
function searchSolutions() {
  sol = [];
  for (let x0 = GRID.xMin; x0 <= GRID.xMax; x0++) {
    let y0 = (-a * x0 + c) / b;
    if (Number.isInteger(y0) && (y0 >= GRID.yMin && y0 <= GRID.yMax))
      sol.push({ x: x0, y: y0 })
  }
}

/**
 * Draws the line defined by the Diophantine equation.
 */
function drawLine() {
  stroke(fgColor);
  strokeWeight(2);

  p1 = toScreenCoord(x1, y1);
  p2 = toScreenCoord(x2, y2);
  line(p1.x, p1.y, p2.x, p2.y);
}

/**
 * Draws the integer solutions as dots in the accent color.\
 * Their value is indicated alongside.
 */
function drawSolutions() {
  sol.forEach(p => {
    stroke(accentColor);
    strokeWeight(10);

    let sp = toScreenCoord(p.x, p.y);
    point(sp.x, sp.y);

    fill(fgColor);
    strokeWeight(0);

    textSize(14);
    text('(' + p.x + ', ' + p.y + ')', sp.x + 10, sp.y - 9 * (a * b > 0 ? 1 : -1));
  });
}

/**
 * Draws the Cartesian axes.
 */
function drawAxis() {
  stroke(ht1Color);
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

/**
 * Draws the Cartesian grid as dots.\
 * The amount of dots is determined by the scale (or level of zoom).
 */
function drawGrid() {
  stroke(ht2Color);
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

/**
 * Draws the Diophantine equation formula in the top-left corner of the canvas.
 */
function drawFormula() {
  fill(fgColor)
    .strokeWeight(0)
    .textSize(24);
  text(a + ' x ' + (b >= 0 ? '+ ' : '- ') + Math.abs(b) + ' y = ' + c, 20, 40);
  text('a: ', 20, 100);
  text('b: ', 20, 140);
  text('c: ', 20, 180);
}

function draw() {
  background(bgColor);
  drawAxis();
  drawGrid();
  drawLine();
  drawSolutions();
  drawFormula();
}