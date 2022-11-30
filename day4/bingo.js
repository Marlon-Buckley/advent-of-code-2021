const { ifError } = require('assert');
const fs = require('fs');
const puzzleInput = fs.readFileSync('./input.txt', 'utf-8')

//[13, 2, 9, 10, 12]  //bingoInput[0].split(',').map(str => {
  //return Number(str);
//});

let rawBingoDraw = puzzleInput.split(/\r?\n/)[0];
//pulls out each row as a string

const mainBingoDraw = rawBingoDraw.split(',').map(str => {
  return Number(str);
});


//pulls out each row as a string
let rawCardInput = puzzleInput.split(/\r?\n/).slice(2);

//removes leading spaces from each string
let sortedInputArray = rawCardInput.map(str => {
  return str.replace(/\s+/g, ' ').trim()
})


//remove empty strings from array
sortedInputArray = sortedInputArray.filter(e => e);

const createBingoCards = (sortedInputArray) => {
  const totalCards = sortedInputArray.length / 5;
  let rowsAsInts = [];
  let cardCount = 0;
  let cardSize = 5;
  let groupedCards = [];

  for (let i = 0; i < sortedInputArray.length; i++) {
    let row = sortedInputArray[i].split(/[ ,]+/).join(','); //separates string of numbers with commas
    rowsAsInts.push(row.split(',').map(Number)); //converts strings into ints and pushes to arr
  }

  //groups arrays into cards
  for (let i = 0; i < totalCards; i++) {
    groupedCards.push(rowsAsInts.slice(cardCount, cardCount + cardSize));
    cardCount += 5
  }

  return groupedCards;
};

// const exampleCard =   [
//   [ 22, 13, 17, 11, 0 ],
//   [ 8, 2, 23, 4, 24 ],
//   [ 21, 9, 14, 16, 7 ],
//   [ 6, 10, 3, 18, 5 ],
//   [ 1, 12, 20, 15, 19 ]
// ]
// [rowNumber][elementNumber]
//console.log(exampleCard);

//pull column
//access element in x position of x row for a given card
  //return all elements in x position of each row

const columnPuller = (card) => {
  let columns = [];
  let workingColumn = [];
  //loop through card and add values in order of columns
  for (let i = 0; i < card.length; i++) {
    for (let j = 0; j < card.length; j++) {
      workingColumn.push(card[j][i]);
      if (workingColumn.length === 5) {
        columns.push(workingColumn)
        workingColumn = [];
      }
    }
  }

  return columns;
};

//console.log(columnPuller(exampleCard));


const rowOrColumnChecker = (bingoDraw, rowOrColumn) => {
  let matches = 0;

  rowOrColumn.forEach((number) => {
    if (bingoDraw.includes(number)) {
      matches++
    }
  })

  return matches === 5 ? true : false;
};

const unmarkedValues = (currentBingoDraw, winningCard) => {
  let unmarkedTotal = 0;
  let unmarkedValues = [];
  console.log("currentt draw", currentBingoDraw);
  winningCard.forEach((row) => {
    row.forEach((number) => {
      if (currentBingoDraw.indexOf(number) === -1) {
        unmarkedTotal = unmarkedTotal + number;
      }
    })
  })
  console.log("unmarkedd total", unmarkedValues);
  return unmarkedTotal;
};


const playGame = (cards, numbersDrawn) => {
  let winningCard = [];
  
  for (let i = 0; i < cards.length; i++) { //check columns in card for win
    let workingCard = { card: cards[i], columns: columnPuller(cards[i])}
    workingCard.columns.forEach((column) => {
      if (winningCard.card === undefined) {
        if (rowOrColumnChecker(column, numbersDrawn)) {
          console.log('won by column', column, 'in card\n', workingCard.card)
          workingCard.winningCol = column;
          winningCard = workingCard;
        }
      }
    })
    workingCard.card.forEach((row) => { // check rows in card for win
      if (winningCard.card === undefined) {
        if (rowOrColumnChecker(row, numbersDrawn)) {
          console.log('won by row', row, '\nin card; \n', workingCard.card);
          workingCard.winningRow = row;
          winningCard = workingCard;
        }
      }
    })
  }

  return winningCard ? winningCard : null;

};

