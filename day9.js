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

function getNextPlayer(currentPlayer) {
  currentPlayer++;
  if (currentPlayer > numberOfPlayers) {
    currentPlayer = 1;
  }
  return currentPlayer;
}

let circle;
function initCircle() {
  circle = [0];
  return 0;
}

function getInsertionIndex(currentIndex) {
  let newIndex = currentIndex + 1;
  return newIndex % circle.length + 1;
}

function getDeletionIndex(currentIndex) {
  let newIndex = currentIndex - 7;
  if (newIndex < 0) {
    newIndex += circle.length;
  }
  return newIndex;
}

function insertMarble(currentMarble, value) {
  circle.splice(currentMarble, 0, value);
}

function deleteMarble(currentMarble) {
  circle.splice(currentMarble, 1);
}

function getMarbleValue(currentMarble) {
  return circle[currentMarble];
}

function playGame(maxMarbleValue) {
  console.log(numberOfPlayers, 'players; last marble is worth', maxMarbleValue, 'points');

  let start = Date.now();
  let players = [];
  for (i = 0; i < numberOfPlayers; i++) {
    players[i] = 0;
  }

  let currentPlayer = 0;
  let currentMarble = initCircle();
  for (let i = 1; i <= maxMarbleValue; i++) {
    currentPlayer = getNextPlayer(currentPlayer);
    if (i % 23) {
      currentMarble = getInsertionIndex(currentMarble);
      insertMarble(currentMarble, i);
    } else {
      currentMarble = getDeletionIndex(currentMarble);

      let currentPlayerScore = players[currentPlayer];
      currentPlayerScore += i;
      currentPlayerScore += getMarbleValue(currentMarble);
      players[currentPlayer] = currentPlayerScore;

      deleteMarble(currentMarble);
    }
  }

  let maxScore = 0;
  players.forEach(function (score) {
    if (score > maxScore) {
      maxScore = score;
    }
  });

  let end = Date.now();
  console.log('Max score is', maxScore, 'played in', end - start, 'ms');
}

playGame(lastMarbleValue*4);

console.log('END');
