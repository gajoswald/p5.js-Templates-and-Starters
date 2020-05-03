function smallestCircle() {
  let hull = convexHull();
  let a = hull[0];
  let c = hull[1];
  return scHelper( a, c, hull );
}

function scHelper(a, c, hull) {
  // find minimum angle to AC.  
  let b;
  let minAngle = Infinity;
  for( const v of hull ) {
    if( v.x !== a.x && v.y !== a.x && v.x !== c.x && v.y !== c.y ) {
      const theta = abs( angle(a,v,c) );
      if( theta < minAngle ) {
        minAngle = theta;
        b = v;
      }
    }
  }
  // if minimum angle is right or obtuse, we're done. 
  if( minAngle >= HALF_PI ) {
    return circleFor2Points( a, c );
  }

  // if both other angles are acute, we are also done. 
  const thetaC = abs( angle( a, c, b ) );
  const thetaA = abs( angle( b, a, c ) );      
  if( thetaC < HALF_PI && thetaA < HALF_PI ) {
    return circleFor3Points( a, b, c );
  }

  // otherwise, set AC to be opposite the obtuse angle and try again. 
  [a,c] = thetaA > thetaC ? [b,c] : [a,b];      
  return scHelper( a, c, hull );
}


function naiveSmallestCircle() {
  subCircles = [];
  let theCircle = {x:undefined, y:undefined, r:Infinity};
  let max2PointCircle = {x:undefined, y:undefined, r:-Infinity};

  for (let i = 0; i < points.length - 1; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const c = circleFor2Points(points[i], points[j]);
      if( c.r > max2PointCircle.r ) {
        max2PointCircle = c;
      }
      if( c.r <= theCircle.r && allPointsInsideCircle(c) ) {      
        theCircle = c;
      }
    }
  }  

  for (let i = 0; i < points.length - 2; i++) {
    for (let j = i + 1; j < points.length - 1; j++) {
      for (let k = j + 1; k < points.length; k++) {
        const c = circleFor3Points(points[i], points[j], points[k]);
        if( c.r <= theCircle.r && allPointsInsideCircle(c) ) {       
          theCircle = c;
        }
      }
    }
  }

  stroke(255,0,0,128);
  circle(max2PointCircle.x, max2PointCircle.y, max2PointCircle.r);

  stroke(0, 255, 0);
  const r = theCircle.r;
  text(`smallest radius: ${r}, perimeter: ${2*PI*r}`, textCoordinates.x, textCoordinates.y.naive );
  circle(theCircle.x, theCircle.y, theCircle.r);
}

