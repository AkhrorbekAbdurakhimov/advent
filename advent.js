/* eslint-disable no-restricted-syntax */
const fs = require('fs');

const trebuchetPartOne = () => {
  const data = fs.readFileSync('case.text', 'utf-8');
  let sum = 0;
  const arr = data.split('\r\n');
  for (let i = 0; i < arr.length - 1; i += 1) {
    let first = null;
    let last = null;
    let isFirst = true;
    for (const character of arr[i]) {
      if (!Number.isNaN(Number(character)) && isFirst) {
        first = character;
        isFirst = false;
      }
      if (!Number.isNaN(Number(character))) { last = character; }
    }
    sum += Number(`${first}${last}`);
  }

  return sum;
};

const trebuchetPartTwo = () => {
  const data = fs.readFileSync('case.text', 'utf-8');
  let sum = 0;
  const digits = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
  };
  const digitsArr = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const arr = data.split('\r\n');
  for (let i = 0; i < arr.length - 1; i += 1) {
    let isFirst = true;

    const filtered = digitsArr.filter((number) => arr[i].includes(number));

    let firstIndex = arr[i].indexOf(filtered[0]);
    let lastIndex = arr[i].indexOf(filtered[0]);
    let first = digits[filtered[0]];
    let last = digits[filtered[0]];

    for (let j = 0; j < filtered.length; j += 1) {
      const inner1 = arr[i].indexOf(filtered[j]);
      const inner2 = arr[i].lastIndexOf(filtered[j]);

      if (firstIndex > inner1) {
        firstIndex = inner1;
        first = digits[filtered[j]];
      }
      if (lastIndex < inner2) {
        lastIndex = inner2;
        last = digits[filtered[j]];
      }
    }

    for (let j = 0; j < arr[i].length; j += 1) {
      if (!Number.isNaN(Number(arr[i][j])) && isFirst) {
        if (firstIndex === -1 || firstIndex > j) {
          first = arr[i][j];
        }
        isFirst = false;
      }
      if (!Number.isNaN(Number(arr[i][j])) && j > lastIndex) {
        last = arr[i][j];
      }
    }

    sum += Number(`${first}${last}`);
  }

  return sum;
};

const cubePartOne = () => {
  const data = fs.readFileSync('case.text', 'utf-8');
  let sum = 0;
  const obj = {
    red: 12,
    green: 13,
    blue: 14,
  };
  const arr = data.split('\r\n');
  for (let i = 0; i < arr.length - 1; i += 1) {
    const gameIndex = arr[i].slice(0, arr[i].indexOf(': ')).split('Game ')[1];
    let succes = true;
    for (const partition of arr[i].slice(arr[i].indexOf(': ') + 2).split('; ')) {
      for (const ballon of partition.split(', ')) {
        const [count, type] = ballon.split(' ');
        if (Number(count) > obj[type]) {
          succes = false;
        }
      }
    }
    if (succes) {
      sum += Number(gameIndex);
    }
  }

  return sum;
};

const cubePartTwo = () => {
  const data = fs.readFileSync('case.text', 'utf-8');
  let sum = 0;
  const arr = data.split('\r\n');
  for (let i = 0; i < arr.length - 1; i += 1) {
    // let succes = true;
    const obj = {
      red: 0, green: 0, blue: 0,
    };
    for (const partition of arr[i].slice(arr[i].indexOf(': ') + 2).split('; ')) {
      for (const ballon of partition.split(', ')) {
        const [count, type] = ballon.split(' ');
        if (Number(count) > obj[type]) {
          obj[type] = Number(count);
        }
      }
    }
    sum += obj.red * obj.green * obj.blue;
  }

  return sum;
};

// console.log(cubePartTwo());
