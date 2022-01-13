fs = require("fs")

code = fs.readFileSync('24.txt', 'utf8').split("\n").map(n => n.split(" "))

function eval(val)
{
    if(regs[val] == undefined)
    {
        return parseInt(val)
    }
    return regs[val]
}

function run(nstack)
{
    regs = {"w" : 0, "x" : 0, "y" : 0, "z" : 0}

    code.forEach(e => 
    {
        //inp a - Read an input value and write it to variable a.
        if(e[0] == "inp")
        {
            regs[e[1]] = nstack.shift()
        }
        // add a b - Add the value of a to the value of b, then store the result in variable a.
        if(e[0] == "add")
        {
            regs[e[1]] = regs[e[1]] + eval(e[2])
        }
        //mul a b - Multiply the value of a by the value of b, then store the result in variable a.
        if(e[0] == "mul")
        {
            regs[e[1]] = regs[e[1]] * eval(e[2])
        }
        //div a b - Divide the value of a by the value of b, truncate the result to an integer, then store the result in variable a. (Here, "truncate" means to round the value toward zero.)
        if(e[0] == "div")
        {
            regs[e[1]] = Math.floor(regs[e[1]] / eval(e[2]))
        }
        //mod a b - Divide the value of a by the value of b, then store the remainder in variable a. (This is also called the modulo operation.)
        if(e[0] == "mod")
        {
            regs[e[1]] = regs[e[1]] % eval(e[2])
        }
        //eql a b - If the value of a and b are equal, then store the value 1 in variable a. Otherwise, store the value 0 in variable a.
        if(e[0] == "eql")
        {
            regs[e[1]] = (regs[e[1]] == eval(e[2])) ? 1 : 0
        }
    });
}

// works(?) but runs at 100,000 ops/sec
// we are gonna need to work smarter
for(i = 99999999999999; i != 0; --i)
{
    l = i.toString().split("").map(v => parseInt(v))
    if(!l.includes(0))
    {
        run(l)
    }
    if(i % 100000 == 0)
    {
        console.log(i)
    }
    if(regs["z"] == 0)
    {
        console.print(i)
        throw ERR
    }
}