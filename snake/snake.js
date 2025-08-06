let canvas = document.querySelector("canvas");
const graphics = canvas.getContext("2d");
canvas.focus();
const apple = new Image()
apple.src = 'apple.png'
const snakeHeadL = new Image()
snakeHeadL.src = 'snake/SnakeHeadL.png'
const snakeHeadR = new Image()
snakeHeadR.src = 'snake/SnakeHeadR.png'
const snakeHeadU = new Image()
snakeHeadU.src = 'snake/SnakeHeadU.png'
const snakeHeadD = new Image()
snakeHeadD.src = 'snake/SnakeHeadD.png'
const tailu = new Image()
tailu.src = 'snake/SnakeTailU.png'
const taild = new Image()
taild.src = 'snake/SnakeTailD.png'
const tailL = new Image()
tailL.src = 'snake/SnakeTailL.png'
const tailr = new Image()
tailr.src = 'snake/SnakeTailR.png'
const LRbody = new Image()
LRbody.src = 'snake/SnakebodyLR.png'
const UDbody = new Image()
UDbody.src = 'snake/SnakebodyUD.png'
const turn = new Image()
turn.src = 'snake/SnakeTurn.png'
document.addEventListener('keydown', getKeyInput);
/*  VARIABLES    */
let blocks = []
let snake = []
let round = 3;
let blocksdrawn = 0;
let blockheight = 0
let blockwidth = 0
let x = 0
let y = 0
let foodx = 0
let foody = 0
let snakex = 0
let snakey = 0
let speed = 5
let moveUp = false
let moveLeft = false
let moveDown = false
let moveRight = false
let snakedir = 'left'
let levelStart = false
let snakebody = 1
let turning = 'none'


/*  FUNCTIONS   */
function drawblocks(){
    blocksdrawn = 0;
    blockheight = canvas.height/(round+2)
    blockwidth = canvas.width/(round+2) 
    for(i=0;i<round+2;i++){
        for(a=0;a<round+2;a++){
            graphics.fillStyle="green"
            graphics.strokeStyle="black"
            let blockheight = canvas.height/(round+2)
            let blockwidth = canvas.width/(round+2) 
            x=i*blockwidth
            y=a*blockheight
            graphics.fillRect(x,y,blockwidth,blockheight)
            graphics.strokeRect(x,y,blockwidth,blockheight)
            blocksdrawn+=1
            if(blocks.length<blocksdrawn){
                blocks.push([x,y]);
            }
        }
    }
}
function reset(){
    snakex=500-blockwidth
    snakey=500-blockheight
    moveUp = moveLeft = moveDown = moveRight = false
    snakedir = 'left'
    eat(true)
}
function eat(change){
    if(change==true){
        let random = Math.floor(Math.random()*blocksdrawn)
        for(i=0;i<snake.length;i++){
            if(blocks[random][0]==snake[i].x && blocks[random][1]==snake[i].y){
                window.setInterval(eat(true))
            }else{
                foodx = blocks[random][0]
                foody = blocks[random][1]
            }
        }
    }
}
function drawFood(x,y){
    graphics.drawImage(apple,x,y,blockwidth,blockheight)
}
function showWin(){
    graphics.fillStyle = 'red'
    graphics.fillRect(50,50,400,400)
    graphics.fillStyle='black'
    graphics.font = '60px Arial';
    graphics.fillText('YOU WIN!!!',100,250)
}
function animate(){
drawblocks();
if(!levelStart){
    reset();
    snake = [
        {x: snakex, y: snakey, direction: 'left'}, // head
        {x: snakex + blockwidth*2, y: snakey, direction: 'left'} // tail
    ]
    eat(true);
    levelStart=true
}

if (snake.length < blocks.length) {
    drawFood(foodx, foody);
    updateSnakePosition();
    drawSnake(snakex, snakey, snakedir);

    if(snake[0].x == foodx && snake[0].y == foody){
        const last = snake[snake.length - 1];
        snake.push({ x: last.x, y: last.y, direction: last.direction });
        eat(true);
        console.log("Food eaten! Snake length:", snake.length);
    }
    }else {
            showWin(); // show win only when snake fills all blocks
        }
    }

