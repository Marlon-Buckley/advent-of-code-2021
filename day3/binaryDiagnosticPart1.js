// need to use input to calculate the gamma rate and epsilon rate
const fs = require('fs');

const puzzleInput = fs.readFileSync('./input.txt', 'utf8');
const lines = puzzleInput.split(/\n/);
const test = [8, 7, 8, 8];


//returns all the bits in a given column
function columnPuller(input, colNumber) { 
  let column = [];
  input.forEach((line) => {
    column += line[colNumber];
  });
  return column;
}

//returns an array where each element is an array of individual bits from each column
function columnsOfBits(input) { 
  numOfColumns = input[0].length;
  let columns = [];
  for (let i = 0; i < numOfColumns; i++) {
    columns[i] = columnPuller(input, i).split('');
  }
  return columns;
};

//Found this solution here https://javascript.plainenglish.io/how-to-find-the-most-frequent-element-in-an-array-in-javascript-c85119dc78d2`
function mostCommonBit(arr, type) {
  const hashmap = arr.reduce( (acc, val) => {
   acc[val] = (acc[val] || 0 ) + 1
  //  console.log(acc);
   return acc;
  },{})
  if (type === "gammaRate") {
    return Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b)
  } else if (type === "epsilonRate") {
    return Object.keys(hashmap).reduce((a, b) => hashmap[a] < hashmap[b] ? a : b)
  }
}

function sorter(input) {
  const columns = columnsOfBits(input);
  let gammaRate = [];
  let epsilonRate = [];

  columns.forEach((column) => {
    gammaRate += mostCommonBit(column, "gammaRate");
    epsilonRate += mostCommonBit(column, "epsilonRate");
  });

  const powerConsumption = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
  return ` Gammar rate: ${gammaRate}\n Epsilon rate: ${epsilonRate}\n Power consumption: ${powerConsumption}`;
};

console.log(sorter(lines));