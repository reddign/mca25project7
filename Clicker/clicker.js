let canvas = document.querySelector('canvas');
const graphics = canvas.getContext('2d');
let clickpwr = 100000
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
let aCost1 = 25
let aCost2 = 50
let aCost3 = 100
let aCost4 = 200
let speed = 1000
const bronze = new Image()
bronze.src = 'images/BronzeFin.png'
const diamond = new Image()
diamond.src = 'images/DiamondFin.png'
const silver = new Image()
silver.src = 'images/SilverFin.png'
const gold = new Image()
gold.src = 'images/GoldFin.png'
const auto1 = new Image()
auto1.src = 'images/BronzeGuy.png'
const auto2 = new Image()
auto2.src = 'images/SilverGuy.png'
const auto3 = new Image()
auto3.src = 'images/GoldGuy.png'
const auto4 = new Image()
auto4.src = 'images/DiamondGuy.png'
const gif1 = new Image()
gif1.src = 'gifs/BronzeGuyGIF.gif'
const gif2 = new Image()
gif2.src = 'gifs/SilverGuyGIF.gif'
const gif3 = new Image()
gif3.src = 'gifs/GoldGuyGIF.gif'
const gif4 = new Image()
gif4.src = 'gifs/DiamondGuyGIF.gif'

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
function mousedown(event){
    if(Math.sqrt(Math.pow(objX-x,2)+Math.pow(objY-y,2))<=radius){
        points+=clickpwr
    }if (x>=15 && x<=280 && y>=45 && y<=68 && points>=cost1){
        points-=cost1
        clickpwr++
        cost1+=Math.floor(cost1/2)
    }if (x>=15 && x<=280 && y>=80 && y<=105 && points>=cost2){
        points-=cost2
        clickpwr+=5
        cost2+=Math.floor(cost2/2)
    }if (x>=15 && x<=280 && y>=115 && y<=140 && points>=cost3){
        points-=cost3
        clickpwr+=10
        cost3+=Math.floor(cost3/2)
    }if (x>=15 && x<=280 && y>=150 && y<=175 && points>=cost4){
        points-=cost4
        clickpwr+=20
        cost4+=Math.floor(cost4/2)
    }if (x>=15 && x<=280 && y>=245 && y<=275 && points>=aCost1){
        points-=aCost1
        autoclick+=0.25
        aCost1+=Math.floor(aCost1/2)
    }if (x>=15 && x<=280 && y>=280 && y<=310 && points>=aCost2){
        points-=aCost2
        autoclick+=0.5
        aCost2+=Math.floor(aCost2/2)
    }if (x>=15 && x<=280 && y>=320 && y<=345 && points>=aCost3){
        points-=aCost3
        autoclick+=0.75
        aCost3+=Math.floor(aCost3/2)
    }if (x>=15 && x<=280 && y>=355 && y<=375 && points>=aCost4){
        points-=aCost4
        autoclick+=1
        aCost4+=Math.floor(aCost4/2)
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
    graphics.fillText("Click Power: ",1000, 30,100)
    graphics.fillText(clickpwr,1100,31,100)
    graphics.fillText("Auto Click: ",1000, 60,100)
    graphics.fillText(autoclick,1100,61,100)
}

function drawUpgrades(){
    graphics.fillStyle='black'
    if (points>=cost1){
    graphics.fillText('+1 Click Power: '+ cost1, 50, 70)
    graphics.drawImage(bronze, 20, 45, 25, 25)
    }if (points>=cost2){
    graphics.fillText('+5 Click Power: '+ cost2, 50, 105)
    graphics.drawImage(silver, 20, 80, 25, 25)
    }if (points>=cost3){
    graphics.fillText('+10 Click Power: '+ cost3, 50, 140)
    graphics.drawImage(gold, 20, 115, 25, 25)
    }if (points>=cost4){
    graphics.fillText('+20 Click Power: '+ cost4, 50, 175)
    graphics.drawImage(diamond, 20, 150, 25, 25)
    }if (points>=aCost1){
    graphics.fillText('+0.25 Auto Click: '+aCost1,50, 275)
    graphics.drawImage(auto1, 18, 250, 25, 25)
    }if (points>=aCost2){
    graphics.fillText('+0.5 Auto Click: '+aCost2,50, 310)
    graphics.drawImage(auto2, 20, 285, 25, 25)
    }if (points>=aCost3){
    graphics.fillText('+0.75 Auto Click: '+aCost3,50, 345)
    graphics.drawImage(auto3, 20, 320, 25, 25)
    }if (points>=aCost4){
    graphics.fillText('+1 Auto Click: '+aCost4,50, 380)
    graphics.drawImage(auto4, 20, 355, 25, 25)
    }
}

let loop = window.setInterval(animate, 16)
let autopoints = window.setInterval(auto, speed)