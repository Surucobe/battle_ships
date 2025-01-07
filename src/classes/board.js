import Player from './player';
import Computer from './computer';

class Gameboard{
  constructor(){
    this.board = [];
    this.turnPlayer = 'player1';

    this.createBoard();

    this.player1
    this.player2

    this.player1Ready = false;
    this.player2Ready = false;
  }

  restartGame(){
    this.createBoard();

    this.player1 = new Player()
    this.player2 = new Player()
  }

  changeStatus(player){
    player === 'left' ?
    this.player1Ready = !this.player1Ready 
    : this.player2Ready = !this.player2Ready;
  }

  createBoard(){
    for(let i = 0; i < 10 ;i++){
      this.board[i] = new Array(9).fill(0);
    }
  }

  createPlayer(playerName, arr) {
    if(this.turnPlayer === 'player1') {
      this.player1 = new Player(playerName, arr);
    }else{
      this.player2 = new Player(playerName, arr);
    }
  }

  createComputerPlayer(){
    this.player2Ready = true;
    this.player2 = new Computer();
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
    return this.turnPlayer === 'player1'?
    this.player1 : this.player2
  }

  getOppositBoard = () => {
    return this.turnPlayer === 'player1'?
    this.player2 : this.player1
  }

  receiveAttack(coordinates){
    let result = this.getOppositBoard().receiveAttack(coordinates);

    if(result){
      this.identifyPlayer().increasecore();
      return true
    }else{
      this.changeTurnPlayer();
      return false
    }
  }

  computerMakeAttack(){
    let coordinates = this.player2.generateCoordinates();

    let result = this.getOppositBoard().receiveAttack(coordinates);
    if(result){
      this.identifyPlayer().increasecore();
    }else{
      this.changeTurnPlayer();
    }

    return { status: result, coordinates: coordinates }
  }

  getGameBoard(){
    return this.board;
  }
}

export default Gameboard;