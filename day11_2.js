const SERIAL_NUMBER = 9424;
const MAX_LENGTH = 300;

const map = [];

for (let x = 1; x <= MAX_LENGTH; ++x) {
  const rackId = x + 10;
  const currentLine = [];

  map.push(currentLine);

  for (let y = 1; y <= MAX_LENGTH; ++y) {
    currentLine.push((Math.floor((rackId * y + SERIAL_NUMBER) * rackId / 100) % 10) - 5);
  }
}

let maxPower = 0;
let maxPowerX = 0;
let maxPowerY = 0;
let maxSize = 0;

for (let size = 1; size < 50; ++size) {
  for (let x = 0; x < MAX_LENGTH - size + 1; ++x) {
    for (let y = 0; y < MAX_LENGTH - size + 1; ++y) {
      let powerCell = 0;

      for (let xRunner = 0; xRunner < size; ++xRunner) {
        for (let yRunner = 0; yRunner < size; ++yRunner) {
          powerCell += map[x + xRunner][y + yRunner];
        }
      }

      if (powerCell > maxPower) {
        maxPower = powerCell;
        maxPowerX = x;
        maxPowerY = y;
        maxSize = size;
      }
    }
  }
}

console.log(`Result: ${maxPowerX + 1},${maxPowerY + 1},${maxSize}`);
