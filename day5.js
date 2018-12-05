console.log("Day 5!");

const fs = require('fs');
let inputData;

try {
  inputData = fs.readFileSync('day5.dat', 'utf8');
} catch (e) {
  console.log('Error:', e.stack);
}

function isOppositeCase(c1, c2) {
  if (c1.toLowerCase() === c2.toLowerCase()) {
    if (c1 != c2) {
      return true;
    }
  }
  return false;
}

let uniqueUnits = {};

// Part 1

let baseIndex = 0;
let units = inputData.trim().split('');

while (baseIndex < units.length - 1) {
  uniqueUnits[units[baseIndex].toLowerCase()] = true;
  if (isOppositeCase(units[baseIndex], units[baseIndex+1])) {
    units.splice(baseIndex, 2);
    if (baseIndex > 0) {
      baseIndex--;
    }
  } else {
    baseIndex++;
  }
}

console.log(units.length, 'units remain in polymer');

// Part 2

let minStripCount = inputData.length;
let minStripUnit;

for (let stripUnit in uniqueUnits) {

  units = inputData.trim().split('');

  let i = 0;
  while (i < units.length) {
    if (units[i].toLowerCase() == stripUnit) {
      units.splice(i, 1);
    } else {
      i++;
    }
  }

  baseIndex = 0;
  while (baseIndex < units.length - 1) {
    if (isOppositeCase(units[baseIndex], units[baseIndex+1])) {
      units.splice(baseIndex, 2);
      if (baseIndex > 0) {
        baseIndex--;
      }
    } else {
      baseIndex++;
    }
  }

  if (units.length < minStripCount) {
    minStripCount = units.length;
    minStripUnit = stripUnit;
  }
  console.log(units.length, 'units remain in polymer after strip of', stripUnit);
}

console.log('Minimum unit count', minStripCount, 'found after strip of', minStripUnit);

console.log('END');
