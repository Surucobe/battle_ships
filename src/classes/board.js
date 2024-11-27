import Player from './player';
import Computer from './computer';
import Ship from './ship';

class Gameboard{
  constructor(playerTwo = false){
    this.board = [];
    this.turnPlayer = 'player1';

    for(let i = 0; i < 10 ;i++){
      this.board[i] = new Array(9).fill(0);
    }

    this.player1 = new Player(
      'player 1',
      [
        new Ship(5, 'Titan', [[5,1], [5,2], [5,3], [5,4], [5,5]]),
        new Ship(4, 'Colosse', [[4,1], [4,2], [4,3], [4,4]]),
        new Ship(3, 'Espoir', [[3,1], [3,2], [3,3]]),
        new Ship(2, 'Ardent', [[2,1], [2,2]]),
        new Ship(2, 'Superbe', [[1,1], [1,2]])
      ]
    );

    if(playerTwo){
      this.player2 = new Player(
        'player 2',
        [
          new Ship(5, 'Titan', [[6,1], [6,2], [6,3], [6,4], [6,5]]),
          new Ship(4, 'Colosse', [[7,1], [7,2], [7,3], [7,4]]),
          new Ship(3, 'Espoir', [[3,1], [3,2], [3,3]]),
          new Ship(2, 'Ardent', [[2,1], [2,2]]),
          new Ship(2, 'Superbe', [[1,1], [1,2]])
        ]
      );
    }else{
      this.player2 = new Computer(
        'computer',
        [
          new Ship(5, 'Titan', [[6,1], [6,2], [6,3], [6,4], [6,5]]),
          new Ship(4, 'Colosse', [[7,1], [7,2], [7,3], [7,4]]),
          new Ship(3, 'Espoir', [[3,1], [3,2], [3,3]]),
          new Ship(2, 'Ardent', [[2,1], [2,2]]),
          new Ship(2, 'Superbe', [[1,1], [1,2]])
        ]
      )
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
    return this.turnPlayer === 'player1'?
    this.player1 : this.player2
  }

  getOppositeBoard = () => {
    return this.turnPlayer === 'player1'?
    this.player2 : this.player1
  }

  receiveAttack(coordinates){
    let result = this.getOppositeBoard().receiveAttack(coordinates);

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

    let result = this.getOppositeBoard().receiveAttack(coordinates);
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