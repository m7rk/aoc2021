// yeah yeah whatever
fs = require('fs');
input = fs.readFileSync('2.txt', 'utf8').split("\n").map(v => [v.split(" ")[0], parseInt(v.split(" ")[1])])

// probably a smartypants way to do this but it's ez liek this
d = 0
p = 0
input.forEach(element => {
    if(element[0][0] == "f")
    {
        p += element[1]
    }
    if(element[0][0] == "d")
    {
        d += element[1]
    }
    if(element[0][0] == "u")
    {       
        d -= element[1]
    }
});

console.log(d * p)

aim = 0
d = 0
p = 0
input.forEach(element => {
    if(element[0][0] == "f")
    {
        p += element[1]
        d += aim * element[1]
    }
    if(element[0][0] == "d")
    {
        aim += element[1]
    }
    if(element[0][0] == "u")
    {       
        aim -= element[1]
    }
});

console.log(d * p)