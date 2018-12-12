const PLAYERS = 411;
const MARBLES = 71058 * 100;

const _ = require('lodash');
const playerStat = new Array(PLAYERS).fill(0);
const circle = [];
let currentMarbleIdx = 0;
let lastPercent = 0;

for (let currentMarble = 0; currentMarble <= MARBLES; ++currentMarble) {
  const currentPlayer = (currentMarble - 1) % PLAYERS;
  const percentDone = Math.floor(currentMarble * 100 / MARBLES);

  if (percentDone > lastPercent) {
    lastPercent = percentDone;

    console.log(`Did already ${percentDone}%`);
  }

  if (currentMarble && (currentMarble % 23) === 0) {
    playerStat[currentPlayer] += currentMarble;

    currentMarbleIdx = (currentMarbleIdx - 7 + circle.length) % circle.length;

    playerStat[currentPlayer] += circle.splice(currentMarbleIdx, 1)[0];
  } else {
    currentMarbleIdx = ((currentMarbleIdx + 2) % circle.length) || circle.length;

    circle.splice(currentMarbleIdx, 0, currentMarble);
  }
}

console.log(_.chain(playerStat).values().max().value());
