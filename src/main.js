import Gameboard from "./classes/board";

import './style/style.css';

let Game;
let disablePlay = false;
let computerPlayer = false;
let computerAttackMiss = true;

window.addEventListener('animationend', (e) => {
  if(Game.identifyPlayer().name !== 'computer'){
    disablePlay = !disablePlay
  }
});

const app = document.getElementById('app');

const message = document.createElement('div');
message.classList.add('message');

const score1 = document.createElement('div');
score1.classList.add('score');
score1.classList.add('score-one');

const score2 = document.createElement('div');
score2.classList.add('score');
score2.classList.add('score-two');

const boardGame = document.createElement('div');
boardGame.classList.add('gameboard');
boardGame.dataset.player = 'one';

const playerTwoBoard = document.createElement('div');
playerTwoBoard.classList.add('gameboard');
playerTwoBoard.classList.add('hidden');
playerTwoBoard.dataset.player = 'two';

// Modal to start the game with either one or two players
const startGame = document.createElement('div');
startGame.classList.add('game-starting-screen');

const startGameModal = document.createElement('div');
startGameModal.classList.add('game-modal');
startGame.appendChild(startGameModal);

const dismissScreen = () => {
  debugger
  startGame.style.display = 'none';
}

const playerOneSideBar = document.createElement('div');
playerOneSideBar.classList.add('side-bar');
playerOneSideBar.classList.add('right');
const playerOneSideBarButton = document.createElement('button');
playerOneSideBarButton.innerText = 'Ready!'
playerOneSideBar.appendChild(playerOneSideBarButton);

const playerTwoSideBar = document.createElement('div');
playerTwoSideBar.classList.add('side-bar');
playerTwoSideBar.classList.add('left');
const playerTwoSideBarButton = document.createElement('button');
playerTwoSideBarButton.innerText = 'Ready!'
playerTwoSideBar.appendChild(playerTwoSideBarButton);

//start the game with a single player
const onePlayerBtn = document.createElement('button');
onePlayerBtn.innerText = 'One Player'
onePlayerBtn.addEventListener('click', startPVCGame);

function startPVCGame(){
  dismissScreen();

  Game = gameStart();

  createBoardForPlayer(Game.player1.board, boardGame);
  createComputerBoard(Game.player2.board, playerTwoBoard);

  computerPlayer = !computerPlayer;

  score1.innerHTML = 'P1: 0';
  score2.innerHTML = 'CP: 0';
}

startGameModal.appendChild(onePlayerBtn);

//start the game with two players
const twoPlayersBtn = document.createElement('button');
twoPlayersBtn.innerText = 'Two Players';
twoPlayersBtn.addEventListener('click', startPVPGame);

function startPVPGame(){
  dismissScreen();
  
  Game = gameStart(true);

  createBoardForPlayer(Game.player1.board, boardGame);
  createBoardForPlayer(Game.player2.board, playerTwoBoard);

  score1.innerHTML = 'P1: 0';
  score2.innerHTML = 'P2: 0';
}

startGameModal.appendChild(twoPlayersBtn);


function gameStart(players = false) {
  return new Gameboard(players);
}

function messageVisibility(msg){
  message.innerHTML = msg;
  message.classList.toggle('fade-out');
  message.classList.toggle('fade-in');

  setTimeout(() => {
    message.classList.remove('fade-in');
    message.classList.add('fade-out');
  }, 1500)
}

function updateScore(){
  computerPlayer?
  Game.turnPlayer == 'player1'?
  score1.innerText = `P1: ${Game.identifyPlayer().score}`:
  score2.innerText = `CP: ${Game.identifyPlayer().score}`
  :
  Game.turnPlayer == 'player1'?
  score1.innerText = `P1: ${Game.identifyPlayer().score}`:
  score2.innerText = `P2: ${Game.identifyPlayer().score}`
}

function removeListener(elm){
  elm.removeEventListener('click', getCoordinates);
  elm.dataset.coord = '';
}

function succesAtkStyle(elm){
  elm.style.backgroundColor = 'lightgreen';
  elm.style.cursor = 'initial';
  elm.classList.remove('hover');
}

function failedAtkStyle(elm){
  elm.style.backgroundColor = 'lightcoral';
  elm.style.cursor = 'initial';
  elm.classList.remove('hover');
}

function endGameStyles(elm){
  if(elm.style.backgroundColor == ''){
    elm.style.backgroundColor = 'lightblue';
    elm.style.cursor = 'initial';
    elm.classList.remove('hover');
  }
}

function attackResults(result, elm) {
  if(result){
    succesAtkStyle(elm);
    removeListener(elm);
    updateScore();
    messageVisibility('Hit!');
    if(computerPlayer){
      setTimeout(getElmFromComputer(), 2000);
    }
  }else{
    failedAtkStyle(elm);
    removeListener(elm);
    setTimeout(changeBoardVisibility, 1500);
    messageVisibility('Miss!');
  }
};

function changeBoardVisibility(){
  if(computerPlayer){
    computerAttackMiss = !computerAttackMiss;
    if(!computerAttackMiss){
      getElmFromComputer();
    }
  }

  document.querySelectorAll('.gameboard').forEach(board => board.classList.toggle('hidden'));
}

function getCoordinates(elm){
  if(disablePlay) return;

  let coord = elm.target.dataset.coord.split('-');

  if(coord == '') return;

  disablePlay = !disablePlay;
  let result = Game.receiveAttack(coord);
  attackResults(result, elm.target);
  if(result) gameOver()
};

function getElmFromComputer(){
 let result = Game.computerMakeAttack();
 const board = document.querySelector('[data-player="two"]');
 let elm = board.querySelector(`[data-coord='${result.coordinates.join('-')}']`);
 attackResults(result.status, elm);
}

function gameOver() {
  let gameState = Game.checkGameState();

  if(gameState.p1 == 0 || gameState.p2 == 0){
  let playBoard = [...document.querySelectorAll('[data-coord]')];

  playBoard.forEach(elm => {
    removeListener(elm);
    endGameStyles(elm);
  })

    alert(`${Game.identifyPlayer().name} Won!`);
  }
}

function createBoardForPlayer(array, board){
  for(let i = 0; i < array.length ; i++){
    for(let k = 0; k <= array[i].length ; k++){
      let square = document.createElement('div');
  
      square.classList.add('gameboard-square');
      square.classList.add('hover');
  
      square.dataset.coord = `${i}-${k}`;
      square.innerText = `${i}-${k}`;
  
      square.addEventListener('click', (e) => getCoordinates(e))
  
      board.appendChild(square);
    }
  }
};

function createComputerBoard(array, board){
  for(let i = 0; i < array.length ; i++){
    for(let k = 0; k <= array[i].length ; k++){
      let square = document.createElement('div');
  
      square.classList.add('gameboard-square');
      square.classList.add('hover');
  
      square.dataset.coord = `${i}-${k}`;
      square.innerText = `${i}-${k}`;
  
      board.appendChild(square);
    }
  }
}

app.appendChild(message);
app.appendChild(score1);
app.appendChild(score2);
app.appendChild(boardGame);
app.appendChild(playerTwoBoard);
app.appendChild(startGame);
app.appendChild(playerOneSideBar);
app.appendChild(playerTwoSideBar);