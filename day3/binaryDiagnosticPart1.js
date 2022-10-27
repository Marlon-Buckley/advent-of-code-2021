// need to use input to calculate the gamma rate and epsilon rate
const fs = require('fs');

const puzzleInput = fs.readFileSync('./example.txt', 'utf8');
const lines = puzzleInput.split(/\n/);
const test = [8, 7, 8, 8];

function columnsOfBits(arr) {
  const hashmap = arr.reduce( (acc, val) => {
   acc[val] = (acc[val] || 0 ) + 1
   console.log(acc);
   return acc
},{})
console.log(hashmap);
return Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b)
}


function mostCommonBit(arr) {
  const hashmap = arr.reduce( (acc, val) => {
   acc[val] = (acc[val] || 0 ) + 1
   console.log(acc);
   return acc
},{})
console.log(hashmap);
return Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b)
}

console.log(mostCommonBit(test));