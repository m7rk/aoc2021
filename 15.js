/**
 - better p-queue
 - early abort
 - don't reparent if alt found?
 */

fs = require('fs');

YS = 10000

grid = {}
fs.readFileSync('15.txt', 'utf8').split("\n").forEach((element,y) => {
    element.split("").forEach((e,x) => {
        idx = (y) * YS + x
        grid[idx] = parseInt(e)
    })
});


dim = Math.sqrt(Object.keys(grid).length)
grid2 = {}
Object.keys(grid).forEach(i =>
{
    ox = parseInt(i) % YS
    oy = parseInt(parseInt(i) / YS)
    for(x = 0; x != 5; x++)
    {
        for(y = 0; y != 5; y++)
        {
            idx = ((oy + (dim * y)) * YS) + ((dim * x) + ox)                    
            vval = 1 + ((grid[i] + (y + x) - 1) % 9)
            grid2[idx] = vval
        }
    }
})

// time - about 1 minute
console.log(BFS(0, 99*YS + 99, grid))
// time - hours(?)
// console.log(BFS(0, 499*YS + 499, grid2))


// why does pure node have no good profiler are you KIDDING me
function BFS(root, goal, d)
{
    parent = {}
    val = {}
    queue = {}
    queue[root] = true
    val[root] = 0
    parent[root] = -1

    // dijikstras. Slow, don't kn
    while(Object.keys(queue).length > 0)
    {
        v = takeMin()
        delete queue[v]
        adj = [parseInt(v)-1, parseInt(v)+1, parseInt(v)-YS, parseInt(v)+YS]
        adj.forEach(e => {
            alt = val[v] + d[e]
            if(d[e] != undefined && (parent[e] == undefined || alt < val[e]))
            {
                parent[e] = v 
                val[e] = val[v] + d[e]
                queue[e] = true
            }
        })
    }
    return val[goal]
}

function takeMin()
{
    min = Infinity
    Object.keys(queue).forEach(i =>
    {
        if(val[i] < min)
        {
            min = i
        }
    })
    return min
}