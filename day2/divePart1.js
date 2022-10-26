const fs = require('fs');

const puzzleInput = fs.readFileSync('./input.txt', 'utf8');
const lines = puzzleInput.split(/\n/);

console.log(lines);


let horizontalPos = 0;
let depth = 0;

lines.forEach((movement) => {
  if (movement.includes("forward")) {
    const forwardMovement = movement.replace(/\D/g,'')
    horizontalPos += parseInt(forwardMovement);
  } else if (movement.includes("down")) {
    const decendMovement = movement.replace(/\D/g,'')
    depth += parseInt(decendMovement);
  } else if (movement.includes("up")) {
    const ascendMovement = movement.replace(/\D/g,'');
    depth -= parseInt(ascendMovement);
  }
})

console.log("Answer: ", horizontalPos * depth);


// Things that helped 
  // https://stackoverflow.com/questions/30607419/return-only-numbers-from-string

  // https://www.w3schools.com/jsref/jsref_includes.asp

  // https://bobbyhadz.com/blog/javascript-split-string-by-newline