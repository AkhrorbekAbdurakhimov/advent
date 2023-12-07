/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const _ = require('lodash');
const Promise = require('bluebird');

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
  const data = fs.readFileSync('input.txt', 'utf-8');
  const arr = data.split(/\r?\n/).filter(el => el);

  let seeds = arr[0].split(' ');
  let min = Number.POSITIVE_INFINITY;

  for (let j = 1; j < seeds.length; j++) {
    let current = Number(seeds[j]);
    let start = true;
    for (let i = 1; i < arr.length; i++) {
      if (!arr[i].includes(':')) {
        let [destination, source, range] = arr[i].split(' ').map(el => Number(el));
        if (start && current >= source && current < (source + range)) {
          current = current - source + destination;
          start = false;
        }
      } else if (arr[i].includes(':')) {
        start = true;
      }
    }
    min = Math.min(min, current);
  }

  return min;
}

function lookup (current, arr) {
  let start = true;
  for (let i = 1; i < arr.length; i++) {
    if (!arr[i].includes(':')) {
      let [destination, source, range] = arr[i].split(' ').map(el => Number(el));
      if (start && current >= source && current < (source + range)) {
        current = current - source + destination;
        start = false;
      }
    } else if (arr[i].includes(':')) {
      start = true;
    }
  }
  return current;
}

const fertilizerPartTwo = async () => {
  const data = fs.readFileSync('input.txt', 'utf-8');
  const arr = data.split(/\r?\n/).filter(el => el);

  let seeds = arr[0].split(' ');

  let min = Number.POSITIVE_INFINITY;

  for (let i = 1; i < seeds.length; i += 2) {
    let len = Number(seeds[i]) + Number(seeds[i + 1]);
    let res = [];
    for (let j = Number(seeds[i]); j < len; j++) {
      res.push(j)
    }
    let extra = _.chunk(res, 10000);
    await Promise.map(extra, async (x) => {
      await Promise.map(x, (j) => {
        let current = lookup(j, arr)
        min = Math.min(min, current);
      }, { concurrency: 10000 })
    }, { concurrency: 10000 })

  }

  return min;
}

const waitForItPartOne = async () => {
  const data = fs.readFileSync('case.text', 'utf-8');
  const arr = data.split(/\r?\n/).filter(el => el);

  let timeArr = arr[0].split(' ').filter(el => el).slice(1).map(el => Number(el));
  let distanceArr = arr[1].split(' ').filter(el => el).slice(1).map(el => Number(el));

  let product = 1;
  for (let i = 0; i < timeArr.length; i++) {
    let counter = 0;
    for (let j = 1; j < timeArr[i]; j++)
      if (j  * (timeArr[i] - j) > distanceArr[i]) 
        counter++

    product *= counter;
  }

  return product;
}

const waitForItPartTwo = async () => {
  const data = fs.readFileSync('case.text', 'utf-8');
  const arr = data.split(/\r?\n/).filter(el => el);

  let timeArr = Number(arr[0].split(':')[1].split(' ').filter(el => el).join(''));
  let distanceArr = Number(arr[1].split(':')[1].split(' ').filter(el => el).join(''));

  let counter = 0;
  for (let j = 1; j < timeArr; j++)
    if (j  * (timeArr - j) > distanceArr) 
      counter++

  return counter;
}

function getType (map) {
  let arr = Array.from(map);
  let counter = 0;
  let len = arr.length;
  for (let [card, occurance] of arr) {
    if (occurance === 5)
      return '1';
    if (occurance === 4)
      return '2';
    if ([2, 3].includes(occurance))
      counter++;
  }

  if (counter === 2 && len === 2)
    return '3';
  else if (counter === 1 && len === 3)
    return '4';
  else if (counter === 2 && len === 3)
    return '5';
  else if (counter === 1 && len === 4)
    return '6';
  else 
    return '7';
}

const camelCardsPartOne = async () => {
  const data = fs.readFileSync('input.txt', 'utf-8');
  const arr = data.split(/\r?\n/).filter(el => el);

  let cards = {'A': 10, 'K': 11, 'Q': 12, 'J': 13, 'T': 14, '9': 15, '8': 16, '7': 17, '6': 18, '5': 19, '4': 20, '3': 21, '2': 22}

  let winning = {};
  let extra = {};
  let res = [];
  
  for (let i = 0; i < arr.length; i++) {
    let [hand, odd] = arr[i].split(' ');
    let map = new Map();
    let w = '';
    for (let j = 0; j < hand.length; j++) {
      map.set(hand[j], map.get(hand[j]) + 1 || 1);
      w += cards[hand[j]]
    }
    winning[getType(map) + w] = odd;
    extra[getType(map) + w] = hand;
    res.push(getType(map) + w);
  }

  res.sort((a, b) => b - a);

  let sum = 0;
  for (let i = 0; i < res.length; i++) {
    console.log(extra[res[i]])
    sum += (i + 1) * Number(winning[res[i]])
  }
  console.log(sum);
  return sum;
}

const camelCardsPartTwo = async () => {
  const data = fs.readFileSync('input.txt', 'utf-8');
  const arr = data.split(/\r?\n/).filter(el => el);

  let cards = {'A': 10, 'K': 11, 'Q': 12, 'T': 14, '9': 15, '8': 16, '7': 17, '6': 18, '5': 19, '4': 20, '3': 21, '2': 22, 'J': 23}

  let winning = {};
  let res = [];
  
  for (let i = 0; i < arr.length; i++) {
    let [hand, odd] = arr[i].split(' ');
    let map = new Map();
    let w = '';
    for (let j = 0; j < hand.length; j++) {
      map.set(hand[j], map.get(hand[j]) + 1 || 1);
      w += cards[hand[j]]
    }
    let value = map.get('J') ? map.get('J') : 0;
    if (value) {
      map.delete('J');
      let max = 0, maxCharacter = 'A', extra = Array.from(map);
      for (let [card, occurance] of extra) {
        if (max < occurance) {
          max = occurance;
          maxCharacter = card;
        }
      }
      map.set(maxCharacter, map.get(maxCharacter) + value || value)
    }
    winning[getType(map) + w] = odd;
    res.push(getType(map) + w);
  }

  res.sort((a, b) => b - a);

  let sum = 0;
  for (let i = 0; i < res.length; i++) {
    sum += (i + 1) * Number(winning[res[i]])
  }

  return sum;
}