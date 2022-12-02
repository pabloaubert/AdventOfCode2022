import { readFileSync } from 'fs';
import path from 'path';

const rivalConversion = {
  A: "rock",
  B: "paper",
  C: "scissor"
};
const yourConversion = {
  X: "rock",
  Y: "paper",
  Z: "scissor"
};
const roundConversion = {
  X: "lose",
  Y: "draw",
  Z: "win"
}

const handScore = { rock: 1, paper: 2, scissor: 3 };
const roundScore = { win: 6, draw: 3, lose: 0 };
const decisionTree = {
  rock: { rock: "draw", paper: "win", scissor: "lose" },
  paper: { rock: "lose", paper: "draw", scissor: "win" },
  scissor: { rock: "win", paper: "lose", scissor: "draw" },
}

const main = () => {
  const content = readFileSync(path.join(process.cwd(), './resources/input_02.txt'), { encoding: 'utf-8' });
  const rounds = content.split('\n');
  let score_p1 = 0, score_p2 = 0;
  rounds.forEach(round => {
    const [rivalHand, yourHand] = round.split(' ');
    const rivalSign = rivalConversion[rivalHand];
    const yourSign = yourConversion[yourHand];
    score_p1 += handScore[yourSign];
    score_p1 += roundScore[decisionTree[rivalSign][yourSign]];

    const roundResult = yourHand;
    score_p2 += roundScore[roundConversion[roundResult]];
    let handToChose;
    for (let key in decisionTree[rivalSign]) {
      if (decisionTree[rivalSign][key] === roundConversion[roundResult]) {
        handToChose = key;
        break;
      }
    }
    score_p2 += handScore[handToChose];
  });

  console.log("Part 1: Total score following hand guide: ", score_p1);
  console.log("Part 2: Total score following win-draw-lose guide: ", score_p2);
};

export default main;
