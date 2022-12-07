import { readFileSync } from 'fs';
import path from 'path';

const main = () => {
  const content = readFileSync(path.join(process.cwd(), './resources/input_06.txt'), { encoding: 'utf-8' });
  const contentArray = content.split('');
  console.log("length", contentArray.length)
  let startOfPacketIndex = 4;
  let startOfMessageIndex = 14;
  for (let index = 0; index < contentArray.length; index++) {
    if (new Set(contentArray.slice(index, index + 4)).size === 4) {
      startOfPacketIndex += index;
      break;
    }
  }
  for (let index = 0; index < contentArray.length; index++) {
    if (new Set(contentArray.slice(index, index + 14)).size === 14) {
      startOfMessageIndex += index;
      break;
    }
  }

  console.log("Part 1: ", startOfPacketIndex);
  console.log("Part 2: ", startOfMessageIndex);
};

export default main;
