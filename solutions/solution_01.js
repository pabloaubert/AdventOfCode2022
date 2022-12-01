import { readFileSync } from 'fs';
import path from 'path';

const main = () => {
  const content = readFileSync(path.join(process.cwd(), './resources/input_01.txt'), { encoding: 'utf-8' });
  const elves = content.split('\n\n');
  const caloriesPerElf = elves.map(elf => {
    return elf.split('\n').reduce((prev, curr) => prev + Number(curr), 0)
  }).sort((a, b) => b - a);
  console.log("Part 1: Maximum calories carried by an elf: ", caloriesPerElf[0]);
  console.log("Part 2: Sum of 3 elves with the most calories: ", caloriesPerElf.slice(0, 3).reduce((a, b) => a + b, 0));
};

export default main;
