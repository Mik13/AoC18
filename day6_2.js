const input = require('fs').readFileSync('day6_input.txt', 'ascii');
const _ = require('lodash');

const coords = input.trim()
    .split('\r')
    .map((log) => {
      const [x, y] = log.trim().split(', ').map(Number);

      return {x, y};
    });

const maxX = _.maxBy(coords, 'x').x + 1;
const maxY = _.maxBy(coords, 'y').y;

const map = [];

for (let yRunner = 0; yRunner <= maxY; ++yRunner) {
  let yRow = map[yRunner];

  if (!yRow) {
    yRow = map[yRunner] = [];
  }

  for (let xRunner = 0; xRunner <= maxX; ++xRunner) {
    let coord = yRow[xRunner];

    if (!coord) {
      coord = yRow[xRunner] = {};
    }

    for (const {x, y} of coords) {
      const distance = Math.abs(x - xRunner) + Math.abs(y - yRunner);

      coord.distance = (coord.distance || 0) + distance;
    }
  }
}

let regionCount = 0;

for (let yRunner = 0; yRunner <= maxY; ++yRunner) {
  const yRow = map[yRunner];

  for (let xRunner = 0; xRunner <= maxX; ++xRunner) {
    const coord = yRow[xRunner];

    if (coord.distance < 10000) {
      ++regionCount;
    }
  }
}

console.log(`RESULT: ${regionCount}`);
