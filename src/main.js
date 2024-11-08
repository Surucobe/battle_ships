import Gameboard from "./classes/board";

import './style/style.css';

const Game = new Gameboard();
console.log(Game.reaceiveAttack([4,3]))

const app = document.getElementById('app');
const boardGame = document.createElement('div');
boardGame.classList.add('gameboard');

function getCoordinates(elm){
  debugger
  let coord = elm.target.dataset.coord.split('-');
  Game.reaceiveAttack(coord);
}

for(let i = 0; i < Game.getGameBoard().length ; i++){
  for(let k = 0; k <= Game.getGameBoard()[i].length ; k++){
    let square = document.createElement('div');

    square.classList.add('gameboard-square');

    square.dataset.coord = `${i}-${k}`;

    square.addEventListener('click', (e) => getCoordinates(e))

    boardGame.appendChild(square);
  }
}

app.appendChild(boardGame);