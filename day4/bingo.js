const fs = require('fs');

const puzzleInput = fs.readFileSync('./example.txt', 'utf8');
const bingoInput = puzzleInput.split(/\n/);
//const testBingoInput = bingoInput[0].split(',');

const cardData = bingoInput.slice(2).map(str => {
  return str.replace(/\s+/g, ' ').trim();
});
const sortedCards = cardData.filter(Boolean);


const cardBuilder = (cards) => { //maps puzzle input to array of bingo cards
  const totalCards = cards.length / 5;
  let test = [];
  let cardTracker = 0;
  let cardSize = 5;
  console.log('Total bingo cards :', totalCards);
  console.log('Card raw data length: ', cards.length);


  for (let i = 0; i < cards.length; i++) {
    let row = cards[i].split(/[ ,]+/).join(',');
    test.push(row.split(','));
    test[i] = test[i].map(Number);

  }
  console.log(test);
  return test;
}

cardBuilder(sortedCards);


//console.log(bingoCards(allCards));
//console.log(sortedCards.slice(0, 5));





// const bingoNumbers = testBingoInput.map(str => {
//   return Number(str);
// });

// //this needs to know the winning number, to cut off the bingoNumbers at that point
// const winningBoardScore = (winningBoard, winningNumber) => {
//   const result = winningBoard.filter(number => !bingoNumbers.includes(number));
//   let sum = 0;
//   result.forEach((number) => {
//     sum += number
//   });

//   return sum * winningNumber
// };

