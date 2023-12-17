const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf-8');
const arr = data.split(/\r?\n/);

let matrix = arr.map(el => el.split(''));
let result = [...new Array(matrix.length)].map(el => new Array(matrix[0].length).fill('.'))

const partOne = (startR = 0, startC = 0, direction = 'forward') => {
  
  if (matrix[startR][startC] === '.') {
    result[startR][startC] = '#';
    switch (direction) {
      case 'upward': partOne(startR - 1, startC, 'upward'); break;
      case 'downward': partOne(startR + 1, startC, 'downward'); break;
      case 'forward': partOne(startR, startC + 1, 'forward'); break;
      case 'backward': partOne(startR, startC - 1, 'backward'); break;
    }
  }

  // if (startR >= 0 && startR < matrix.length && startC >= 0 && startC < matrix[0].length) {
  //   if (direction === 'forward') {
  //     for (let i = startC; i < matrix.length; i++) {
  //       if (matrix[startR][i] === '.') {
  //         result[startR][i] = '#';
  //       } else if (matrix[startR][i] === '-')
  //         continue;
  //       else if (matrix[startR][i] === '|') {   
  //         result[startR][i] = '#';
  //         partOne(startR - 1, i, 'upward');
  //         partOne(startR + 1, i, 'downward');
  //         break;
  //       } else if (matrix[startR][i] === '/') {  
  //         result[startR][i] = '#';
  //         partOne(startR - 1, i, 'upward');
  //         break;
  //       } else if (matrix[startR][i] === '\\') {
  //         result[startR][i] = '#';
  //         partOne(startR + 1, i, 'downward');
  //         break;
  //       }
  //     }
  //   }
  
  //   if (direction === 'backward') {
  //     for (let i = startC; i >= 0; i--) {
  //       if (matrix[startR][i] === '.') {
  //         result[startR][i] = '#';
  //       } else if (matrix[startR][i] === '-')
  //         continue;
  //       else if (matrix[startR][i] === '|') {
  //         result[startR][i] = '#';
  //         partOne(startR - 1, i, 'upward');
  //         partOne(startR + 1, i, 'downward');
  //         break;
  //       } else if (matrix[startR][i] === '/') {
  //         result[startR][i] = '#';
  //         partOne(startR + 1, i, 'downward');
  //         break;
  //       } else if (matrix[startR][i] === '\\') {
  //         result[startR][i] = '#';
  //         partOne(startR - 1, i, 'upward');
  //         break;
  //       }
  //     }
  //   }
  
  //   if (direction === 'downward') {
  //     for (let i = startR; i < matrix[0].length; i++) {
  //       if (matrix[i][startC] === '.') {
  //         result[i][startC] = '#'
  //       } else if (matrix[i][startC] === '|')
  //         continue
  //       else if (matrix[i][startC] === '-') {
  //         result[i][startC] = '#'
  //         partOne(i, startC - 1, 'backward');
  //         partOne(i, startC + 1, 'forward');
  //         break;
  //       } else if (matrix[i][startC] === '/') {
  //         result[i][startC] = '#'
  //         partOne(i, startC - 1, 'backward');
  //         break;
  //       } else if (matrix[i][startC] === '\\') {
  //         result[i][startC] = '#'
  //         partOne(i, startC + 1, 'forward');
  //         break;
  //       }
  //     }
  //   }
  
  //   if (direction === 'upward') {
  //     for (let i = startR; i >= 0; i--) {
  //       if (matrix[i][startC] === '.') {
  //         result[i][startC] = '#'
  //       } else if (matrix[i][startC] === '|')
  //         continue;
  //       else if (matrix[i][startC] === '-') {
  //         result[i][startC] = '#'
  //         partOne(i, startC - 1, 'backward');
  //         partOne(i, startC + 1, 'forward');
  //         break;
  //       } else if (matrix[i][startC] === '/') {
  //         result[i][startC] = '#'
  //         partOne(i, startC + 1, 'forward');
  //         break;
  //       } else if (matrix[i][startC] === '\\') {
  //         result[i][startC] = '#'
  //         partOne(i, startC - 1, 'backward');
  //         break;
  //       } 
  //     }
  //   }
  // }
  
  fs.writeFileSync('res.txt', result.map(el => el.join('')).join('\n'), 'utf-8')
}

partOne();
