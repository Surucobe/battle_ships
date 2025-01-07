import Ship from "./ship";

class Computer {
  constructor() {
    this.name = 'Computer';
    this.board = [];
    this.score = 0;

    for(let i = 0; i < 10 ;i++){
      this.board[i] = new Array(9).fill(0);
    }
    
    this.ships = [];
    this.status = false;
    this.generateShips();
  }

  generateStartingCoordinate() {
    let coord = [Math.floor(Math.random() * 9),Math.floor(Math.random() * 9)];

    if(this.board[coord[0]][coord[1]] !== 0) this.generateStartingCoordinate();
    return coord;
  };

  generateArrayWithShips(startPosition, direction, length){
    const returnThisArray = [];

    return returnThisArray;
  }

  generateShipPosition(num){
    let arr = [];
    
    let startingPosition = this.generateStartingCoordinate();
    const direction = Math.floor(Math.random());

    if(startingPosition[direction] + num >= 9){
      for(let i = 0; i < num; i++){
        if(arr.num === 0){
          arr.push(startingPosition);
        }else{
          arr.push(startingPosition.map((value, index) => {
            return index === direction? value-i
            :value
          }))
        }
      }
    }else{
      for(let i = 0; i < num; i++){
        if(arr.num === 0){
          arr.push(startingPosition);
        }else{
          arr.push(startingPosition.map((value, index) => {
            return index === direction? value+i
            :value
          }))
        }
      }
    }

    return arr;
  }

  generateShips(){
    const ships = [];
    let missingShips = 5;
    
    while(missingShips > 0){
      let newShipPosition = this.generateShipPosition(missingShips);

      if(ships.length === 0){
        ships.push(newShipPosition);
        missingShips--;
      }else{
        let overlap = newShipPosition.forEach(elm => ships.some(shipElm => shipElm === elm));
        if(!overlap){
          ships.push(newShipPosition);
          missingShips--;
        }
      }
    }
    
    ships.forEach(ship => {
      const newShip = new Ship(ship.length, ship);
      this.ships.push(newShip);
      
      newShip.position.forEach(coord => {
        this.board[coord[0]][coord[1]] = newShip;
      })
      debugger
    });
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