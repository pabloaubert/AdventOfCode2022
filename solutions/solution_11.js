class Monkey {
  constructor(items, operation, test, testTrue, testFalse) {
    this.items = items;
    this.operation = operation;
    this.test = test;
    this.testTrue = testTrue;
    this.testFalse = testFalse;
    this.inspections = 0;
    this.monkeys = [];
    this.worryReduction = v => Math.floor(v / 3);
  }

  meetMonkeys(monkeys) {
    this.monkeys = monkeys;
  }

  reduceWorry(isExtreme) {
    const modulo = this.monkeys.map(x => x.getTest()).reduce((prev, curr) => prev * curr, 1);
    if (isExtreme) this.worryReduction = v => v % modulo;
  }

  inspect() {
    this.items.forEach(item => {
      const worryLevel = this.worryReduction(this.operation(item));
      this.monkeys[worryLevel % this.test === 0 ? this.testTrue : this.testFalse].catchItem(worryLevel);
      this.inspections += 1;
    });
    this.items = [];
  }

  catchItem(item) {
    this.items.push(item);
  }

  getTest() {
    return this.test;
  }

  getInspections() {
    return this.inspections;
  }
}

const playSituation = (rounds = 20, extremeReduction = false) => {
  const monkeys = [
    // new Monkey([79, 98], v => v * 19, 23, 2, 3),
    // new Monkey([54, 65, 75, 74], v => v + 6, 19, 2, 0),
    // new Monkey([79, 60, 97], v => v * v, 13, 1, 3),
    // new Monkey([74], v => v + 3, 17, 0, 1),
    new Monkey([96, 60, 68, 91, 83, 57, 85], v => v * 2, 17, 2, 5),
    new Monkey([75, 78, 68, 81, 73, 99], v => v + 3, 13, 7, 4),
    new Monkey([69, 86, 67, 55, 96, 69, 94, 85], v => v + 6, 19, 6, 5),
    new Monkey([88, 75, 74, 98, 80], v => v + 5, 7, 7, 1),
    new Monkey([82], v => v + 8, 11, 0, 2),
    new Monkey([72, 92, 92], v => v * 5, 3, 6, 3),
    new Monkey([74, 61], v => v * v, 2, 3, 1),
    new Monkey([76, 86, 83, 55], v => v + 4, 5, 4, 0),
  ]
  monkeys.forEach(monkey => {
    monkey.meetMonkeys(monkeys);
    monkey.reduceWorry(extremeReduction);
  });

  while (rounds > 0) {
    monkeys.forEach(monkey => {
      monkey.inspect()
    });
    rounds--;
  }

  const totalInspections = monkeys.map(x => x.getInspections()).sort((a, b) => b - a);
  return totalInspections[0] * totalInspections[1];
}

const main = () => {
  console.log("Part 1: ", playSituation());
  console.log("Part 2: ", playSituation(10_000, true));
};

export default main;
