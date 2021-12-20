fs = require('fs');

// saves leading zeroes..
function hex2bin(hex){
  var out = "";
  for(var c of hex) {
      switch(c) {
          case '0': out += "0000"; break;
          case '1': out += "0001"; break;
          case '2': out += "0010"; break;
          case '3': out += "0011"; break;
          case '4': out += "0100"; break;
          case '5': out += "0101"; break;
          case '6': out += "0110"; break;
          case '7': out += "0111"; break;
          case '8': out += "1000"; break;
          case '9': out += "1001"; break;
          case 'A': out += "1010"; break;
          case 'B': out += "1011"; break;
          case 'C': out += "1100"; break;
          case 'D': out += "1101"; break;
          case 'E': out += "1110"; break;
          case 'F': out += "1111"; break;
          default: return "";
      }
  }
  return out;
}

// take N bits, return value
// abuses scoping
function take(n)
{
  if(n > str.length)
  {
    console.log("ERROR: " + n + " > " + str.length)
    return 0
  }
  ret = parseInt(str.substring(0,n), 2);
  str = str.slice(n,str.length);
  return ret
}

// eval set of packets with operator
function eval(operator,numbers)
{
  switch(operator)
  {
    case 0: return numbers.reduce((a,b) => a+b,0)
    case 1: return numbers.reduce((a,b) => a*b,1)
    case 2: return Math.min(...numbers)
    case 3: return Math.max(...numbers)
    case 5: return numbers[0] > numbers[1] ? 1 : 0
    case 6: return numbers[0] < numbers[1] ? 1 : 0
    case 7: return numbers[0] == numbers[1] ? 1 : 0
  }
}

function hexListToDec(nums)
{
  hsum = 0
  nums.reverse().forEach((e,i) => 
  {
    hsum += (e * (Math.pow(16,i))) 
  });
  return hsum
}

str = hex2bin(fs.readFileSync('16.txt', 'utf8').split(""))
sum = 0

console.log("EVAL " + parsePkt())
console.log("SUM " + sum)


// i love you "let"
// very important for weirdo javascript recursion
function parsePkt()
{
  let vers = take(3)
  sum += vers
  let type = take(3)

  // literal
  if(type == 4)
  {
    let hexs = []
    while(take(1) == 1)
    {
      hexs.push(take(4))
    }
    hexs.push(take(4))
    return hexListToDec(hexs)
  }
  else
  {
    if(take(1) == 0)
    {
      //total length in bits of the sub-packets contained by this packet.
      l1 = take(15)
      let targ = str.length - l1
      //keep reading packets
      let ops = []
      while(str.length > targ)
      {
        ops.push(parsePkt())
      }
      return eval(type,ops)

    } else
    {
      //number of sub-packets immediately contained by this packet.
      let count = take(11)
      let ops = []
      for(let i = 0; i != count; i++)
      {
        ops.push(parsePkt())
      }
      return eval(type,ops)
    }
  }
}
