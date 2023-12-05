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
  const data = fs.readFileSync('input.txt', 'utf-8');
  let sum = 0;
  const arr = data.split('\r\n');
  for (let i = 0; i < arr.length - 1; i += 1) {
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

const gearRationsPartOne = () => {
  const data = fs.readFileSync('input.txt', 'utf-8');
  let sum = 0;
  const arr = data.split('\r\n');
  let nums = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
  let numsSet = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'])
  let rowLen = arr[0].length;
  let columnLen = arr.length - 1;
  
  let symbols = [...Array(rowLen + 2)].map(e => Array(columnLen + 2).fill(false));
  
  arr.unshift('.'.repeat(arr[0].length + 2))
  for (let i = 1; i < arr.length - 1; i += 1) {
    arr[i] = '.' + arr[i] + '.';
  }
  arr[arr.length - 1] = '.'.repeat(arr[0].length);
  
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (!numsSet.has(arr[i][j])) {
        symbols[i][j] = true;
      }
    }
  }

  for (let i = 1; i < arr.length - 1; i++) {
    let num = '';
    
    hasSymbol = false;
    for (let j = 1; j < arr[i].length - 1; j++) {
      
      if ((symbols[i - 1][j - 1] || symbols[i - 1][j] || symbols[i - 1][j + 1] || symbols[i][j-1] || symbols[i][j + 1] || symbols[i + 1][j - 1] || symbols[i + 1][j] || symbols[i + 1][j + 1]) && nums.has(arr[i][j])) {
        hasSymbol = true;
      } 
      
      if (nums.has(arr[i][j])) {
        num += arr[i][j];
      } else {
        if (hasSymbol && num) {
          sum += Number(num)
        }
        num = '';
        hasSymbol = false;
      }
    }
    
    if (num && hasSymbol) {
      sum += Number(num)
    }
  }

  return sum;
}

const gearRationsPartTwo = () => {
  const data = fs.readFileSync('input.txt', 'utf-8');
  let sum = 0;
  const arr = data.split('\r\n');
  let nums = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
  let rowLen = arr[0].length;
  let columnLen = arr.length - 1;
  
  let symbols = [...Array(rowLen + 2)].map(e => Array(columnLen + 2).fill(false));
  
  arr.unshift('.'.repeat(arr[0].length + 2))
  for (let i = 1; i < arr.length - 1; i += 1) {
    arr[i] = '.' + arr[i] + '.';
  }
  arr[arr.length - 1] = '.'.repeat(arr[0].length);
  
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === '*') {
        symbols[i][j] = true;
      }
    }
  }
  
  let map = new Map();

  for (let i = 1; i < arr.length - 1; i++) {
    let num = '';
    let pattern = '';
    
    hasSymbol = false;
    for (let j = 1; j < arr[i].length - 1; j++) {
      
      if (nums.has(arr[i][j])) {
        if (symbols[i - 1][j - 1]) {
          hasSymbol = true;
          pattern = `${i - 1}${j - 1}`
        } else if (symbols[i - 1][j]) {
          hasSymbol = true;
          pattern = `${i - 1}${j}`
        } else if (symbols[i - 1][j + 1]) {
          hasSymbol = true;
          pattern = `${i - 1}${j + 1}`
        } else if (symbols[i][j - 1]) {
          hasSymbol = true;
          pattern = `${i}${j - 1}`
        } else if (symbols[i][j + 1]) {
          hasSymbol = true;
          pattern = `${i}${j + 1}`
        } else if (symbols[i + 1][j - 1]) {
          hasSymbol = true;
          pattern = `${i + 1}${j - 1}`
        } else if (symbols[i + 1][j]) {
          hasSymbol = true;
          pattern = `${i + 1}${j}`
        } else if (symbols[i + 1][j + 1]) {
          hasSymbol = true;
          pattern = `${i + 1}${j + 1}`
        }
      }
      
      if (nums.has(arr[i][j])) {
        num += arr[i][j];
      } else {
        if (hasSymbol && num) {
          map.set(pattern, map.get(pattern) ? map.get(pattern) + '+' + num : num)
        }
        num = '';
        hasSymbol = false;
      }
    }
    
    if (num && hasSymbol) {
      console.log('extra 0 ', num)
      map.set(pattern, map.get(pattern) ? map.get(pattern) + '+' + num : num)
    }
  }
  
  for (let [_, value] of Array.from(map)) {
    if (value.includes('+')) {
      let [first, second] = value.split('+');
      sum += (Number(first) * Number(second));
    }
  }

  return sum;
}

