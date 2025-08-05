//hoping to make the "platforms" have collision
//Will try to add WASD controls afterwards
console.log("Let's make a game.");

let canvas = document.querySelector("canvas");
let graphics = canvas.getContext("2d");
let x = 20;
let y = 100;
let paddlex1 = 250
let paddley1 = 10
let paddlex2 = 150
let paddley2 = 70
let paddlex3 = 60
let paddley3 = 120
let paddlewidth = 5
let paddleheight = 80
let FPS = 5;
let speed = 2;
let directionx = 1;
let directiony = 1
let radius = 10
let lives = 3
let score = 0
let again = "whatever";
let gameOver = false;

function animate(){
    if (lives>0){
        clear();
        scoreboard()
        endscreen()
        paddle1()
        paddle2()
        paddle3()
        paddle4()
        console.log("lives", lives, "score", score)
    }else if(!gameOver){
        endscreen();
    }
}


function scoreboard(){
    graphics.fillStyle = "yellow"
    let scoreStr = "Lives: " + lives + " Scores: " + score;
    graphics.fillText(scoreStr, 10,10)
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
    graphics.fillRect(paddlex3,paddley3,70,5)
}

function paddle4(){
    graphics.fillStyle = "white"
    graphics.fillRect(170,130,70,5)
}

// function bounceball(){
//    // if(x + radius > canvas.width){
//         // lives--
//         // Math.random();50 + 20
//        // directionx = directionx * -1
    
//     if(x + radius > canvas.width || x - radius < 0){
//         directionx = directionx * -1;
        
//     }
//    if(y + radius > canvas.height || y - radius < 0){
//     directiony = directiony * -1
//    }
// }

window.setInterval(animate,FPS/1000)

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

