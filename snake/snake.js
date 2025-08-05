let canvas = document.querySelector("canvas");
const graphics = canvas.getContext("2d");
const apple = new Image()
apple.src = 'apple.png'
/*  VARIABLES    */
let round = 3;
let blocksdrawn = 0;
let x = 0
let y = 0
let foodx = 0
let foody = 0

/*  FUNCTIONS   */
function drawblocks(){
    blocksdrawn = 0;
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
        }
    }
}
function decideBlock(change){
    if(change==true){
        foodx = Math.floor(Math.random()*blocksdrawn*100)
        foody = Math.floor(Math.random()*blocksdrawn*100)
    }
}
function drawFood(){
    graphics.drawImage(apple,foodxy,foodxy,1250/blocksdrawn,1250/blocksdrawn)
}
function animate(){
    drawblocks();
    drawFood();
}

//used to animate, continually draws whats in animate
let loop = window.setInterval(animate, 200)