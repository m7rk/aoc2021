const { count } = require('console');

// again!!
fs = require('fs');
input = fs.readFileSync('3.txt', 'utf8').split("\n").map(v => v.split("").map(v2 => parseInt(v2)))
// now we have a list of int 1 or int 0 for each entry
// easy, just sum now
sums = input.reduce((a,b) => a.map((e, i) => e + b[i]))
// see if 1 or 0
converted = sums.map((a) => (a > input.length / 2) ? "1" : "0")
// to decimal
gamma = parseInt( converted.join(''), 2 );
epsilon = parseInt( converted.map((v) => v == "0" ? "1" : "0").join(''), 2 );
console.log(gamma * epsilon)

// part two

function getcands(list, idx, testlo)
{
    if(list.length == 1)
    {
        return list[0]
    }
    cnt = 0
    for(i = 0; i != list.length ; ++i)
    {
        cnt += list[i][idx]
    }
    to_del = (cnt >= list.length / 2) ? 1 : 0
    if(testlo)
    {
        to_del = (to_del + 1) % 2
    }
    filtered = list.filter(v => v[idx] != to_del)
    return getcands(filtered, idx + 1,testlo)
}

a = parseInt( getcands(input,0,false).join(''), 2 );
b = parseInt( getcands(input,0,true).join(''), 2 );
console.log(a * b)