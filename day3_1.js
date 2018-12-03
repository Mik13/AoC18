const input = require('fs').readFileSync('day3_input.txt', 'ascii');

const fabric = {};
let result = 0;

for (const claim of input.trim().split('\r')) {
  const [claimId, _, pos, size] = claim.trim().split(' ');
  const [x, y] = pos.replace(':', '').split(',').map(Number);
  const [width, height] = size.split('x').map(Number);
  const xMax = width + x;
  const yMax = height + y;

  for (let xRunner = x; xRunner < xMax; ++xRunner) {
    for (let yRunner = y; yRunner < yMax; ++yRunner) {
      const posName = `${xRunner}_${yRunner}`;
      const posValue = fabric[posName];

      if (!posValue) {
        fabric[posName] = 1;
      } else if (posValue === 1) {
        fabric[posName] = 2;
        ++result;
      }
    }
  }
}

console.log(result);
