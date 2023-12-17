const fs = require('fs');

const partOne = () => {
  const data = fs.readFileSync('input.txt', 'utf-8');
  const arr = data.split(/\r?\n/);

  let matrixes = []; let matrix = []
  for (let row of arr) {
    if (row === '') {
      matrixes.push(matrix)
      matrix = []
    } else  {
      matrix.push(row)
    }
  }
  matrixes.push(matrix);

  let counter = 0, sum = 0;
  for (let matrix of matrixes) {
    counter++;
    let stackH = [], countH = [], borderH = [], counterH = 0;
    for (let i = 0; i < matrix.length; i++) {
      if (stackH[stackH.length - 1] === matrix[i]) {
        stackH.pop();
        counterH++
      } else {
        if (counterH) {
          countH.push(counterH);
          borderH.push(i);
        }
        counterH = 0;
        stackH.push(matrix[i]);
      }
    }

    console.log(counterH);

    if (counterH) {
      countH.push(counterH);
      borderH.push(matrix.length);
    }

    console.log('start 1', countH, borderH);

    let maxH = 0, firstH = 0;
    if (borderH.length) {
      if (countH[0] * 2 === borderH[0]) {
        maxH = countH[0];
        firstH = countH[0];
      } 
      if (borderH[borderH.length - 1] === matrix.length && countH[countH.length - 1] > maxH) {
        maxH = countH[countH.length - 1];
        firstH = borderH[borderH.length - 1] - countH[countH.length - 1];
      }
      if (countH.reduce((ac, cur) => ac + cur, 0) * 2 === borderH[borderH.length - 1] && countH[countH.length - 1] > maxH) {
        maxH = countH.reduce((ac, cur) => ac + cur, 0);
        firstH = countH.reduce((ac, cur) => ac + cur, 0);
      }
    } 

    let stackV = [], countV = [], borderV = [], counterV = 0;
    for (let j = 0; j < matrix[0].length; j++) {
      let column = '';
      for (let i = 0; i < matrix.length; i++) {
        column += matrix[i][j]
      }
      if (stackV[stackV.length - 1] === column) {
        stackV.pop();
        counterV++
      } else {
        if (counterV) {
          countV.push(counterV);
          borderV.push(j);
        }
        counterV = 0;
        stackV.push(column);
      }
    }

    if (counterV) {
      countV.push(counterV);
      borderV.push(matrix[0].length);
    }

    console.log('start 2', countV, borderV);
    let maxV = 0, firstV = 0;
    if (borderV.length) {
      if (countV[0] * 2 === borderV[0]) {
        maxV = countV[0];
        firstV = countV[0];
      } 
      if (borderV[borderV.length - 1] === matrix[0].length && countV[countV.length - 1] > maxV) {
        maxV = countV[countV.length - 1];
        firstV = borderV[borderV.length - 1] - countV[countV.length - 1];
      }
      if (countV.reduce((ac, cur) => ac + cur, 0) * 2 === borderV[borderV.length - 1] && countV[countV.length - 1] > maxH) {
        maxV = countV.reduce((ac, cur) => ac + cur, 0);
        firstV = countV.reduce((ac, cur) => ac + cur, 0);
      }
    } 

    console.log(`H: ${counter}`, matrix.length, maxH, firstH);
    console.log(`V: ${counter}`, matrix[0].length, maxV, firstV);

    if (maxH > maxV) {
      sum += 100 * firstH;
    } else if (maxH < maxV) {
      sum += firstV;
    }
    console.log("sum: ", sum);
  }

  console.log(sum);
}

partOne();