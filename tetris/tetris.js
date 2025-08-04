let canvas=document.querySelector("canvas")
const graphics=canvas.getContext("2d")
let pieceQueue=[]
let board=[]
let timer=0
let pieceX=0
let pieceY=20
let grav=120
let pieceShape=[[],[],[],[]]
let pieceCurrent=""
let queueInd=0
let process=window.setInterval(tick,1/60)
function tick(){
    update()
    draw()
}
function update(){
    timer++
    if(timer%grav==0){
        pieceY-=1
    }
    pieceX+=movePiece()
}
function draw(){
    graphics.strokeStyle="dimGray"
    for(let r=0;r<20;r++){
        for(let c=0;c<10;c++){
            graphics.strokeRect(490+30*c,60+30*r,30,30)
        }
    }
    graphics.strokeStyle="gainsboro"
    graphics.strokeRect(490,60,300,600)
    for(let r=0;r<board.length;r++){
        for(let c=0;c<10;c++){
            if(board[c][r]!='n'){ // TODO: handle colors per mino
                graphics.fillStyle="white"
                graphics.fillRect() // TODO: draw rectangles (o yeah y axis is inverted in the table btw so thats fun (its like this intentionally dont worry about it))
            }
        }
    }
    for(let i=0;i<4;i++){
        graphics.fillStyle="white"
        graphics.fillRect(490+30*(pieceX+pieceShape[i][0]),60+30*(pieceY+pieceShape[i][1]),30,30)
        console.log(490+30*(pieceX+pieceShape[i][0]),60+30*(pieceY+pieceShape[i][1]),pieceCurrent)
    }
}
function setup(){ // TODO: clean up & consolidate related code
    fillQueue()
    newPiece()
}
function fillQueue(){ // should work
    let bag=['z','l','o','s','i','j','t']
    for(let i=0;i<7;i++){
        let ind=Math.floor(Math.random()*(7-i)+i)
        let temp=bag[i]
        bag[i]=bag[ind]
        bag[ind]=temp
    }
    for(let i=0;i<7;i++){
        pieceQueue.push(bag[i])
    }
}
function movePiece(){ // TODO: add keyboard input + movement logic
    return 0
}
function newPiece(){ // should work
    queueInd++
    pieceCurrent=pieceQueue[queueInd]
    console.log('yeah')
    switch(pieceCurrent){
        case 'z':
            pieceShape=[[0,0],[-1,-1],[0,-1],[1,0]]
        break
        case 'l':
            pieceShape=[[-1,0],[0,0],[1,0],[1,-1]]
        break
        case 'o':
            pieceShape=[[.5,.5],[-.5,.5],[.5,-.5],[-.5,-.5]]
        break
        case 's':
            pieceShape=[[0,0],[0,-1],[1,-1],[-1,0]]
        break
        case 'i':
            pieceShape=[[-.5,-1.5],[-.5,-.5],[-.5,.5],[-.5,1.5]]
        break
        case 'j':
            pieceShape=[[-1,-1],[-1,0],[0,0],[1,0]]
        break
        default:
            pieceShape=[[-1,0],[0,0],[0,-1],[1,0]]
    }
    if(queueInd+6>pieceQueue.length){
        fillQueue()
    }
}