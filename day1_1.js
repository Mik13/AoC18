const input = require('fs').readFileSync('day1_input.txt', 'ascii');

const result = input.trim()
    .split('\r')
    .reduce((prev, next) => prev + Number(next.trim()), 0);

console.log(result);
