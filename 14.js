fs = require('fs');
init = fs.readFileSync('14.txt', 'utf8').split("\n\n")[0]
rules = {}
fs.readFileSync('14.txt', 'utf8').split("\n\n")[1].split("\n").map(m => m.split(" -> ")).forEach(element => {rules[element[0]] = element[1]});
combs = {}
for(i=0;i!=init.length-1;++i)
{
    key = init.slice(i,i+2)
    if(combs[key] == undefined)
    {
        combs[key] = 0
    }
    combs[key] += 1
}


for(n = 40; n--; n != 0)
{
    newcombs = {}
    Object.keys(combs).forEach(v => 
    {
        new_letter = rules[v]
        addToHash(v.split("")[0] + new_letter, newcombs, combs[v])
        addToHash(new_letter + v.split("")[1], newcombs, combs[v])
    })
    combs = newcombs
}

chars = {}
Object.keys(combs).forEach(e => 
{
    addToHash(e.split("")[0], chars, combs[e])
});
// Add the last letter of init.
chars[init.slice(-1)] += 1

console.log(getMax(chars) - getMin(chars))

function addToHash(e,h,cnt){
    if(h[e] == undefined)
    {
        h[e] = 0
    }
    h[e] += cnt
}

function getMax(hsh)
{
    max = 0
    max_key = ""
    Object.keys(hsh).forEach(e => 
    {
        if(hsh[e] > max)
        {
            max = hsh[e]
            max_key = e
        }
    })
    return max
};

function getMin(hsh)
{
    min = Number.MAX_SAFE_INTEGER 
    min_key = ""
    Object.keys(hsh).forEach(e => 
    {
        if(hsh[e] < max)
        {
            min = hsh[e]
            min_key = e
        }
    })
    return min
}