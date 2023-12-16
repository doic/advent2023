import fs from "fs";
const input = fs.readFileSync("./inputs/03.txt", "utf-8");
const inputArray = input.split("\n");

const regex = /(\d+)/g;

type Match = {
  value: string;
  position: number;
  rowIndex: number;
  around?: string;
};

const getAround = (match: Match) => {
  const length = match.value.length;
  const above =
    match.rowIndex > 0
      ? inputArray[match.rowIndex - 1].slice(
          match.position > 0 ? match.position - 1 : 0,
          match.position + length + 1
        )
      : "";
  const beside =
    (match.position > 0
      ? inputArray[match.rowIndex].slice(match.position - 1, match.position)
      : "") +
    inputArray[match.rowIndex].slice(
      match.position + length,
      match.position + length + 1
    );
  const below =
    match.rowIndex < inputArray.length - 1
      ? inputArray[match.rowIndex + 1].slice(
          match.position > 0 ? match.position - 1 : 0,
          match.position + length + 1
        )
      : "";
  return above + beside + below;
};

let total = 0;
inputArray.forEach((row, rowIndex) => {
  let match;
  while ((match = regex.exec(row)) !== null) {
    const partialMatch = { value: match[0], position: match.index, rowIndex };
    const isPartNumber = getAround(partialMatch).replaceAll(".", "").length > 0;
    if (isPartNumber) total += +match[0];
  }
});

console.log({ first: total });

////////////////////////////////////////////////////////////////

type StarMatch = {
  position: number;
  rowIndex: number;
};

const isTouching = (star: number, range: [number, number]) =>
  star + 1 >= range[0] && star <= range[1];

const getAroundStar = (s: StarMatch) => {
  const p = [];
  const r = /\d+/g;
  if (s.rowIndex > 0) {
    let match;
    while ((match = r.exec(inputArray[s.rowIndex - 1])) !== null) {
      if (isTouching(s.position, [match.index, r.lastIndex])) p.push(match[0]);
    }
  }
  let match;
  while ((match = r.exec(inputArray[s.rowIndex])) !== null) {
    if (isTouching(s.position, [match.index, r.lastIndex])) p.push(match[0]);
  }
  if (s.rowIndex < inputArray.length - 1) {
    let match;
    while ((match = r.exec(inputArray[s.rowIndex + 1])) !== null) {
      if (isTouching(s.position, [match.index, r.lastIndex])) p.push(match[0]);
    }
  }
  return p;
};

const star = /\*/g;
let power = 0;
inputArray.forEach((row, rowIndex) => {
  let match;
  while ((match = star.exec(row)) !== null) {
    const around = getAroundStar({ position: match.index, rowIndex });
    if (around.length === 2) power += +around[0] * +around[1];
  }
});

console.log({ second: power });
