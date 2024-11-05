import Player from './player';

class Gameboard{
  constructor(){
    this.board = [];
    this.turnPlayer = 'player1';

    for(let i = 0; i < 10 ;i++){
      this.board[i] = new Array(9).fill(0);
    }

    this.player1 = new Player(this.board);
    this.player2 = new Player(this.board);
  }

  changeTurnPlayer(){
   if(this.turnPlayer === 'player1'){
    this.turnPlayer = 'player2';
   }else{
    this.turnPlayer = 'player1';
   }
  }

  turnPlayer(){}

  reaceiveAttack(coordinates){
    debugger
    //input coordinates
    // needs to check the board to see if there was a hit
    if(this.turnPlayer === 'player1'){
      let result = this.player1.receiveAttack(coordinates);
      while(result){
        this.reaceiveAttack(coordinates)
      }
    }else{
      this.player2
    }
  }

  getGameBoard(){
    return this.board;
  }

  currentGameState(){
    debugger

    return {
     player1_board: this.player1.getCurrentState()
    }
  }
}

export default Gameboard;