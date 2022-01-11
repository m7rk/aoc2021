fs = require('fs');

// renaming these to less shitty names
// 1,2,3,4
halls = ["",    "2",      "4",      "",   ""]
rooms =   [  "21",    "",    "33",     "41"]
//#01.2.3.4.56#
//###A#B#C#D###

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
      if(croom[uval] == "" || croom[uval] == uname)
      {
        // always true if uval == p or uval == p+1
        if(uval == h || uval == h-1)
        {
          moves.push([false,h,uval])
        } 
        else
        {
          legal_move = true
          p = h
          // legal move. may go home, if not blocked.
          while(!(uval == p || uval == p-1))
          {
            p += Math.sign(uval-h)
            if(halls[p] != "")
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
    uname = rooms[r][0]
    if(uname != undefined)
    {
      uval = parseInt(uname)
      // move RIGHT
      for(dx = r+1; dx < halls.length; dx++)
      {
        if(halls[dx] == "")
        {
          // legal move.
          moves.push([true,r,dx])
        } else
        {
          break // cannot go further right.
        }
      }

        // move LEFT
        for(dx = r; dx >= 0; dx--)
        {
          if(halls[dx] == "")
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
    //move from room to hall
    halls[move[2]] = oldroom[move[1]][0]
    oldroom[move[1]] = oldroom[move[1]].substring(1)
  }
  else
  {
    //move from hall to room
    rooms[move[2]] = halls[move[1]] + rooms[move[2]]
    halls[move[1]] = ""
  }
}

console.log(generate_legal_moves(rooms,halls))