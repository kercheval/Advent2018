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

function Marble(value, insertMarble) {
  this.value = value;
  this.next = this;
  this.previous = this;
  if (!insertMarble) {
    insertMarble = this;
  }
  this.next = insertMarble;
  this.previous = insertMarble.previous;
  insertMarble.previous = this;
  this.previous.next = this;
}

let circle;
function initCircle() {
  circle = new Marble(0);
  return circle;
}

function getInsertAt(currentMarble) {
  return currentMarble.next.next;
}

function getDeleteAt(currentMarble) {
  let marbleToDelete = currentMarble;
  for (let i = 0; i < 7; i++) {
    marbleToDelete = marbleToDelete.previous;
  }
  return marbleToDelete
}

function insertMarble(currentMarble, value) {
  return new Marble(value, currentMarble);
}

function deleteMarble(currentMarble) {
  let nextMarble = currentMarble.next;
  currentMarble.next.previous = currentMarble.previous;
  currentMarble.previous.next = currentMarble.next;
  return nextMarble;
}

function getMarbleValue(currentMarble) {
  return currentMarble.value;
}

function printCircle() {
  console.log('----')
  let currentMarble = circle;
  do {
    console.log(currentMarble.value);
    currentMarble = currentMarble.next;
  } while (currentMarble.next !== circle);
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
      currentMarble = getInsertAt(currentMarble);
      currentMarble = insertMarble(currentMarble, i);
    } else {
      currentMarble = getDeleteAt(currentMarble);

      let currentPlayerScore = players[currentPlayer];
      currentPlayerScore += i;
      currentPlayerScore += getMarbleValue(currentMarble);
      players[currentPlayer] = currentPlayerScore;

      currentMarble = deleteMarble(currentMarble);
    }

//    if (i < 5)
//      printCircle();
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

// Part 1
playGame(lastMarbleValue);

// Part 2
playGame(lastMarbleValue * 10);
playGame(lastMarbleValue * 100);

console.log('END');
