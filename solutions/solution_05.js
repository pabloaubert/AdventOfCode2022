import { readFileSync } from 'fs';
import path from 'path';

const main = () => {
  const content = readFileSync(path.join(process.cwd(), './resources/input_05.txt'), { encoding: 'utf-8' });
  const [stackInfo, movementInfo] = content.split('\n\n');
  const stackLines = stackInfo.split('\n');
  const stackNumbers = stackLines[stackLines.length - 1].split('');
  const columnWithValue = stackNumbers.map((item, index) => item!==' '? index : item).filter(item => item!==" ");
  const stacks = [], stacks2 = [];
  for (let line = stackLines.length - 2; line >= 0; line--) {
    columnWithValue.forEach((column, index) => {
      const item = stackLines[line].at(column);
      if (item !== ' ') {
        if (!stacks[index]) stacks[index] = [];
        stacks[index].push(item);
        if (!stacks2[index]) stacks2[index] = [];
        stacks2[index].push(item);
      }
    });
  }

  const movementLines = movementInfo.split('\n');
  movementLines.forEach(line => {
    const [items, from, to] = line.split(' ').filter(x => !isNaN(x)).map(x => Number(x));
    for (let itemMoved = 0; itemMoved < items; itemMoved++) {
      stacks[to - 1].push(stacks[from - 1].pop())
    }
    stacks2[to - 1].push(...stacks2[from - 1].splice(stacks2[from - 1].length - items, items));
  });

  console.log("Part 1: ", stacks.map(x => x.pop()).join(''));
  console.log("Part 2: ", stacks2.map(x => x.pop()).join(''));
};

export default main;
