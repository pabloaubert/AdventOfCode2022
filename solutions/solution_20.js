import { readFileSync } from 'fs';
import path from 'path';

const main = () => {
  const content = readFileSync(path.join(process.cwd(), './resources/input_20.txt'), { encoding: 'utf-8' });

  console.log("Part 1: ", );
  console.log("Part 2: ", );
};

export default main;
