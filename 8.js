const { rejects } = require('assert');

fs = require('fs');
segs = {"abcefg":0,"cf":1,"acdeg":2,"acdfg":3,"bcdf":4,"abdfg":5,"abdefg":6,"acf":7,"abcdefg":8,"abcdfg":9};

ends = fs.readFileSync('8.txt', 'utf8').split("\n").map(v => v.split("|")[1].split(" ").slice(1))
console.log(ends.reduce((a, b) => a + b.filter(x => [2,7,4,3].includes(x.length)).length, 0))

all = fs.readFileSync('8.txt', 'utf8').split("\n").map(v => v.split(" | ").map(d => d.split(" ")))
sum = 0 
all.forEach(v => {
    permute("abcdefg").forEach(p => {
        reject = false
        //for each permutation, reassign a-g and see if can be rejected.
        v[0].forEach(seg => 
        {
            check = remap(seg,p)
            newv = sortstr(check)
            if(!(newv in segs))
            {
                reject = true
            }
        });
        // at this point, reject is true if any of the segments are invalid
        if(!reject)
        {
            sum += (1000 * segs[sortstr(remap(v[1][0],p))]) + (100 * segs[sortstr(remap(v[1][1],p))]) + (10 * segs[sortstr(remap(v[1][2],p))]) + (1 * segs[sortstr(remap(v[1][3],p))])
        }
    }
)})
console.log(sum)

function sortstr(str)
{
    return str.split('').sort().join('')
}

function remap(check, p)
{   
    out = ""
    for(i = 0; i < check.length; i++)
    {
        out += p[check.charCodeAt(i) - 97]
    }
    return out
}

// stolen "permute" algo
function permute(arr) {
    var results = [],
        l = arr.length,
        used = Array(l), // Array of bools. Keeps track of used items
        data = Array(l); // Stores items of the current permutation
    (function backtracking(pos) {
      if(pos == l) return results.push(data.slice());
      for(var i=0; i<l; ++i) if(!used[i]) { // Iterate unused items
        used[i] = true;      // Mark item as used
        data[pos] = arr[i];  // Assign item at the current position
        backtracking(pos+1); // Recursive call
        used[i] = false;     // Mark item as not used
      }
    })(0);
    return results;
  }