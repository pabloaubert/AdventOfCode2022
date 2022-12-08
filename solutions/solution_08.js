import { readFileSync } from 'fs';
import path from 'path';





const main = () => {
  const content = readFileSync(path.join(process.cwd(), './resources/input_08.txt'), { encoding: 'utf-8' });
  const grid = content.split('\n').map(row => row.split(''));
  
  const checkVisibility = (row, col) => {
    const treeHeight = Number(grid[row][col]);
    const gridRow = grid[row].map(x => Number(x));
    const gridColumn = grid.map(x => Number(x[col]));
    const isVisibleLeft = gridRow.slice(0, col).every(x => x < treeHeight);
    const isVisibleRight = gridRow.slice(col + 1).every(x => x < treeHeight);
    const isVisibleUp = gridColumn.slice(0, row).every(x => x < treeHeight);
    const isVisibleDown = gridColumn.slice(row + 1).every(x => x < treeHeight);
    return isVisibleLeft || isVisibleRight || isVisibleUp || isVisibleDown;
  }

  const calculateScenicScore = (row, col) => {
    const treeHeight = Number(grid[row][col]);
    const gridRow = grid[row].map(x => Number(x));
    const gridColumn = grid.map(x => Number(x[col]));
    const leftOfTree = gridRow.slice(0, col).reverse();
    const rightOfTree = gridRow.slice(col + 1);
    const upOfTree = gridColumn.slice(0, row).reverse();
    const downOfTree = gridColumn.slice(row + 1);
    let scenicScoreLeft = 0;
    let scenicScoreRight = 0;
    let scenicScoreUp = 0;
    let scenicScoreDown = 0;
    for (let i = 0; i < leftOfTree.length; i++) {
      scenicScoreLeft++;
      if (leftOfTree[i] >= treeHeight) break;
    }
    for (let i = 0; i < rightOfTree.length; i++) {
      scenicScoreRight++;
      if (rightOfTree[i] >= treeHeight) break;
    }
    for (let i = 0; i < upOfTree.length; i++) {
      scenicScoreUp++;
      if (upOfTree[i] >= treeHeight) break;
    }
    for (let i = 0; i < downOfTree.length; i++) {
      scenicScoreDown++;
      if (downOfTree[i] >= treeHeight) break;
    }
    return scenicScoreLeft * scenicScoreRight * scenicScoreUp * scenicScoreDown;
  }

  let visibleTrees = 0;
  let maxScenicScore = 0;
  grid.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (checkVisibility(rowIndex, colIndex)) visibleTrees++;
      const scenicScore = calculateScenicScore(rowIndex, colIndex)
      if (scenicScore > maxScenicScore) maxScenicScore = scenicScore;
    });
  });




  console.log("Part 1: ", visibleTrees);
  console.log("Part 2: ", maxScenicScore);
};

export default main;
