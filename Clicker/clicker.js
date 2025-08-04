let canvas = document.querySelector('canvas');
const graphics = canvas.getContext('2d');
let clickpwr = 1
let points = 0
let x = 650
let y = 275
let radius = 30
drawThing()
function click(){

}
function drawThing(){
    graphics.fillStyle ="black"
    graphics.beginPath()
    graphics.arc(x, y, radius,0, Math.PI*2)
    graphics.fill()
    graphics.closePath()
}