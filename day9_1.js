const PLAYERS = 411;
const MARBLES = 71058;

const _ = require('lodash');
const playerStat = new Array(PLAYERS).fill(0);
const circle = [];
let currentMarbleIdx = 0;

for (let currentMarble = 0; currentMarble <= MARBLES; ++currentMarble) {
  const currentPlayer = (currentMarble - 1) % PLAYERS;

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
