let canvas = document.querySelector("canvas");
const graphics = canvas.getContext("2d");
let sX = 0
let sY = 0
let snake = []
let snakeSpeedY = 0
let round = 3
let foodX = 0
let foodY = 0

function drawblocks(){
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
        }
    }
}
function drawfood(){

}
function animate(){
    drawblocks();
}


let loop = window.setInterval(animate, 200)