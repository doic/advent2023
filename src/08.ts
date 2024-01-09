import fs from "fs";
const input = fs.readFileSync("./inputs/08.txt", "utf-8");

// const input = `RL

// AAA = (BBB, CCC)
// BBB = (DDD, EEE)
// CCC = (ZZZ, GGG)
// DDD = (DDD, DDD)
// EEE = (EEE, EEE)
// GGG = (GGG, GGG)
// ZZZ = (ZZZ, ZZZ)`;

// const input = `LLR

// AAA = (BBB, BBB)
// BBB = (AAA, ZZZ)
// ZZZ = (ZZZ, ZZZ)`;

// const input = `LR

// 11A = (11B, XXX)
// 11B = (XXX, 11Z)
// 11Z = (11B, XXX)
// 22A = (22B, XXX)
// 22B = (22C, 22C)
// 22C = (22Z, 22Z)
// 22Z = (22B, 22B)
// XXX = (XXX, XXX)`;

const inputArray = input.split("\n\n");

const instructions = inputArray[0].split("");
const nodes = inputArray[1].split("\n").map((node) => {
  return node.replace(/\W+/g, " ").trim();
});

const startingNodes: string[] = [];

const nodesMap: { [key: string]: [string, string] } = {};
nodes.forEach((node) => {
  const [key, left, right] = node.split(" ");
  nodesMap[key] = [left, right];
  key.at(2) === "A" && startingNodes.push(key);
});

console.log({ instructions });
console.log({ nodesMap });

let steps = 0;
let currentNode = "AAA";

// for (let i = 0; true; i++) {
//   currentNode = nodesMap[currentNode][instructions[i] === "L" ? 0 : 1];
//   steps++;
//   console.log({ i, steps, instruction: instructions[i], currentNode });
//   if (currentNode === "ZZZ") break;
//   i === instructions.length - 1 && (i = -1);
// }

// console.log({
//   first: { steps, currentNode },
// });

/////////////////////////////////////////////

// TODO: solution involves lcm and following each path independently

steps = 0;
let currentNodes = startingNodes;
let nextNodes: string[] = [];

const done: { [key: string]: true } = {};

console.log({ currentNodes });

const start = new Date();

for (let i = 0; true; i++) {
  currentNodes.map((currentNode) => {
    nodesMap[currentNode][instructions[i] === "L" ? 0 : 1];
  });
  //   currentNodes.forEach((currentNode) => {
  //     nextNodes.push(nodesMap[currentNode][instructions[i] === "L" ? 0 : 1]);
  //   });
  //   currentNodes = nextNodes;
  //   nextNodes = [];
  steps++;
  if (steps % 10000000 === 0) console.log({ steps });

  //   console.log({ i, steps, instruction: instructions[i], currentNodes });

  // make sure we're not looping
  //   const key = currentNodes.join(",") + instructions[i];
  //   if (done[key]) throw new Error("loop after " + steps + " steps");
  //   done[key] = true;

  if (currentNodes.every((node) => node.at(2) === "Z")) break;

  if (steps % 100000000 === 0) break;
  i === instructions.length - 1 && (i = -1);
}

const end = new Date();
const diff = end.getTime() - start.getTime();

console.log({ diff });

console.log({ done });

console.log({
  second: { steps, currentNodes },
});
