import { readFileSync } from 'fs';
import path from 'path';


const calculateSignalStrength = (data, points) => {
  let result = 0;
  points.forEach(point => {
    result += point * data[point - 1];
  });
  return result;
}


const main = () => {
  const content = readFileSync(path.join(process.cwd(), './resources/input_10.txt'), { encoding: 'utf-8' });
  const instructions = content.split('\n');

  const histogram = [1];
  
  instructions.forEach(inst => {
    const [command, value] = inst.split(' ');

    histogram.push(histogram.at(-1));
    if (command === "addx") {
      histogram.push(histogram.at(-1) + Number(value));
    }
  });
  
  const render = [];
  histogram.forEach((pos, index) => {
    const indexInRow = index % 40;
    const isSprite = indexInRow === pos || indexInRow === pos - 1 || indexInRow === pos + 1;
    render.push(isSprite? '#' : '.');
  });
  
  const str = render.join('');
  const lines = str.match(/.{1,40}/g) ?? [];
  
  console.log("Part 1: ", calculateSignalStrength(histogram, [20, 60, 100, 140, 180, 220]));
  console.log("Part 2: \n")
  console.log(lines.join('\n'));
};

export default main;
