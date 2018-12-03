const input = require('fs').readFileSync('day2_input.txt', 'ascii');

let three = 0;
let two = 0;

for (const boxId of input.trim().split('\r')) {
  const charCount = boxId.split('').reduce((holder, char) => (holder[char] = (holder[char] || 0) + 1) && holder, {});
  let twoFound = false;
  let threeFound = false;

  for (const [char, count] of Object.entries(charCount)) {
    if (!twoFound && count === 2) {
      ++two;
      twoFound = true;
    } else if (!threeFound && count === 3) {
      ++three;
      threeFound = true;
    }
  }
}

console.log(three * two);
