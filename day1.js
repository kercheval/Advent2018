console.log("Day 1!");

const fs = require('fs');
let inputData;

try {
  inputData = fs.readFileSync('day1.dat', 'utf8');
} catch(e) {
  console.log('Error:', e.stack);
}

// Part 1

let frequencyArray = inputData.split('\n');
let frequencySet = new Set();

let firstDuplicateFrequencyFound = false;
let firstDuplicateFrequency = undefined;

let frequency = 0;
let iteration = 0;

frequencySet.add(0);

iteration++;
frequencyArray.forEach(function(element) {
  let parsed = parseInt(element);
  if (isNaN(parsed)) { return }
  frequency = frequency + parsed;
  if (!firstDuplicateFrequencyFound && frequencySet.has(frequency)) {
      firstDuplicateFrequencyFound = true;
      firstDuplicateFrequency = frequency;
  }
  frequencySet.add(frequency);
});

console.log('First Iteration End Frequency: ', frequency);

// Part 2

while (!firstDuplicateFrequencyFound) {
  iteration++;
  frequencyArray.forEach(function(element) {
    let parsed = parseInt(element);
    if (isNaN(parsed)) { return }
    frequency = frequency + parsed;
    if (!firstDuplicateFrequencyFound && frequencySet.has(frequency)) {
      firstDuplicateFrequencyFound = true;
      firstDuplicateFrequency = frequency;
    }
    frequencySet.add(frequency);
  });
}

console.log('First Duplicate Frequency found on iteration', iteration, ': ', firstDuplicateFrequency);


