import { readFileSync } from 'fs';
import path from 'path';

const main = () => {
  const content = readFileSync(path.join(process.cwd(), './resources/input_04.txt'), { encoding: 'utf-8' });
  const elfPairs = content.split('\n');

  let counter = 0;
  let counter2 = 0;
  elfPairs.forEach(pair => {
    const [elf1, elf2] = pair.split(',');
    const [min1, max1] = elf1.split('-').map(x => Number(x));
    const [min2, max2] = elf2.split('-').map(x => Number(x));
    if ((min1 <= min2 && max1 >= max2) || (min2 <= min1 && max2 >= max1)) {
      counter++;
    }

    if (max1 < min2 || max2 < min1) {
      counter2++;
    }
  });

  console.log("Part 1: ", counter);
  console.log("Part 2: ", elfPairs.length - counter2);
};

export default main;
