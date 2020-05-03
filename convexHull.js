// https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript
function convexHull() {
  let pts = points.slice().sort( (a,b) => a.x == b.x ? a.y - b.y : a.x - b.x );
  // no sanity check
  let upperHull = [];
  let lowerHull = [];
  for( const p of pts ) {
    while( lowerHull.length >= 2 && crossProduct(
      lowerHull[lowerHull.length-2],
      lowerHull[lowerHull.length-1],
      p) <= 0) {
      lowerHull.pop();
    }
    lowerHull.push(p);
  }
  lowerHull.pop();

  for( const p of pts.reverse() ) {
    while( upperHull.length >= 2 && crossProduct(
      upperHull[upperHull.length-2],
      upperHull[upperHull.length-1],
      p) <= 0) {
      upperHull.pop();
    }
    upperHull.push(p);
  }
  upperHull.pop();
  return lowerHull.concat(upperHull);
}

