import fs from "fs";
const input = fs.readFileSync("./inputs/02.txt", "utf-8");

const bag = { r: 12, g: 13, b: 14 };
const extractColors = (arr: string[], color: string) =>
  arr.find((el) => el.includes(color))?.split(" ")[0] || "0";

const isValid = (set: SetObject) =>
  set.r > bag.r || set.g > bag.g || set.b > bag.b;

const games: { [key: string]: SetObject[] } = {};
type SetObject = {
  r: number;
  g: number;
  b: number;
};

input.split("\n").forEach((line) => {
  if (line.length === 0) return;
  const [game, results] = line.split(":");
  const id = game.split(" ")[1];
  games[id] = [];

  const subsets = results.split(";"); // " 11 red, 3 blue, 11 green"

  for (const subset of subsets) {
    // 11 red
    let set: SetObject = { r: 0, g: 0, b: 0 };
    const colors = subset.split(",").map((el) => el.trim());
    set["r"] = +extractColors(colors, "red");
    set["g"] = +extractColors(colors, "green");
    set["b"] = +extractColors(colors, "blue");
    games[id].push(set);
  }
});

let goodGames = 0;
loop_games: for (const [id, game] of Object.entries(games)) {
  for (const set of game) {
    if (isValid(set)) continue loop_games;
  }
  goodGames += +id;
}

console.log({ first: goodGames });

////////////////////////////////

const getMinimumBag = (game: SetObject[]) => {
  const minimumBag = { r: 0, g: 0, b: 0 };
  for (const set of game) {
    if (set.r > minimumBag.r) minimumBag.r = set.r;
    if (set.g > minimumBag.g) minimumBag.g = set.g;
    if (set.b > minimumBag.b) minimumBag.b = set.b;
  }
  return minimumBag;
};

let power = 0;
for (const [id, game] of Object.entries(games)) {
  const { r, g, b } = getMinimumBag(game);
  power += r * g * b;
}

console.log({ second: power });