const scratchCardsPartOne = () => {
  const data = fs.readFileSync('case.text', 'utf-8');
  let sum = 0;
  const arr = data.split('\r\n');

  for (let i = 0; i < arr.length - 1; i++) {
    let [first, second] = arr[i].slice(arr[i].indexOf(': ') + 2).split(' | ');

    let numbersF = first.split(' ').filter(el => el !== '');
    let numbersS = second.split(' ').filter(el => el !== '');

    let map = new Map();
    for (let j = 0; j < numbersF.length; j++) {
      map.set(numbersF[j], map.get(numbersF[j]) + 1 || 1);
    }


    let counter = 0;
    for (let j = 0; j < numbersS.length; j++) {
      if (map.has(numbersS[j]) && map.get(numbersS[j])) {
        counter++;
        map.set(numbersS[j], map.get(numbersS[j]) - 1)
      }
    }

    console.log(counter);

    if (counter)
      sum += Math.pow(2, counter - 1);

  }

  return sum;
}

const scratchCardsPartTwo = () => {
  const data = fs.readFileSync('case.text', 'utf-8');
  let sum = 0;
  const arr = data.split('\r\n');

  let unique = new Map();

  for (let i = arr.length - 2; i >= 0; i--) {
    let [first, second] = arr[i].slice(arr[i].indexOf(': ') + 2).split(' | ');

    let numbersF = first.split(' ').filter(el => el !== '');
    let numbersS = second.split(' ').filter(el => el !== '');

    let map = new Map();
    for (let j = 0; j < numbersF.length; j++) {
      map.set(numbersF[j], map.get(numbersF[j]) + 1 || 1);
    }


    let counter = 0;
    for (let j = 0; j < numbersS.length; j++) {
      if (map.has(numbersS[j]) && map.get(numbersS[j])) {
        counter++;
        map.set(numbersS[j], map.get(numbersS[j]) - 1)
      }
    }

    let s = 1;
    for (let j = i + 1; j <= i + counter; j++) {
      s += unique.get(j);
    }

    sum += s;
    unique.set(i, s);

  }

  return sum;
}

const fertilizerPartOne = () => {
  const data = fs.readFileSync('case.text', 'utf-8');
  const arr = data.split('\r\n').filter(el => el);
  
  let res = [];
  let current = {};
  
  let seeds = arr[0].split(' ');
  let seedsObj = {};
  for (let i = 1; i < seeds.length; i++) {
    seedsObj[i] = seeds[i];
  }
  
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].includes(':')) {
      if (Object.entries(current).length) 
        res.push(current);
      current = {} 
    } else {
      let [first, second, len] = arr[i].split(' ').map(el => Number(el));
      let diff = second - first;
      for (let j = first; j < first + len; j++) {
        current[diff + j] = j;
      }
    }
  }
  
  for (let i = 0; i < res.length; i++) {
    for (let [key, value] of Object.entries(seedsObj)) {
      console.log(key, value, res[i][value]);
      seedsObj[key] = res[i][value] ? String(res[i][value]) : String(value);
    }
  }
  
  let min = Number.MAX_SAFE_INTEGER;
  
  for (let [key, value] of Object.entries(seedsObj)) {
    min = Math.min(min, Number(value));
  }

  return min;
}

console.log(fertilizerPartOne());
