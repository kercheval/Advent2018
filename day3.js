console.log("Day 3!");

const fs = require('fs');
let inputData;

try {
  inputData = fs.readFileSync('day3.dat', 'utf8');
} catch(e) {
  console.log('Error:', e.stack);
}

const rawClaims = inputData.split('\n');
const claims = {};

function Claim(claimString) {
  parsed = claimString.split(/[#@ ,:x]+/);
  this.id = parseInt(parsed[1]);
  this.x = parseInt(parsed[2]);
  this.y = parseInt(parsed[3]);
  this.width = parseInt(parsed[4]);
  this.height = parseInt(parsed[5]);
}

rawClaims.forEach(function(claimString) {
  if (claimString.trim().length > 0) {
    let claim = new Claim(claimString);
    claims[claim.id] = claim;
  }
});

// Part 1

const fabricHeight = 1000;
const fabricWidth = 1000;
function initBackingStore() {
  for (let i = 0; i < fabricWidth; i++) {
    for (let j = 0; j < fabricHeight; j++) {
      backingStore[i][j] = 0;
    }
  }
}

const backingStore = new Array();
for (let i = 0; i < fabricWidth; i++) {
  backingStore[i] = new Array();
}
initBackingStore();

for (let claimId in claims) {
  let claim = claims[claimId];
  for (let i = claim.x; i < claim.x + claim.width; i++) {
    for (let j = claim.y; j < claim.y + claim.height; j++) {
      backingStore[i][j] = backingStore[i][j] + 1;
    }
  }
}

let multipleCount = 0;
for (let i = 0; i < fabricWidth; i++) {
  for (let j = 0; j < fabricHeight; j++) {
    if (backingStore[i][j] > 1) {
      multipleCount++
    }
  }
}

console.log('Total area of claim overlap', multipleCount);

// Part 2

for (let claimId in claims) {
  let claim = claims[claimId];
  let overlap = false;
  for (let i = claim.x; i < claim.x + claim.width; i++) {
    for (let j = claim.y; j < claim.y + claim.height; j++) {
      if (backingStore[i][j] > 1) {
        overlap = true;
      }
    }
  }
  if (!overlap) {
    console.log('Claim found without overlap:', claim);
  }
}

console.log('END');
