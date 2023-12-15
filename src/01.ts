import fs from "fs";
const input = fs.readFileSync("./inputs/01.txt", "utf-8");

const inputArray = input.split("\n");

const extractNumbers = (input: string) => input.replaceAll(/[^\d]/g, "");
const sumOfBoundaries = (input: string) =>
  input.length > 0 ? parseInt(input.at(0)! + input.at(-1)!) : 0;
const getCalibrationValues = (input: string[]) =>
  input
    .map(extractNumbers)
    .reduce((acc, curr) => sumOfBoundaries(curr) + acc, 0);

const first = getCalibrationValues(inputArray);
console.log({ first });

//////////////////////////////////////////

const replaceWordsWithNumbers = (input: string) => {
  const numberWords: { [key: string]: string } = {
    zero: "0",
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

  const matches: { word: string; position: number }[] = [];

  for (const word in numberWords) {
    const regex = new RegExp(word, "g");
    let match;
    while ((match = regex.exec(input)) !== null) {
      matches.push({ word, position: match.index });
    }
  }

  // Sort matches based on positions
  matches.sort((a, b) => a.position - b.position);

  // Reconstruct the new string
  let result = "",
    lastIndex = 0;

  for (const { word, position } of matches) {
    result += input.slice(lastIndex, position);
    result += numberWords[word];
    lastIndex = position + word.length;
  }

  // Append any remaining characters
  result += input.slice(lastIndex);

  return result;
};

const second = getCalibrationValues(inputArray.map(replaceWordsWithNumbers));
console.log({ second });
