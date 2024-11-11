import Player from './player';

class Gameboard{
  constructor(){
    this.board = [];
    this.turnPlayer = 'player1';

    for(let i = 0; i < 10 ;i++){
      this.board[i] = new Array(9).fill(0);
    }

    this.player1 = new Player(this.board, 'player 1');
    this.player2 = new Player(this.board, 'player 2');
  }

  changeTurnPlayer(){
   if(this.turnPlayer === 'player1'){
    this.turnPlayer = 'player2';
   }else{
    this.turnPlayer = 'player1';
   }
  }

  identifyPlayer = () => {
    return this.turnPlayer == 'player1'?
    this.player1 : this.player2
  }

  reaceiveAttack(coordinates){
    debugger
    let result = this.identifyPlayer().receiveAttack(coordinates);
    if(result){
      return true
    }else{
      this.changeTurnPlayer();
      return false
    }
  }

  getGameBoard(){
    return this.board;
  }
}

export default Gameboard;