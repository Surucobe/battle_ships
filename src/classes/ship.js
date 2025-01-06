class Ship{
  constructor(length, position){
    this.length = length;
    this.hp = length;
    this.sunk = false;
    this.position = position;
  }

  hit(){
    this.hp--;
  }

  isSunk(){
    if(this.hp === 0){
      this.sunk = true
    }
    return this.sunk;
  }
}

export default Ship;