const fs = require('fs');

const puzzleInput = fs.readFileSync('./input.txt', 'utf8');
const lines = puzzleInput.split(/\n/);

console.log(lines);


let horizontalPos = 0;
let depth = 0;
let aim = 0;

lines.forEach((movement) => {
  if (movement.includes("forward")) {
    const forwardMovement = movement.replace(/\D/g,'')
    horizontalPos += parseInt(forwardMovement);
    depth += aim * forwardMovement;
  } else if (movement.includes("down")) {
    const aimIncrease = movement.replace(/\D/g,'')
    aim += parseInt(aimIncrease);
  } else if (movement.includes("up")) {
    const aimDecrease = movement.replace(/\D/g,'');
    aim -= parseInt(aimDecrease);
  }
})

console.log("Answer: ", horizontalPos * depth);