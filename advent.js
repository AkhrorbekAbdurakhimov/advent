/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const _ = require('lodash');
const Promise = require('bluebird');
const { log, dir } = require('console');

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

const hauntedWasteLandPartOne = async () => {
  const data = fs.readFileSync('input.txt', 'utf-8');
  const arr = data.split(/\r?\n/).filter(el => el);

  let directions = arr[0].split('');
  let values = arr.slice(1);
  
  let obj = {};
  for (let value of values) {
    let [first, second] = value.split(' = ');
    let [left, right] = second.split(', ');
    obj[`${first}->L`] = left.split('(')[1];
    obj[`${first}->R`] = right.split(')')[0];
  }
  
  let step = 0;
  let i = 0;
  let temp = 'AAA';
  while (temp[2] !== 'Z') {
    console.log(directions[step % directions.length]);
    temp = obj[`${temp}->${directions[step % directions.length]}`];
    step++
  }
  
  console.log(step);

}

const hauntedWasteLandPartTwo = async () => {
  const data = fs.readFileSync('input.txt', 'utf-8');
  const arr = data.split(/\r?\n/).filter(el => el);

  let directions = arr[0].split('');
  let values = arr.slice(1);
  
  let obj = {};
  for (let value of values) {
    let [first, second] = value.split(' = ');
    let [left, right] = second.split(', ');
    obj[`${first}->L`] = left.split('(')[1];
    obj[`${first}->R`] = right.split(')')[0];
  }
  
  let step = 0;
  let i = 0;
  let temp = 'AAA';
  while (temp[2] !== 'Z') {
    console.log(directions[step % directions.length]);
    temp = obj[`${temp}->${directions[step % directions.length]}`];
    step++
  }
  
  console.log(step);

}

let S = 0;

function predict (arr, sum = 0) {
  if (arr.every(el => el === 0)) {
    console.log(sum);
    S += sum;
    return sum;
  }

  let next = [];
  let temp = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    next.push(arr[i + 1] - arr[i])
    if (i === arr.length - 2) {
      temp = Number(arr[i + 1]);
    } 
  }

  predict(next, temp + sum);
}

function predictTwo (arr, extra = []) {
  if (arr.every(el => el === 0)) {
    let res = 0;
    for (let i = extra.length - 1; i >= 0; i--) {
      res = Number(extra[i]) - res;
    }
    S += res;
    console.log(res);
    return;
  }

  let next = [];
  for (let i = 0; i < arr.length - 1; i++) {
    next.push(arr[i + 1] - arr[i])
    if (i === 0) {
      extra.push(Number(arr[i]));
    } 
  }

  predictTwo(next, extra);
}

const miragePartOne = async () => {
  const data = fs.readFileSync('input.txt', 'utf-8');
  const arr = data.split(/\r?\n/).filter(el => el);

  for (let line of arr) {
    predict(line.split(' '))
  }
}

const miragePartTwo = async () => {
  const data = fs.readFileSync('input.txt', 'utf-8');
  const arr = data.split(/\r?\n/).filter(el => el);

  for (let line of arr) {
    predictTwo(line.split(' '))
  }
}

const cosmicExpansionPartOne = () => {
  const data = fs.readFileSync('input.txt', 'utf-8');
  const arr = data.split(/\r?\n/).filter(el => el);

  let tempArr = [];
  times = 2;

  for (let i = 0; i < arr.length; i++) {
    let hasUniverse = false;
    for (let j = 0; j < arr[0].length; j++) {
      if (arr[i][j] === '#') {
        hasUniverse = true;
        break;
      }
    }
    if (!hasUniverse) {
      for (let i = 0; i < times; i++) {
        tempArr.push(new Array(arr[0].length).fill('.'))
      }
    } else {
      tempArr.push(arr[i].split(''))
    }
  }

  let matrix = new Array(tempArr.length);
  for (let i = 0; i < tempArr.length; i++) {
    matrix[i] = tempArr[i].slice();
  }

  let counter = 0, temp = new Array(times - 1).fill('.');
  for (let j = 0; j < tempArr[0].length; j++) {
    let hasUniverse = false;
    for (let i = 0; i < tempArr.length; i++) {
      if (tempArr[i][j] === '#') {
        hasUniverse = true;
        break;
      }
    }
    if (!hasUniverse) {
      for (let i = 0; i < tempArr.length; i++) {
        matrix[i].splice(j + counter, 0, ...temp)
      }
      counter += (times - 1);
    }
  }

  let order = 1, map = {};
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === '#') {
        matrix[i][j] = order;
        map[order] = `${i}-${j}`
        order++
      }
    }
  }

  let sum = 0;
  for (let i = 1; i < order; i++) {
    for (let j = i + 1; j < order; j++) {
      let [x1, y1] = map[i].split('-');
      let [x2, y2] = map[j].split('-');
      sum += (Math.abs(x1 - x2) + Math.abs(y1 - y2))
    }
  }

  console.log(sum);

  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = matrix[i].join('');
  }

  fs.writeFileSync('res.text', matrix.join('\n'), 'utf-8');

  return sum;

}

