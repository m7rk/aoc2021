fs = require('fs');
input = fs.readFileSync('1.txt', 'utf8').split("\n").map(v => parseInt(v))

// pt. 1
combinations = input.map((_,i)=>[input[i],input[i+1]]);
// remove undefined pair
combinations.pop()
console.log(combinations.filter(x => x[0] < x[1]).length)

// pt.2, not genericized edition because fk you
windows = input.map((_,i)=>[input[i] + input[i+1] + input[i+2],input[i+1] + input[i+2] + input[i+3]]);
// I don't want to use a for loop, this is the twenty first century. it's cool to be declarative now
// i miss you so much ruby
for(var i = 0; i < 3; i++)
{
    windows.pop()
}
console.log(windows.filter(x => x[0] < x[1]).length)