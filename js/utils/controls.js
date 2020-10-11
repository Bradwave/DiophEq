// MOUSE PRESSED
let startPos, finalPos;
let t0, t1;

function mouseWheel(event) {
    scaleSystem(event.delta);
    redraw();
}

function touchStarted() {
    startPos = { x: mouseX, y: mouseY };
}

function touchMoved() {
    finalPos = { x: mouseX, y: mouseY };
    translateOrigin(startPos.x - finalPos.x, startPos.y - finalPos.y);
    startPos = finalPos;
    redraw();
}