import { readFileSync } from 'fs';
import path from 'path';


const main = () => {
  const content = readFileSync(path.join(process.cwd(), './resources/input_09.txt'), { encoding: 'utf-8' });
  const instructions = content.split('\n');

  const calculateTailPositions = ropeLength => {
    const knots = Array.from(Array(ropeLength), () => new Array(0,0));
    const visited = new Set();
  
    instructions.forEach(inst => {
      const [direction, amountStr] = inst.split(' ');
      const amount = Number(amountStr);

      for (let i = 0; i < amount; i++) {
        // Move head
        if (direction === "R") knots[0][0]++;
        if (direction === "L") knots[0][0]--;
        if (direction === "U") knots[0][1]++;
        if (direction === "D") knots[0][1]--;
        // For each subsequent knot
        for (let j = 1; j < knots.length; j++) {
          const prevKnot = knots[j - 1];
          const knot = knots[j];
          // Check distance with previous
          const xDiff = prevKnot[0] - knot[0];
          const yDiff = prevKnot[1] - knot[1];
          // Move knot accordingly
          if (Math.abs(xDiff) + Math.abs(yDiff) < 3) {
            if (xDiff > 1) knot[0]++;
            if (xDiff < -1) knot[0]--;
            if (yDiff > 1) knot[1]++;
            if (yDiff < -1) knot[1]--;
          } else {
            if (xDiff >= 1) knot[0]++;
            if (xDiff <= -1) knot[0]--;
            if (yDiff >= 1) knot[1]++;
            if (yDiff <= -1) knot[1]--;
          }
        }
        // Save tail position
        visited.add(`${knots[knots.length - 1][0]}*${knots[knots.length - 1][1]}`);
      }
    });
    return visited.size;
  }


  console.log("Part 1: ", calculateTailPositions(2));
  console.log("Part 2: ", calculateTailPositions(10));
};

export default main;
