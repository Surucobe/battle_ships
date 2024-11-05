import Gameboard from "./classes/board";

const Game = new Gameboard();
console.log(Game.reaceiveAttack([4,3]))

const app = document.getElementById('app');
const boardGame = document.createElement('div');
boardGame.classList.add('gameboard');

for(let i = 0; i < Game.getGameBoard().length ; i++){
  for(let k = 0; k <= Game.getGameBoard()[i].length ; k++){
    let square = document.createElement('div');

    square.classList.add('gameboard-square');

    square.dataset.coord = `${i}-${k}`;

    boardGame.appendChild(square);
  }
}

app.appendChild(boardGame);