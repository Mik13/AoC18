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
const processing = [];
const WORKERS = 5;
const TASK_MIN_DUR = 60;
const workerBlockedInfo = new Array(WORKERS).fill(null).map(() => ({}));
let solution = '';
let seconds = 0;

while (solution.length < length) {
  for (const blockedInfo of workerBlockedInfo) {
    if (blockedInfo.blocked > 0) {
      --blockedInfo.blocked;

      if (!blockedInfo.blocked) {
        if (blockedInfo.workingOn) {
          solution += blockedInfo.workingOn;
          processing.splice(processing.indexOf(blockedInfo.workingOn), 1);
          blockedInfo.workingOn = null;
        }
      }
    }
  }

  for (let [name, info] of Object.entries(map)) {
    const alreadyProcessed = solution.includes(name) || ready.includes(name) || processing.includes(name);
    const isReady = info.prev.every((prevName) => solution.includes(prevName));

    if (!alreadyProcessed && isReady) {
      ready.push(name);
    }
  }

  ready.sort();

  for (const blockedInfo of workerBlockedInfo) {
    if (!blockedInfo.blocked) {
      if (ready.length) {
        const work = ready.shift();

        blockedInfo.workingOn = work;
        blockedInfo.blocked = (blockedInfo.blocked || 0) + work.charCodeAt(0) - 64 + TASK_MIN_DUR;

        processing.push(work);
      }
    }
  }

  console.log(`${seconds} - ${workerBlockedInfo.map((info) => info.workingOn || '.').join('/')} - ${solution}`);

  ++seconds;
}

console.log(seconds - 1);
