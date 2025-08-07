//hoping to make the "platforms" have collision
//Will try to add WASD controls afterwards
console.log("Let's make a game.");

let canvas = document.querySelector("canvas");
let graphics = canvas.getContext("2d");
let faceimg = document.getElementById("face");


// canvas.focus();
let x = 40;
let y = 150;
let paddlex1 = 250 * 3
let paddley1 = 10 * 3
let paddlex2 = 150 * 3
let paddley2 = 70 * 3
let paddlex3 = 60 * 3
let paddley3 = 120 * 3
let paddlewidth = 5 * 3
let paddleheight = 80 * 3
let FPS = 5;
let speed = 2;
let directionx = 1;
let directiony = 1
let radius = 50
let lives = 3
let again = "whatever";
let gameOver = false;

const walls = [
    // Outer walls
    { x: 0, y: 0, width: 800, height: 15 },
    { x: 0, y: 0, width: 15, height: 450 },
    { x: 785, y: 0, width: 15, height: 450 },
    { x: 0, y: 435, width: 800, height: 15 },

    // Left section walls
    { x: 15, y: 50, width: 120, height: 15 },
    { x: 15, y: 100, width: 60, height: 15 },
    { x: 60, y: 65, width: 15, height: 50 },
    { x: 120, y: 65, width: 15, height: 100 },
    { x: 160, y: 50, width: 15, height: 80 },
    { x: 160, y: 150, width: 60, height: 15 },

    // Left bottom maze area
    { x: 15, y: 180, width: 80, height: 15 },
    { x: 80, y: 195, width: 15, height: 60 },
    { x: 95, y: 240, width: 40, height: 15 },
    { x: 15, y: 280, width: 60, height: 15 },
    { x: 60, y: 295, width: 15, height: 60 },
    { x: 75, y: 340, width: 60, height: 15 },

    // Complex left maze walls
    { x: 180, y: 180, width: 15, height: 40 },
    { x: 195, y: 205, width: 40, height: 15 },
    { x: 220, y: 180, width: 15, height: 40 },
    { x: 150, y: 260, width: 50, height: 15 },
    { x: 180, y: 275, width: 15, height: 50 },
    { x: 220, y: 300, width: 40, height: 15 },

    // Center divider
    { x: 390, y: 0, width: 20, height: 200 },
    { x: 390, y: 250, width: 20, height: 200 },

    // Right top section
    { x: 430, y: 50, width: 120, height: 15 },
    { x: 580, y: 50, width: 15, height: 80 },
    { x: 480, y: 65, width: 15, height: 50 },
    { x: 520, y: 100, width: 60, height: 15 },
    { x: 650, y: 50, width: 120, height: 15 },
    { x: 650, y: 65, width: 15, height: 80 },
    { x: 700, y: 100, width: 70, height: 15 },

    // Right middle maze
    { x: 430, y: 150, width: 80, height: 15 },
    { x: 540, y: 130, width: 15, height: 60 },
    { x: 580, y: 180, width: 60, height: 15 },
    { x: 620, y: 150, width: 15, height: 45 },
    { x: 680, y: 150, width: 15, height: 80 },
    { x: 720, y: 180, width: 50, height: 15 },

    // Right bottom maze
    { x: 430, y: 250, width: 50, height: 15 },
    { x: 500, y: 280, width: 80, height: 15 },
    { x: 500, y: 295, width: 15, height: 60 },
    { x: 540, y: 340, width: 80, height: 15 },
    { x: 650, y: 280, width: 15, height: 80 },
    { x: 700, y: 250, width: 15, height: 60 },
    { x: 665, y: 320, width: 50, height: 15 },

    // Additional complexity
    { x: 300, y: 100, width: 60, height: 15 },
    { x: 300, y: 115, width: 15, height: 50 },
    { x: 280, y: 300, width: 80, height: 15 },
    { x: 320, y: 250, width: 15, height: 65 },
    { x: 450, y: 320, width: 15, height: 80 },
    { x: 600, y: 380, width: 80, height: 15 },
];


function animate() {

    if (lives > 0) {
        clear();
        drawMaze();
        drawperson(x, y);
        scoreboard();
        checkCollision();
    } else if (!gameOver) {
        endscreen();
    }
}


const coords = {}

function scoreboard() {
    graphics.fillStyle = "yellow"
    graphics.font = "bold 28px serif";
    let scoreStr = "Lives: " + lives;
    graphics.fillText(scoreStr, 10, 30)
}


function drawperson(x, y) {
    graphics.drawImage(faceimg, x, y, 20, 20)
}


function clear() {
    graphics.fillStyle = "rgba(0,0,0, 0.4)";
    graphics.fillRect(0, 0, canvas.width, canvas.height)
}

// function createPaddle(x,y,width,height){
//     graphics.fillStyle="white"
//     graphics.fillRect(x,y,width,height)

// }




