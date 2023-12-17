const fs = require('fs');

function isValid (text, arrangement) {
  let count = 0, start = [];
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '#') {
      count++
    } else if (count) {
      start.push(String(count));
      count = 0;
    }
  } 
  if (count) {
    start.push(String(count));
  }

  return arrangement === start.join(',');
}

function countOfArrangement (line) {
  let [encrypted, arrangement] = line.split(' ');
  let countQ = 0;
  for (let i = 0; i < encrypted.length; i++) {
    if (encrypted[i] === '?')   
      countQ++
  }
  let binaryCount = Math.pow(2, countQ), counter = 0;
  for (let i = 0; i < binaryCount; i++) {
    let binary = i.toString(2);
    binary = binary.length < countQ ? '0'.repeat(countQ - binary.length) + binary : binary;
    let changed = '', start = 0;
    for (let j = 0; j < encrypted.length; j++) {
      if (encrypted[j] === '?') {
        changed += binary[start] === '0' ? '#' : '.';
        start++
      } else {
        changed += encrypted[j];
      }
    }
    if (isValid(changed, arrangement)) {
      counter++
    }
  }
  return counter;
}

const partOne = () => {
  const data = fs.readFileSync('input.txt', 'utf-8');
  const arr = data.split(/\r?\n/).filter(el => el);

  let res = 0;
  for (let line of arr) {
    res += countOfArrangement(line);
  }

  console.log(res);
}

partOne();