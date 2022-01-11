// this is extremely ineffeicent. allow 20 minutes or so to run.
// but, it works, and i need to move on with my life.

// beat data into shape.
fs = require('fs');
sens = fs.readFileSync('19.txt', 'utf8').split("\n\n").map(m => m.split("\n")).map(n => n.slice(1)).map(coordlist => coordlist.map(c => c.split(",").map(c2 => parseInt(c2))))
sens_obj = sens.map(s2 => {s = {};s["raw"] = s2; return s})
sens_obj.forEach(s => {s["dist"] = dcalc(s["raw"])})
// now we have an object with both raw data and signed distances between every node.


scan_locs = [[0,0,0]]

// generate signed distances between every node
function dcalc(s)
{
    out = []
    s.forEach(s1 => 
    {
        s.forEach(s2 => 
        {
            if(s1 != s2)
            {
                out.push([s2[0]-s1[0], s2[1]-s1[1] ,s2[2]-s1[2]])
            }
        })    
    });
    return out
}

function getDSig(t,s)
{
    out = []
    s.forEach(s2 => 
    {
        out.push([s2[0]-t[0], s2[1]-t[1] ,s2[2]-t[2]])
    });
    return out
}

function tf(vec,matrix)
{
    return [
        vec[0] * matrix[0][0] + vec[1] * matrix[0][1] + vec[2] * matrix[0][2],
        vec[0] * matrix[1][0] + vec[1] * matrix[1][1] + vec[2] * matrix[1][2],
        vec[0] * matrix[2][0] + vec[1] * matrix[2][1] + vec[2] * matrix[2][2],
    ]
}

function generate_transforms()
{
    return [
    [[  1,  0,  0],
     [  0,  1,  0],
     [  0,  0,  1]],
 
    [[  1,  0,  0],
     [  0,  0, -1],
     [  0,  1,  0]] ,
 
    [[  1,  0,  0],
     [  0, -1,  0],
     [  0,  0, -1]] ,
 
    [[  1,  0,  0],
     [  0,  0,  1],
     [  0, -1,  0]] ,
 
    [[  0, -1,  0],
     [  1,  0,  0],
     [  0,  0,  1]] ,
 
    [[  0,  0,  1],
     [  1,  0,  0],
     [  0,  1,  0]] ,
 
    [[  0,  1,  0],
     [  1,  0,  0],
     [  0,  0, -1]] ,
 
    [[  0,  0, -1],
     [  1,  0,  0],
     [  0, -1,  0]] ,
 
    [[ -1,  0,  0],
     [  0, -1,  0],
     [  0,  0,  1]] ,
 
    [[ -1,  0,  0],
     [  0,  0, -1],
     [  0, -1,  0]] ,
 
    [[ -1,  0,  0],
     [  0,  1,  0],
     [  0,  0, -1]] ,
 
    [[ -1,  0,  0],
     [  0,  0,  1],
     [  0,  1,  0]] ,
 
    [[  0,  1,  0],
     [ -1,  0,  0],
     [ 0,   0,  1]] ,
 
    [[  0,  0,  1],
     [ -1,  0,  0],
     [  0, -1,  0]] ,
 
    [[  0, -1,  0],
     [ -1,  0,  0],
     [  0,  0, -1]] ,
 
    [[  0,  0, -1],
     [ -1,  0,  0],
     [  0,  1,  0]] ,
 
    [[  0,  0, -1],
     [  0,  1,  0],
     [  1,  0,  0]] ,
 
    [[  0,  1,  0],
     [  0,  0,  1],
     [  1,  0,  0]] ,
 
    [[  0,  0,  1],
     [  0, -1,  0],
     [  1,  0,  0]] ,
 
    [[  0, -1,  0],
     [  0,  0, -1],
     [  1,  0,  0]] ,
 
    [[  0,  0, -1],
     [  0, -1,  0],
     [ -1,  0,  0]] ,
 
    [[  0, -1,  0],
     [  0,  0,  1],
     [ -1,  0,  0]]  ,
 
    [[  0,  0,  1],
     [  0,  1,  0],
     [ -1,  0,  0]] ,
 
    [[  0,  1,  0],
     [  0,  0, -1],
     [ -1,  0,  0]]]
}

