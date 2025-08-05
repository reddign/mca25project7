let canvas = document.querySelector('canvas');
const graphics = canvas.getContext('2d');
let clickpwr = 1
let autoclick = 0
let points = 0
let x=0
let y=0
let objX = 650
let objY = 275
let radius = 60
let cost1 = 10
let cost2 = 25
let cost3 = 50
let cost4 = 100
let speed = 1000
const bronze = new Image()
bronze.src = 'BronzeFin.png'
const diamond = new Image()
diamond.src = 'DiamondFin.png'
const silver = new Image()
silver.src = 'SilverFin.png'
const gold = new Image()
gold.src = 'GoldFin.png'
function animate(){
    clear()
    drawScore(points)
    button()
    drawUpgrades()
}
function auto(){
    points+=autoclick
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
    graphics.fillText("Points: ",10, 30,100)
    graphics.fillText(points,95,31,100)
}

function drawUpgrades(){
    graphics.fillStyle='black'
    if (points>=10){
    graphics.fillText('+1 Click Power: '+ cost1, 50, 70)
    graphics.drawImage(bronze, 20, 45, 25, 25)
    }if (points>=25){
    graphics.fillText('+5 Click Power: '+ cost2, 50, 105)
    graphics.drawImage(silver, 20, 80, 25, 25)
    }if (points>=50){
    graphics.fillText('+10 Click Power: '+ cost3, 50, 140)
    graphics.drawImage(gold, 20, 115, 25, 25)
    }if (points>=100){
    graphics.fillText('+20 Click Power: '+ cost4, 50, 175)
    graphics.drawImage(diamond, 20, 150, 25, 25)
    }
}

let loop = window.setInterval(animate, 16)
let autopoints = window.setInterval(auto, speed)