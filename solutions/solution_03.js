import { readFileSync } from 'fs';
import path from 'path';

const PRIORITIES = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const main = () => {
  const content = readFileSync(path.join(process.cwd(), './resources/input_03.txt'), { encoding: 'utf-8' });
  const rucksacks = content.split('\n');

  const repeatedItems = rucksacks.map(rucksack => {
    const length = rucksack.length;
    const compartment1 = rucksack.substring(0, length / 2).split('');
    const compartment2 = rucksack.substring(length / 2).split('');
    for (let item of compartment1) {
      if (compartment2.find(x => x === item)) {
        return item;
      }
    }
  });

  const priorities = repeatedItems.map(item => PRIORITIES.indexOf(item) + 1);

  const totalPriority = priorities.reduce((prev, curr) => prev + curr, 0);
  console.log("Part 1: ", totalPriority);


  let groupPriority = 0;
  for (let group = 0; group < rucksacks.length / 3; group++) {
    const groupElf1 = rucksacks[group * 3].split('');
    const groupElf2 = rucksacks[(group * 3) + 1].split('');
    const groupElf3 = rucksacks[(group * 3) + 2].split('');
    
    const commonItemsElf1And2 = [];
    groupElf1.forEach(item => {
      if (groupElf2.includes(item)) commonItemsElf1And2.push(item);
    });
    for (let item of commonItemsElf1And2) {
      if (groupElf3.includes(item)) {
        groupPriority += (PRIORITIES.indexOf(item) + 1);
        break;
      }
    }
  }



  console.log("Part 2: ", groupPriority);
};

export default main;
