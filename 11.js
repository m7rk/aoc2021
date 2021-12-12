fs = require('fs');
grid = {}
YS = 10000
// I WILL YS AGAIN I WILL YS AGAIN I WILL
// YS AGAIN I WILL YS AGAIN I WILL YS
fs.readFileSync('11.txt', 'utf8').split("\n").forEach((element,y) => {
    element.split("").forEach((e,x) => {
        grid[(y) * YS + x] = parseInt(e)
    })
});

function tryincr(grid,val)
{
    if(grid[val.toString()] != undefined)
    {
        grid[val.toString()] = grid[val] + 1
    }
}

sum = 0

//pt 1, use this not while
//for(i = 0; i < 100; i++)

//pt 2
step = 0
while(true)
{
    // First, the energy level of each octopus increases by 1.
    Object.keys(grid).forEach(e => 
    {
        grid[e] += 1
    });

    // Then, any octopus with an energy level greater than 9 flashes.
    // This increases the energy level of all adjacent octopuses by 1, including octopuses that are diagonally adjacent. 
    // If this causes an octopus to have an energy level greater than 9, it also flashes.
    // This process continues as long as new octopuses keep having their energy level increased beyond 9.
    // (An octopus can only flash at most once per step.)
    flashed = {}
    while(Object.keys(grid).filter(e => grid[e] > 9).length > 0)
    {
        Object.keys(grid).filter(e => grid[e] > 9).map(e => parseInt(e)).forEach(e => 
        {
            sum += 1
            flashed[e] = true
            grid[e] = -YS
            tryincr(grid,e - 1)
            tryincr(grid,e + 1)
            tryincr(grid,e - YS)
            tryincr(grid,e + YS)
            tryincr(grid,e - YS - 1)
            tryincr(grid,e - YS + 1)
            tryincr(grid,e + YS - 1)
            tryincr(grid,e + YS + 1)
        })
    }

    //Finally, any octopus that flashed during this step has its energy level set to 0, as it used all of its energy to flash.
    Object.keys(flashed).forEach(e => grid[e] = 0)

    step += 1

    //only part 2
    if(Object.keys(grid).filter(e => grid[e] == 0).length == Object.keys(grid).length)
    {
        console.log(step)
        break
    }
    //console.log(grid)
}
//console.log(sum)