//console.log(mainBingoDraw)


// console.log(fileInput);
// console.log(rawCardInput);
// console.log(sortedInputArray);


const bingoCards = createBingoCards(sortedInputArray);

//console.log(mainBingoDraw.slice(0, 5))
//console.log(mainBingoDraw)

const gameLoop = (cards, draw) => {
  let currentNumberDraw = draw.slice(0, 5);
  let winner = {};
  for (let i = 5; i < draw.slice(5).length; i++) { //this i = 5 might not be needed if this loops off diff value
    let workingNumberDraw = currentNumberDraw
    workingNumberDraw.push(draw[i]);
    if (!winner?.card) {
      let result = playGame(bingoCards, workingNumberDraw);
      if (result?.card) {
        winner = result;
        winner.drawNumber = draw[i];
        winner.sum = unmarkedValues(draw.slice(0, i + 1), winner.card) * draw[i];
        console.log('**************', winner.card);
      }
    }
    
    
    currentNumberDraw = workingNumberDraw
  }
  
  return winner;
};


const mockBingoDraw = [ 7,4,9,5,11,17,23,2,0,14,21,24];
const mockRowOrColumn = [ 14, 21, 17, 24, 4 ]

//console.log(playGame(bingoCards, mockBingoDraw));
console.log(gameLoop(bingoCards, mainBingoDraw))

//console.log(rowOrColumnChecker(mockBingoDraw, mockRowOrColumn));

























// const cardData = bingoInput.slice(2).map(str => {
//   return str.replace(/\s+/g, ' ').trim();
// });
// const sortedCards = cardData.filter(Boolean);


// const cardsBuilder = (cards) => { //maps puzzle input to array of bingo cards
//   const totalCards = cards.length / 5;
//   let rowsAsInts = [];
//   console.log('Total bingo cards :', totalCards);
//   console.log('Card raw data length: ', cards.length);

//   //converts rows of strings to arrays of integers
//   for (let i = 0; i < cards.length; i++) {
//     let row = cards[i].split(/[ ,]+/).join(','); //separates string of numbers with commas
//     rowsAsInts.push(row.split(',').map(Number)); //converts strings into ints and pushed to arr
//   }

//   let cardCount = 0;
//   let groupedCards = [];
//   let cardSize = 5;

//   for (let i = 0; i < totalCards; i++) {
//     groupedCards.push(rowsAsInts.slice(cardCount, cardCount + cardSize));
//     cardCount += 5
//   }

//   return groupedCards;
// }


  //after first 5, for each number in the draw
    //for each card
      //for each row
        //for each column
          //compare all numbers in the draw



//console.log(playGame(cardsBuilder(sortedCards), bingoDraw));






//console.log(bingoCards(allCards));
//console.log(sortedCards.slice(0, 5));
// console.log(cardsBuilder(sortedCards));
// console.log(bingoDraw);


// 22 13 17 11  0  - 0
//  8  2 23  4 24  - 5
// 21  9 14 16  7  - 10
//  6 10  3 18  5  - 15
//  1 12 20 15 19  - 20




// //this needs to know the winning number, to cut off the bingoNumbers at that point
// const winningBoardScore = (winningBoard, winningNumber) => {
//   const result = winningBoard.filter(number => !bingoNumbers.includes(number));
//   let sum = 0;
//   result.forEach((number) => {
//     sum += number
//   });

//   return sum * winningNumber
// };


// const cardGrouper = (cards) => {
//   const totalCards = cards.length / 5;
//   const cardSize = 5;
//   let cardCount = 0;
//   let groupedCards = [];

//   for (let i = 0; i < totalCards; i++) {
//     groupedCards.push(cards.slice(cardCount, cardCount + cardSize));
//     cardCount += 5
//   }

//   return groupedCards;
// };

//console.log(cardGrouper(cardsBuilder(sortedCards)));

// const cardChecker = (card) => {

//   for (let i = 0; i < card.length; i++) {
//     console.log(card[i]);
//   }

// };