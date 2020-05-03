function hullForPoints() {
  let hull = [boundingBox.leftMostPoint, boundingBox.rightMostPoint];
  let line = new Line(hull[0],hull[1]);
  let s1 = [];
  let s2 = [];
  for( const p of points ) {
    if( (p.x != boundingBox.leftMostPoint.x && p.y != boundingBox.leftMostPoint.y) && (p.x != boundingBox.rightMostPoint.x && p.y != boundingBox.rightMostPoint.y) ) {
      if( line.pointIsAbove(p) ) {
        s1.push(p);
      } else {
        s2.push(p);
      }
    }
  } 

  findHull(s1,line.A,line.B,hull);
  findHull(s2,line.B,line.A,hull);

  let center = {x:0,y:0};
  for( const p of hull ) {
    center.x += p.x;
    center.y += p.y;
  }
  center.x /= hull.length;
  center.y /= hull.length;

  hull.sort( (a,b) => rotationalCompare( a,b,center ) );
  return hull;
}

function quickHull() {
  let hull = hullForPoints();
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

function rotationalCompare( a, b, center ) {
    if (a.x - center.x >= 0 && b.x - center.x < 0)
        return 1;
    if (a.x - center.x < 0 && b.x - center.x >= 0)
        return -1;
    if (a.x - center.x == 0 && b.x - center.x == 0) {
        if (a.y - center.y >= 0 || b.y - center.y >= 0) {
          return a.y - b.y;
        }
    }

    // compute the cross product of vectors (center -> a) x (center -> b)
    return (a.x - center.x) * (b.y - center.y) - (b.x - center.x) * (a.y - center.y);

    // points a and b are on the same line from the center
    // check which point is closer to the center
    let d1 = (a.x - center.x) * (a.x - center.x) + (a.y - center.y) * (a.y - center.y);
    let d2 = (b.x - center.x) * (b.x - center.x) + (b.y - center.y) * (b.y - center.y);
    return d1 - d2;  
}

function findHull(s,A,B,hull) {
  let C;
  if( s.length === 0 ) {
    return;
  }
  C = furthestPointFrom(s,A,B);
  hull.push(C);
  let s1 = [];
  let s2 = [];
  const line = new Line(A,B);
  for( const p of s ) {
    if( ( p.x != A.x && p.y != A.y ) &&
        ( p.x != B.x && p.y != B.y ) && 
        ( p.x != C.x && p.y != C.y ) ){
      if( !pointInsideTriangle(p,A,C,B) ) {
        if( line.pointIsAbove(p) ) {
          s1.push(p);
        } else {
          s2.push(p);
        }
      } // else, inside triangle... 
    }
  }
  findHull(s1,A,C,hull);
  findHull(s2,C,B,hull);  
}

function furthestPointFrom(s,A,B) {
  const AB = new Line(A,B);
  let maxDistance = -Infinity;
  let furthestPoint = undefined;
  for( const p of s ) {
    let d = AB.distanceTo(p);
    if( d > maxDistance ) {
      maxDistance = d;
      furthestPoint = p;
    }
  }
  return furthestPoint;
}

class Line {
  constructor(p1,p2) {
    this.A = p1;
    this.B = p2;
    this.m = (this.B.y - this.A.y) / (this.B.x - this.A.y);
    this.b = this.A.y - this.m * this.A.x;
  }

  pointIsAbove(p) {
    return p.y > this.m * p.x + this.b;
  }

  distanceTo(p){
    return abs(((this.B.y - this.A.y)*p.x - (this.B.x-this.A.x)*p.y + this.B.x * this.A.y - this.B.y * this.A.x)/dist(this.A.x,this.A.y,this.B.x,this.B.y));
  }
}