// find how much two arrays have in common
function common(a,b)
{
    a_str = a.map(x => x.toString())
    b_str = b.map(x => x.toString())
    return a_str.filter(value => b_str.includes(value)).length
}

function swapArrayElements(arr, indexA, indexB)
{
    var temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
}

function find_next_scanner()
{
    best_score = 0
    best_tf = 0
    best_idx = 0
    for(i = 1; i != sens_obj.length; i++)
    {
        variations = []
        generate_transforms().forEach(t =>
        {
            variation = []
            sens_obj[i]["dist"].forEach(s => 
            {
                variation.push([tf(s,t)])
            })
            variations.push([t,variation])
        })

        // find the most likely transform.
        // This will be the transform that shares the most signed distances with the first node.
        max = 0
        best_or = null
        variations.forEach(v =>
        {
            if(max < common(sens_obj[0].dist,v[1]))
            {
                max = common(sens_obj[0].dist,v[1])
                best_or = v[0]
            }
        })
        
        if(max > best_score)
        {
            best_score = max
            best_tf = best_or
            best_idx = i
        }
    }
    best_or = best_tf
    swapArrayElements(sens_obj,best_idx,1)
}

while(sens_obj.length > 1)
{
    console.log("sensors left: " + sens_obj.length)
    // find which other node has the closest set of scanners.
    find_next_scanner()
    console.log(best_or + ":" + best_score)
    // we have the most likely orientation now.
    // this is where the raws come in.
    // for each raw in sens[1], convert it to the correct orientation.
    corrected_raws = []
    sens_obj[1]["raw"].forEach(s => 
        {
            corrected_raws.push(tf(s,best_or))
        })

    // then, generate a distance signature for each raw.
    dist_list_1 = sens_obj[0]["raw"].map(c => [c,getDSig(c,sens_obj[0]["raw"])])
    dist_list_2 = corrected_raws.map(c => [c,getDSig(c,corrected_raws)])

    best_common = null
    best_delta = 0

    dist_list_2.forEach(d=> 
    {   
        point = d[0]
        sig = d[1]
        this_best_delta = null
        this_iter_points_common = 0

        // find the best matching signature in dist_list_1, this HEAVILY implies they are the same point
        // There is ALMOST CERTAINLY a better varation of this where we skip right to this step and correct rotation on the fly, but w/e.
        dist_list_1.forEach(d2 =>
            {
                point2 = d2[0]
                sig2 = d2[1]
                if(common(sig2,sig) > this_iter_points_common)
                {
                    this_iter_points_common = common(sig2,sig)
                    this_best_delta = [point[0] - point2[0], point[1] - point2[1], point[2] - point2[2]]
                }
            })

        if(this_iter_points_common > best_common)
        {
            best_common = this_iter_points_common
            best_delta = this_best_delta
        }

    })
    // add corrected raws to old list, with deltas.
    corrected_raws.forEach(c => sens_obj[0]["raw"].push([c[0] - best_delta[0], c[1] - best_delta[1], c[2] - best_delta[2]]))
    scan_locs.push(best_delta)
    sens_obj.splice(1,1)
    // rm dupes
    // holy shit copilot, nice job.
    sens_obj[0]["raw"] = sens_obj[0]["raw"].filter((v,i,a) => a.findIndex(t => t[0] === v[0] && t[1] === v[1] && t[2] === v[2]) === i)

    //recalc dists in 1
    sens_obj[0]["dist"] = dcalc(sens_obj[0]["raw"])
}

console.log(sens_obj[0]["raw"].length)

//recalc dists for part 2
// i could go for a manhattan rn
manhattans = dcalc(scan_locs).map(d => Math.abs(d[0]) + Math.abs(d[1]) + Math.abs(d[2]))
manhattans.sort(function (a, b) {  return a - b;  })
console.log(manhattans[manhattans.length-1])