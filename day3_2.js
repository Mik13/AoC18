const input = require('fs').readFileSync('day3_input.txt', 'ascii');

const fabric = {};
const possibleSolution = {};

for (const claim of input.trim().split('\r')) {
  const [claimId, _, pos, size] = claim.trim().substring(1).split(' ');
  const [x, y] = pos.replace(':', '').split(',').map(Number);
  const [width, height] = size.split('x').map(Number);
  const xMax = width + x;
  const yMax = height + y;
  let overlapped = false;

  for (let xRunner = x; xRunner < xMax; ++xRunner) {
    for (let yRunner = y; yRunner < yMax; ++yRunner) {
      const posName = `${xRunner}_${yRunner}`;
      const posValue = fabric[posName];

      if (!posValue) {
        fabric[posName] = {claimId};
      } else if (posValue) {
        overlapped = true;
        delete possibleSolution[posValue.claimId];
      }
    }
  }

  if (!overlapped) {
    possibleSolution[claimId] = true;
  }
}

const keys = Object.keys(possibleSolution);

if (keys.length === 1) {
  console.log(keys[0]);
} else {
  console.error('oh no!');
}
