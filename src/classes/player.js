import Ship from "./ship";

class Player{
  constructor(playerName, ships){
    this.board = [];
    this.name = playerName;
    this.score = 0;

    for(let i = 0; i < 10 ;i++){
      this.board[i] = new Array(9).fill(0);
    }
    // implementation of this using the DOM will be done in the future
    this.ships = 
    ships.map(arr => arr.map(coord => coord.split('-')))
    .map(ship => new Ship(ship.length, ship));

    this.placeShips();
  };

  getShips(){
    return this.ships;
  };

  placeShips(){
   this.ships.forEach(ship => {
     let position = ship.position;
     
    for(let i = 0; i < ship.length; i++){
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

  increasecore(){
    this.score = this.score + 10;
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
      return true;
    };

    this.board[coord[0]][coord[1]] = null;

    return false;
  };
}

export default Player;