const input = require('fs').readFileSync('day6_input.txt', 'ascii');
const _ = require('lodash');

const coords = input.trim()
    .split('\r')
    .map((log, index) => {
      const [x, y] = log.trim().split(', ').map(Number);

      return {x, y, index};
    });

const maxX = _.maxBy(coords, 'x').x + 1;
const maxY = _.maxBy(coords, 'y').y;

const map = [];
const infinites = new Set();

for (let yRunner = 0; yRunner <= maxY; ++yRunner) {
  let yRow = map[yRunner];

  if (!yRow) {
    yRow = map[yRunner] = [];
  }

  for (let xRunner = 0; xRunner <= maxX; ++xRunner) {
    let oldPosition = yRow[xRunner];

    if (!oldPosition) {
      oldPosition = yRow[xRunner] = {};
    }

    for (const {x, y, index} of coords) {
      const distance = Math.abs(x - xRunner) + Math.abs(y - yRunner);

      if (isNaN(oldPosition.distance) || oldPosition.distance > distance) {
        oldPosition.distance = distance;
        oldPosition.coordIndex = index;
        oldPosition.equallyFar = false;
      } else if (oldPosition.distance === distance) {
        oldPosition.equallyFar = true;
      }
    }
  }
}

// Print map
for (let yRunner = 0; yRunner <= maxY; ++yRunner) {
  const yRow = map[yRunner];
  const isInfiniteCoordX = yRunner === 0 || yRunner === maxY;
  let rowString = '';

  for (let xRunner = 0; xRunner <= maxX; ++xRunner) {
    const isInfiniteCoordY = xRunner === 0 || xRunner === maxX;

    const {coordIndex, equallyFar, distance} = yRow[xRunner];

    if (equallyFar) {
      rowString += '.'
    } else {
      if (distance === 0) {
        rowString += 'X';
      } else {
        rowString += `${coordIndex}`;
      }

      if (isInfiniteCoordX || isInfiniteCoordY) {
        infinites.add(coordIndex);
      }
    }
  }

  console.log(rowString);
}


const areas = {};

for (let yRunner = 0; yRunner <= maxY; ++yRunner) {
  const yRow = map[yRunner];

  for (let xRunner = 0; xRunner <= maxX; ++xRunner) {
    const pos = yRow[xRunner];
    const {coordIndex, equallyFar} = pos;

    if (!infinites.has(coordIndex) && !equallyFar) {
      areas[coordIndex] = (areas[coordIndex] || 0) + 1;
    }
  }
}

console.log(`RESULT: ${Math.max(...Object.values(areas))}`);
