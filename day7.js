console.log("Day 7!");

const fs = require('fs');
let inputData;

try {
  inputData = fs.readFileSync('day7.dat', 'utf8');
} catch (e) {
  console.log('Error:', e.stack);
}

// Parse the raw input
let rawSteps = inputData.split('\n');
let steps = new Set();
let dependencies = [];
rawSteps.forEach(function(step) {
  let matches = step.match(/Step (\w) must be finished before step (\w) can begin/);
  if (matches) {
    dependencies.push({step: matches[2], dependsOn: matches[1]});
    steps.add(matches[1]);
    steps.add(matches[2]);
  }
});

function getStepTime(step) {
  return 61 + (step.charCodeAt(0) - 'A'.charCodeAt(0));
}

function initGraph(steps) {
  let buildGraph = {};
  steps.forEach(function(step) {
    buildGraph[step] = {
      completed: false,
      cost: getStepTime(step),
      work: 0,
      dependencies: []
    }
  });
  dependencies.forEach(function(dependency) {
    buildGraph[dependency.step].dependencies.push(dependency.dependsOn);
  });
  dependencies.forEach(function(dependency) {
    buildGraph[dependency.step].dependencies.sort();
  });
  return buildGraph
}

function getAvailableSteps(step) {
  let availableSteps = new Set();
  if (!buildGraph[step].completed) {
    buildGraph[step].dependencies.forEach(function (dependencyStep) {
      getAvailableSteps(dependencyStep).forEach(function(availableStep) {
        availableSteps.add(availableStep);
      });
    });
    if (availableSteps.size === 0) {
      availableSteps.add(step);
    }
  }
  return availableSteps;
}

// Part 1

let sortedSteps = Array.from(steps).sort();
let buildGraph = initGraph(sortedSteps);
let stepOrder = [];
let stepsFound = false;
do {
  let availableSteps = new Set();
  sortedSteps.forEach(function(dependencyStep) {
    getAvailableSteps(dependencyStep).forEach(function(availableStep) {
      availableSteps.add(availableStep);
    });
  });
  if (availableSteps.size) {
    stepsFound = true;
    Array.from(availableSteps).sort().forEach((function(stepToComplete) {
      buildGraph[stepToComplete].completed = true;
      stepOrder.push(stepToComplete);
    }));
  } else {
    stepsFound = false;
  }
} while (stepsFound);

console.log('All steps completed in order', stepOrder.join(''));

// Part 2

buildGraph = initGraph(sortedSteps);
stepOrder = [];
stepsFound = false;
let totalTicks = 0;
let workPerTick = 5;
let workersAvailable = workPerTick;
do {
  let availableSteps = new Set();
  sortedSteps.forEach(function(dependencyStep) {
    getAvailableSteps(dependencyStep).forEach(function(availableStep) {
      availableSteps.add(availableStep);
    });
  });
  if (availableSteps.size) {
    stepsFound = true;
    let workThisTick = 0;
    Array.from(availableSteps).sort().forEach((function(stepToComplete) {
      let step = buildGraph[stepToComplete];
      if (step.work > 0) {
        step.work++;
        workThisTick++;
      } else if (workThisTick < workPerTick && workersAvailable) {
        step.work++;
        workThisTick++;
        workersAvailable--;
      }
    }));
    Array.from(availableSteps).sort().forEach((function(stepToComplete) {
      let step = buildGraph[stepToComplete];
      if (step.work >= step.cost) {
        buildGraph[stepToComplete].completed = true;
        workersAvailable++;
        stepOrder.push(stepToComplete);
      }
    }));
    totalTicks++;
  } else {
    stepsFound = false;
  }
} while (stepsFound);

console.log('All timed steps completed in', totalTicks, 'seconds in order', stepOrder.join(''));

console.log('END');