const cosmicExpansionPartTwo = () => {
  const data = fs.readFileSync('input.txt', 'utf-8');
  const arr = data.split(/\r?\n/).filter(el => el);

  let matrix = [], x = [], y = [];
  const times = 2;

  for (let i = 0; i < arr.length; i++) {
    matrix.push(arr[i].split(''))
    let hasUniverse = false;
    for (let j = 0; j < arr[0].length; j++) {
      if (arr[i][j] === '#') {
        hasUniverse = true;
        break;
      }
    }
    if (!hasUniverse)
      x.push(i);
  }

  for (let j = 0; j < matrix[0].length; j++) {
    let hasUniverse = false;
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i][j] === '#') {
        hasUniverse = true;
        break;
      }
    }
    if (!hasUniverse) {
      y.push(j)
    }
  }

  let order = 1, map = {};
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === '#') {
        matrix[i][j] = order;
        map[order] = `${i}-${j}`
        order++
      }
    }
  }

  let sum = 0;
  for (let i = 1; i < order; i++) {
    for (let j = i + 1; j < order; j++) {
      let [x1, y1] = map[i].split('-');
      let [x2, y2] = map[j].split('-');
      let extraX = 0;
      let extraY = 0;

      let filteredX = x.filter(el => el > Number(y1) && el < Number(y2));
      let filteredY = y.filter(el => el > Number(x1) && el < Number(x2));

      console.log(x1, x2, x);
      console.log(y1, y2, y);
      sum += (Math.abs(x1 - x2) + Math.abs(y1 - y2));
    }
  }

  console.log(sum);

  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = matrix[i].join('');
  }

  fs.writeFileSync('res.text', matrix.join('\n'), 'utf-8');

  return sum;

}

cosmicExpansionPartTwo()
// let length = [];

// const look = (i, j, matrix, direction, len) => {
//   if (matrix[i][j] === '.') 
//     return;
  
//   length = len;
  
//   if (matrix[i][j] === '-' && direction === 'right')
//     look(i, j + 1, matrix, 'right', len + 1)
  
//   if (matrix[i][j] === '-' && direction === 'left')
//     look(i, j - 1, matrix, 'left', len + 1)
  
//   if (matrix[i][j] === '|' && direction === 'down')
//     look(i + 1, j, matrix, 'down', len + 1)
  
//   if (matrix[i][j] === '|' && direction === 'up')
//     look(i - 1, j, matrix, 'up', len + 1)
  
//   if (matrix[i][j] === 'L' && direction === 'down')
//     look(i, j + 1, matrix, 'right', len + 1)
  
//   if (matrix[i][j] === 'L' && direction === 'left')
//     look(i - 1, j, matrix, 'up', len + 1)
    
//   if (matrix[i][j] === 'J' && direction === 'right')
//     look(i - 1, j, matrix, 'up', len + 1)
  
//   if (matrix[i][j] === 'J' && direction === 'down')
//     look(i, j - 1, matrix, 'left', len + 1)
  
//   if (matrix[i][j] === '7' && direction === 'right')
//     look(i + 1, j, matrix, 'down', len + 1)
  
//   if (matrix[i][j] === '7' && direction === 'up')
//     look(i, j - 1, matrix, 'left', len + 1)
  
//   if (matrix[i][j] === 'F' && direction === 'up')
//     look(i, j + 1, matrix, 'right', len + 1)
  
//   if (matrix[i][j] === 'F' && direction === 'left')
//     look(i + 1, j, matrix, 'down', len + 1)
  
//   return;
// }

const pipeMazePartOne = () => {
  const data = fs.readFileSync('input.txt', 'utf-8');
  const arr = data.split(/\r?\n/).filter(el => el);
  
  let matrix = [];
  matrix.push(new Array(arr.length + 2).fill('.'));
  for (let line of arr) {
    let newArr = line.split('');
    newArr.push('.');
    newArr.unshift('.');
    matrix.push(newArr)
  }
  matrix.push(new Array(arr.length + 2).fill('.'));
  
  let startX = 0, startY = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 'S') {
        startX = i;
        startY = j;
      }
    }
  }
  
  let i = startX + 1;
  let j = startY;
  let direction = 'down';
  let len = 1;
  
  while (true) {
    if (matrix[i][j] === '-' && direction === 'right') {
      j++;
      direction = 'right';
      len++
    }
  
    if (matrix[i][j] === '-' && direction === 'left') {
      j--;
      direction = 'left';
      len++
    }
    
    if (matrix[i][j] === '|' && direction === 'down') {
      i++;
      direction = 'down';
      len++
    }
    
    if (matrix[i][j] === '|' && direction === 'up') {
      i--;
      direction = 'up';
      len++
    }
    
    if (matrix[i][j] === 'L' && direction === 'down') {
      j++;
      direction = 'right';
      len++
    }
    
    if (matrix[i][j] === 'L' && direction === 'left') {
      i--;
      direction = 'up';
      len++;
    }
      
    if (matrix[i][j] === 'J' && direction === 'right') {
      i--;
      direction = 'up';
      len++
    }
    
    if (matrix[i][j] === 'J' && direction === 'down') {
      j--;
      direction = 'left';
      len++;
    }
    
    if (matrix[i][j] === '7' && direction === 'right') {
      i++;
      direction = 'down';
      len++;
    }
    
    if (matrix[i][j] === '7' && direction === 'up') {
      j--;
      direction = 'left';
      len++;
    }
    
    if (matrix[i][j] === 'F' && direction === 'up') {
      j++;
      direction = 'right';
      len++
    }
    
    if (matrix[i][j] === 'F' && direction === 'left') {
      i++;
      direction = 'down'
      len++
    }
  }
  
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

