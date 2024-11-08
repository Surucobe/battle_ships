import Gameboard from "./classes/board";

import './style/style.css';

const Game = new Gameboard();

const app = document.getElementById('app');
const boardGame = document.createElement('div');
boardGame.classList.add('gameboard');

function attackResults(result, elm) {
  if(result){
    console
    elm.target.style.backgroundColor = 'lightgreen';
    elm.target.style.cursor = 'initial';
    elm.target.removeEventListener('click', getCoordinates);
    elm.target.classList.remove('hover');
  }else{
    console
    elm.target.style.backgroundColor = 'lightcoral';
    elm.target.style.cursor = 'initial';
    elm.target.removeEventListener('click', getCoordinates);
    elm.target.classList.remove('hover');
  }
}

function getCoordinates(elm){
  debugger
  let coord = elm.target.dataset.coord.split('-');
  let result = Game.reaceiveAttack(coord);
  attackResults(result, elm);
}

for(let i = 0; i < Game.getGameBoard().length ; i++){
  for(let k = 0; k <= Game.getGameBoard()[i].length ; k++){
    let square = document.createElement('div');

    square.classList.add('gameboard-square');
    square.classList.add('hover');

    square.dataset.coord = `${i}-${k}`;

    square.addEventListener('click', (e) => getCoordinates(e))

    boardGame.appendChild(square);
  }
}

app.appendChild(boardGame);