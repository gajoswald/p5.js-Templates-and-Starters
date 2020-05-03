let textCoordinates = {
  x: 10,
  y: {
    boundingBox: 10,
    circumscribed: 22,
    median: 34, 
    naive: 46,
    smallest: 58,    
    hull: 70,
  }
}

function drawPoints() {
  fill(0);
  noStroke();
  for( const p of points ) {
    circle(p.x,p.y,3);
  }
  noFill();
}

function drawMedianCircle() {
  let x = 0;
  let y = 0;
  for( const p of points ) {
    x += p.x;
    y += p.y;
  }
  x /= points.length;
  y /= points.length;
  let r = -Infinity;
  for( const p of points ) {
    let d = dist( p.x, p.y, x, y);
    if( d > r) {
      r = d;
    }
  }
  stroke(200);
  circle(x,y,r);
  text(`median radius: ${r}, perimeter: ${2*PI*r}`, textCoordinates.x, textCoordinates.y.median );
}

function drawBoundingBox() {
  stroke(200);
  rect( boundingBox.xMin, boundingBox.yMin, boundingBox.xMax, boundingBox.yMax );
  let p = 2 * (boundingBox.xMax - boundingBox.xMin) + 2 * (boundingBox.yMax - boundingBox.yMin);
  text( `bounding box perimeter ${p}`, textCoordinates.x, textCoordinates.y.boundingBox );  
}

function drawBoundingBoxCircle() {
  const mp = {x: (boundingBox.xMin + boundingBox.xMax)/2, y: (boundingBox.yMin + boundingBox.yMax)/2 };
  // const r = abs(bb.xMin-bb.xMax) > abs(bb.yMin-bb.yMax) ? 
  const r = dist( mp.x, mp.y, boundingBox.xMin, boundingBox.yMin );
  stroke(200);
  circle( mp.x, mp.y, r );
  text(`circumscribed radius: ${r}, perimeter: ${2*PI*r}`, textCoordinates.x, textCoordinates.y.circumscribed );  
}

function drawSmallestCircle() {
  let c = smallestCircle();
  stroke(0,0,255);
  circle(c.x,c.y,c.r);
  text(`smallest radius: ${c.r}, perimeter: ${2*PI*c.r}`, textCoordinates.x, textCoordinates.y.smallest );
}

function drawHull() {
  let hull = convexHull();
  let perimeter = 0;
  let previousP = hull[0];
  stroke(200);
  beginShape();
  for( let i = 0; i < hull.length; i++ ) {
    let p = hull[i];
    vertex( p.x, p.y );
    perimeter += dist(p.x,p.y,previousP.x,previousP.y);
  }  
  endShape(CLOSE);
  text(`hull perimeter: ${perimeter}`, textCoordinates.x, textCoordinates.y.hull );
}