let canvas=document.querySelector("canvas")
const graphics=canvas.getContext("2d")
let pieceQueue=[]
let board=[]
let timer=0
let pieceX=0
let pieceY=0
let grav=30
let pieceShape=[[],[],[],[]]
let pieceCurrent=""
let queueInd=-1
let process=window.setInterval(tick,1000/60)
let pieceShapeArray=[
    [[0,-1],[-1,-1],[0,0],[1,0]],
    [[1,-1],[0,0],[1,0],[-1,0]],
    [[.5,-.5],[-.5,.5],[.5,.5],[-.5,-.5]],
    [[0,-1],[0,0],[1,-1],[-1,0]],
    [[-1.5,-.5],[-.5,-.5],[.5,-.5],[1.5,-.5]],
    [[-1,-1],[-1,0],[0,0],[1,0]],
    [[0,-1],[0,0],[-1,0],[1,0]]]
let colorArray=["red","orange","yellow","green","cyan","blue","purple"]
let placeTimer=0
let placeTimerReset=30
let dasTimer=0
let dasDelay=8
let arr=2
let keyboardA=false
let keyboardD=false
let keyboardW=false
let keyboardS=false
let keyboardN=false
let keyboardM=false
let keyboardSpace=false
let keyboardAHold=false
let keyboardDHold=false
let xMoveFacing=0
let heldPiece=7
let canHold=true
document.addEventListener('keydown',keyDown)
document.addEventListener('keyup',keyUp)
setup()

