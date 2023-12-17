const fs = require('fs');

function north (matrix) {
  for (let j = 0; j < matrix[0].length; j++) {
    let counter = 0, start = 0;
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i][j] === 'O') {
        matrix[i][j] = '.';
        counter++
      }
      if (matrix[i][j] === '#') {
        let len = matrix[start][j] === '#' ? start + counter + 1 : start + counter;
        for (let k = matrix[start][j] === '#' ? start + 1 : start; k < len; k++)
          matrix[k][j] = 'O'
        start = i;
        counter = 0;
      }
    }

    if (counter) {
      let len = matrix[start][j] === '#' ? start + counter + 1 : start + counter;
      for (let k = matrix[start][j] === '#' ? start + 1 : start; k < len; k++)
        matrix[k][j] = 'O'
    }
  }

  return matrix;
}

function west (matrix) {
  for (let i = 0; i < matrix.length; i++) {
    let counter = 0, start = 0;
    for (let j = 0; j < matrix.length; j++) {
      if (matrix[i][j] === 'O') {
        matrix[i][j] = '.';
        counter++
      }
      if (matrix[i][j] === '#') {
        let len = matrix[i][start] === '#' ? start + counter + 1 : start + counter;
        for (let k = matrix[i][start] === '#' ? start + 1 : start; k < len; k++)
          matrix[i][k] = 'O'
        start = j;
        counter = 0;
      }
    }

    if (counter) {
      let len = matrix[i][start] === '#' ? start + counter + 1 : start + counter;
      for (let k = matrix[i][start] === '#' ? start + 1 : start; k < len; k++)
        matrix[i][k] = 'O'
    }
  }

  return matrix;
}

function south (matrix) {
  for (let j = 0; j < matrix[0].length; j++) {
    let counter = 0, start = 0;
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i][j] === 'O') {
        matrix[i][j] = '.';
        counter++
      }
      if (matrix[i][j] === '#') {
        for (let k = i - counter; k < i; k++)
          matrix[k][j] = 'O'
        start = i;
        counter = 0;
      }
    }

    if (counter) {
      for (let k = matrix[0].length - counter; k < matrix[0].length; k++)
        matrix[k][j] = 'O'
    }
  }

  return matrix;
}

function east (matrix) {
  for (let i = 0; i < matrix.length; i++) {
    let counter = 0, start = 0;
    for (let j = 0; j < matrix.length; j++) {
      if (matrix[i][j] === 'O') {
        matrix[i][j] = '.';
        counter++
      }
      if (matrix[i][j] === '#') {
        for (let k = j - counter; k < j; k++)
          matrix[i][k] = 'O'
        start = i;
        counter = 0;
      }
    }

    if (counter) {
      for (let k = matrix.length - counter; k < matrix.length; k++)
        matrix[i][k] = 'O'
    }
  }

  return matrix;
}

function sum (matrix) {
  let sum = 0, len = matrix.length;
  for (let row of matrix) {
    let counter = 0;
    for (let el of row) {
      if (el === 'O') 
        counter++
    }
    sum += len * counter;
    len--
  }
  return sum;
}

const partOne = () => {
  const data = fs.readFileSync('input.txt', 'utf-8');
  const arr = data.split(/\r?\n/);

  let matrix = []
  for (let row of arr) {
    matrix.push(row.split(''))
  }

  let directions = [north, west, south, east];

  let S = 0;
  let map = new Map();
  for (let i = 1; i < 500000; i++) {
    for (let direction of directions) {
      matrix = direction(matrix);
      S = sum(matrix);
    }
    map.set(S, map.get(S) ? map.get(S) + '-' + i : i);
  }

  let s = '';
  for (let [key, value] of map) {
    s += `\n # ${key}-${value} # \n`
  }

  fs.writeFileSync('res.txt', JSON.stringify(s));
}

partOne();