let canvas = document.querySelector('canvas');
const graphics = canvas.getContext('2d');
let clickpwr = 1
let points = 0
let x=0
let y=0
function animate(){
    clear()
    drawScore(points)
    button()
}
function move(event){
    let canvasrect = canvas.getBoundingClientRect()
    x = event.clientX - canvasrect.x
    y = event.clientY - canvasrect.y
}
function one(event){
    if(x>=590 && x<=710 && y>=210 && y<=335){
        points+=clickpwr
    }
}
function clear(){
    graphics.fillStyle='lightBlue'
    graphics.fillRect(0, 0, 1250, 550)
}
function button(){
    graphics.fillStyle ="black"
    graphics.beginPath()
    graphics.arc(650, 275, 60,0, Math.PI*2)
    graphics.fill()
    graphics.closePath()
}
function drawScore(points){
    graphics.fillStyle ='black'
    graphics.font = "bold 24px 'Arial', serif"
    graphics.fillText("Points: "+ points, 10, 30,100)
}

let loop = window.setInterval(animate, 16)