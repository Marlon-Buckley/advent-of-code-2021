// need to use input to calculate the gamma rate and epsilon rate
const fs = require('fs');

const puzzleInput = fs.readFileSync('./example.txt', 'utf8');
const lines = puzzleInput.split(/\n/);
const test = [8, 7, 8, 8];


//returns all the bits in a given column
function columnPuller(input, colNumber) { 
  let column = [];
  input.forEach((line) => {
    column += line[colNumber];
  });
  return column;
};

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

//Finds the most or least commmon bit in the given array
function mostOrLeastCommonBit(arr, type) {
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

//Loops through each "column" from the puzzle input, calculates the gamma and epsilon rates
//Then converts results to decimal and calculates power consumption
function sorter(input) {
  const columns = columnsOfBits(input);
  let gammaRate = [];
  let epsilonRate = [];

  columns.forEach((column) => {
    gammaRate += mostOrLeastCommonBit(column, "gammaRate");
    epsilonRate += mostOrLeastCommonBit(column, "epsilonRate");
  });

  const powerConsumption = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
  console.log(columns);
  return ` Gammar rate: ${gammaRate}\n Epsilon rate: ${epsilonRate}\n Power consumption: ${powerConsumption}`;
};

console.log(sorter(lines));