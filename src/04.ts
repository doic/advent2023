import fs from "fs";
const input = fs.readFileSync("./inputs/04.txt", "utf-8");

const cardArray = input
  .split("\n")
  .filter((l) => l.length > 0)
  .map((line) => {
    const [cardTitle, numbers] = line.split(":");
    const cardNumber = +cardTitle.split(/ +/)[1];
    const [winningNumber, givenNumbers] = numbers.split("|");
    const winningArray = winningNumber
      .trim()
      .split(" ")
      .filter((n) => n !== "");
    const givenArray = givenNumbers
      .trim()
      .split(" ")
      .filter((n) => n !== "");

    const score = givenArray.filter((n) => winningArray.includes(n)).length;

    return { cardNumber, quantity: 1, winningArray, givenArray, score };
  });

const first = cardArray.reduce(
  (acc, card) => (card.score ? acc + 2 ** (card.score - 1) : acc),
  0
);

console.log({ first });

//////////////////////////////////////////

cardArray.forEach((card) => {
  if (card.score) {
    for (let i = 0; i < card.score; i++) {
      cardArray[card.cardNumber + i].quantity += card.quantity;
    }
  }
});

const second = cardArray.reduce((acc, card) => acc + card.quantity, 0);
console.log({ second });
