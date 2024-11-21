import Player from './player';
import Computer from './computer';

class Gameboard{
  constructor(playerTwo = false){
    this.board = [];
    this.turnPlayer = 'player1';

    for(let i = 0; i < 10 ;i++){
      this.board[i] = new Array(9).fill(0);
    }

    this.player1 = new Player('player 1');
    if(playerTwo){
      this.player2 = new Player('player 2');
    }else{
      this.player2 = this.cp = new Computer();
    }
  }

  checkGameState(){
    return {
      p1: this.player1.remainingShips(),
      p2: this.player2.remainingShips()
    }
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