function tick(){
    update()
    draw()
}
function update(){
    timer++
    let input=inputProcess()
    if(onGround()){
        placeTimer--
        if(placeTimer<0){
            placePiece()
        }
    }else{
        if(timer%grav==0||timer%Math.floor(grav/4)==0&&keyboardS){
            pieceY+=1
        }
    }
    if(moveHoriz(input.x)){
        pieceX+=input.x
    }
    if(input.rotate!=0){
        rotatema(input.rotate)
    }
    if(input.hold&&canHold){
        hold()
    }
}
function draw(){
    graphics.fillStyle="black"
    graphics.fillRect(0,0,canvas.width,canvas.height)
    for(let r=0;r<board.length;r++){
        for(let c=0;c<10;c++){
            if(board[r][c]!=7){
                graphics.fillStyle=colorArray[board[r][c]]
                graphics.fillRect(490+30*c,60+30*(19-r),30,30) // it works yippee (o yeah y axis is inverted in the table btw so thats fun (its like this intentionally dont worry about it))
            }
        }
    }
    for(let i=0;i<4;i++){
        graphics.fillStyle=colorArray[pieceCurrent]
        graphics.fillRect(490+30*(pieceX+pieceShape[i][0]),60+30*(pieceY+pieceShape[i][1]),30,30)
    }
    for(let i=0;i<5;i++){
        graphics.fillStyle=colorArray[pieceQueue[queueInd+i+1]]
        for(let j=0;j<4;j++){
            graphics.fillRect(810+10*(pieceShapeArray[pieceQueue[queueInd+i+1]][j][0]),80+10*(i*5+pieceShapeArray[pieceQueue[queueInd+i+1]][j][1]),10,10)
        }
    }
    if(heldPiece!=7){
        graphics.fillStyle=colorArray[heldPiece]
        for(let i=0;i<4;i++){
            graphics.fillRect(420+20*(pieceShapeArray[heldPiece][i][0]),110+20*(pieceShapeArray[heldPiece][i][1]),20,20)
        }
    }
    graphics.strokeStyle="dimGray"
    for(let r=0;r<20;r++){
        for(let c=0;c<10;c++){
            graphics.strokeRect(490+30*c,60+30*r,30,30)
        }
    }
    graphics.strokeStyle="gainsboro"
    graphics.strokeRect(490,60,300,600)
}
function setup(){ // TODO: clean up & consolidate related code
    fillQueue()
    newPiece()
}
function fillQueue(){
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
function newPiece(){
    queueInd++
    placeTimer=placeTimerReset
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
function onGround(){
    if(pieceY+getLowest()>=19){
        return true
    }
    for(let i=0;i<4;i++){
        if((19-board.length<=pieceY+pieceShape[i][1])&&
            (board[19-(pieceY+pieceShape[i][1])-1][pieceX+pieceShape[i][0]]!=7)){
            return true
        }
    }
    return false
}
function placePiece(){
    canHold=true
    for(let i=board.length;i<=19-(pieceY+getHighest());i++){
        board.push([7,7,7,7,7,7,7,7,7,7])
    }
    for(let i=0;i<4;i++){
        board[19-(pieceY+pieceShape[i][1])][pieceShape[i][0]+pieceX]=pieceCurrent
    }
    for(let r=board.length-1;r>=0;r--){
        let temp=true
        for(let c=0;c<10;c++){
            if(board[r][c]==7){
                temp=false
                break
            }
        }
        if(temp){
            board.splice(r,1)
        }
    }
    newPiece()
}
function getLowest(){
    let temp=-1
    for(let i=0;i<4;i++){
        if(temp<pieceShape[i][1]){
            temp=pieceShape[i][1]
        }
    }
    return temp
}
function getHighest(){
    let temp=1
    for(let i=0;i<4;i++){
        if(temp>pieceShape[i][1]){
            temp=pieceShape[i][1]
        }
    }
    return temp
}
function keyDown(event){
    if(event.code=='KeyA'){
        keyboardA=true
    }
    if(event.code=='KeyD'){
        keyboardD=true
    }
    if(event.code=='KeyW'){
        keyboardW=true
    }
    if(event.code=='KeyS'){
        keyboardS=true
    }
    if(event.code=='KeyN'){
        keyboardN=true
    }
    if(event.code=='KeyM'){
        keyboardM=true
    }
    if(event.code=='Space'){
        keyboardSpace=true
    }
}
function keyUp(event){
    if(event.code=='KeyA'){
        keyboardA=false
        keyboardAHold=false
    }
    if(event.code=='KeyD'){
        keyboardD=false
        keyboardDHold=false
    }
    if(event.code=='KeyW'){
        keyboardW=false
    }
    if(event.code=='KeyS'){
        keyboardS=false
    }
}
function inputProcess(){
    let temp={x:0,y:0,hold:false,rotate:0}
    if(dasTimer>0){
        dasTimer--
    }
    if(keyboardA||keyboardAHold&&dasTimer==0&&xMoveFacing==-1){
        temp.x=-1
        if(keyboardA){
            keyboardA=false
            keyboardAHold=true
            dasTimer=dasDelay
            xMoveFacing=-1
        }else{
            dasTimer=arr
        }
    }
    if(keyboardD||keyboardDHold&&dasTimer==0&&xMoveFacing==1){
        temp.x=1
        if(keyboardD){
            keyboardD=false
            keyboardDHold=true
            dasTimer=dasDelay
            xMoveFacing=1
        }else{
            dasTimer=arr
        }
    }
    if(!(keyboardAHold||keyboardDHold)){
        xMoveFacing=0
    }
    if(keyboardN){
        temp.rotate--
        keyboardN=false
    }
    if(keyboardM){
        temp.rotate++
        keyboardM=false
    }
    if(keyboardSpace){
        temp.hold=true
        keyboardSpace=false
    }
    return temp
}
function moveHoriz(move){
    for(let i=0;i<4;i++){
        if(
            (pieceX+pieceShape[i][0]+move>9||pieceX+pieceShape[i][0]+move<0)||
            ((19-board.length<pieceY+pieceShape[i][1])&&
            (board[19-(pieceY+pieceShape[i][1])][pieceX+pieceShape[i][0]+move]!=7))
        ){
            return false
        }
    }
    return true
}
function rotatema(butHeresTheRotater){
    let temp=[[0,0],[0,0],[0,0],[0,0]]
    if(butHeresTheRotater==1){
        for(let i=0;i<4;i++){
            temp[i][0]=-pieceShape[i][1]
            temp[i][1]=pieceShape[i][0]
        }
    }else{
        for(let i=0;i<4;i++){
            temp[i][0]=pieceShape[i][1]
            temp[i][1]=-pieceShape[i][0]
        }
    }
    if(collide(temp)){
        pieceShape=temp
    }
}
function collide(mino){
    for(let i=0;i<4;i++){
        if(
            (pieceX+mino[i][0]>9||pieceX+mino[i][0]<0)||
            ((19-board.length<pieceY+mino[i][1])&&
            (board[19-(pieceY+mino[i][1])][pieceX+mino[i][0]]!=7))
        ){
            return false
        }
    }
    return true
}
function hold(){
    canHold=false
    if(heldPiece==7){
        heldPiece=pieceCurrent
        newPiece()
    }else{
        let temp=pieceCurrent
        pieceCurrent=heldPiece
        heldPiece=temp
        placeTimer=placeTimerReset
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
        pieceShape=pieceShapeArray[pieceCurrent]
    }
}
function brayden(){
    console.log(true)
}
function define(){
    console.log('real integer for x value very important')
}
brayden()