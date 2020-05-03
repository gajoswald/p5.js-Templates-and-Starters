let points = [];
let boundingBox;

function generateNewPoints() {
  background(100);
  points = [];
  boundingBox = {
    xMin: Infinity,
    xMax: -Infinity,
    yMin: Infinity,
    yMax: -Infinity,
    leftMostPoint: undefined,
    rightMostPoint: undefined,
    topMostPoint: undefined,
    bottomMostPoint: undefined,
  };
  for( let i = 0; i < 50; i++ ) {
    const p = {x:random(0.1*width, 0.9*width), y:random(0.1*height, 0.9*height)};
    // const p = {x:int(random(width/3,2*width/3)),y:int(random(height/3,2*height/3))};
    updateBoundingBoxWith( p );
    points.push(p);
  }  
}

function updateBoundingBoxWith( p ) {
  if( p.x < boundingBox.xMin ) {
    boundingBox.xMin = p.x;
    boundingBox.leftMostPoint = p;
  }
  if( p.x > boundingBox.xMax ) {
    boundingBox.xMax = p.x;
    boundingBox.rightMostPoint = p;
  }
  if( p.y < boundingBox.yMin ) {
    boundingBox.yMin = p.y;
    boundingBox.topMostPoint = p;
  }
  if( p.y > boundingBox.yMax ) {
    boundingBox.yMax = p.y;
    boundingBox.bottomMostPoint = p;
  }  
}