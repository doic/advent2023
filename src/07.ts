import fs from "fs";
const input = fs.readFileSync("./inputs/07.txt", "utf-8");

// const input = `32T3K 765
// T55J5 684
// KK677 28
// KTJJT 220
// QQQJA 483`;

const cardValues = "23456789TJQKA".split("");

const getCardValue = (card: string, cardValues: string[]) => {
  return cardValues.indexOf(card);
};

const compareStrongerHand = (
  hand1: string,
  hand2: string,
  cardValues: string[]
) => {
  for (let i = 0; i < hand1.length; i++) {
    const card1 = hand1[i];
    const card2 = hand2[i];
    if (card1 === card2) continue;
    return getCardValue(card1, cardValues) > getCardValue(card2, cardValues)
      ? 1
      : -1;
  }
  return 0;
};

const getHandType = (handString: string, partTwo: boolean = false): number => {
  const handArray = handString.split("");
  const handSet = new Set(handArray);

  let jCards = 0;

  const handWeights = [...handSet]
    .map((card) => {
      // In part two, Jokers are not counted as cards
      if (card === "J" && partTwo) {
        jCards = handArray.filter((c) => c === card).length;
        return 0;
      }

      return handArray.filter((c) => c === card).length;
    })
    .filter((weight) => weight > 1);

  // 2 pairs or full house
  if (handWeights.length === 2) {
    // Full house: return directly
    if (handWeights.includes(3)) return 4;
    // 2 pairs: deal with Joker cards
    return jCards && partTwo ? 4 : 2;
  }
  // 5 of a kind: return directly
  if (handWeights.includes(5)) return 6;

  // 4 of a kind
  if (handWeights.includes(4)) return jCards && partTwo ? 6 : 5;

  // 3 of a kind
  if (handWeights.includes(3)) return jCards && partTwo ? jCards + 4 : 3;

  // 1 pair
  if (handWeights.length === 1) {
    if (partTwo && jCards === 1) return 3;
    if (partTwo && jCards > 1) return 3 + jCards;
    return 1;
  }

  // High card
  if (partTwo && jCards > 3) return 6;
  if (partTwo && jCards === 3) return 5;
  if (partTwo && jCards === 2) return 3;
  if (partTwo && jCards === 1) return 1;
  return 0;
};

const handsAndBids = input
  .split("\n")
  .filter((line) => line.length > 0)
  .map((line) => {
    const parts = line.split(" ");
    return { hand: parts[0], bid: +parts[1], type: getHandType(parts[0]) };
  });

const handsAndBidsSorted = handsAndBids.sort((a, b) => {
  if (a.type === b.type) return compareStrongerHand(a.hand, b.hand, cardValues);
  return +a.type - +b.type;
});

const first = handsAndBidsSorted.reduce(
  (acc, h, i) => acc + h.bid * (i + 1),
  0
);
console.log({
  first,
});

/////////////////////////////////////////////

const cardValues2 = "J23456789TQKA".split("");

const handsAndBids2 = input
  .split("\n")
  .filter((line) => line.length > 0)
  .map((line) => {
    const parts = line.split(" ");
    const type = getHandType(parts[0], true);
    return {
      hand: parts[0],
      bid: +parts[1],
      type,
    };
  });

const handsAndBidsSorted2 = handsAndBids2.sort((a, b) => {
  if (a.type === b.type)
    return compareStrongerHand(a.hand, b.hand, cardValues2);
  return +a.type - +b.type;
});

const second = handsAndBidsSorted2.reduce(
  (acc, h, i) => acc + h.bid * (i + 1),
  0
);

console.log({
  second,
});
