import Gameboard from "./classes/board";

import './style/style.css';

let Game;
let disablePlay = false;
let computerPlayer = false;
let computerAttackMiss = true;

const app = document.getElementById('app');

window.addEventListener('animationend', (e) => {
  if(Game.identifyPlayer().name !== 'computer'){
    disablePlay = !disablePlay
  }
});

const message = document.createElement('div');
message.classList.add('message');

const score1 = document.createElement('div');
score1.classList.add('score');
score1.classList.add('score-one');

const score2 = document.createElement('div');
score2.classList.add('score');
score2.classList.add('score-two');

const boardGame = document.createElement('div');
boardGame.classList.add('gameboard');
boardGame.dataset.player = 'one';

const playerTwoBoard = document.createElement('div');
playerTwoBoard.classList.add('gameboard');
playerTwoBoard.classList.add('hidden');
playerTwoBoard.dataset.player = 'two';

// Modal to start the game with either one or two players
const startGame = document.createElement('div');
startGame.classList.add('game-starting-screen');

const startGameModal = document.createElement('div');
startGameModal.classList.add('game-modal');
startGame.appendChild(startGameModal);

const dismissScreen = () => startGame.style.display = 'none';

//SIDEBARS
function createSideBar(side){
  const playerSideBar = document.createElement('div');
  playerSideBar.classList.add('side-bar');
  playerSideBar.classList.add(side);
  
  const shipList = document.createElement('ul');
  
  for(let i = 0; i < 5; i++){
    const elm = document.createElement('div');
    elm.classList.add('coord-container');
    const name = document.createElement('h3');
    
    elm.appendChild(name);
    name.innerText = 'Ship';
    const shipCoordContainer = document.createElement('div');
    shipCoordContainer.dataset.length = 5 - i;
    elm.appendChild(shipCoordContainer);

    for(let k = 0; k < (5-i); k++){
      const coord = document.createElement('input');
      coord.setAttribute('maxlength', 3);
      shipCoordContainer.appendChild(coord);
    }

    shipList.appendChild(elm);
  }

  playerSideBar.appendChild(shipList);

  const playerSideBarButton = document.createElement('button');
  playerSideBarButton.innerText = 'Ready!';
  playerSideBar.appendChild(playerSideBarButton);
  playerSideBarButton.addEventListener('click', () => checkValidCoordinate(side));

  app.appendChild(playerSideBar);
}

function checkValidCoordinate(classname){
  debugger
  const inputs = Array.from(document.querySelector(`.${classname}`).querySelectorAll('input'));
  //check for empty spaces
  if(inputs.some(input => input.value == '')){
     alert('no field must be left empty')
     inputs.forEach(input => {
       if(input.value == ''){
         input.style.border = '2px solid red';
       }
     })
     return;
   }

   //check for valid format in coordinates
   if(!inputs.some(input => input.value.match(/^\d-\d$/))){
    inputs.forEach(input => {
      if(!input.value.match(/^\d-\d$/)){
        input.style.border = '2px solid red';
      }
    })
    return alert('Coordinates must be in the format of "number-number"');
   }

   // makes sure the coordinates for the boats work according to the rules
   debugger
     const list = document.querySelectorAll('.coord-container');
     list.forEach(elm => {
       const elmChecked = coherentCoordinates(elm);
       if(!elmChecked){
         return alert('Coordinates must be coherent');
        }
     })

   //add coordinates into a dataset in order to make them easier to pick up
   inputs.forEach(elm => elm.dataset.coord = elm.value);

   // check is there are any dupes
  const values = inputs.map(input => input.value);
  if(hasDuplicates(values)) {
    const dupes = returnDupes(values)

    dupes.forEach(dupe => {
      let elms = document.querySelectorAll(`input[data-coord="${dupe}"]`);

      for(let i = 0; i < elms.length ;i++){
        elms[i].style.backgroundColor = 'salmon';
      }

    })

    return alert("Can't place two boats on a same place");
  }

  console.log(sortedArr)
}

