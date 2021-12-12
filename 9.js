fs = require('fs');
grid = {}
YS = 10000

fs.readFileSync('9.txt', 'utf8').split("\n").forEach((element,y) => {
    element.split("").forEach((e,x) => {
        grid[(y) * YS + x] = parseInt(e)
    })
});

function val(grid,e)
{
    if(grid[e] == undefined)
    {
        return 10
    }
    return grid[e]
}
console.log(grid)
sum = 0
Object.keys(grid).forEach(c => 
{
    //keys always strings..
    if(val(grid,parseInt(c)-1) > grid[c] && val(grid,parseInt(c)+1) > grid[c] && val(grid,parseInt(c)-YS) > grid[c] && val(grid,parseInt(c)+YS) > grid[c])
    {
        sum += (1 + grid[c])
    }
});
console.log(sum)


// YA LIKE FLOOD FILL

function floodfill(grid,init)
{
    if(grid[init] == 9)
    {
        return 0
    }
    exp = {}
    queue = []
    queue.push(init)
    while(queue.length != 0)
    {
        var loc = parseInt(queue.shift())
        ary = [loc-1,loc+1,loc-YS,loc+YS]
        ary.forEach(c =>
        {
            if(!(c in exp) && (val(grid,c) < 9))
            {
                exp[c] = true
                queue.push(c)
            }
        })
    }
    return Object.keys(exp).length
}

vals = Object.keys(grid).map(c => floodfill(grid,c)).sort((a,b) => b-a)
console.log([...new Set(vals)])
// And then! multiply the top 3
