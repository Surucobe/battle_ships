import Player from "./player";
import Ship from "./ship";

class Computer extends Player {
  constructor(props) {
    super(props);

    this.ships = this.generateShips();
  }

  generateCoordinates() {
    let coord = [[Math.floor(Math.random() * 9)],[Math.floor(Math.random() * 9)]];

    if(this.board[coord[0]][coord[1]] === null) this.generateCoordinates();
    return coord;
  };

  generateShipPosition(number){
    let arr = [];
    let startingPosition = this.generateCoordinates();
    const direction = Math.floor(Math.random());
    
    //TODO: make sure there is enough space for placing the ships
    //TODO: handle how will the position of the ships work
    for(let i = 0; i < number; i++){
      arr.push([startingPosition[0], startingPosition[1]]);
      startingPosition[direction]+1;
    }
  }

  generateShips(){
    const ships = []

    [
      new Ship(5, 'Titan', [[6,1], [6,2], [6,3], [6,4], [6,5]]),
      new Ship(4, 'Colosse', [[7,1], [7,2], [7,3], [7,4]]),
      new Ship(3, 'Espoir', [[3,1], [3,2], [3,3]]),
      new Ship(2, 'Ardent', [[2,1], [2,2]]),
      new Ship(2, 'Superbe', [[1,1], [1,2]])
    ]

    return ships;
  }

  receiveAttack(coord){
    if(this.board[coord[0]][coord[1]] == null) return false;

    if(this.board[coord[0]][coord[1]] !== 0){
      this.board[coord[0]][coord[1]].hit();
      
      if(this.board[coord[0]][coord[1]].isSunk()){
        console.log(`The ${this.board[coord[0]][coord[1]].name} has been sunked!`);
        this.removeSunkenShip(coord);
      }

      this.board[coord[0]][coord[1]] = null;
      return true
    };

    this.board[coord[0]][coord[1]] = null;

    return false
  };

  makeAttack(){
    let coord = this.generateCoordinates();
    if(this.board[coord[0]][coord[1]] == null) return false;

    if(this.board[coord[0]][coord[1]] !== 0){
      this.board[coord[0]][coord[1]].hit();
      this.score = this.score + 10;
      
      if(this.board[coord[0]][coord[1]].isSunk()){
        console.log(`The ${this.board[coord[0]][coord[1]].name} has been sunked!`);
        this.removeSunkenShip(coord);
      }

      this.board[coord[0]][coord[1]] = null;
      return {status: true, coordinates: coord};
    };

    this.board[coord[0]][coord[1]] = null;

    return {status: false, coordinates: coord};
  };
}

export default Computer;