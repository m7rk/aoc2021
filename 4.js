fs = require('fs');

nums = fs.readFileSync('4.txt', 'utf8').split("\n")[0].split(",").map(v => parseInt(v))

rawboards = fs.readFileSync('4.txt', 'utf8').split("\n\n")

rawboards.shift()

// thank the lord jesus christ that javascript has map now
// there has to be an easier way to do this tho
boards = rawboards.map(v => v.split("\n").map(v => v.split(" ").filter(v => v != "").map(v => parseInt(v))))

// somebody smarter than me on reddit is probably doing this a better way
boardcombs = []

// for each board...
boards.forEach(b => {
    boardcomb = []
    boardcomb = boardcomb.concat(b)
    // for each col...
    b.forEach((_, x) =>
    {
        comb = []
        // for each row..
        b.forEach((_, y) =>
        {
            comb.push(b[y][x])
        })
        boardcomb.push(comb)
    });
    boardcombs.push(boardcomb)
//}) rubs me the wrong way tbh
});

// shamelessy steal gales idea. ugly as hell but y know
boardcombs = boardcombs.map(b => b.map(r => r.map(n => [n,false])))

// visibly lmaoing at how disgusting this is from the bottom down
function findwinner(rows)
{
    r = rows.filter(r => r.findIndex(e => e[1] == false) > -1)
    return r.length < 10
}

function countuncalled(rows)
{
    console.log(rows)
    sum = 0;
    (rows.slice(0,5)).forEach(row => {
        row.forEach(e=>
            {
                if(!e[1])
                {
                    console.log(e[0])
                    sum += e[0]
                }
            })
        
    });
    return sum
}

/** PART 1
nums.forEach(x => {
    // set trues
    boardcombs = boardcombs.map(b => b.map(r => r.map(n => [n[0],n[1] || x == n[0]])))
    // check for winners. filter boards with all falses.
    i = boardcombs.findIndex(bd => findwinner(bd))
    console.log(i)
    if(i >= 0)
    {
        console.log(countuncalled(boardcombs[i]) * x)
        // There's no built-in ability to break in forEach
        // fuckign kill me
        throw Exception;
    }
});
 */


//pppppppppppppppppppppppppppppppppppppppppppppart 2
nums.forEach(x => {
    // set trues
    boardcombs = boardcombs.map(b => b.map(r => r.map(n => [n[0],n[1] || x == n[0]])))
    // check for winners. filter boards with all falses.
    i = boardcombs.findIndex(bd => findwinner(bd))
    // once it wins..
    if(boardcombs.length == 1 && i != -1)
    {
        console.log(countuncalled(boardcombs[0]) * x)
        throw Exception;
    }
    while (i >= 0)
    {
        boardcombs.splice(i, 1);
        i = boardcombs.findIndex(bd => findwinner(bd))
    }

});