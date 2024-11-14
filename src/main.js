import Gameboard from "./classes/board";

import './style/style.css';

const Game = new Gameboard();

const app = document.getElementById('app');

const message = document.createElement('div');
message.classList.add('message');

const score1 = document.createElement('div');
score1.classList.add('score1');
score1.innerHTML = '0';

const score2 = document.createElement('div');
score2.classList.add('score2');
score2.innerHTML = '0';

const boardGame = document.createElement('div');
boardGame.classList.add('gameboard');

const playerTwoBoard = document.createElement('div');
playerTwoBoard.classList.add('gameboard');
playerTwoBoard.classList.add('hidden');

function messageVisibility(msg){
  message.innerHTML = msg;
  message.classList.toggle('fade-out');
  message.classList.toggle('fade-in');

  setTimeout(() => {
    message.classList.remove('fade-in');
    message.classList.add('fade-out');
  }, 3000)
}

function updateScore(){
  Game.turnPlayer == 'player1'?
  document.querySelector('.score1').innerHTML = Game.identifyPlayer().score:
  document.querySelector('.score2').innerHTML = Game.identifyPlayer().score
}

function removeListener(elm){
  elm.target.removeEventListener('click', getCoordinates);
  elm.target.dataset.coord = '';
}

function succesAtkStyle(elm){
  elm.target.style.backgroundColor = 'lightgreen';
  elm.target.style.cursor = 'initial';
  elm.target.classList.remove('hover');
}

function failedAtkStyle(elm){
  elm.target.style.backgroundColor = 'lightcoral';
  elm.target.style.cursor = 'initial';
  elm.target.classList.remove('hover');
}

function attackResults(result, elm) {
  if(result){
    succesAtkStyle(elm);
    removeListener(elm);
    updateScore();
    messageVisibility('Hit!');
  }else{
    failedAtkStyle(elm);
    removeListener(elm);
    setTimeout(changeBoardVisibility, 3000)
    messageVisibility('Miss!')
  }
};

function changeBoardVisibility(){
  document.querySelectorAll('.gameboard').forEach(board => board.classList.toggle('hidden'));
}

function getCoordinates(elm){
  let coord = elm.target.dataset.coord.split('-');

  if(coord == '') return

  let result = Game.reaceiveAttack(coord);
  attackResults(result, elm);
  if(result){
    let gameState = Game.checkGameState();

    if(gameState.p1 == 0 || gameState.p2 == 0){
      alert(`${Game.identifyPlayer().name} Won!`);
    }
  }
};

function createPlayerBoard(array, board){
  for(let i = 0; i < array.length ; i++){
    for(let k = 0; k <= array[i].length ; k++){
      let square = document.createElement('div');
  
      square.classList.add('gameboard-square');
      square.classList.add('hover');
  
      square.dataset.coord = `${i}-${k}`;
  
      square.addEventListener('click', (e) => getCoordinates(e))
  
      board.appendChild(square);
    }
  }  
};

createPlayerBoard(Game.player1.board, boardGame);
createPlayerBoard(Game.player2.board, playerTwoBoard);

app.appendChild(message);
app.appendChild(score1)
app.appendChild(score2)
app.appendChild(boardGame);
app.appendChild(playerTwoBoard);