const input = require('fs').readFileSync('day1_input.txt', 'ascii');

const list = input.trim()
    .split('\r')
    .map((line) => Number(line.trim()));

const seen = [];
let result = null;
let curFreq = 0;

while (!result) {
  for (let runner = 0; runner < list.length && !result; ++runner) {
    curFreq += list[runner];

    if (seen.includes(curFreq)) {
      result = curFreq;
    } else {
      seen.push(curFreq);
    }
  }
}

console.log(result);
