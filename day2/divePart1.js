const fs = require('fs');

const puzzleInput = fs.readFileSync('./part1Input.txt', 'utf8');
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