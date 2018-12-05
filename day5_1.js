const input = require('fs').readFileSync('day5_input.txt', 'ascii').trim().split('');
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

console.log(input.length);
