// need to use input to calculate the gamma rate and epsilon rate
const fs = require('fs');

const puzzleInput = fs.readFileSync('./input.txt', 'utf8');
const binaryNumbers = puzzleInput.split(/\n/);


const bitChecker = (binaryNumbers, columnNumber, ratingType) => {
  let onesInColumn = 0;
  let dominantBitInCol;
  let leastDominantBitInCol;

  binaryNumbers.forEach((number) => {
  if (number[columnNumber] === '1') {
    onesInColumn ++;
  }
  });

  const zerosInColumn = binaryNumbers.length - onesInColumn;

  if (onesInColumn > zerosInColumn) {
    dominantBitInCol = '1';
    leastDominantBitInCol = '0';
    } else if (zerosInColumn > onesInColumn){
      dominantBitInCol = '0';
      leastDominantBitInCol = '1';
    } else if (onesInColumn === zerosInColumn) {
      dominantBitInCol = '1';
      leastDominantBitInCol = '0';
    }
    
  return ratingType === 'oxygen' ? dominantBitInCol : leastDominantBitInCol;
}


const ratingCalculator = (binaryNumbers, ratingType) => {
  let currentNums = binaryNumbers
  let newNums;
  for (let i = 0; i < currentNums[0].length; i++) {
    if (ratingType === 'oxygen') {
      const sortBy = bitChecker(currentNums, i, ratingType)
      newNums = currentNums.filter(number => number[i] === sortBy);
      currentNums = newNums;
    } else if (ratingType === 'co2') {
      const sortBy = bitChecker(currentNums, i, ratingType)
      if (currentNums.length > 1) {
        newNums = currentNums.filter(number => number[i] === sortBy);
      }
      currentNums = newNums;
    }
  }
  return newNums;
};


const oxygenGenRating = ratingCalculator(binaryNumbers, 'oxygen');
const co2ScrubRrating  = ratingCalculator(binaryNumbers, 'co2');

const lifeSupportRating = parseInt(oxygenGenRating, 2) * parseInt(co2ScrubRrating, 2);

console.log(lifeSupportRating);