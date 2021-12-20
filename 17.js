const { count } = require('console');

fs = require('fs');

// Not parsing this crap, plug in vals here
minx = 81
maxx = 129
miny = -150
maxy = -108

function step()
{
  px = px+dx
  py = py+dy
  dx = Math.max(0,dx-1)
  dy -= 1
}


my = 0
ct = 0
// naive approach, prediciting i will need this for pt.2
// (and i was right, sometimes it pays to be a dumbass)
for(ty = -2000; ty != 2000; ty++)
{
  for(tx = 0; tx != maxx+1; tx++)
  {
    px = 0
    py = 0
    dx = tx
    dy = ty

    while(true)
    {
      step()
      //pt 1 my = Math.max(my,py)
      if(px >= minx && px <= maxx && py >= miny && py <= maxy)
      {
        ct += 1
        break
      }
      if(py < miny)
      {
        break
      }
    }
  }
}
console.log(ct)