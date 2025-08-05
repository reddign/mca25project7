let canvas = document.querySelector('canvas');
const graphics = canvas.getContext('2d');
let clickpwr = 1
let points = 0
let x=0
let y=0
let objX = 650
let objY = 275
let radius = 60
let cost1 = 10
function animate(){
    clear()
    drawScore(points)
    button()
    drawUpgrades()
}
function move(event){
    let canvasrect = canvas.getBoundingClientRect()
    x = event.clientX - canvasrect.x
    y = event.clientY - canvasrect.y
}
function addpoints(event){
    if(Math.sqrt(Math.pow(objX-x,2)+Math.pow(objY-y,2))<=radius){
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
    graphics.arc(objX, objY, radius,0, Math.PI*2)
    graphics.fill()
    graphics.closePath()
}
function drawScore(points){
    graphics.fillStyle ='black'
    graphics.font = "bold 24px 'Arial', serif"
    graphics.fillText("Points: "+ points, 10, 30,100)
}

function drawUpgrades(){
    graphics.font('15px')
    graphics.fillStyle='black'
    graphics.fillText('+1 Click Power: '+ cost1, 20, 70)
}

let loop = window.setInterval(animate, 16)