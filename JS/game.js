let blockSize = 18;
let total_row = 30; //total row number
let total_col = 30; //total column number
let board;
let context;

let sumPoints = 0;

let counter = 0;
let timer;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

// Set the total number of rows and columns
let speedX = 0;  //speed of snake in x coordinate.
let speedY = 0;  //speed of snake in Y coordinate.

let snakeBody = [];

let foodX;
let foodY;

let redFoodX;
let redFoodY;

let gameOver = false;

let speed = 0;

let highScore;

window.onload = function () {

    // Set board height and width
    board = document.querySelector("canvas");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");

    placeFood();

    document.addEventListener("keyup", changeDirection);  //for movements
    // Set snake speed

    const levels = document.querySelectorAll("button");

    let defult;

    levels[2].addEventListener("click", function () {
        clearInterval(quick);
        quick = setInterval(update, 1000 / 10);
    })
    levels[0].addEventListener("click", function () {
        clearInterval(quick);
        quick = setInterval(update, 2500 / 10);
    })
    levels[1].addEventListener("click", function () {
        clearInterval(quick);
        quick = setInterval(update, 1500 / 10);
    })

    defult = setInterval(update, 900 / 10);
    // createUserName();

    // localStorage.setItem("savedHighScore1", 10);
    savedHighScore = localStorage.getItem("savedHighScore1");
    highScore = document.getElementById("highScore");
    if (savedHighScore == undefined || savedHighScore == null) {
        savedHighScore = 0;
    }
    highScore.innerHTML = `high score:${savedHighScore}`;

}

function update() {
    if (gameOver) {
        return;
    }

    // Background of a Game
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    // Set food color and position
    context.fillStyle = "#2898e2";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // Set redFood color and position
    context.fillStyle = "red";
    context.fillRect(redFoodX, redFoodY, blockSize, blockSize);

    //Set clock
    let clock = document.getElementById("countdown");

    //Set points
    points = document.getElementById("points");

    if (snakeX == foodX && snakeY == foodY) {
        counter++;
        sumPoints = sumPoints + 5;
        points.innerText = "The points you scored: " + sumPoints;
        //Chack score
        if (sumPoints > savedHighScore) {
            localStorage.setItem("savedHighScore1", sumPoints)
            highScore.innerHTML = `high score:${sumPoints}`;
        }
        snakeBody.push([foodX, foodY]);
        if (counter === 3) {
            counter = 0;
            placeRedFood();
            let i = 5;
            timer = setInterval(function Timer() {
                i--;
                clock.innerHTML = `you have left : ${i} more seconds`;
                if (i == -1) {
                    clearInterval(timer);
                    clock.innerHTML = " ";
                    redFoodX = 'none';
                    redFoodY = 'none';
                }
            }, 1000)
        }
        placeFood();
    }

    if (snakeX == redFoodX && snakeY == redFoodY) {
        sumPoints = sumPoints + 10;
        points.innerText = "The points you scored: " + sumPoints;
        //Chack score
        if (sumPoints > savedHighScore) {
            localStorage.setItem("savedHighScore1", sumPoints)
            highScore.innerHTML = `high score:${sumPoints}`;
        }
        snakeBody.push([redFoodX, redFoodY]);
        clearInterval(timer);
        clock.innerHTML = " ";
        redFoodX = 'none';
        redFoodY = 'none';
    }

    // body of snake will grow
    for (let i = snakeBody.length - 1; i > 0; i--) {
        // it will store previous part of snake to the current part
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "white";
    snakeX += speedX * blockSize; //updating Snake position in X coordinate.
    snakeY += speedY * blockSize;  //updating Snake position in Y coordinate.
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0
        || snakeX > total_col * blockSize
        || snakeY < 0
        || snakeY > total_row * blockSize) {

        // Out of bound condition
        gameOver = true;
        window.location.href = "gameOver.html";

    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {

            // Snake eats own body
            gameOver = true;
            window.location.href = "gameOver.html";

        }
    }
}

// Movement of the Snake - We are using addEventListener
function changeDirection(e) {
    if (e.code == "ArrowUp" && speedY != 1) {
        // If up arrow key pressed with this condition...
        // snake will not move in the opposite direction
        speedX = 0;
        speedY = -1;
    }
    else if (e.code == "ArrowDown" && speedY != -1) {
        //If down arrow key pressed
        speedX = 0;
        speedY = 1;
    }
    else if (e.code == "ArrowLeft" && speedX != 1) {
        //If left arrow key pressed
        speedX = -1;
        speedY = 0;
    }
    else if (e.code == "ArrowRight" && speedX != -1) {
        //If Right arrow key pressed
        speedX = 1;
        speedY = 0;
    }
}

// Randomly place food
function placeFood() {

    // in x coordinates.
    foodX = Math.floor(Math.random() * total_col) * blockSize;

    //in y coordinates.
    foodY = Math.floor(Math.random() * total_row) * blockSize;
}

function placeRedFood() {

    // in x coordinates.
    redFoodX = Math.floor(Math.random() * total_col) * blockSize;

    //in y coordinates.
    redFoodY = Math.floor(Math.random() * total_row) * blockSize;
}
//--------------------------------------------



// function createUserName() {
//     console.log("123");
//     let cUser = JSON.parse(localStorage.getItem("cUser"));
//     let userName = document.createElement("div");
//     userName.classList.add("userName");
//     userName.innerText = "The current user: " + `${cUser.newuser.username} `;
//     document.body.appendChild(userName);
// }


