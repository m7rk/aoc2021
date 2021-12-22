fs = require('fs');
YS = 10000
instr = fs.readFileSync('20.txt', 'utf8').split("\n\n")[0]
grid = {}
DIM = 300

function getEnhanced(x,y)
{
    val = ""
    for(dy = -1; dy != 2; ++dy)
    {
        for(dx = -1; dx != 2; ++dx)
        {
            idx = (y+dy)*YS + (x+dx)
            v = grid[idx] == "#" ? "1" : "0"
            val += v
        }
    }
    return instr[parseInt(val,2)]
}

fs.readFileSync('20.txt', 'utf8').split("\n\n")[1].split("\n").forEach((l,y) => 
{
    l.split("").forEach((c,x) =>
    {
        grid[y * YS + x] = c
    })
});

//2 for pt 1
for(i = 0; i != 50; ++i)
{
    next_grid = {}
    for(gx = -DIM; gx != DIM; ++gx)
    {
        for(gy = -DIM; gy != DIM; ++gy)
        {
            next_grid[(gy * YS) + gx] = getEnhanced(gx,gy)
        }
    }
    grid = next_grid
}

// RM any end effects (since plane is infinite)
for(gx = -DIM; gx != DIM; ++gx)
{
    for(gy = -DIM; gy != DIM; ++gy)
    {
        if(gx < -DIM / 2 || gx > DIM /2 || gy > DIM / 2 || gy < -DIM / 2)
        delete grid[(gy * YS) + gx]
    }
}

console.log(Object.keys(grid).filter(x => grid[x] == "#").length)