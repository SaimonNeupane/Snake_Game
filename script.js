const GameBoard = document.querySelector("#GameBoard");
const ctx = GameBoard.getContext('2d');
const ScoreText = document.querySelector(".ScoreBoard");
const ResetBtn = document.querySelector(".Button");
const gameWidth = GameBoard.width;
const gameheight = GameBoard.height;
const BoardBackground = "whiten ";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = 'red';
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    // { x: unitSize * 4, y: 0 },
    // { x: unitSize * 3, y: 0 },
    // { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 }
];


window.addEventListener("keydown", changeDirection);
ResetBtn.addEventListener("click", resetGame);


gameStart();



function gameStart() {
    running = true;
    ScoreText.textContent = score;
    createFood();
    drawFood();
   nextTick();

}
function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            
            drawFood();
            moveSnake();
            drawSnake();
            
            
            
            checkGameOver();
            nextTick();
        }, 120);
    }
    else {
        displayGameOver();
    }
}
function createFood() {
    function randomFood(min, max) {
        let RandNum = Math.round(Math.random() * (max - min) / unitSize) * unitSize;
        return RandNum;

    }

    foodX = randomFood(0, gameWidth - unitSize);
    console.log(foodX);
    foodY = randomFood(0, gameheight - unitSize);
    console.log(foodY);
}
function clearBoard() {
    ctx.fillStyle = BoardBackground;
    ctx.clearRect(0, 0, gameWidth, gameheight);
}
function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
   
}
function moveSnake() {
    const head = {
        x: snake[0].x + xVelocity,
        y: snake[0].y +yVelocity
    };
    snake.unshift(head);
    //if food is eaten
    if(snake[0].x==foodX && snake[0].y==foodY){
        score+=1;
        ScoreText.textContent=score;
        createFood();

    }
    else{
        snake.pop();
    }
}
function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    });
}
function changeDirection(event) {
    const keyPressed=event.keyCode;
    console.log(keyPressed);
    const left=37;
    const right=39;
    const up=38;
    const down=40;
    const goingUp=(yVelocity==-unitSize)
    const goingDown=(yVelocity==+unitSize)
    const goingLeft=(xVelocity==-unitSize)
    const goingRight=(xVelocity==+unitSize)


    switch(true){
        case(keyPressed==left && !goingRight):
             xVelocity=-unitSize;
             yVelocity=0;
             break;
        case(keyPressed==right && !goingLeft):
             xVelocity=+unitSize;
             yVelocity=0;
             break;
        case(keyPressed==up && !goingDown):
             yVelocity=-unitSize;
             xVelocity=0;
             break;
        case(keyPressed==down && !goingUp):
             yVelocity=unitSize;
             xVelocity=0;
             break;
    }
 }
function checkGameOver() {
    switch(true){
        case(snake[0].x<0 ||snake[0].x>=gameWidth):
        running=false;
        break;  


        case(snake[0].y<0 || snake[0].y>=gameheight):
        running=false;
        break;
    }
    for(let i=1;i<snake.length;i++){
        if((snake[0].x ==snake[i].x) &&   (snake[0].y==snake[i].y)){
            console.log("collision")
            running=false;
        }
    }
 }
function displayGameOver() { 
    if(running=false){
        ScoreText.innerHTML=`${score} GAME OVER!!`
    }
}
function resetGame() { }

