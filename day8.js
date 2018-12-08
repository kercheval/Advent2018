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
  let sum = 0;
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
}

let state = {
  treeData: treeData,
  index: 0,
  sum: 0
};
sumMetaData(state);

console.log('Metadata sum is', state.sum);

console.log('END');
