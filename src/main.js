import Gameboard from "./classes/board";

import './style/style.css';

const Game = new Gameboard();

const app = document.getElementById('app');

const message = document.createElement('div');
message.classList.add('message');
message.innerHTML = 'attack result goes here';

const boardGame = document.createElement('div');
boardGame.classList.add('gameboard');

const playerTwoBoard = document.createElement('div');
playerTwoBoard.classList.add('gameboard');
playerTwoBoard.classList.add('hidden');

function attackResults(result, elm) {
  if(result){
    elm.target.style.backgroundColor = 'lightgreen';
    elm.target.style.cursor = 'initial';
    elm.target.removeEventListener('click', getCoordinates);
    elm.target.classList.remove('hover');
  }else{
    elm.target.style.backgroundColor = 'lightcoral';
    elm.target.style.cursor = 'initial';
    elm.target.removeEventListener('click', getCoordinates);
    elm.target.classList.remove('hover');
    setTimeout(changeVisibility, 3000)
  }
};

function changeVisibility(){
  document.querySelectorAll('.gameboard').forEach(board => board.classList.toggle('hidden'));
}

function getCoordinates(elm){
  let coord = elm.target.dataset.coord.split('-');
  let result = Game.reaceiveAttack(coord);
  attackResults(result, elm);
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
app.appendChild(boardGame);
app.appendChild(playerTwoBoard);