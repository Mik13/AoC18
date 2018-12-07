const input = require('fs').readFileSync('day7_input.txt', 'ascii');
const FINDER = /Step (.) must be finished before step (.) can begin./;

const map = input.trim()
    .split('\r')
    .reduce((holder, step) => {
      const [from, to] = step.trim().match(FINDER).slice(1);

      if (!holder[from]) {
        holder[from] = {
          prev: [],
        };
      }

      if (!holder[to]) {
        holder[to] = {
          prev: [],
        };
      }

      holder[to].prev.push(from);

      return holder;
    }, {});

const length = Object.keys(map).length;
const ready = [];
let solution = '';

while (solution.length < length) {
  for (let [name, info] of Object.entries(map)) {
    const alreadyProcessed = solution.includes(name) || ready.includes(name);
    const isReady = info.prev.every((prevName) => solution.includes(prevName));

    if (!alreadyProcessed && isReady) {
      ready.push(name);
    }
  }

  ready.sort();

  solution += ready.shift();
}

console.log(solution);
