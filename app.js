const container = document.querySelector('.container');
const score = document.querySelector('.score');
const lives = document.querySelector('.lives');
const gameArea = document.querySelector('.gameArea');
const startScreen = document.querySelector('.startScreen');
const gameMessage = document.querySelector('.gameMessage');

console.log(startScreen.getBoundingClientRect())
let conDim = gameArea.getBoundingClientRect();

console.log(conDim)
//Global var
let paddle;
let ball;

//Object which tracks the key presses
let keys = {};

//Object which tracks player info
let player = {
    speed: 10,
    lives: 3,
    score: 0,
    gameOver: true
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
    if (player.gameOver) {
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

        //Bricks
        setupBricks(40);

        //Animation frame
        window.requestAnimationFrame(update);

        //score and lives
        player.score = 0;
        player.lives = 3;
    }

}
//function which animates to run the game
function update() {

    if (keys.ArrowLeft && paddle.x > 0) {
        paddle.x -= player.speed;
    }
    if (keys.ArrowRight && paddle.x < (container.offsetWidth - (paddle.offsetWidth + 20))) {
        paddle.x += player.speed;
    }

    //updating its styles
    paddle.style.left = paddle.x + 'px';

    //updating score
    player.score++;
    scoreUpdator();

    window.requestAnimationFrame(update);
}

//Function which updates the score..
function scoreUpdator() {
    score.innerHTML = "Score :" + player.score;
}
//Function which updates the lives..
function livesUpdator() {
    lives.innerHTML = "Lives :" + player.lives;
}

//Creating bricks
function setupBricks(num) {
    let row = {
        x: ((gameArea.offsetWidth % 100) / 2),
        y: 50
    }
    for (let x = 0; x < num; x++) {
        console.log(row);
        if (row.x > (gameArea.offsetWidth -100)) {
            row.y += 50;
            row.x = ((gameArea.offsetWidth % 100) / 2);
        }
        row.count = x;
        createBrick(row);
        row.x += 100;
    }
}

function createBrick(pos) {
    const div = document.createElement('div');
    div.setAttribute('class', 'brick');
    div.style.backgroundColor = rColor();
    div.style.left = pos.x + 'px';
    div.style.top = pos.y + 'px';
    div.innerHTML = pos.count + 1;
    gameArea.appendChild(div);
}

//Function which returns random hex colors
function rColor() {
    return '#' + Math.random().toString(16).substr(-6);
}