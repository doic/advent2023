import fs from "fs";
const input = fs.readFileSync("./inputs/06.txt", "utf-8");

// const input = `Time:      7  15   30
// Distance:  9  40  200`;

const extractValues = (line: string) => {
  return line
    .split(":")[1]
    .trim()
    .replace(/\s+/g, ",")
    .split(",")
    .map((x) => +x);
};

const [line1, line2] = input.split("\n");
const times = extractValues(line1);
const distances = extractValues(line2);

const solutions: number[] = [];
times.forEach((time, index) => {
  solutions[index] = 0;
  for (let t = 1; t < time; t++) {
    if (t * (time - t) > distances[index]) solutions[index]++;
  }
});

console.log({ first: solutions.reduce((a, b) => a * b, 1) });

/////////////////////////////////////////////

const extractValues2 = (line: string) => {
  return +line.split(":")[1].trim().replace(/\s+/g, "");
};

const time = extractValues2(line1);
const distance = extractValues2(line2);

let boundaries = [0, Math.ceil(time / 2)];
let length = boundaries[1] - boundaries[0];

while (length > 1.5) {
  let current = boundaries[0] + Math.ceil(length / 2);
  if (current * (time - current) <= distance) boundaries[0] = current;
  else boundaries[1] = current;
  length = boundaries[1] - boundaries[0];
}

const left = boundaries[1];

boundaries = [Math.floor(time / 2), time];
length = boundaries[1] - boundaries[0];

while (length > 1.5) {
  let current = boundaries[0] + Math.ceil(length / 2);
  if (current * (time - current) <= distance) boundaries[1] = current;
  else boundaries[0] = current;
  length = boundaries[1] - boundaries[0];
}

const right = boundaries[0];

console.log({ second: right - left + 1 });
