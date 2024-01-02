import fs from "fs";
const input = fs.readFileSync("./inputs/05.txt", "utf-8");
// const input = `seeds: 79 14 55 13

// seed-to-soil map:
// 50 98 2
// 52 50 48

// soil-to-fertilizer map:
// 0 15 37
// 37 52 2
// 39 0 15

// fertilizer-to-water map:
// 49 53 8
// 0 11 42
// 42 0 7
// 57 7 4

// water-to-light map:
// 88 18 7
// 18 25 70

// light-to-temperature map:
// 45 77 23
// 81 45 19
// 68 64 13

// temperature-to-humidity map:
// 0 69 1
// 1 0 69

// humidity-to-location map:
// 60 56 37
// 56 93 4`;

const inputArray = input.split("\n\n");

const seeds = inputArray
  .shift()!
  .split(":")[1]
  .trim()
  .split(" ")
  .map((seed) => +seed);

// console.log({ seeds });

type Range = {
  source: number;
  destination: number;
  length: number;
};
const maps: { [key: string]: Range[] } = {};

inputArray.forEach((map) => {
  const lines = map.split("\n");
  const title = lines.shift()!.split(":")[0].split(" ")[0];
  const ranges = lines.map((range) => {
    const rangeArray = range.split(" ");
    return {
      source: +rangeArray[1],
      destination: +rangeArray[0],
      length: +rangeArray[2],
    };
  });
  maps[title] = ranges;
});

// console.log(maps);

const doMapping = (source: string, destination: string, value: number) => {
  const range = maps[source + "-to-" + destination].find(
    (range) => value >= range.source && value < range.source + range.length
  );
  if (!range) return value;
  //   console.log({ source, destination, value, range });
  return range.destination + value - range.source;
};

const mapSeeds = (seeds: number[]) => {
  return seeds.map((seed) => {
    const soil = doMapping("seed", "soil", seed);
    const fertilizer = doMapping("soil", "fertilizer", soil);
    const water = doMapping("fertilizer", "water", fertilizer);
    const light = doMapping("water", "light", water);
    const temperature = doMapping("light", "temperature", light);
    const humidity = doMapping("temperature", "humidity", temperature);
    const location = doMapping("humidity", "location", humidity);
    return location;
  });
};

const mapped = mapSeeds(seeds);

console.log({ first: Math.min(...mapped) });

//////////////////////////////////////////

// const seedRanges = seeds
//   .map((seed, index, array) => {
//     const next = array.splice(index + 1, 1);
//     return { start: seed, length: next[0] };
//   })
//   .filter(({ length }) => length);

// const newSeeds: number[] = [];

// const doRangeMapping = (
//   source: string,
//   destination: string,
//   seedRange: { start: number; length: number }
// ) => {
//   const range = maps[source + "-to-" + destination].find(
//     (range) =>
//       seedRange.start >= range.source && seedRange.start < range.source + range.length
//   );
//   if (!range) return seedRange;
//   //   console.log({ source, destination, value, range });
//   return range.destination + value - range.source;
// };

// seedRanges.forEach(({ start, length }) => {
//   for (let i = start; i < start + length; i++) {
//     newSeeds.push(i);
//   }
// });

// console.log({ newSeeds });
// console.log({ seedRanges });

// const mapped2 = mapSeeds(newSeeds);
// console.log({ second: Math.min(...mapped2) });
