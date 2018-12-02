console.log("Day 1!");

var fs = require('fs');
var inputData;

try {
  inputData = fs.readFileSync('day1.dat', 'utf8');
} catch(e) {
  console.log('Error:', e.stack);
}

// Part 1

var frequencyArray = inputData.split('\n');
var frequencySet = new Set();

var firstDuplicateFrequencyFound = false;
var firstDuplicateFrequency;

var frequency = 0;
var iteration = 0;

frequencySet.add(0);

iteration++;
frequencyArray.forEach(function(element) {
  var parsed = parseInt(element);
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
    var parsed = parseInt(element);
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