function returnDupes(array){
  const seen = new Set();
  const duplicates = new Set();

  array.forEach(item => {
    seen.has(item)? duplicates.add(item):
    seen.add(item)
  })

  return Array.from(duplicates);
}

function hasDuplicates(array){
  return new Set(array.map(input => input.value)).size !== array.length
}

function coherentCoordinates(list){
  const firstSet = new Set(list.map(elm => elm.querySelector('input').value.split('-')[0]));
  const secondSet = new Set(list.map(elm => elm.querySelector('input').value.split('-')[1]));

  for(const value of firstSet){
    if(value < 0 || value > 9){
      return false;
    }
  }
  for(const value of secondSet){
    if(value < 0 || value > 9){
      return false;
    }
  }

  if(firstSet.size == list.length){
    const array = Array.from(firstSet);

    for(let i = 0; i < array.length; i++){
      if(array.indexOf(array[0]) != 0) continue;
      if(Math.abs(array[i] - array[i-1]) != 1) return false;
    }

    if(secondSet.size == 1){
      return true;
    }
  }else{
    const array = Array.from(secondSet);

    for(let i = 0; i < array.length; i++){
      if(array.indexOf(array[0]) != 0) continue;
      if(Math.abs(array[i] - array[i-1]) != 1) return false;
    }

    if(firstSet.size == 1){
      return true;
    }
  }

  return false;
}

const playerTwoSideBar = document.createElement('div');
playerTwoSideBar.classList.add('side-bar');
playerTwoSideBar.classList.add('left');
const playerTwoSideBarButton = document.createElement('button');
playerTwoSideBarButton.innerText = 'Ready!'
playerTwoSideBar.appendChild(playerTwoSideBarButton);

//start the game with a single player
const onePlayerBtn = document.createElement('button');
onePlayerBtn.innerText = 'One Player'
onePlayerBtn.addEventListener('click', startPVCGame);

function startPVCGame(){
  dismissScreen();

  Game = gameStart();

  createTemplateBoard(Game.board, boardGame);

  // createBoardForPlayer(Game.player1.board, boardGame);
  // createComputerBoard(Game.player2.board, playerTwoBoard);

  createSideBar('left');

  computerPlayer = !computerPlayer;

  score1.innerHTML = 'P1: 0';
  score2.innerHTML = 'CP: 0';
}

startGameModal.appendChild(onePlayerBtn);

//start the game with two players
const twoPlayersBtn = document.createElement('button');
twoPlayersBtn.innerText = 'Two Players';
twoPlayersBtn.addEventListener('click', startPVPGame);

function startPVPGame(){
  dismissScreen();
  
  Game = gameStart(true);

  createTemplateBoard(Game.board, boardGame);

  // createBoardForPlayer(Game.player1.board, boardGame);
  // createBoardForPlayer(Game.player2.board, playerTwoBoard);


  createSideBar('right');
  createSideBar('left');

  score1.innerHTML = 'P1: 0';
  score2.innerHTML = 'P2: 0';
}

startGameModal.appendChild(twoPlayersBtn);


function gameStart(players = false) {
  return new Gameboard(players);
}

function messageVisibility(msg){
  message.innerHTML = msg;
  message.classList.toggle('fade-out');
  message.classList.toggle('fade-in');

  setTimeout(() => {
    message.classList.remove('fade-in');
    message.classList.add('fade-out');
  }, 1500)
}

function updateScore(){
  computerPlayer?
  Game.turnPlayer == 'player1'?
  score1.innerText = `P1: ${Game.identifyPlayer().score}`:
  score2.innerText = `CP: ${Game.identifyPlayer().score}`
  :
  Game.turnPlayer == 'player1'?
  score1.innerText = `P1: ${Game.identifyPlayer().score}`:
  score2.innerText = `P2: ${Game.identifyPlayer().score}`
}

