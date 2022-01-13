const { sign } = require('crypto');

fs = require('fs');
instr = fs.readFileSync('22.txt', 'utf8').split("\n").map(m => m.split(" "))

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


// Can't use naive approach for part two.
// intersections are hard to calculate, so, we use the concept of negative of cubes

// feel kind of bad, had to look for help on 𝓻𝓮𝓭𝓭𝓲𝓽 for this one.
function intersects(c1, c2)
{
    return (c1[0] <= c2[1] && c1[1] >= c2[0]) &&
           (c1[2] <= c2[3] && c1[3] >= c2[2]) &&
           (c1[4] <= c2[5] && c1[5] >= c2[4])
}
 
 
// Intersects an existing cube!! Add a negative cube to offset it.
function get_intersected_cube(c1, c2)
{
    newcube = []
    newcube.push(Math.max(c1[0], c2[0]))
    newcube.push(Math.min(c1[1], c2[1]))
    newcube.push(Math.max(c1[2], c2[2]))
    newcube.push(Math.min(c1[3], c2[3]))
    newcube.push(Math.max(c1[4], c2[4]))
    newcube.push(Math.min(c1[5], c2[5]))
    newcube.push(-c1[6])

    return newcube
}

cubes = []
 
isec = 0
instr.forEach(e => 
{
    xstart = parseInt(e[1].match(/x=[\-|0-9]+/)[0].substring(2))
    ystart = parseInt(e[1].match(/y=[\-|0-9]+/)[0].substring(2))
    zstart = parseInt(e[1].match(/z=[\-|0-9]+/)[0].substring(2))

    xend = parseInt(e[1].match(/[\-|0-9]+,y=/)[0])
    yend = parseInt(e[1].match(/[\-|0-9]+,z=/)[0])
    zend = parseInt(e[1].match(/[\-|0-9]+$/)[0])

    new_cube = [xstart,xend,ystart,yend,zstart,zend, e[0] == "on" ? 1 : -1]

    created_cubes = []
    cubes.forEach(c =>
    {
        // if these cubes intersect, easy. Simply add a negative cube of the intersected type.
        if(intersects(c, new_cube))
        {
            created_cubes.push(get_intersected_cube(c, new_cube))
            isec += 1
        }
    })

    // at the end; only add cubes that are turned on.
    if(new_cube[6] == 1)
    {
        cubes.push(new_cube)
    }

    created_cubes.forEach(c=> cubes.push(c))
})

console.log(cubes.reduce((a,b) => a + (b[6] * ((1+(b[1] - b[0])) * (1+(b[3] - b[2])) * (1+(b[5] - b[4])))), 0))
 
