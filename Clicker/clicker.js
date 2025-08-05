let canvas = document.querySelector('canvas');
const graphics = canvas.getContext('2d');
let clickpwr = 1
let points = 0
let x = 650
let y = 275
let radius = 30

function animate(){
    clear()
    drawScore(points)
    button()
}
function one(event){
    points+=1
}
function clear(){
    graphics.fillStyle='lightBlue'
    graphics.fillRect(0, 0, 1250, 550)
}
function button(){
    graphics.fillStyle ="black"
    graphics.beginPath()
    graphics.arc(x, y, radius,0, Math.PI*2)
    graphics.fill()
    graphics.closePath()
}
function drawScore(points){
    graphics.fillStyle ='black'
    graphics.font = "bold 24px 'Arial', serif"
    graphics.fillText("Points: "+ points, 10, 30,100)
}

let loop = window.setInterval(animate, 16)