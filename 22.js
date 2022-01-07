fs = require('fs');
instr = fs.readFileSync('22.txt', 'utf8').split("\n").map(m => m.split(" "))
console.log(instr)

// need KD Tree

function vecToStr(x,y,z)
{
    return "x" + x + "y" + y + "z" + z
}

cubes = {}
for(x = -50; x != 50; ++x)
{
    for(y = -50; y != 50; ++y)
    {
        for(z = -50; z != 50; ++z)
        {
            cubes[vecToStr(x,y,z)] = "off"
        }
    }
}

instr.forEach(e => 
{
    xstart = parseInt(e[1].match(/x=[\-|0-9]+/)[0].substring(2))
    ystart = parseInt(e[1].match(/y=[\-|0-9]+/)[0].substring(2))
    zstart = parseInt(e[1].match(/z=[\-|0-9]+/)[0].substring(2))

    xend = parseInt(e[1].match(/[\-|0-9]+,y=/)[0])
    yend = parseInt(e[1].match(/[\-|0-9]+,z=/)[0])
    zend = parseInt(e[1].match(/[\-|0-9]+$/)[0])

    for(x = Math.max(-50,xstart); x <= Math.min(50,xend); ++x)
    {
        for(y =  Math.max(-50,ystart); y <= Math.min(50,yend); ++y)
        {
            for(z =  Math.max(-50,zstart); z <= Math.min(50,zend); ++z)
            {
                cubes[vecToStr(x,y,z)] = e[0]
            }
        }
    } 
})

sum = 0
for(x = -50; x <= 50; ++x)
{
    for(y = -50; y <= 50; ++y)
    {
        for(z = -50; z <= 50; ++z)
        {
            if(cubes[vecToStr(x,y,z)] == "on")
            {
                sum += 1
            }
        }
    }
}

console.log(sum)