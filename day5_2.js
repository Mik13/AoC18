const _ = require('lodash');
const originalString = require('fs').readFileSync('day5_input.txt', 'ascii').trim();
const results = [];

for (let charCodeToRemove = 'A'.charCodeAt(0); charCodeToRemove <= 'Z'.charCodeAt(0); ++charCodeToRemove) {
  const charToRemove = String.fromCharCode(charCodeToRemove);
  const input = originalString.replace(new RegExp(`[${charToRemove}${charToRemove.toLowerCase()}]` ,'g'), '').split('');
  let changedSomething;

  do {
    changedSomething = false;
    for (let runner = 0; runner < input.length - 1; ++runner) {
      const charA = input[runner];
      const charB = input[runner + 1];
      const aUppercase = charA.toUpperCase();
      const aIsUppercase = aUppercase === charA;
      const bUppercase = charB.toUpperCase();
      const bIsUppercase = bUppercase === charB;

      if (aUppercase === bUppercase && aIsUppercase ^ bIsUppercase) { // Found suitable polymer (same type and different polarity)
        input.splice(runner, 2); // Remove them
        runner = Math.max(runner - 2, 0); // Go back one char (2 because runner will be incremented by loop)
        changedSomething = true;
      }
    }
  } while (changedSomething);

  results.push({char: charToRemove, count: input.length});
}

console.log(_.minBy(results, 'count').count);
