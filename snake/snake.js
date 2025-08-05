let canvas = document.querySelector("canvas");
const graphics = canvas.getContext("2d");

/*  VARIABLES    */
let round = 1

/*  FUNCTIONS   */
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
function animate(){
    drawblocks();
}

//used to animate, continually draws whats in animate
let loop = window.setInterval(animate, 200)