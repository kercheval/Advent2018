console.log("Day 4!");

const fs = require('fs');
let inputData;

try {
  inputData = fs.readFileSync('day4.dat', 'utf8');
} catch (e) {
  console.log('Error:', e.stack);
}

const rawEvents = inputData.split('\n');
const sortedRawEvents = rawEvents.sort();
const sleepTime = {};

// State variables
let currentGuard;
let nowSleeping = false;
let sleepStart;

sortedRawEvents.forEach(function (eventString) {
  if (eventString.trim().length > 0) {
    let event = eventString.split(/[\[\]\- :#]+/);
    if (eventString.includes('#')) {
      // shift change, init guard
      currentGuard = sleepTime[event[7]];
      if (!currentGuard) {
        currentGuard = new Array(60);
        for (let i = 0; i < 60; i++) {
          currentGuard[i] = 0;
        }
      }
      sleepTime[event[7]] = currentGuard;
      nowSleeping = false;
    } else if (eventString.includes('falls asleep')) {
      // sleep begin
      nowSleeping = true;
      sleepStart = parseInt(event[5]);
    } else if (eventString.includes('wakes up')) {
      // sleep end
      nowSleeping = false;
      let sleepEnd = parseInt(event[5]);
      for (let i = sleepStart; i < sleepEnd; i++) {
        currentGuard[i] = currentGuard[i] + 1;
      }
    }
  }
});

let maxSleep = 0;
let maxSleepId;
let maxMinuteCount = 0;
let maxMinuteIndex;

for (let guardId in sleepTime) {
  let totalMinutes = 0;
  let minuteList = sleepTime[guardId];
  let localMaxMinuteCount = 0;
  let localMaxMinuteIndex;
  for (let i = 0; i < 60; i++) {
    let minuteCount = minuteList[i];
    if (minuteCount > localMaxMinuteCount) {
      totalMinutes += minuteCount;
      localMaxMinuteCount = minuteCount;
      localMaxMinuteIndex = i;
    }
  }
  if (totalMinutes > maxSleep) {
    maxSleepId = guardId;
    maxSleep = totalMinutes;
    maxMinuteCount = localMaxMinuteCount;
    maxMinuteIndex = localMaxMinuteIndex
  }
}

console.log('Guard Id', maxSleepId, 'slept the most at', maxSleep, 'minutes');
console.log('A max sleep count', maxMinuteCount, 'found at minute', maxMinuteIndex);
console.log('Guard id * minute: ', maxSleepId * maxMinuteIndex);

// Part 2

for (let guardId in sleepTime) {
  let minuteList = sleepTime[guardId];
  for (let i = 0; i < 60; i++) {
    let minuteCount = minuteList[i];
    if (minuteCount > maxMinuteCount) {
      maxSleepId = guardId;
      maxMinuteCount = minuteCount;
      maxMinuteIndex = i;
    }
  }
}

console.log('Guard Id', maxSleepId, 'slept minute', maxMinuteIndex, 'most at', maxMinuteCount, 'times');
console.log('Guard id * minute: ', maxSleepId * maxMinuteIndex);

console.log('END');
