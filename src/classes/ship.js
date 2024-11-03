class Ship{
  constructor(length, name, position){
    this.name = name;
    this.length = length;
    this.hp = length;
    this.sunk = false;
    this.position = position;
  }

  hit(){
    this.hp--;
    this.isSunk();
    return this.hp;
  }

  isSunk(){
    if(this.hp === 0){
      this.sunk = true
    }
    return this.sunk;
  }
}

export default Ship;