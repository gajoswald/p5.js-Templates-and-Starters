let keyMap = new Map();

function setupKeyBindings() {
  keyMap.set('r', () => generateNewPoints() );
  keyMap.set('p', () => drawPoints() );
  keyMap.set('m', () => drawMedianCircle() );
  keyMap.set('b', () => drawBoundingBox() );
  keyMap.set('c', () => drawBoundingBoxCircle() );
  keyMap.set('n', () => drawNaiveSmallestCircle() );
  keyMap.set('s', () => drawSmallestCircle() );
  keyMap.set('h', () => drawHull() );
  keyMap.set('t', () => timeNaiveVsOptimized() );
}

function keyPressed() {
  if( keyMap.has(key) ) {
    keyMap.get(key)();
    drawPoints();
  }
}