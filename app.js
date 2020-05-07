const container = document.querySelector('.container');
const score = document.querySelector('.score');
const lives = document.querySelector('.lives');
const gameArea = document.querySelector('.gameArea');
const startScreen = document.querySelector('.startScreen');
const gameMessage = document.querySelector('.gameMessage');

//Global var
let paddle;
let ball;

//Object which tracks the key presses
let keys = {};

//Object which tracks player info
let player = {
    speed: 10,
    lives: 3,
    score: 0
}

//adding eventListener to the startScreen
startScreen.addEventListener('click', start);

//keyPress events
document.addEventListener('keydown', pressOn);
document.addEventListener('keyup', pressOff);

//function which return the keypress events
function pressOn(e) {
    keys[e.code] = true;
    console.log(keys);
}

function pressOff(e) {
    keys[e.code] = false;
    console.log(keys);

}


//function which starts the gamePlay
function start() {

    startScreen.classList.add('hide');
    container.classList.remove('hide');


    //Creating ball element
    ball = document.createElement('div')
    ball.classList.add('ball');
    gameArea.appendChild(ball);

    //Creating paddle 
    paddle = document.createElement('div');
    paddle.classList.add('paddle');
    gameArea.appendChild(paddle);

    //Getting offsets of paddle
    paddle.x = paddle.offsetLeft;
    paddle.y = paddle.offsetHeight;

    //Animation frame
    window.requestAnimationFrame(update);
}


//function which animates to run the game

function update() {

    if (keys.ArrowLeft && paddle.x > 0) {
        paddle.x -= player.speed;
    }
    if (keys.ArrowRight && paddle.x < (container.offsetWidth-paddle.offsetWidth)) {
        paddle.x += player.speed;
    }

    //updating its styles
    paddle.style.left = paddle.x + 'px';

    window.requestAnimationFrame(update);
}