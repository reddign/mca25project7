let canvas = document.querySelector("canvas");
const graphics = canvas.getContext("2d");
let fps = 500
let sX = 0
let sY = 0
let snake = []
let snakeSpeedX = blocks
let snakeSpeedY = 0
let round = 0
let blocks = 20
let foodX = 0
let foodY = 0



function animate(){

}

function drawPart(x, y){
    graphics.fillStyle = brown
    graphics.beginPath()
    graphics.arc(x, y, radius,0, Math.PI*2)
    graphics.fill()
    graphics.closePath()
}


let loop = window.setInterval(animate, fps/1000)