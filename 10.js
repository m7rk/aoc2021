fs = require('fs');
grid = {}

function stacc(s)
{
    expect = {"(":")","{":"}","[":"]","<":">"}
    stack = []
    for(i = 0; i != s.split("").length; ++i)
    {
        c = s.split("")[i]
        if(c in expect)
        {
            stack.push(c)
        }
        else
        {
            top = stack[stack.length-1]
            if(c != expect[top])
            {
                return c
            } else
            {
                stack.pop()
            }
        }
    }
    return null
}

function stacc2(s)
{
    expect = {"(":")","{":"}","[":"]","<":">"}
    stack = []
    for(i = 0; i != s.split("").length; ++i)
    {
        c = s.split("")[i]
        if(c in expect)
        {
            stack.push(c)
        }
        else
        {
            top = stack[stack.length-1]
            if(c != expect[top])
            {
                return []
            } else
            {
                stack.pop()
            }
        }
    }
    return stack.reverse().map(s => expect[s])
}

function score(s)
{
    sum = 0
    scores = {")":1,"]":2,"}":3,">":4}
    s.forEach(element => {
        sum = sum * 5
        sum = sum + scores[element]
    });
    return sum
}

vals = fs.readFileSync('10.txt', 'utf8').split("\n").map(l => stacc(l))
// are you ready for some shit
sum = 0
sum += vals.filter(x => x==")").length * 3
sum += vals.filter(x => x=="]").length * 57
sum += vals.filter(x => x=="}").length * 1197
sum += vals.filter(x => x==">").length * 25137
console.log(sum)

// part two
vals = fs.readFileSync('10.txt', 'utf8').split("\n").map(l => score(stacc2(l))).filter(x => x != 0).sort((a,b) => b-a)
console.log(vals[(-1+vals.length)/2])