function timeNaiveVsOptimized(runs=30,size=200) {
  let pointSets = [];
  for( let i = 0; i < runs; i++ ) {
    let points = [];
    for( let j = 0; j < size; j++ ) {
      points.push( {x:Math.random(), y:Math.random()} );
    }
    pointSets.push(points);
  }
  console.log( `${runs} sets of ${size} points generated... beginning trials`);
  let naiveTime = 0;
  let optimizedTime = 0;
  let naiveStart;
  let naiveStop;
  let optimizedStart;
  let optimizedStop;
  for( let points of pointSets ) {
    naiveStart = Date.now();
    naiveSmallestCircle(points);
    naiveStop = Date.now();
    naiveTime += naiveStop - naiveStart;
    optimizedStart = Date.now();
    smallestCircle(points);
    optimizedStop = Date.now();
    optimizedTime += optimizedStop - optimizedStart;
  }
  
  console.log( `for ${runs} runs of ${size} points\naverage naive runtime: ${naiveTime/(runs*size)}\naverage optimized runtime: ${optimizedTime/(runs*size)}`);

}