function updateSnakePosition() {
    // Move body from tail to head (backwards)
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
        snake[i].direction = snake[i - 1].direction;
    }

    // Update head position
    let head = snake[0];
    if (moveUp) {
        head.y -= blockheight;
        head.direction = 'up';
    }
    if (moveDown) {
        head.y += blockheight;
        head.direction = 'down';
    }
    if (moveLeft) {
        head.x -= blockwidth;
        head.direction = 'left';
    }
    if (moveRight) {
        head.x += blockwidth;
        head.direction = 'right';
    }
}
function getKeyInput(event){
    if((event.key == 'w' || event.key == 'ArrowUp') && (moveDown!=true)){
            for (let i = 0; i < snake.length; i++) {
                let part = snake[i]
                if (i == 0) {
                    // Head
                    if (part.direction == 'left') graphics.drawImage(snakeHeadL, part.x, part.y, blockwidth, blockheight);
                    if (part.direction == 'right') graphics.drawImage(snakeHeadR, part.x, part.y, blockwidth, blockheight);
                    if (part.direction == 'up') graphics.drawImage(snakeHeadU, part.x, part.y, blockwidth, blockheight);
                    if (part.direction == 'down') graphics.drawImage(snakeHeadD, part.x, part.y, blockwidth, blockheight);
                } else if (i == snake.length - 1) {
                    // Tail
                    if (part.direction == 'left') graphics.drawImage(tailL, part.x, part.y, blockwidth, blockheight);
                    if (part.direction == 'right') graphics.drawImage(tailr, part.x, part.y, blockwidth, blockheight);
                    if (part.direction == 'up') graphics.drawImage(tailu, part.x, part.y, blockwidth, blockheight);
                    if (part.direction == 'down') graphics.drawImage(taild, part.x, part.y, blockwidth, blockheight);
                }if(moveup!=true){
                    graphics.drawImage(turn,part.x,part.y,blockwidth,blockheight)
                }   
        moveUp = true;
        moveDown = moveRight = moveLeft = false;
    }
    if((event.key == 'a' || event.key == 'ArrowLeft') && (moveRight!=true)){
        turning = 'left'
        moveLeft = true;
        moveDown = moveRight = moveUp = false;
    }
    if((event.key == 's' || event.key == 'ArrowDown') && (moveUp!=true)){
        turning = 'down'
        moveDown = true;
        moveUp = moveRight = moveLeft = false;
    }
    if((event.key == 'd' || event.key == 'ArrowRight') && (moveLeft!=true)){
        turning = 'right'
        moveRight = true;
        moveDown = moveUp = moveLeft = false;
    }
}
}
function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        let part = snake[i];
        if (i == 0) {
            // Head
            if (part.direction == 'left') graphics.drawImage(snakeHeadL, part.x, part.y, blockwidth, blockheight);
            if (part.direction == 'right') graphics.drawImage(snakeHeadR, part.x, part.y, blockwidth, blockheight);
            if (part.direction == 'up') graphics.drawImage(snakeHeadU, part.x, part.y, blockwidth, blockheight);
            if (part.direction == 'down') graphics.drawImage(snakeHeadD, part.x, part.y, blockwidth, blockheight);
        } else if (i == snake.length - 1) {
            // Tail
            if (part.direction == 'left') graphics.drawImage(tailL, part.x, part.y, blockwidth, blockheight);
            if (part.direction == 'right') graphics.drawImage(tailr, part.x, part.y, blockwidth, blockheight);
            if (part.direction == 'up') graphics.drawImage(tailu, part.x, part.y, blockwidth, blockheight);
            if (part.direction == 'down') graphics.drawImage(taild, part.x, part.y, blockwidth, blockheight);
        }
    }

}
//used to animate, continually draws whats in animate
let loop = window.setInterval(animate, 350)