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

  testValideSpace(space, direction){
    
  }

  generateShipPosition(number){
    let arr = [];
    let startingPosition = this.generateCoordinates();
    const direction = Math.floor(Math.random());
    
    this.testValideSpace(startingPosition, direction);

    //TODO: make sure there is enough space for placing the ships
    //TODO: handle how will the position of the ships work
    for(let i = 0; i < number; i++){
      arr.push([startingPosition[0], startingPosition[1]]);
      startingPosition[direction]+1;
    }
  }

  generateShips(){
    const ships = []

    for(let i = 2; i < 6; i++){
      ships.push(this.generateShipPosition(i));
    }

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