const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf-8');
const arr = data.split(/\r?\n/);

let matrix = arr.map(el => el.split(''));
let result = [...new Array(matrix.length)].map(el => new Array(matrix[0].length).fill('.'))

const partOne = (startR = 0, startC = 0, direction = 'forward') => {

  let isContinue = false;

  if (direction === 'forward') {
    for (let i = startC; i < matrix.length; i++) {
      if (matrix[startR][i] === '.') {
        matrix[startR][i] = '#';
        result[startR][i] = '#';
      } else if (matrix[startR][i] === '-')
        continue;
      else if (matrix[startR][i] === '|' && !isContinue) {   
        result[startR][i] = '#';
        partOne(startR - 1, i, 'upward');
        partOne(startR + 1, i, 'downward');
        break;
      } else if (matrix[startR][i] === '/' && !isContinue) {  
        result[startR][i] = '#';
        partOne(startR - 1, i, 'upward');
        break;
      } else if (matrix[startR][i] === '\\' && !isContinue) {
        result[startR][i] = '#';
        partOne(startR + 1, i, 'downward');
        break;
      } else if (result[startR][i] === '#') {
        isContinue = true;
      }
    }
  }

  if (direction === 'backward') {
    for (let i = startC; i >= 0; i--) {
      if (matrix[startR][i] === '.') {
        matrix[startR][i] = '#';
        result[startR][i] = '#';
      } else if (matrix[startR][i] === '-')
        continue;
      else if (matrix[startR][i] === '|' && !isContinue) {
        result[startR][i] = '#';
        partOne(startR - 1, i, 'upward');
        partOne(startR + 1, i, 'downward');
        break;
      } else if (matrix[startR][i] === '/' && !isContinue) {
        result[startR][i] = '#';
        partOne(startR + 1, i, 'downward');
        break;
      } else if (matrix[startR][i] === '\\' && !isContinue) {
        result[startR][i] = '#';
        partOne(startR - 1, i, 'upward');
        break;
      } else if (result[startR][i] === '#') {
        isContinue = true;
      }
    }
  }

  if (direction === 'downward') {
    for (let i = startR; i < matrix[0].length; i++) {
      if (matrix[i][startC] === '.') {
        matrix[i][startC] = '#'
        result[i][startC] = '#'
      } else if (matrix[i][startC] === '|')
        continue
      else if (matrix[i][startC] === '-' && !isContinue) {
        result[i][startC] = '#'
        partOne(i, startC - 1, 'backward');
        partOne(i, startC + 1, 'forward');
        break;
      } else if (matrix[i][startC] === '/' && !isContinue) {
        result[i][startC] = '#'
        partOne(i, startC - 1, 'backward');
        break;
      } else if (matrix[i][startC] === '\\' && !isContinue) {
        result[i][startC] = '#'
        partOne(i, startC + 1, 'forward');
        break;
      } else if (result[i][startC] === '#') {
        isContinue = true;
      }
    }
  }

  if (direction === 'upward') {
    for (let i = startR; i >= 0; i--) {
      console.log(matrix[i][startC]);
      if (matrix[i][startC] === '.') {
        matrix[i][startC] = '#'
        result[i][startC] = '#'
      } else if (matrix[i][startC] === '|')
        continue;
      else if (matrix[i][startC] === '-' && !isContinue) {
        result[i][startC] = '#'
        partOne(i, startC - 1, 'backward');
        partOne(i, startC + 1, 'forward');
        break;
      } else if (matrix[i][startC] === '/' && !isContinue) {
        result[i][startC] = '#'
        partOne(i, startC + 1, 'forward');
        break;
      } else if (matrix[i][startC] === '\\' && !isContinue) {
        result[i][startC] = '#'
        partOne(i, startC - 1, 'backward');
        break;
      } else if (result[i][startC] === '#') {
        isContinue = true;
        break;
      }
    }
  }
}

partOne();

fs.writeFileSync('res.txt', result.map(el => el.join('')).join('\n'), 'utf-8')