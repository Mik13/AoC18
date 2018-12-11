const input = require('fs').readFileSync('day8_input.txt', 'ascii').trim().split(' ').map(Number);
let metaEntries = 0;
let idx = 0;

function processNode () {
  const children = input[idx++];
  const metas = input[idx++];

  for (let child = 0; child < children; ++child) {
    processNode();
  }

  for (let meta = 0; meta < metas; ++meta) {
    metaEntries += input[idx++];
  }
}

processNode();

console.log(`Result: ${metaEntries}`);
