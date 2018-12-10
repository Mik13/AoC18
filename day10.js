const input = require('fs').readFileSync('day10_input.txt', 'ascii');
const PARSER = /position=<\s*(-?\d+),\s*(-?\d+)> velocity=<\s*(-?\d+),\s*(-?\d+)>/;

const points = input.trim()
    .split('\r')
    .map((step) => {
      const [, x, y, vX, vY] = step.trim().match(PARSER).map(Number);

      return {x, y, vX, vY};
    });

let seconds = 0;

while (true) {
  const map = {};
  let maxX = 0;
  let maxY = 0;

  for (const {x, y} of points) {
    if (!map[x]) {
      map[x] = {};
    }

    if (x > maxX) {
      maxX = x;
    }

    if (y > maxY) {
      maxY = y;
    }

    map[x][y] = true;
  }

  for (const {x, y} of points) {
    // Find I or T
    if ((map[x + 1] && map[x + 1][y]
        && map[x + 2] && map[x + 2][y]
        && map[x + 1] && map[x + 1][y + 1]
        && map[x + 1] && map[x + 1][y + 2]
        && map[x + 1] && map[x + 1][y + 3]
        && map[x + 1] && map[x + 1][y + 4]
        && map[x + 1] && map[x + 1][y + 5]
        && map[x + 1] && map[x + 1][y + 6])
        // Find H (middle line)
        || (map[x + 0] && map[x + 0][y + 3]
            && map[x + 1] && map[x + 1][y + 3]
            && map[x + 2] && map[x + 2][y + 3]
            && map[x + 3] && map[x + 3][y + 3]
            && map[x + 4] && map[x + 4][y + 3])
    ) {
      console.log(`Took ${seconds} seconds`);

      for (let yRunner = 0; yRunner <= maxY; ++yRunner) {
        let s = '';

        for (let xRunner = 0; xRunner <= maxX; ++xRunner) {
          if (map[xRunner] && map[xRunner][yRunner]) {
            s += '#'
          } else {
            s += '.';
          }
        }

        console.log(s);
      }

      process.exit(0);
    }
  }

  for (const point of points) {
    point.x += point.vX;
    point.y += point.vY;
  }

  ++seconds;
}
