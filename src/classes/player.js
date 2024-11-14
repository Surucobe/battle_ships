import Ship from "./ship";

class Player{
  constructor(playerName){
    this.board = [];
    this.name = playerName;
    this.score = 0;

    for(let i = 0; i < 10 ;i++){
      this.board[i] = new Array(9).fill(0);
    }

    // implementation of this using the DOM will be done in the future
    this.ships = [
      new Ship(5, 'Titan', [[5,1], [5,2], [5,3], [5,4], [5,5]]),
      new Ship(4, 'Colosse', [[4,1], [4,2], [4,3], [4,4]]),
      new Ship(3, 'Espoir', [[3,1], [3,2], [3,3]]),
      new Ship(2, 'Ardent', [[2,1], [2,2]]),
      new Ship(2, 'Superbe', [[1,1], [1,2]])
    ];

    this.placeShips();
  };

  getShips(){
    return this.ships;
  };

  placeShips(){
   this.ships.forEach(ship => {
     let position = ship.position;
     
    for(let i = 0; i < position.length ; i++){
      this.board[position[i][0]][position[i][1]] = ship;
    };
   });
  };

  remainingShips(){
    return this.ships.length
  }

  removeSunkenShip(coord){
    this.ships.forEach(ship => {
      if(JSON.stringify(ship) == JSON.stringify(this.board[coord[0]][coord[1]])){
        this.ships.splice(this.ships.indexOf(ship), 1);
      }
    })
  }

  receiveAttack(coord){
    debugger
    if(this.board[coord[0]][coord[1]] == null) return false;

    if(this.board[coord[0]][coord[1]] !== 0){
      this.board[coord[0]][coord[1]].hit();
      this.score = this.score + 10;
      
      if(this.board[coord[0]][coord[1]].isSunk()){
        console.log(`The ${this.board[coord[0]][coord[1]].name} has been sunked!`);
        this.removeSunkenShip(coord);
      }

      this.board[coord[0]][coord[1]] = null;
      return true;
    };

    this.board[coord[0]][coord[1]] = null;

    return false;
  };
}

export default Player;