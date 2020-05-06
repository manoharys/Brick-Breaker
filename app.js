const container = document.querySelector('.container');
const score = document.querySelector('.score');
const lives = document.querySelector('.lives');
const gameArea = document.querySelector('.gameArea');
const startScreen = document.querySelector('.startScreen');
const gameMessage = document.querySelector('.gameMessage');

//adding eventListener to the startScreen
startScreen.addEventListener('click', start);


//function which starts the gamePlay
function start() {
    startScreen.classList.add('hide');
    container.classList.remove('hide');

}