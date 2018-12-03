const input = require('fs').readFileSync('day2_input.txt', 'ascii');

const boxes = input.trim().split('\r').map((box) => box.trim()).sort();

mainLoop:
for (let i = 0; i < boxes.length - 1; i++) {
  const fullBox = boxes[i];
  const boxA = fullBox.split('');
  const boxB = boxes[i + 1].split('');
  let diff = 0;

  for (let charRunner = 0; charRunner < boxA.length; ++charRunner) {
    if (boxA[charRunner] !== boxB[charRunner]) {
      if (diff) {
        continue mainLoop;
      }

      diff = charRunner;
    }
  }

  console.log(fullBox.substring(0, diff) + fullBox.substring(diff + 1));
  break;
}
