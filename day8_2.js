const input = require('fs').readFileSync('day8_input.txt', 'ascii').trim().split(' ').map(Number);
const metaEntriesPerNodeAndChild = {};
let idx = 0;

function processNode () {
  const metaChildrenPerChild = metaEntriesPerNodeAndChild[idx] = [];

  const children = input[idx++];
  const metas = input[idx++];

  let metaEntriesThisNode = 0;

  if (children === 0) {
    for (let meta = 0; meta < metas; ++meta) {
      const metaEntry = input[idx++];

      metaEntriesThisNode += metaEntry || 0;
    }
  } else {
    for (let child = 0; child < children; ++child) {
      metaChildrenPerChild[child + 1] = processNode();
    }

    for (let meta = 0; meta < metas; ++meta) {
      const metaEntry = metaChildrenPerChild[input[idx++]];

      metaEntriesThisNode += metaEntry || 0;
    }
  }

  return metaEntriesThisNode;
}

console.log(`Result: ${processNode()}`);