const pipeMazePartTwo = () => {
  const data = fs.readFileSync('input.txt', 'utf-8');
  const arr = data.split(/\r?\n/).filter(el => el);
  
  let matrix = [];
  matrix.push(new Array(arr.length + 2).fill('.'));
  for (let line of arr) {
    let newArr = line.split('');
    newArr.push('.');
    newArr.unshift('.');
    matrix.push(newArr)
  }
  matrix.push(new Array(arr.length + 2).fill('.'));
  
  let newM = [...new Array(matrix.length)].map(el => new Array(matrix[0].length).fill('o'))
  
  let startX = 0, startY = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 'S') {
        startX = i;
        startY = j;
      }
    }
  }
  
  let i = startX + 1;
  let j = startY;
  let direction = 'down';
  let len = 1;
  
  while (true) {
    if (matrix[i][j] === 'S') {
      break;
    }
    
    
    if (matrix[i][j] === '-' && direction === 'right') {
      newM[i][j] = 'x'
      j++;
      direction = 'right';
      len++
    }
  
    if (matrix[i][j] === '-' && direction === 'left') {
      newM[i][j] = 'x'
      j--;
      direction = 'left';
      len++
    }
    
    if (matrix[i][j] === '|' && direction === 'down') {
      newM[i][j] = 'x'
      i++;
      direction = 'down';
      len++
    }
    
    if (matrix[i][j] === '|' && direction === 'up') {
      newM[i][j] = 'x'
      i--;
      direction = 'up';
      len++
    }
    
    if (matrix[i][j] === 'L' && direction === 'down') {
      newM[i][j] = 'x'
      j++;
      direction = 'right';
      len++
    }
    
    if (matrix[i][j] === 'L' && direction === 'left') {
      newM[i][j] = 'x'
      i--;
      direction = 'up';
      len++;
    }
      
    if (matrix[i][j] === 'J' && direction === 'right') {
      newM[i][j] = 'x'
      i--;
      direction = 'up';
      len++
    }
    
    if (matrix[i][j] === 'J' && direction === 'down') {
      newM[i][j] = 'x'
      j--;
      direction = 'left';
      len++;
    }
    
    if (matrix[i][j] === '7' && direction === 'right') {
      newM[i][j] = 'x'
      i++;
      direction = 'down';
      len++;
    }
    
    if (matrix[i][j] === '7' && direction === 'up') {
      newM[i][j] = 'x'
      j--;
      direction = 'left';
      len++;
    }
    
    if (matrix[i][j] === 'F' && direction === 'up') {
      newM[i][j] = 'x'
      j++;
      direction = 'right';
      len++
    }
    
    if (matrix[i][j] === 'F' && direction === 'left') {
      newM[i][j] = 'x'
      i++;
      direction = 'down'
      len++
    }    
  }
  
  console.log(newM);
  
  for (let j = 0; j < newM[0].length; j++) {
    let str = '';
    for (let i = 0; i < newM.length; i++) {
      str += newM[i][j];
    }
    
    for (let k = 1; k <= newM.length; k++) {
      let src = 'x' + 'o'.repeat(k) + 'x';
      let dest = 'x' + '1'.repeat(k) + 'x';
      if (str.includes(src)) {
        str = replaceAll(str, src, dest)
      }
    }
    
    for (let k = 0; k < str.length; k++) {
      newM[k][j] = str[k];
    }
  }
  
  
  for (let i = 0; i < newM[0].length; i++) {
    let str = '';
    for (let j = 0; j < newM.length; j++) {
      str += newM[i][j];
    }
    
    for (let k = 1; k <= newM[0].length; k++) {
      let src = 'x' + '1'.repeat(k) + 'x';
      let dest = 'x' + '2'.repeat(k) + 'x';
      if (str.includes(src)) {
        str = replaceAll(str, src, dest)
      }
    }
    
    for (let k = 0; k < str.length; k++) {
      newM[i][k] = str[k];
    }
  }
  
  let counter = 0;
  for (let i = 0; i < newM.length; i++) {
    for (let j = 0; j < newM[0].length; j++) {
      if (newM[i][j] === '2') {
        counter++;
      }
    }
  }
  console.log(counter);
}

pipeMazePartTwo()