function removeListener(elm){
  elm.removeEventListener('click', getCoordinates);
  elm.dataset.coord = '';
}

function succesAtkStyle(elm){
  elm.style.backgroundColor = 'lightgreen';
  elm.style.cursor = 'initial';
  elm.classList.remove('hover');
}

function failedAtkStyle(elm){
  elm.style.backgroundColor = 'lightcoral';
  elm.style.cursor = 'initial';
  elm.classList.remove('hover');
}

function endGameStyles(elm){
  if(elm.style.backgroundColor == ''){
    elm.style.backgroundColor = 'lightblue';
    elm.style.cursor = 'initial';
    elm.classList.remove('hover');
  }
}

function attackResults(result, elm) {
  if(result){
    succesAtkStyle(elm);
    removeListener(elm);
    updateScore();
    messageVisibility('Hit!');
    if(computerPlayer){
      setTimeout(getElmFromComputer(), 2000);
    }
  }else{
    failedAtkStyle(elm);
    removeListener(elm);
    setTimeout(changeBoardVisibility, 1500);
    messageVisibility('Miss!');
  }
};

function changeBoardVisibility(){
  if(computerPlayer){
    computerAttackMiss = !computerAttackMiss;
    if(!computerAttackMiss){
      getElmFromComputer();
    }
  }

  document.querySelectorAll('.gameboard').forEach(board => board.classList.toggle('hidden'));
}

function getCoordinates(elm){
  if(disablePlay) return;

  let coord = elm.target.dataset.coord.split('-');

  if(coord == '') return;

  disablePlay = !disablePlay;
  let result = Game.receiveAttack(coord);
  attackResults(result, elm.target);
  if(result) gameOver()
};

function getElmFromComputer(){
 let result = Game.computerMakeAttack();
 const board = document.querySelector('[data-player="two"]');
 let elm = board.querySelector(`[data-coord='${result.coordinates.join('-')}']`);
 attackResults(result.status, elm);
}

function gameOver() {
  let gameState = Game.checkGameState();

  if(gameState.p1 == 0 || gameState.p2 == 0){
  let playBoard = [...document.querySelectorAll('[data-coord]')];

  playBoard.forEach(elm => {
    removeListener(elm);
    endGameStyles(elm);
  })

    alert(`${Game.identifyPlayer().name} Won!`);
  }
}

function createBoardForPlayer(array, board){
  for(let i = 0; i < array.length ; i++){
    for(let k = 0; k <= array[i].length ; k++){
      let square = document.createElement('div');
  
      square.classList.add('gameboard-square');
      square.classList.add('hover');
  
      square.dataset.coord = `${i}-${k}`;
      square.innerText = `${i}-${k}`;
  
      square.addEventListener('click', (e) => getCoordinates(e))
  
      board.appendChild(square);
    }
  }
};

function createTemplateBoard(array, board){
  for(let i = 0; i < array.length ; i++){
    for(let k = 0; k <= array[i].length ; k++){
      let square = document.createElement('div');
  
      square.classList.add('gameboard-square');
      square.classList.add('hover');
  
      square.dataset.coord = `${i}-${k}`;
      square.innerText = `${i}-${k}`;
  
      square.addEventListener('click', (e) => getCoordinates(e))
  
      board.appendChild(square);
    }
  }
};

function createComputerBoard(array, board){
  for(let i = 0; i < array.length ; i++){
    for(let k = 0; k <= array[i].length ; k++){
      let square = document.createElement('div');
  
      square.classList.add('gameboard-square');
      square.classList.add('hover');
  
      square.dataset.coord = `${i}-${k}`;
      square.innerText = `${i}-${k}`;
  
      board.appendChild(square);
    }
  }
}

app.appendChild(message);
app.appendChild(score1);
app.appendChild(score2);
app.appendChild(boardGame);
app.appendChild(playerTwoBoard);
app.appendChild(startGame);