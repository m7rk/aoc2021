const { sign } = require('crypto');

fs = require('fs');
YS = 10000
// probably better regex solution but this is ez and also look at those maps, they're precious
nums = fs.readFileSync('5.txt', 'utf8').split("\n").map(s => s.split("->").map(v => v.split(",").map(v => parseInt(v))))
grid = {}

put = (grid,p) => {if(undefined == grid[p]){grid[p] = 0}grid[p] = grid[p] + 1}
conv = (x,y) => {return x + (YS * y)}

/** PT 1
nums.forEach(pair => 
    {
        dx = pair[1][0] - pair[0][0];
        dy = pair[1][1] - pair[0][1];

            if(dy == 0)
            {
                for (x = 0; Math.abs(x) <= Math.abs(dx); x += Math.sign(dx))
                {
                    put(grid,conv(pair[0][0] + x,pair[0][1]))
                } 
            }  
            if(dx == 0)
            {
                for (y = 0; Math.abs(y) <= Math.abs(dy); y += Math.sign(dy))
                {
                    put(grid,conv(pair[0][0],pair[0][1] + y))
                } 
            }  
    })
console.log(Object.keys(grid).filter(m => grid[m] >= 2).length)
*/

nums.forEach(pair => 
    {
        dx = pair[1][0] - pair[0][0];
        dy = pair[1][1] - pair[0][1];

            if(dy == 0)
            {
                for (x = 0; Math.abs(x) <= Math.abs(dx); x += Math.sign(dx))
                {
                    put(grid,conv(pair[0][0] + x,pair[0][1]))
                } 
            }  
            else if(dx == 0)
            {
                for (y = 0; Math.abs(y) <= Math.abs(dy); y += Math.sign(dy))
                {
                    put(grid,conv(pair[0][0],pair[0][1] + y))
                } 
            } 
            else
            {
                y = 0
                for (x = 0; Math.abs(x) <= Math.abs(dx); x += Math.sign(dx))
                {
                    put(grid,conv(pair[0][0] + x,pair[0][1] + y))
                    y += Math.sign(dy)
                } 
            }
    })

    console.log(Object.keys(grid).filter(m => grid[m] >= 2).length)
