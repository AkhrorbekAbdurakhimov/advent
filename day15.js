const fs = require('fs');

function encode (str) {
  let holder = 0;
  for (let character of str)
    holder = ((holder + character.charCodeAt(0)) * 17) % 256;

  return holder;
}

const partOne = () => {
  const data = fs.readFileSync('input.txt', 'utf-8');
  const arr = data.split(',');

  let sum = 0;
  for (let str of arr) {
    sum += encode(str);
  }

  console.log(sum);
  return sum;
}

function partTwo (str) {
  const data = fs.readFileSync('input.txt', 'utf-8');
  const arr = data.split(',');

  let boxes = new Array(256).fill(null).map(() => new Map());

  for (let str of arr) {
    const [label, focal] = str.split(/[=-]/)
    let hash = label.split('').reduce((acc, curr) => ((acc + curr.charCodeAt(0)) * 17) % 256, 0)

    const box = boxes[hash];

    if (str.includes('-')) 
      box.delete(label)
    else 
      box.set(label, Number(focal))
  }

  let sum = 0;

  for (let i = 0; i < boxes.length; i++) {
    let counter = 0;
    for (let [_, value] of boxes[i]) {
      counter++;
      let product = (i + 1) * counter * value;
      sum += product;
    }
  }

  console.log(sum);

  return sum;
}

partOne();
partTwo();