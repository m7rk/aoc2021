fs = require("fs")

XDIM = 139
YDIM = 137
YS = 1000
grid = {}
fs.readFileSync('25.txt', 'utf8').split("\n").forEach((element,y) => {
    element.split("").forEach((e,x) => {
        idx = (y) * YS + x
        if(e != ".")
        {
            grid[idx] = e
        }
    })
});

function iterateR(grid, type)
{
    next = {}
    Object.keys(grid).forEach((k) => {
        if(type == ">")
        {
            //try move R
            tx = ((parseInt(k) % YS) + 1) % XDIM
            ty = (Math.floor(parseInt(k) / YS))
        }

        if(type == "v")
        {
            //try move D
            tx = ((parseInt(k) % YS)) % XDIM
            ty = (Math.floor(parseInt(k) / YS) + 1) % YDIM          
        }

        targ = (ty * YS) + tx
        
        // move if we can
        if(grid[targ] == undefined && grid[k] == type)
        {
            next[targ] = grid[k]
        } 
        else
        {
            next[k] = grid[k]
        }
    })
    return next
}

cnt = 0
while(true)
{
    pre = JSON.stringify(grid)
    grid = iterateR(grid,">")
    grid = iterateR(grid,"v")
    //prnt(grid)
    post = JSON.stringify(grid)
    cnt += 1
    if(pre == post)
    {
        console.log(cnt)
        return
    }
}

function prnt(g)
{
    for(dy = 0; dy != YDIM; ++dy)
    {
        process.stdout.write("\n");
        for(dx = 0; dx != XDIM; ++dx)
        {
            if(g[YS * dy + dx] == undefined)
            {
                process.stdout.write(".");
            }
            else
            {
            process.stdout.write(g[YS * dy + dx]);
            }
        }       
    }
    console.log("")
}