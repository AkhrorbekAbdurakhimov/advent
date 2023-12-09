const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf-8');
const tmp = data.split(/\r?\n/).filter(el => el);
let dirs = tmp.shift().split('');


console.log(dirs, tmp);

let nodes = {}, currents = [];

tmp.forEach(line => {
    let arr = line.split(/ =|\(|\)|\,/g);
    nodes[arr[0]] = {L: arr[2], R: arr[3].trim()}
    if (arr[0][2] == 'A') currents.push(arr[0]);
})

const gcd = (a, b) => b == 0 ? a : gcd(b, a % b);
const lcm = (a, b) => a / gcd(a, b) * b;
const lcmAll = arr => arr.reduce(lcm, 1);

const getSteps = current => {
    let steps = 0;
    while (current[2] !== 'Z') {
        current = nodes[current][dirs[steps % dirs.length]];
        steps++;
    }
    return steps;
}

console.log(currents);

// console.log('p1', getSteps('AAA'));
console.log('p2', lcmAll(currents.map(getSteps)));