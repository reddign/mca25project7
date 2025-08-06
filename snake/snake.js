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
document.addEventListener('keydown', getKeyInput);
/*  VARIABLES    */
let blocks = []
let round = 3;
let blocksdrawn = 0;
let x = 0
let y = 0
let foodx = 0
let foody = 0
let snakex = 400
let snakey = 400
let blockheight = 0
let blockwidth = 0
let speed = 5
let moveUp = false
let moveLeft = false
let moveDown = false
let moveRight = false
let snakedir = 'left'

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
function eat(change){
    if(change==true){
        foodx = blocks[Math.floor(Math.random(blocksdrawn))[0]]
        foody = blocks[Math.floor(Math.random(blocksdrawn))[1]]
    }
}
function drawFood(){
    graphics.drawImage(apple,foodx,foody,blockwidth,blockheight)
}
function animate(){
    drawblocks();
    drawFood();
    move();
    drawSnake(snakex,snakey,snakedir);
    for(i=0;i<blocks.length;i++){
        if((snakex<=blocks[i[0]]+blockwidth && snakey<=blocks[i[1]] //top right corner
            || snakex<=blocks[i[0]] && snakey<=blocks[i[1]] //top left corner
            || snakex<=blocks[i[0]] && snakey<=blocks[i[1]]+blockheight //bottom left corner
            || snakex<=blocks[i[0]]+blockwidth && snakey<=blocks[i[1]]+blockheight //bottom right corner
        ) && (foodx<=blocks[i[0]]+blockwidth && foody<=blocks[i[1]] //top right corner
            || foodx<=blocks[i[0]] && foody<=blocks[i[1]] //top left corner
            || foodx<=blocks[i[0]] && foody<=blocks[i[1]]+blockheight //bottom left corner
            || foodx<=blocks[i[0]]+blockwidth && foody<=blocks[i[1]]+blockheight //bottom right corner
        )){
            eat(true)
        }
    }
}
function move(event){
    if(moveUp==true){
        if(snakey>0){
            snakey-=speed
            snakedir='up'
        }
    }
    if(moveLeft==true){
        if(snakex>0){
            snakex-=speed
            snakedir='left'
        }
    }
    if(moveDown==true){
        if(snakey<500){
            snakex+=speed
            snakedir='down'
        }
    }
    if(moveRight==true){
        if(snakex<500){
            snakex+=speed
            snakedir='right'
        }
    }
}
function getKeyInput(event){
    console.log("key: "+event.key)
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
    console.log(snakey + " " + snakex);
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
let loop = window.setInterval(animate, 100)