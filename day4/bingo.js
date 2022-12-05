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
  // console.log("currentt draw", currentBingoDraw);
  winningCard.forEach((row) => {
    row.forEach((number) => {
      if (currentBingoDraw.indexOf(number) === -1) {
        unmarkedTotal = unmarkedTotal + number;
      }
    })
  })
  // console.log("unmarkedd total", unmarkedValues);
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
        // console.log('**************', winner.card);
      }
    }
    
    
    currentNumberDraw = workingNumberDraw
  }
  
  return winner;
};

const loosingGameLoop = (cards, draw) => {
  let currentNumberDraw = draw.slice(0, 5);
  let winner = {};
  
  for (let i = 5; i < draw.slice(5).length; i++) { //i = 5 might not be needed if this loops off diff value
    let workingNumberDraw = currentNumberDraw
    workingNumberDraw.push(draw[i]);
      let result = playGame(bingoCards, workingNumberDraw);
      if (result?.card) {
        winner = result;
        winner.drawNumber = draw[i];
        winner.sum = unmarkedValues(draw.slice(0, i + 1), winner.card) * draw[i];
        // console.log('**************', winner.card);
      }
    currentNumberDraw = workingNumberDraw
  }
  
  return winner;
};

const bingoCards = createBingoCards(sortedInputArray);

console.log(gameLoop(bingoCards, mainBingoDraw))
//console.log(loosingGameLoop(bingoCards, mainBingoDraw))