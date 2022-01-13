fs = require("fs")

code = fs.readFileSync('24.txt', 'utf8').split("\n").map(n => n.split(" "))

op1 = []
op2 = []
op3 = []

for(depth = 0; depth < 14; ++depth)
{
    op1.push(parseInt(code[18*depth+4][2]))
    op2.push(parseInt(code[18*depth+5][2]))
    op3.push(parseInt(code[18*depth+15][2]))
}

// These are the states will always produce false
SURELY_BAD_STATES = {}

function GenerateModelNumber(depth, modelNumber, z, digits)
{
    if (SURELY_BAD_STATES[depth + "|" + z]== true || depth == 14)
    {
        return null;
    }

    var newModelNumber = modelNumber * 10;
    var originalZ = z;

    for (var i = 0; i < digits.length; ++i)
    {
        var z = originalZ;
        var w = digits[i];
        var x = z;
        x %= 26;
        z = Math.floor( z / op1[depth]);
        x += op2[depth];
        x = x == w ? 1 : 0;
        x = x == 0 ? 1 : 0;
        var y = 25;
        y *= x;
        y += 1;
        z *= y;
        y = w;
        y += op3[depth];
        y *= x;
        z += y;

        if (z == 0 && depth == 13)
        {
            return newModelNumber + digits[i];
        }

        var ret = GenerateModelNumber(depth + 1, newModelNumber + digits[i], z, digits);
        
        if(ret != null)
        {
            return ret;
        }
    }

    SURELY_BAD_STATES[depth + "|" + originalZ] = true;

    return null;
}

console.log(GenerateModelNumber(0, 0, 0, [9, 8, 7, 6, 5, 4, 3, 2, 1]))
SURELY_BAD_STATES = {}
// takes a few hours to complete part two.
console.log(GenerateModelNumber(0, 0, 0, [1, 2, 3, 4, 5, 6, 3, 2, 1]))

