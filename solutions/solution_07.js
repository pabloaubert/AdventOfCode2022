import { readFileSync } from 'fs';
import path from 'path';


const TOTAL_DISK_SPACE = 70_000_000;
const UPDATE_SIZE = 30_000_000;


const getNode = (tree, path) => {
  let branch = tree;
  for (let i = 0; i < path.length; i++) {
    branch = branch.children? branch.children[path[i]] : branch[path[i]];
  }
  return branch;
}

const addSize = (tree, path, size) => {
  let pathCopy = JSON.parse(JSON.stringify(path));
  for (let i = 0; i < path.length; i++) {
    const node = getNode(tree, pathCopy);
    node.size += size;
    pathCopy.pop();
  }
}

const getSum = (tree, allNodes) => {
  allNodes.push(tree);
  if (tree.children) {
    Object.values(tree.children).forEach(branch => {
      getSum(branch, allNodes);
    });
  }
}


const main = () => {
  const content = readFileSync(path.join(process.cwd(), './resources/input_07.txt'), { encoding: 'utf-8' });
  const lines = content.split('\n');

  const nodes = {
    '/': {
      name: '/',
      type: 'dir',
      size: 0,
      children: {}
    }
  };
  const pointer = [];

  lines.forEach(line => {
    const parts = line.split(' ');
    // Instruction
    if (parts[0] === "$") {
      // Move directory
      if (parts[1] === "cd") {
        if (parts[2] === "..") {
          pointer.pop();
        } else {
          pointer.push(parts[2])
        }
      }
    }
    // Directory
    else {
      if (parts[0] === "dir") {
        const currentNode = getNode(nodes, pointer);
        currentNode.children[parts[1]] = {
          name: parts[1],
          type: "dir",
          size: 0,
          children: {}
        };
      }
      // File
      else {
        const currentNode = getNode(nodes, pointer);
        currentNode.children[parts[1]] = {
          name: parts[1],
          type: "file",
          size: Number(parts[0])
        }
        addSize(nodes, pointer, Number(parts[0]));
      }
    }
  });

  const allNodes = [];
  getSum(nodes['/'], allNodes);
  const sumOfSmallDirectories = allNodes.filter(x => x.type === "dir" && x.size <= 100_000).reduce((prev, curr) => prev + curr.size, 0);

  console.log("Part 1: ", sumOfSmallDirectories);

  const currentSpace = TOTAL_DISK_SPACE - allNodes.find(x => x.name === '/').size;
  const minFileSizeToDelete = UPDATE_SIZE - currentSpace;
  const orderedNodes = allNodes.filter(x => x.type === "dir").sort((a, b) => a.size - b.size);

  let directorySizeToDelete = 0;
  for (const dir of orderedNodes) {
    if (dir.size >= minFileSizeToDelete) {
      directorySizeToDelete = dir.size;
      break;
    }
  }

  console.log("Part 2: ", directorySizeToDelete);
};

export default main;
