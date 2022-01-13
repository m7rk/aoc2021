fs = require('fs');
// There is probably an 10000000000000000000000000000000000 million IQ play with recusion or trees
// but I LIKE MY REGEX, LIST WRANGLIN SOLUTION DAMNIT

// caution, i am being lazy with scoping here
// be CAREFUL, those let's and globals will bite you
function eval(list)
{
  v = list[0]
  list.splice(0,1)
  while(true)
  {
    let vlast = v.join("")
    tryExplode(v)
    spl(v)
    if(vlast == v.join(""))
    {
      if(list.length == 0)
      {
        return magn(v.join(""))
      }

      v.splice(0,0,"[")
      v.splice(v.length-1,0,"]")

      v.splice(v.length-1,0,",")
      list[0].forEach(e=> 
      {    
        v.splice(v.length-1,0,e)
      });
      list.splice(0,1)
    }
  }
}



function tryExplode(v)
{
  while(true)
  {
    last = v.join("")
    explode(v)
    if(last == v.join(""))
    {
      break
    }
  }
}

function explode(s)
{
  depth = 0
  for(i = 0; i != s.length; ++i)
  {
    e = s[i]
    if(e == "[")
    {
      depth += 1
    }
    else if(e == "]")
    {
      depth -= 1
    }
    // ASSERT this is a pair and not just a number.
    else if(depth > 4 && e != "," && !isNaN(parseInt(s[i+2])))
    {
      // explode time
      l_num_m = s.slice(0,i-2).reverse().findIndex((x) => (x != "[" && x != "]" && x != ","))
      r_num_m = s.slice(i+3,s.length).findIndex((x) => (x != "[" && x != "]" && x != ","))

      // this is likely a problem, what if no neg number
      lloc = l_num_m != -1 ? (i-3) - l_num_m : null

      rloc = r_num_m != -1 ? r_num_m + (i+3) : null

      if(lloc != null)
      {
        s[lloc] = parseInt(s[lloc]) + parseInt(e)
      }
      if(rloc != null)
      {
        s[rloc] = parseInt(s[rloc]) + parseInt(s[i+2])
      } 
      s.splice(i-1,5)
      s.splice(i-1,0,0)
      return s
    }
  }
  return s
}

function spl(s)
{
  for(i = 0; i != s.length; ++i)
  {
    if(s[i] >= 10)
    {
      val = parseInt(s[i])
      s.splice(i,1)
      s.splice(i,0,"]")
      s.splice(i,0,Math.ceil(val/2))
      s.splice(i,0,",")
      s.splice(i,0,Math.floor(val/2))
      s.splice(i,0,"[")
      return
    }
  }
}

function magn(vals)
{
  regex = /\[[0-9]+,[0-9]+\]/
  pair = vals.match(regex)
  while(pair != null)
  {
    s = pair[0].replace("[","").replace("]","").split(",")
    l = 3 * parseInt(s[0])
    r = 2 * parseInt(s[1])
    vals = vals.replace(pair,""+(l+r))
    pair = vals.match(regex)
  }
  return parseInt(vals)
}


qs = fs.readFileSync('18.txt', 'utf8').split("\n").map(v => v.split(""))
console.log(eval(qs))

mval = 0
for(ii = 0; ii != 100; ++ii)
{
  console.log(ii + "%")
  for(jj = 0; jj != 100; ++jj)
  { 
    if(ii != jj)
    {
      // dumbass array gets mutated in the dumbass function so just relaod it, i DO NOT Care
      qs = fs.readFileSync('18.txt', 'utf8').split("\n").map(v => v.split(""))
      m = eval([qs[ii],qs[jj]])
      if(m > mval)
      {
        mval = m
      }
    }
  }
}

console.log(mval)