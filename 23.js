fs = require('fs');

//       0    1       2         3       4         5    6 
halls = ["",  "",     "",      "",      "",       "", ""]
rooms =   [       "1443",     "4323",    "1214",     "2132"]
//                0         1       2         3

function generate_legal_moves(croom,chall)
{
  moves = []
  // Move amphiphod from hall to home.
  // Amphipods will never move from the hallway into a room unless that room is their destination room 
  // and that room contains no amphipods which do not also have that room as their own destination.
  for(h = 0; h < halls.length; h++)
  {
    uname = chall[h]
    if(uname != "")
    {
      uval = parseFloat(uname)-1
      
      // If space in the hole PT 1
      //if(croom[uval] == "" || croom[uval] == uname)

      // If space in the hole PT 2
      if(croom[uval] == "" || croom[uval] == uname || croom[uval] == uname +uname || croom[uval] == uname + uname + uname)
      {
        // Suppose we are a "2", uval is "1".
        // "2"s need to get to 1+1 (2) or 1+2 (3)
        // add bias of +1 or +2
        if(uval+1 == h || uval+2 == h)
        {
          // go home.
          moves.push([false,h,uval])
        } 
        else
        {
          legal_move = true
          p = h
          // legal move. may go home, if not blocked.
          while(!(uval+1 == p || uval+2 == p))
          {
            p += Math.sign((uval+1)-h)
            if(chall[p] != "")
            {
              legal_move = false
              break
            }
          }
          if(legal_move)
          {
            moves.push([false,h,uval])
          }
        }
      }
    }
  }

  // Try to move an Amphipod outside.
  for(r = 0; r < rooms.length; r++)
  {
    uname = croom[r][0]
    if(uname != undefined)
    {
      uval = parseInt(uname)

      // special case, if i'm already in the room i belong in, alone or not, return.
      if((uval-1 == r) && (croom[r] == uname || croom[r] == uname + uname || croom[r] == uname + uname + uname || croom[r] == uname + uname + uname + uname + uname))
      {
          continue
      }

      // move RIGHT
      for(dx = r+2; dx < halls.length; dx++)
      {
        if(chall[dx] == "")
        {
          // legal move.
          moves.push([true,r,dx])
        } else
        {
          break // cannot go further right.
        }
      }

        // move LEFT
        for(dx = r+1; dx >= 0; dx--)
        {
          if(chall[dx] == "")
          {
            // legal move.
            moves.push([true,r,dx])
          } else
          {
            break // cannot go further left
          }
        }
    }
  }
  return moves;
}

function applyMove(move,oldroom,oldhall)
{
  if(move[0])
  {
    // move from room to hall
    // we need to count steps, now.
    steps = 0
    // hardecoded 5 (use 3 for 2-variation.)
    steps += 5 - oldroom[move[1]].length

    // Now, we are at the end of the hall. if greater return 1 step + how many we have to (from zero index)
    if(move[2] <= (move[1]+1))
    {
      steps += 1 + ((move[1]+1)  - move[2]) * 2
    } 
    else
    {
      // up to one index.
      steps += 1 + (move[2] - (move[1]+2)) * 2
    }

    // subtract a step if going to far rooms.
    if(move[2] == 0 || move[2] == halls.length-1)
    {
      steps -= 1
    }

    oldhall[move[2]] = oldroom[move[1]][0]
    oldroom[move[1]] = oldroom[move[1]].substring(1)
    baseVal = Math.pow(10,parseInt(oldhall[move[2]])-1)
    return steps * baseVal

  }
  else
  {
    // hall to room.
    
    //step calc
    steps = 0
    // room > hall
    if(move[2] >= (move[1]-1))
    {
      steps += 1 + (move[2] - (move[1]-1)) * 2
    } 
    else
    {
      //room > hall
      steps += 1 + ((move[1] - 2) - move[2]) * 2
    }


    // hardecoded 4 (use 2 for 2-variation.)
    steps += 4 - oldroom[move[2]].length

    // subtract a step if going to far rooms.
    if(move[1] == 0 || move[1] == halls.length-1)
    {
      steps -= 1
    }

    baseVal = Math.pow(10,parseInt(oldhall[move[1]])-1)

    oldroom[move[2]] = oldhall[move[1]] + oldroom[move[2]]
    oldhall[move[1]] = ""

    return steps * baseVal
  }

}

function stringify(croom,challs)
{
  s = ""
  for(r = 0; r < rooms.length; r++)
  {
    s += croom[r] + ","
  }
  s += "|"
  for(h = 0; h < halls.length; h++)
  {
    s += challs[h] + ","
  }
  return s
}

function finished(crooms)
{
  // pt 1
  //return (crooms[0] == "11" && crooms[1] == "22" && crooms[2] == "33" && crooms[3] == "44")
  //pt 2
  return (crooms[0] == "1111" && crooms[1] == "2222" && crooms[2] == "3333" && crooms[3] == "4444")
}

function min(queue)
{
  low_idx = 0
  for(q = 1; q < queue.length; q++)
  {
    if(queue[q][2] < queue[low_idx][2])
    {
      low_idx = q
    }
  }
  return low_idx
}

seen = {}
queue = [[rooms,halls,0]]

while(true)
{
  if(queue.length == 0)
  {
    break
  }

  nextIdx = min(queue)
  curr = queue[nextIdx]
  queue.splice(nextIdx, 1);

  if(finished(curr[0]))
  {
    console.log(curr[2])
    return
  }

  // Generate every possible move at the node.
  moves = generate_legal_moves(curr[0],curr[1])

  moves.forEach(m => 
  {
    nextRooms = [...curr[0]];
    nextHalls = [...curr[1]];
    cost = curr[2]

    // Apply the move.
    moveCost = applyMove(m,nextRooms,nextHalls)

    // Check if we have seen this state before.
    if(seen[stringify(nextRooms,nextHalls)] == undefined)
    {
      seen[stringify(nextRooms,nextHalls)] = cost + moveCost
      queue.push([nextRooms,nextHalls,cost + moveCost])
    }
    // check if we have seen this state before, but with a lower cost.
    else if(seen[stringify(nextRooms,nextHalls)] > cost + moveCost)
    {
      seen[stringify(nextRooms,nextHalls)] = cost + moveCost
      queue.push([nextRooms,nextHalls,cost + moveCost])     
    }
  })
}

