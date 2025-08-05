let canvas = document.querySelector("canvas");
const graphics = canvas.getContext("2d");
const img = new Image()
img.src = 'apple.png'
/*  VARIABLES    */
let round = 3;
let blocksdrawn = 0;

/*  FUNCTIONS   */
function drawblocks(){
    blocksdrawn = 0;
    for(i=0;i<round+2;i++){
        for(a=0;a<round+2;a++){
            graphics.fillStyle="green"
            graphics.strokeStyle="black"
            let blockheight = canvas.height/(round+2)
            let blockwidth = canvas.width/(round+2) 
            let x = i*blockwidth
            let y = a*blockheight
            graphics.fillRect(x,y,blockwidth,blockheight)
            graphics.strokeRect(x,y,blockwidth,blockheight)
            blocksdrawn+=1
        }
    }
}
function drawFood(){
    graphics.drawImage(img,100,100,1250/blocksdrawn,1250/blocksdrawn)
    
}
function animate(){
    drawblocks();
    drawFood();
}

//used to animate, continually draws whats in animate
let loop = window.setInterval(animate, 200)