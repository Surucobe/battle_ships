import Ship from "./ship";

class Player{
  constructor(board, playerName){
    this.board = board;
    this.name = playerName;

    // implementation of this using the DOM will be done in the future
    this.ships = [
      new Ship(5, 'Vengeful Spirit', [[5,1], [5,2], [5,3], [5,4], [5,5]]),
      new Ship(4, '', [[4,1], [4,2], [4,3], [4,4]]),
      new Ship(3, '', [[3,1], [3,2], [3,3]]),
      new Ship(2, '', [[2,1], [2,2]]),
      new Ship(2, '', [[1,1], [1,2]])
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

  getCurrentState(){
    return {
      board: this.board,
      ships: this.ships
    }
  };

  receiveAttack(coord){
    if(this.board[coord[0]][coord[1]] == null) return false;

    if(this.board[coord[0]][coord[1]] !== 0){
      this.board[coord[0]][coord[1]].hit();
      this.board[coord[0]][coord[1]] = null;
      return true;
    };

    this.board[coord[0]][coord[1]] = null;

    return false;
  };
}

export default Player;