function drawMaze() {
    graphics.fillStyle = "white";
    
    // Outer walls
    graphics.fillRect(0, 0, 800, 15); // Top wall
    graphics.fillRect(0, 0, 15, 450); // Left wall
    graphics.fillRect(785, 0, 15, 450); // Right wall
    graphics.fillRect(0, 435, 800, 15); // Bottom wall
    
    // Left section walls
    graphics.fillRect(15, 50, 120, 15); // Top left horizontal
    graphics.fillRect(15, 100, 60, 15); // Small horizontal
    graphics.fillRect(60, 65, 15, 50); // Small vertical
    graphics.fillRect(120, 65, 15, 100); // Long vertical
    
    graphics.fillRect(160, 50, 15, 80); // Right side of left section
    graphics.fillRect(160, 150, 60, 15); // Bottom horizontal of left section
    
    // Left bottom maze area
    graphics.fillRect(15, 180, 80, 15); // Horizontal wall
    graphics.fillRect(80, 195, 15, 60); // Vertical connector
    graphics.fillRect(95, 240, 40, 15); // Small horizontal
    graphics.fillRect(15, 280, 60, 15); // Lower horizontal
    graphics.fillRect(60, 295, 15, 60); // Vertical down
    graphics.fillRect(75, 340, 60, 15); // Bottom area horizontal
    
    // Complex left maze walls
    graphics.fillRect(180, 180, 15, 40); // Vertical wall
    graphics.fillRect(195, 205, 40, 15); // Horizontal connector
    graphics.fillRect(220, 180, 15, 40); // Another vertical
    graphics.fillRect(150, 260, 50, 15); // Lower horizontal
    graphics.fillRect(180, 275, 15, 50); // Vertical down
    graphics.fillRect(220, 300, 40, 15); // Bottom connector
    
    // Center dividing wall
    graphics.fillRect(390, 0, 20, 200); // Main vertical divider
    graphics.fillRect(390, 250, 20, 200); // Lower part of divider
    
    // Right section - top area
    graphics.fillRect(430, 50, 120, 15); // Top horizontal
    graphics.fillRect(580, 50, 15, 80); // Right vertical
    graphics.fillRect(480, 65, 15, 50); // Inner vertical
    graphics.fillRect(520, 100, 60, 15); // Middle horizontal
    
    graphics.fillRect(650, 50, 120, 15); // Far right horizontal
    graphics.fillRect(650, 65, 15, 80); // Far right vertical
    graphics.fillRect(700, 100, 70, 15); // Right side horizontal
    
    // Right section - middle maze
    graphics.fillRect(430, 150, 80, 15); // Horizontal wall
    graphics.fillRect(540, 130, 15, 60); // Vertical wall
    graphics.fillRect(580, 180, 60, 15); // Right horizontal
    graphics.fillRect(620, 150, 15, 45); // Connector vertical
    
    graphics.fillRect(680, 150, 15, 80); // Right side vertical
    graphics.fillRect(720, 180, 50, 15); // Far right horizontal
    
    // Right section - bottom maze
    graphics.fillRect(430, 250, 50, 15); // Bottom left horizontal
    graphics.fillRect(500, 280, 80, 15); // Middle horizontal
    graphics.fillRect(500, 295, 15, 60); // Vertical down
    graphics.fillRect(540, 340, 80, 15); // Lower horizontal
    
    graphics.fillRect(650, 280, 15, 80); // Right vertical
    graphics.fillRect(700, 250, 15, 60); // Another vertical
    graphics.fillRect(665, 320, 50, 15); // Connecting horizontal
    
    // Additional maze complexity
    graphics.fillRect(300, 100, 60, 15); // Left center horizontal
    graphics.fillRect(300, 115, 15, 50); // Vertical connector
    graphics.fillRect(280, 300, 80, 15); // Lower left horizontal
    graphics.fillRect(320, 250, 15, 65); // Vertical up to horizontal
    
    graphics.fillRect(450, 320, 15, 80); // Right section vertical
    graphics.fillRect(600, 380, 80, 15); // Bottom right horizontal
}
window.setInterval(animate, 1000 / FPS);



function endscreen() {
    if (lives <= 0) {
        graphics.fillStyle = "blue";
        graphics.fillRect(50, 10, 150, 200);
        graphics.fillStyle = "orange";
        graphics.fillText("You died :(", 75, 50);
        again = prompt("Type again if you'd like to play again!");

        //if their answer was y 
        //refresh  ---

    }
}

// document.addEventListener('keydown', (event) => {
//     // console.log(`Key pressed: ${event.key}`);
//     // console.log(`Key code: ${event.code}`);
    
//     let newX = x;
//     let newY = y;
    
//     if (event.key === 'ArrowUp') {
//         newY = y - 2 * directiony;
//     } else if (event.key === 'ArrowDown') {
//         newY = y + 2 * directiony;
//     } else if (event.key === 'ArrowLeft') {
//         newX = x - 2 * directionx;
//     } else if (event.key === 'ArrowRight') {
//         newX = x + 2 * directionx;
//     }
    
//     // Only update position if no collision
//     if (!checkCollision(newX, newY)) {
//         x = newX;
//         y = newY;
//     }
// });




function checkCollision(newX, newY) {
    const playerWidth = 20;
    const playerHeight = 20;

    for (let wall of walls) {
        if (
            newX < wall.x + wall.width &&
            newX + playerWidth > wall.x &&
            newY < wall.y + wall.height &&
            newY + playerHeight > wall.y
        ) {
            return true; // Collision detected
        }
    }

    return false; // No collision
}



document.addEventListener('keydown', (event) => {
    let newX = x;
    let newY = y;

    if (event.key === 'ArrowUp') {
        newY -= 2 * directiony;
    } else if (event.key === 'ArrowDown') {
        newY += 2 * directiony;
    } else if (event.key === 'ArrowLeft') {
        newX -= 2 * directionx;
    } else if (event.key === 'ArrowRight') {
        newX += 2 * directionx;
    }

    // Only move if no collision
    if (!checkCollision(newX, newY)) {
        x = newX;
        y = newY;
    }
});