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

for (let x = 0; x < MAX_LENGTH - 2; ++x) {
  for (let y = 0; y < MAX_LENGTH - 2; ++y) {
    const powerCell = map[x][y] +
        map[x][y + 1] +
        map[x][y + 2] +
        map[x + 1][y] +
        map[x + 1][y + 1] +
        map[x + 1][y + 2] +
        map[x + 2][y] +
        map[x + 2][y + 1] +
        map[x + 2][y + 2];

    if (powerCell > maxPower) {
      maxPower = powerCell;
      maxPowerX = x;
      maxPowerY = y;
    }
  }
}

console.log(`Result: ${maxPowerX + 1},${maxPowerY + 1}`);
