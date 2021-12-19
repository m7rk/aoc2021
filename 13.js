fs = require('fs');
grid = fs.readFileSync('13.txt', 'utf8').split("\n\n")[0].split("\n").map(m => m.split(",")).map(m => m.map(n => parseInt(n)));
instr = fs.readFileSync('13.txt', 'utf8').split("\n\n")[1].split("\n").map(m => m.split(" ")[2]).map(m => m.split("="))

console.log(grid)
console.log(instr)

//pt.1
//v = [instr[0]]

instr.forEach(m => {
    if(m[0] == "x")
    {
        grid.forEach((n) => 
        {
            if(n[0] > parseInt(m[1]))
            {
                n[0] =  parseInt(m[1]) * 2 - n[0] 
            }
        })
    }

    if(m[0] == "y")
    {
        grid.forEach((n) => 
        {
            if(n[1] > parseInt(m[1]))
            {
                n[1] = parseInt(m[1]) * 2 - n[1] 
            }
        })
    }
})

//pt.1 console.log(uniqueArray1(grid).length)
console.log(grid)
console.log([2,3] in grid)
printarr()

function uniqueArray1( ar ) {
    var j = {};
  
    ar.forEach( function(v) {
      j[v+ '::' + typeof v] = v;
    });
  
    return Object.keys(j).map(function(v){
      return j[v];
    });
  } 

function printarr()
{
    // can use JSON to lookup kekw
    // cause js only looks up arrays by equality.

    lol = JSON.stringify(grid);
    for(y= 0; y != 7; ++y)
    {
        s = ""
        for(x = 0; x != 40; ++x)
        {
            if(lol.indexOf(JSON.stringify([x,y])) != -1)
            {
                s += "X"
            } 
            else
            {
                s += "."
            }
        }
        console.log(s)
    }
}
  