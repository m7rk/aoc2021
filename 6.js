fs = require('fs');
nums = fs.readFileSync('6.txt', 'utf8').split(",").map(v => parseInt(v))
feesh_by_age = [0,0,0,0,0,0,0,0,0]
nums.forEach(e => {
    feesh_by_age[e] += 1
});
for(i = 0; i != 256; ++i)
{
    birth = feesh_by_age.shift();
    feesh_by_age.push(birth)
    feesh_by_age[6] += birth
}
console.log(feesh_by_age.reduce((a, b) => a + b, 0))