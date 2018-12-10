console.log("Day 8!");

const fs = require('fs');
let inputData;

try {
  inputData = fs.readFileSync('day8.dat', 'utf8');
} catch (e) {
  console.log('Error:', e.stack);
}

let rawTreeData = inputData.split(/[ \n]+/);
let treeData = [];
rawTreeData.forEach(function(element) {
  if (element.length) {
    treeData.push(parseInt(element));
  }
});

// Part 1

function sumMetaData(state) {
  let nodeCount = state.treeData[state.index];
  let metaDataCount = treeData[state.index + 1];
  state.index += 2;
  for (let i = 0; i < nodeCount; i++) {
    sumMetaData(state);
  }
  for (let i = 0; i < metaDataCount; i++) {
    state.sum += state.treeData[state.index];
    state.index++;
  }
  return state;
}

let sumState = {
  treeData: treeData,
  index: 0,
  sum: 0
};
sumMetaData(sumState);

console.log('Metadata sum is', sumState.sum);

// Part 2
function getLeafNodeValue(state) {
  let metaDataSum = 0;
  let nodeCount = state.treeData[state.index];
  let metaDataCount = treeData[state.index + 1];
  state.index += 2;
  for (let i = 0; i < metaDataCount; i++) {
    metaDataSum+= state.treeData[state.index];
    state.index++;
  }
  return metaDataSum;
}

function getNodeValue(state) {
  let nodeValue = 0;
  let nodeCount = state.treeData[state.index];
  if (!nodeCount) {
    nodeValue += getLeafNodeValue(state);
  } else {
    let nodeValues = [];
    let metaDataCount = treeData[state.index + 1];
    state.index += 2;
    for (let i = 0; i < nodeCount; i++) {
      nodeValues.push(getNodeValue(state));
    }
    for (let i = 0; i < metaDataCount; i++) {
      if (treeData[state.index] <= nodeValues.length) {
        nodeValue += nodeValues[treeData[state.index] - 1];
      }
      state.index ++;
    }
  }
  return nodeValue;
}

let nodeState = {
  treeData: treeData,
  index: 0
};
let nodeValue = getNodeValue(nodeState);

console.log('Root node value is', nodeValue);


console.log('END');
