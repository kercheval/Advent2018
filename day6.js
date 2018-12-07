console.log("Day 6!");

const fs = require('fs');
let inputData;

try {
  inputData = fs.readFileSync('day6.dat', 'utf8');
} catch (e) {
  console.log('Error:', e.stack);
}

function parseCoordinate(rawCoordinate) {
  let rawValues = rawCoordinate.split(/[, ]+/);
  return {
    x: parseInt(rawValues[0]),
    y: parseInt(rawValues[1])
  };
}

function getDistance(coordinate1, coordinate2) {
  return Math.abs(coordinate2.x - coordinate1.x) + Math.abs(coordinate2.y - coordinate1.y)
}

let rawCoordinates = inputData.split('\n');
let coordinates = [];
rawCoordinates.forEach(function(rawCoordinate) {
  if (rawCoordinate.length) {
    coordinates.push(parseCoordinate(rawCoordinate));
  }
});

// Part 1

let maxX = 0;
let maxY = 0;
coordinates.forEach(function(coordinate) {
  if (coordinate.x > maxX) {
    maxX = coordinate.x;
  }
  if (coordinate.y > maxY) {
    maxY = coordinate.y;
  }
});

console.log('Max X =', maxX, ', Max Y =', maxY);

// Create the grid
let grid = new Array(maxX);
for (let column = 0; column <= maxX; column++) {
  grid[column] = new Array(maxY);
  for (let row = 0; row <= maxY; row++) {
    grid[column][row] = -1;
  }
}

// Calculate closest coordinate for each item on grid
for (let column = 0; column <= maxX; column++) {
  for (let row = 0; row <= maxY; row++) {
    let minDistance = Number.MAX_SAFE_INTEGER;
    for (let coordinateId = 0; coordinateId < coordinates.length; coordinateId++) {
      let distance = getDistance(coordinates[coordinateId], {x: column, y: row});
      if (distance === minDistance) {
        grid[column][row] = -1;
      } else if (distance < minDistance) {
        minDistance = distance;
        grid[column][row] = coordinateId;
      }
    }
  }
}

// Find the count for all coordinates.  All coordinates owning an edge slot are infinite and not allowed
let coordinateCount = {};
for (let column = 0; column <= maxX; column++) {
  for (let row = 0; row <= maxY; row++) {
    let currentId = grid[column][row];
    if (currentId >= 0) {
      let currentCount = coordinateCount[grid[column][row]];
      if (currentCount !== -1) {
        if (column === 0 || column === maxX || row === 0 || row === maxY) {
          coordinateCount[grid[column][row]] = -1;
        } else if (!currentCount) {
          coordinateCount[grid[column][row]] = 1;
        } else {
          coordinateCount[grid[column][row]] = currentCount + 1;
        }
      }
    }
  }
}

// Find the largest count
let maxArea = 0;
let maxAreaId;

for (let id in coordinateCount) {
  if (coordinateCount.hasOwnProperty(id)) {
    if (coordinateCount[id] > maxArea) {
      maxArea = coordinateCount[id];
      maxAreaId = id;
    }
  }
}

console.log('Max area of', maxArea, 'found for coordinate id', maxAreaId);

// Part 2


console.log('END');
