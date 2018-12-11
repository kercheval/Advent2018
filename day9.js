console.log("Day 9!");

const fs = require('fs');
let inputData;

try {
  inputData = fs.readFileSync('day9.dat', 'utf8');
} catch (e) {
  console.log('Error:', e.stack);
}

let rawInput = inputData.split(/[ \n]+/);
let numberOfPlayers = rawInput[0];
let lastMarbleValue = rawInput[6];

console.log(numberOfPlayers, 'players; last marble is worth', lastMarbleValue, 'points');

function getNextPlayer(currentPlayer) {
  currentPlayer++;
  if (currentPlayer > numberOfPlayers) {
    currentPlayer = 1;
  }
  return currentPlayer;
}

function getInsertionIndex(currentIndex, circleSize) {
  let newIndex = currentIndex + 1;
  return newIndex % circleSize + 1;
}

function getDeletionIndex(currentIndex, circleSize) {
  let newIndex = currentIndex - 7;
  if (newIndex < 0) {
    newIndex += circleSize;
  }
  return newIndex;
}

let players = [];
for (i = 0; i < numberOfPlayers; i++) {
  players[i] = 0;
}

let circle = [0];
let currentPlayer = 0;
let currentMarble = 0;
for (let i = 1; i <= lastMarbleValue; i++) {
  currentPlayer = getNextPlayer(currentPlayer);
  if (i % 23) {
    currentMarble = getInsertionIndex(currentMarble, circle.length);
    circle.splice(currentMarble, 0, i);
  } else {
    currentMarble = getDeletionIndex(currentMarble, circle.length);

    let currentPlayerScore = players[currentPlayer];
    currentPlayerScore += i;
    currentPlayerScore += circle[currentMarble];
    players[currentPlayer] = currentPlayerScore;

    circle.splice(currentMarble, 1);
  }
}

let maxScore = 0;
players.forEach(function(score) {
  if (score > maxScore) {
    maxScore = score;
  }
})

console.log('Max score is', maxScore);

console.log('END');
