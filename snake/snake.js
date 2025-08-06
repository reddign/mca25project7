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
const snakeHeadD = new Image()
snakeHeadD.src = 'snake/SnakeHeadD.png'
const tail = new Image()
tail.src = 'snake/SnakeTail.png'
document.addEventListener('keydown', getKeyInput);
/*  VARIABLES    */
let blocks = []
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
let snakebody = 0
let turning = false


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
        foodx = blocks[random][0]
        foody = blocks[random][1]
        console.log("random: " + random)
        console.log("foodx: " + foodx)
        console.log("foody: " + foody)
    }
}
function drawFood(x,y){
    graphics.drawImage(apple,x,y,blockwidth,blockheight)
}
function animate(){
    drawblocks();
    if(!levelStart){
        reset();
        eat(true);
        levelStart=true
    }
    drawFood(foodx,foody);
    move();
    drawSnake(snakex,snakey,snakedir);
    if(snakex == foodx && snakey == foody){
        eat(true)
        console.log(foodx,foody)
    }
}
function move(event){
    if(moveUp==true){
        if(snakey>0){
            snakey-=blockheight
            snakedir='up'
        }
    }
    if(moveLeft==true){
        if(snakex>0){
            snakex-=blockwidth
            snakedir='left'
        }
    }
    if(moveDown==true){
        if(snakey<500-blockheight){
            snakey+=blockheight
            snakedir='down'
        }
    }
    if(moveRight==true){
        if(snakex<500-blockwidth){
            snakex+=blockwidth
            snakedir='right'
        }
    }
}
function getKeyInput(event){
    if(event.key == 'w' || event.key == 'ArrowUp'){
        moveUp = true;
        moveDown = moveRight = moveLeft = false;
    } 
    if(event.key == 'a' || event.key == 'ArrowLeft'){
        moveLeft = true;
        moveDown = moveRight = moveUp = false;
    }
    if(event.key == 's' || event.key == 'ArrowDown'){
        moveDown = true;
        moveUp = moveRight = moveLeft = false;
    }
    if(event.key == 'd' || event.key == 'ArrowRight'){
        moveRight = true;
        moveDown = moveUp = moveLeft = false;
    }
}
function drawSnake(x,y,facing){
    if(facing == 'left'){
        console.log('left');
        graphics.drawImage(snakeHeadL,x,y,blockwidth,blockheight)
    }
    if(facing == 'right'){
        console.log('right');
        graphics.drawImage(snakeHeadR,x,y,blockwidth,blockheight)
    }
    if(facing == 'up'){
        console.log('up');
        graphics.drawImage(snakeHeadU,x,y,blockwidth,blockheight)
    }
    if(facing == 'down'){
        console.log('down');
        graphics.drawImage(snakeHeadD,x,y,blockwidth,blockheight)
    }
}
//used to animate, continually draws whats in animate
let loop = window.setInterval(animate, 350)