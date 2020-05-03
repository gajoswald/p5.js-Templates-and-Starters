# Enclosing Points
## Overview
This project code is demonstration code for the smallest circle problem. It also ties in with a computational thinking exercise about such things. The idea being to walk students through algorithmic thinking for how to solve such a problem, starting by thinking about rectangles. The CT aspect is open-ended in that one can discuss many things from loops and time-complexity to heuristics and advanced geometry. 
## Interface
Perhaps a *TODO*, but there's no labeling for the interface. It is just simple keyboard presses. 
`p` to display the points
`b` to draw the bounding box
`c` to draw the circle circumscribing the bounding box
`m` to draw the "mean circle"
`n` to show the naive code for finding the smallest circle*
`s` to show the smallest circle
`h` to show the hull bounding the points
`r` to generate new points (and display)
## Resources
* [Nayuki](https://www.nayuki.io/page/smallest-enclosing-circle) - a good page describing the problem, along with some source code. Not the approach I took. Also, unused code for [Convex Hull](https://www.nayuki.io/res/convex-hull-algorithm/convex-hull.js)
* Another good description of the problem, as well as pseudocode solutions, from University of Kent. [Smallest Enclosing Circle Problem](http://www.personal.kent.edu/~rmuhamma/Compgeometry/MyCG/CG-Applets/Center/centercli.htm)
* Wikipedia reading:
  * [Smallest-Circle Problem](https://en.wikipedia.org/wiki/Smallest-circle_problem)
  * [Convex Hull](Convex hull algorithms) and [Convex Hull Algorithms](https://en.wikipedia.org/wiki/Convex_hull_algorithms)
  * [Quikhull](https://en.wikipedia.org/wiki/Quickhull) (not what was used)
* A good [circles and spheres](http://paulbourke.net/geometry/circlesphere/) resource
* Unused [Quickhull](https://github.com/claytongulick/quickhull/blob/master/quickhull.js) code 
## TODO
* I want to see if I can use reduce in the smallest circle code.
* I also want to add points by click and have things update. Maybe two different modes  