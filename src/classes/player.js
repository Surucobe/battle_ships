import Ship from "./ship";

class Player{
  constructor(board){
    this.board = board;

    this.ships = [
      new Ship(5, 'Vengeful Spirit', [[5,1], [5,2], [5,3], [5,4], [5,5]]),
      new Ship(4, '', [[4,1], [4,2], [4,3], [4,4]]),
      new Ship(3, '', [[3,1], [3,2], [3,3]]),
      new Ship(2, '', [[2,1], [2,2]]),
      new Ship(2, '', [[1,1], [1,2]])
    ];

    this.placeShips()
  }

  getShips(){
    return this.ships;
  }

  placeShips(){
   this.ships.forEach(ship => {
     let position = ship.position
     
     position.forEach(coord => {
      this.board[coord[0]][coord[1]] = 1
    });
   });
  }
}

export default Player;