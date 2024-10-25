import Player from './player';

class Gameboard{
  constructor(){
    this.board = [];

    for(let i = 0; i < 10 ;i++){
      this.board[i] = new Array(9).fill(0);
    }

    const player1 = new Player(this.board);
  }

  reaceiveAttack(coordinates){
    // needs to check the board to see if there was a hit
  }

  getGameBoard(){
    return this.board;
  }
}

export default Gameboard;