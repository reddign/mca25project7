let canvas=document.querySelector("canvas")
const graphics=canvas.getContext("2d")
let pieceQueue=[]
let board=[]
let timer=0
let pieceX=0
let pieceY=0
let grav=120
let pieceShape=[[],[],[],[]]
let pieceCurrent=""
let queueInd=0
let process=window.setInterval(tick,1/60)
let pieceShapeArray=[
    [[0,0],[-1,-1],[0,-1],[1,0]],
    [[-1,0],[0,0],[1,0],[1,-1]],
    [[.5,.5],[-.5,.5],[.5,-.5],[-.5,-.5]],
    [[0,0],[0,-1],[1,-1],[-1,0]],
    [[-1.5,-.5],[-.5,-.5],[.5,-.5],[1.5,-.5]],
    [[-1,-1],[-1,0],[0,0],[1,0]],
    [[-1,0],[0,0],[0,-1],[1,0]]]
let colorArray=["red","orange","yellow","green","cyan","blue","purple"]
setup()

function tick(){
    update()
    draw()
}
function update(){
    timer++
    if(timer%grav==0){
        pieceY+=1
    }
    pieceX+=movePiece()
}
function draw(){
    graphics.fillStyle="black"
    graphics.fillRect(0,0,canvas.width,canvas.height)
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
            if(board[c][r]!=7){ // color handling works hopefully but untested
                graphics.fillStyle=colorArray[board[c][r]]
                graphics.fillRect() // TODO: draw rectangles (o yeah y axis is inverted in the table btw so thats fun (its like this intentionally dont worry about it))
            }
        }
    }
    for(let i=0;i<4;i++){
        graphics.fillStyle=colorArray[pieceCurrent]
        graphics.fillRect(490+30*(pieceX+pieceShape[i][0]),60+30*(pieceY+pieceShape[i][1]),30,30)
    }
    for(let i=0;i<5;i++){
        graphics.fillStyle=colorArray[pieceQueue[queueInd+i]]
        for(let j=0;j<4;j++){
            console.log(pieceQueue[queueInd+j])
            graphics.fillRect(810+10*(pieceShapeArray[pieceQueue[queueInd+i]][j][0]),80+10*(i*5+pieceShapeArray[pieceQueue[queueInd+i]][j][1]),10,10)
        }
    }
}
function setup(){ // TODO: clean up & consolidate related code
    fillQueue()
    newPiece()
}
function fillQueue(){ // should work
    let bag=[0,1,2,3,4,5,6]
    //       z,l,o,s,i,j,t
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
    pieceShape=pieceShapeArray[pieceCurrent]
    if(pieceCurrent==2||pieceCurrent==4){
        pieceX=4.5
        if(pieceCurrent==2){
            pieceY=-1.5
        }else{
            pieceY=-.5
        }
    }else{
        pieceX=4
        pieceY=-1
    }
    if(queueInd+6>pieceQueue.length){
        fillQueue()
    }
}