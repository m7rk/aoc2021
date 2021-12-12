fs = require('fs');
grid = {}
fs.readFileSync('12.txt', 'utf8').split("\n").forEach(c => 
{
    c = c.split('-');
    if (!grid[c[0]])
    {
        grid[c[0]] = [];
    }
    if (!grid[c[1]])
    {
        grid[c[1]] = [];
    }
    grid[c[0]].push(c[1]);
    grid[c[1]].push(c[0]);
});

function canVisitSmallCave(name,path)
{
    visited = path.filter(q => q == name).length

    if(visited > 1)
    {
        return false;
    }

    // if we have already visitied this cave, we can visit again if NONE hav eother been visited twice
    if(visited == 1)
    {
        return !hasDuplicates(path.filter(q => q == q.toLowerCase()))
    }
    // if we havent visited this cave then just go for it lol
    return true
}

function explore(current, path, graph)
{
    path.push(current);
    if(current == "end")
    {
        return [path];
    }
    seen = []
    graph[current].forEach(p => 
    {
        /** 
        if (!path.includes(p) || p.toLowerCase() != p)
        {
            copy = []
            Object.assign(copy, path);
            seen = seen.concat(explore(p, copy, graph));
        }
        */

        // Part two rules. allow if uppercase OR path list less than 2
        if (p.toLowerCase() != p || canVisitSmallCave(p, path))
        {
            if(p != "start")
            {
                copy = []
                Object.assign(copy, path);
                seen = seen.concat(explore(p, copy, graph));
            }
        }
    })
    return seen;
}
console.log(explore("start", [], grid).length);



function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}