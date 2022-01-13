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

// Had a ˢᵐᵒˡ push from reddit but this code is 99% original.
// just fucked up recursion, i needed to run it on EVERY dice roll, not just every SET of dice rolls.
// There was probably a way if i mult'd eveything by 27..

// also rekt by weird JS rules involving scoping. USE THOSE VAR KEYWORDS PEOPLE. OTHERWISE IT'S ALL GLOBALS AND YOUR RECURSION WILL BREAK.

cache = {}

function getWinCount(as,bs,av,bv,dicesum,ply,rollno)
{
    // sum scores if ply is 2.
    if(rollno == 3)
    {
        if(ply)
        {
            av = move(av,dicesum)
            as += av
        }
        else
        {
            bv = move(bv,dicesum)
            bs += bv
        }
        ply = !ply
        rollno = 0
        dicesum = 0
    }
    if (as >= 21)
    {
        return [1,0]
    } 
    if (bs >= 21)
    {
        return [0,1]
    } 
    var aw = 0
    var bw = 0
    // see if this position is memoized
    var cache_str = as + "," + bs + "," + av + "," + bv + "," + dicesum + "," + ply + "," + rollno

    if(cache[cache_str])
    {
        return cache[cache_str]
    }
    
    for (var droll = 1; droll <= 3; droll++) 
    {
        var r = getWinCount(as,bs,av,bv,dicesum + droll,ply,rollno+1)
        aw += r[0];
        bw += r[1]
    }
    
    cache[cache_str] = [aw,bw]
    return[aw,bw]
}

av = 7
bv = 10
as = 0
bs = 0

let g1 = getWinCount(as,bs,av,bv,0,true,0)
let g2 = [0,0]
let g3 = [0,0]
//let g2 = getWinCount(av,bv,as,bs,2,true)
//let g3 = getWinCount(av,bv,as,bs,3,true)
console.log([g1[0] + g2[0] + g3[0], g1[1] + g2[1] + g3[1]])