// lol not parsing that input when this takes 2 seconds
p1 = 7
p2 = 10
score1 = 0
score2 = 0
dice = 1
rollcnt = 0

function roll()
{
    val = (dice * 3) + 3
    dice = (dice + 3)
    rollcnt += 3
    if(dice >= 101)
    {
        dice -= 100
    }
    return val
}
function move(p,amt)
{
    val = p + amt
    while(val >= 11)
    {
        val -= 10
    }
    return val
}

/** PART ONE
while(true)
{
    p1 = move(p1,roll())
    score1 += p1
    if(score1 >= 1000)
    {
        console.log(score2 * rollcnt)
        return
    }
    p2 = move(p2,roll())
    score2 += p2
    if(score2 >= 1000)
    {
        console.log(score1 * rollcnt)
        return
    }
}
*/

// idea for solution -> memoize how many wins take place for any given board state
// there are ONLY 21 * 21 board states. So this could work.

function getWinCount(av,bv,as,bs,roll,ply)
{
    // first, move mice.
    if(ply)
    {
        av = move(av,roll)
        as += av
    }
    else
    {
        bv = move(bv,roll)
        bs += bv
    }
    // second, check for winner.
    if(as >= 21)
    {
        // universe where a wins.
        return [1,0]
    }

    if(bs >= 21)
    {
        // universe where b wins.
        return [0,1]
    }

    console.log("game continues. score: " + as + " " + bs)
    console.log("game continues. eval: " + av + " " + bv)

    console.log("let roll 1:")
    let g1 = getWinCount(av,bv,as,bs,1,!ply)
    console.log("let roll 2:")
    let g2 = getWinCount(av,bv,as,bs,2,!ply)
    console.log("let roll 3:")
    let g3 = getWinCount(av,bv,as,bs,3,!ply)
    return [g1[0] + g2[0] + g3[0], g1[1] + g2[1] + g3[1]]
}

av = 1
bv = 1
as = 14
bs = 14

let g1 = getWinCount(av,bv,as,bs,1,true)
let g2 = [0,0]
let g3 = [0,0]
//let g2 = getWinCount(av,bv,as,bs,2,true)
//let g3 = getWinCount(av,bv,as,bs,3,true)
console.log([g1[0] + g2[0] + g3[0], g1[1] + g2[1] + g3[1]])