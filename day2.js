console.log("Day 2!");

const fs = require('fs');
let inputData;

try {
  inputData = fs.readFileSync('day2.dat', 'utf8');
} catch(e) {
  console.log('Error:', e.stack);
}

let packageIds = inputData.split('\n');
let packageIdTwoCount = 0;
let packageIdThreeCount = 0;

// Part 1

packageIds.forEach(function(element) {
  let collector = {};
  for (let c of element) {
    if (collector[c]) {
      collector[c]++;
    } else {
      collector[c] = 1;
    }
  }

  let foundTwo = false;
  let foundThree = false;
  for (let key in collector) {
    if (collector.hasOwnProperty(key)) {
      if (collector[key] === 2) {
        foundTwo = true;
      } else if (collector[key] === 3) {
        foundThree = true;
      }
    }
  }
  if (foundTwo) {
    packageIdTwoCount++;
  }
  if (foundThree) {
    packageIdThreeCount++;
  }
});

console.log('Found', packageIdTwoCount, 'packages with three and', packageIdThreeCount, 'packages with three resulting in a checksum of', packageIdTwoCount * packageIdThreeCount);


// Part 2

let i = 0;
while (i < packageIds.length - 1) {
  let j = i + 1;
  while (j < packageIds.length) {
    let packageOneId = packageIds[i];
    let packageTwoId = packageIds[j];
    let diffCount = 0;
    let similarChars = '';

    let index = 0;
    while(index < packageOneId.length && index < packageTwoId.length) {
      if (packageOneId[index] !== packageTwoId[index]) {
        diffCount++;
      } else {
        similarChars += packageOneId[index];
      }
      index++;
    }
    if (diffCount === 1) {
      console.log('Similar packages found:', similarChars, 'at index', index);
      console.log(packageOneId);
      console.log(packageTwoId);
    }
    j++;
  }
  i++;
}

console.log('END');
