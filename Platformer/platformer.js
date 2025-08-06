//hoping to make the "platforms" have collision
//Will try to add WASD controls afterwards
console.log("Let's make a game.");

let canvas = document.querySelector("canvas");
let graphics = canvas.getContext("2d");
let faceimg = document.getElementById("face");


// canvas.focus();
let x = 20;
let y = 100;
let paddlex1 = 250*3
let paddley1 = 10*3
let paddlex2 = 150*3
let paddley2 = 70*3
let paddlex3 = 60*3
let paddley3 = 120*3
let paddlewidth = 5*3
let paddleheight = 80*3
let FPS = 5;
let speed = 2;
let directionx = 1;
let directiony = 1
let radius = 50
let lives = 3
let again = "whatever";
let gameOver = false;



function animate(){
    drawperson(x,y);
    if (lives>0){
        clear();
        scoreboard()
        endscreen()
        
        paddle1()
        paddle2()
        paddle3()
        paddle4()
        paddle5()
        checkIntersection()
        // paddle6()
        
        //console.log("lives", lives)
    }else if(!gameOver){
        endscreen();
    }
}


function scoreboard(){
    graphics.fillStyle = "yellow"
    graphics.font = "bold 28px serif";
    let scoreStr = "Lives: " + lives;
    graphics.fillText(scoreStr, 10,30)
}


function drawperson(x,y){
    graphics.drawImage(faceimg,x,y,50,50)
}


function clear(){
    graphics.fillStyle = "rgb(0,0,0, 0.4)";
    graphics.fillRect(0,0, canvas.width, canvas.height)
}

function paddle1(){
    graphics.fillStyle = "white"
    graphics.fillRect(paddlex1,paddley1,paddlewidth,paddleheight)
}

function paddle2(){
    graphics.fillStyle = "white"
    graphics.fillRect(paddlex2,paddley2,paddlewidth,paddleheight)
}

function paddle3(){
    graphics.fillStyle = "white"
    graphics.fillRect(paddlex3,paddley3,70*3,5*3)
}

function paddle4(){
    graphics.fillStyle = "white"
    graphics.fillRect(170*3,130*3,100*3,5*3)
}

function paddle5(){
    graphics.fillStyle = "white"
    graphics.fillRect(250*3,85*3,25*3,5*3)
}
function checkIntersection(){



//intersect paddle
    if(x+radius > paddlex1 && x+radius < paddlex1 +paddlewidth
        && y +radius > paddley1 && y+radius < paddley1 + paddleheight
        ||
        x+radius > paddlex1 && x+radius < paddlex1 +paddlewidth
        && y -radius > paddley1 && y-radius < paddley1 + paddleheight
    ){
        directionx = -1;
        directiony = -1;
        console.log("We intersected");       
    }else{
        directionx = 1;
        directiony = 1;
    }

   // console.log(x,y,paddlex1,paddley1)
}

window.setInterval(animate,FPS/1000);



function endscreen(){
    if(lives<=0){
        graphics.fillStyle="blue";
        graphics.fillRect(50,10,150,200);
        graphics.fillStyle="orange";
        graphics.fillText("You died :(",75,50);
        again = prompt("Type again if you'd like to play again!");

        //if their answer was y 
        //refresh  ---
        
    }  
}

document.addEventListener('keydown',(event)=>{
    // console.log(`Key pressed: ${event.key}`);
    // console.log(`Key code: ${event.code}`);

    if(event.key === 'ArrowUp'){
        y -= 2*directiony;
        
    }else if(event.key === 'ArrowDown'){
        y += 2*directiony;
        
    }else if(event.key === 'ArrowLeft'){
        x -= 2*directionx;
        
    }else if(event.key === 'ArrowRight'){
        x += 2*directionx;
        
    }

});
