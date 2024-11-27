import Player from "./player";

class Computer extends Player {
  constructor(props, ships) {
    super(props, ships);
  }

  generateCoordinates() {
    let coord = [[Math.floor(Math.random() * 9)],[Math.floor(Math.random() * 9)]];

    if(this.board[coord[0]][coord[1]] === null) this.generateCoordinates();
    console.log('i made an attack')
    return coord;
  };

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