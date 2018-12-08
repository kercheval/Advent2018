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

// Create the dependency graph
let sortedSteps = Array.from(steps).sort();
let buildGraph = {};
sortedSteps.forEach(function(step) {
  buildGraph[step] = {
    completed: false,
    dependencies: []
  }
});

dependencies.forEach(function(dependency) {
  buildGraph[dependency.step].dependencies.push(dependency.dependsOn);
});

dependencies.forEach(function(dependency) {
  buildGraph[dependency.step].dependencies.sort();
});


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

/*
function getStepTime(step) {
  return 1 + (step.charCodeAt(0) - 'A'.charCodeAt(0));
}*/

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


/* Recursive implementation - Not sort ordered on graph leaves
function completeStep(step) {
  if (!buildGraph[step].completed) {
    buildGraph[step].dependencies.forEach(function(dependencyStep) {
      completeStep(dependencyStep);
    })
    buildGraph[step].completed = true;
    stepOrder.push(step);
  }
}

sortedSteps.forEach(function(step) {
  completeStep(step);
});
*/
console.log('All steps completed in order', stepOrder.join(''));

console.log('END');
