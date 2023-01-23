// Inicial data

let map = {
  a1: '', a2: '', a3: '',
  b1: '', b2: '', b3: '',
  c1: '', c2: '', c3: ''
};
let running = false;
let turn = 'x';
let result = '';
reset();

// Events

document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', itemClick);
});

// Functions

function itemClick(event) {
  let item = event.target.getAttribute('data-item');
  if(running && map[item] === '') {
    map[item] = turn;
    renderMap();
    toggleTurn();
  }
}
function reset() {
  let random = Math.floor(Math.random() * 2);
  turn = (random === 0) ? 'o' : 'x';
  for(let i in map) {
    map[i] = '';
  }
  running = true;
  
  renderMap();
  renderInfo();
  result = '';

}

function renderMap() {
  for(let i in map) {
    let item = document.querySelector(`div[data-item=${i}]`);
    item.innerHTML = map[i];
    document.querySelector('.inforesult').style.opacity = 0;
  }
    checkGame();
}
function renderInfo() {
  document.querySelector('.turn').innerHTML = turn;
  document.querySelector('.result').innerHTML = result;
}
function toggleTurn () {
  turn === 'o' ? turn = 'x' : turn ='o';
  renderInfo();
  }
function checkGame() {
   if(checkWinner('o')) {
    document.querySelector('.inforesult').style.opacity = 1;
    result = 'Parabéns jogador "o", você foi o vencedor!';
    running = false;
  } else if (checkWinner('x')) {
     document.querySelector('.inforesult').style.opacity = 1;
     result = 'Parabéns jogador "x", você foi o vencedor!';
     running = false;
    } else if (fullMap()) {
     document.querySelector('.inforesult').style.opacity = 1;
    result = 'Que disputa equilibrada! Deu empate!';
    running = false;
   }
}
function checkWinner(turn) {
  let chances = [
    'a1,a2,a3',
    'b1,b2,b3',
    'c1,c2,c3',
    'a1,b1,c1',
    'a2,b2,c2',
    'a3,b3,c3',
    'a1,b2,c3',
    'c1,b2,a3'
  ];
  for(let w in chances) {
    let cArray = chances[w].split(','); // Cria 1 array para cada possibilidade
    let hasWon = cArray.every(option => map[option] === turn); // Checa se cada possibilidade está preenchida com o mesmo player
    if(hasWon) {
      return true;
    }
  }
  return false;
}

function fullMap() {
  for(let i in map) {
    if(map[i] === '') {
      return false;
    }
  }
  return true;
}
