fs = require('fs');
vals = fs.readFileSync('7.txt', 'utf8').split(",").map(v => parseInt(v))
costs = []
for(var i = Math.min(...vals); i < Math.max(...vals); ++i)
{
    //pt 1 costs.push(vals.map(v => Math.abs(v - i)).reduce((a, b) => a + b, 0))
    tri = (t) => t*(t+1)/2
    costs.push(vals.map(v => tri(Math.abs(v - i))).reduce((a, b) => a + b, 0))
    
}
console.log(Math.min(...costs))