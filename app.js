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
        player.ballDir = [5, 5];

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

    //moving ball
    moveBall();

    //updating its styles
    paddle.style.left = paddle.x + 'px';

    //updating score


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

    let skip = false;
    for (let x = 0; x < num; x++) {
        console.log(row);
        if (row.x > (gameArea.offsetWidth - 100)) {
            row.y += 50;
            if (row.y > (gameArea.offsetHeight / 2)) {
                skip = true
            }
            row.x = ((gameArea.offsetWidth % 100) / 2);
        }
        row.count = x;
        if (!skip) {
            createBrick(row);
        }
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

//Moving ball with different direction
function moveBall() {
    let posBall = {
        x: ball.offsetLeft,
        y: ball.offsetTop
    }
    if (posBall.y > (gameArea.offsetHeight - 20) || posBall.y < 0) {
        player.ballDir[1] *= -1;
    }
    if (posBall.x > (gameArea.offsetWidth - 40) || posBall.x < 0) {
        player.ballDir[0] *= -1;
    }

    if (isCollide(paddle, ball)) {
        let temp = ((posBall.x - paddle.offsetLeft) - (paddle.offsetWidth / 2)) / 10;
        console.log('hit');
        player.ballDir[0] = temp;
        player.ballDir[1] *= -1;
    };
    let bricks = document.querySelectorAll('.brick');
    for (let tBrick of bricks) {
        if (isCollide(tBrick, ball)) {
            player.ballDir[1] *= -1;
            tBrick.parentNode.removeChild(tBrick);
            player.score += 100;
            scoreUpdator();
        }
    }
    posBall.y += player.ballDir[1];
    posBall.x += player.ballDir[0];
    ball.style.top = posBall.y + 'px';
    ball.style.left = posBall.x + 'px';
}

//Function which returns collision detection
function isCollide(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !((aRect.right < bRect.left) || (aRect.left > bRect.right) || (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom));
}