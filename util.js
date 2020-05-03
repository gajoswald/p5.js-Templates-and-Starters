function dotProduct( a, b, c ) {
  const v = {x: a.x - b.x, y: a.y - b.y};
  const u = {x: c.x - b.x, y: c.y - b.y};
  return v.x * u.x + v.y * u.y;
}

function crossProduct( a, b, c ) {
  return (a.x - c.x) * (b.y-c.y) - (a.y-c.y) * (b.x - c.x);
}

function angle( a, b, c ) {
  return atan2( crossProduct(a,b,c), dotProduct(a,b,c) );
}

function allPointsInsideCircle(circle) {
  for (const p of points) {
    if (!pointInsideCircle(p, circle)) {
      return false;
    }
  }
  return true;
}

function pointInsideCircle(point, circle) {
  // floating point nonsense. 
  // should just be dist <= radius
  return dist(point.x, point.y, circle.x, circle.y) <= circle.r + 0.00000001 ; 
}

function circleFor2Points(p1, p2) {
  const cx = (p1.x + p2.x) / 2;
  const cy = (p1.y + p2.y) / 2;
  return {
    x: cx,
    y: cy,
    r: dist(cx, cy, p1.x, p1.y)
  }
}

// http://paulbourke.net/geometry/circlesphere/
function circleFor3Points(p1, p2, p3) {
  const ma = slope(p1, p2);
  const mb = slope(p2, p3);
  const cx = (ma * mb * (p1.y - p3.y) + mb * (p1.x + p2.x) - ma * (p2.x + p3.x)) / (2 * (mb - ma));
  const cy = (-1 / ma) * (cx - (p1.x + p2.x) / 2) + (p1.y + p2.y) / 2;
  return {
    x: cx,
    y: cy,
    r: dist(cx, cy, p1.x, p1.y)
  };
}

function slope(p1, p2) {
  return (p2.y - p1.y) / (p2.x - p1.x);
}