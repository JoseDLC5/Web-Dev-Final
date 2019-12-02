var canvas = document.getElementById("dodgeball_canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800
canvas.height = 600

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var wPressed = false;
var sPressed = false;
var aPressed = false;
var dPressed = false;
var spacePressed = false;
var zeroPressed = false;
var ballSpeed = 3;
var playerSpeed = 10;
var playerRadius = 35
var playerFriction = .1
var playerAcc = .5

class Player1{
    constructor(x,y) {
        this.x = x
        this.y = y
        this.facing = 0
        this.xvel = 0
        this.yvel = 0
        this.radius = playerRadius
        this.acc = playerAcc
        this.friction = playerFriction
        this.color = "#00FFDD"
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(this.x - 0.5*this.radius, this.y - 0.5*this.radius, 0.5*this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(this.x - 0.5*this.radius, this.y + 0.5*this.radius, 0.5*this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(this.x + 0.5*this.radius, this.y - 0.5*this.radius, 0.5*this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(this.x + 0.5*this.radius, this.y + 0.5*this.radius, 0.5*this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        if(this.facing == 0){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 1.5*Math.PI, 0.5*Math.PI);
            ctx.fillStyle = "#FFFFFF";
            ctx.fill();
            ctx.closePath();
        }
        if(this.facing == 1){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius,Math.PI, 0);
            ctx.fillStyle = "#FFFFFF";
            ctx.fill();
            ctx.closePath();
        }
        if(this.facing == 2){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0.5*Math.PI, 1.5*Math.PI);
            ctx.fillStyle = "#FFFFFF";
            ctx.fill();
            ctx.closePath();
        }
        if(this.facing == 3){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI);
            ctx.fillStyle = "#FFFFFF";
            ctx.fill();
            ctx.closePath();
        }
        
    }

    calcFriction(){
        if(this.xvel>0){
            this.xvel -= this.friction
        }
        else if(this.xvel<0){
            this.xvel += this.friction
        }
        if (Math.abs(this.xvel) <= this.friction)
        {
            this.xvel = 0
        }
        if(this.yvel>0){
            this.yvel -= this.friction
        }
        else if(this.yvel<0){
            this.yvel += this.friction
        }
        if (Math.abs(this.yvel) <= this.friction){
            this.yvel = 0
        }
    }

    move(){
        this.x += this.xvel
        this.y += this.yvel
        if(this.xvel > playerSpeed){
            this.xvel = playerSpeed
        }
        if(this.xvel < -playerSpeed){
            this.xvel = -playerSpeed
        }
        if(this.yvel > playerSpeed){
            this.yvel = playerSpeed
        }
        if(this.yvel < -playerSpeed){
            this.yvel = -playerSpeed
        }

        if(rightPressed){
            this.xvel += this.acc
            this.facing = 0
        }
        if(leftPressed){
            this.xvel += -this.acc
            this.facing = 2
        }
        if(upPressed){
            this.yvel += -this.acc
            this.facing = 1
        }
        if(downPressed){
            this.yvel += this.acc
            this.facing = 3
        }
        
    }

    collision(){
        if(this.x + this.xvel > canvas.width-this.radius || this.x + this.xvel < this.radius) {
            this.xvel = 0
        }
        if(this.y + this.yvel > canvas.height-this.radius || this.y + this.yvel < this.radius) {
            this.yvel = 0;
        }
        if(this.x + this.xvel + this.radius > player2.x + player2.xvel - player2.radius && this.x + this.xvel - this.radius < player2.x + player2.xvel + player2.radius
            && this.y + this.yvel + this.radius > player2.y + player2.yvel - player2.radius && this.y + this.yvel - this.radius < player2.y + player2.yvel + player2.radius)
        {
            this.xvel = player2.xvel
            this.yvel = player2.yvel
        }
    }

    shoot(){
        if(zeroPressed && this.facing == 0)
        {
            ball1 = new Ball(this.x + this.radius, this.y, ballSpeed, 0, 1)
        }
        if(zeroPressed && this.facing == 1)
        {
            ball1 = new Ball(this.x, this.y - this.radius, 0, -ballSpeed, 1)
        }
        if(zeroPressed && this.facing == 2)
        {
            ball1 = new Ball(this.x - this.radius, this.y, -ballSpeed, 0, 1)
        }
        if(zeroPressed && this.facing == 3)
        {
            ball1 = new Ball(this.x,this.y + this.radius, 0, ballSpeed, 1)
        }
    }

    update(){
        this.collision()
        this.move()
        this.collision()
        this.calcFriction()
        this.shoot()
    }
}

class Player2{
    constructor(x,y) {
        this.x = x
        this.y = y
        this.facing = 0
        this.xvel = 0
        this.yvel = 0
        this.color = "#FF0000"
        this.radius = playerRadius
        this.acc = playerAcc
        this.friction = playerFriction
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(this.x - 0.5*this.radius, this.y - 0.5*this.radius, 0.5*this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(this.x - 0.5*this.radius, this.y + 0.5*this.radius, 0.5*this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(this.x + 0.5*this.radius, this.y - 0.5*this.radius, 0.5*this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(this.x + 0.5*this.radius, this.y + 0.5*this.radius, 0.5*this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        if(this.facing == 0){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 1.5*Math.PI, 0.5*Math.PI);
            ctx.fillStyle = "#FFFFFF";
            ctx.fill();
            ctx.closePath();
        }
        if(this.facing == 1){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius,Math.PI, 0);
            ctx.fillStyle = "#FFFFFF";
            ctx.fill();
            ctx.closePath();
        }
        if(this.facing == 2){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0.5*Math.PI, 1.5*Math.PI);
            ctx.fillStyle = "#FFFFFF";
            ctx.fill();
            ctx.closePath();
        }
        if(this.facing == 3){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI);
            ctx.fillStyle = "#FFFFFF";
            ctx.fill();
            ctx.closePath();
        }
        
    }

    calcFriction(){
        if(this.xvel>0){
            this.xvel -= this.friction
        }
        else if(this.xvel<0){
            this.xvel += this.friction
        }
        if (Math.abs(this.xvel) <= this.friction)
        {
            this.xvel = 0
        }
        if(this.yvel>0){
            this.yvel -= this.friction
        }
        else if(this.yvel<0){
            this.yvel += this.friction
        }
        if (Math.abs(this.yvel) <= this.friction){
            this.yvel = 0
        }
    }

    move(){
        this.x += this.xvel
        this.y += this.yvel
        if(this.xvel > playerSpeed){
            this.xvel = playerSpeed
        }
        if(this.xvel < -playerSpeed){
            this.xvel = -playerSpeed
        }
        if(this.yvel > playerSpeed){
            this.yvel = playerSpeed
        }
        if(this.yvel < -playerSpeed){
            this.yvel = -playerSpeed
        }

        if(dPressed){
            this.xvel += this.acc
            this.facing = 0
        }
        if(aPressed){
            this.xvel += -this.acc
            this.facing = 2
        }
        if(wPressed){
            this.yvel += -this.acc
            this.facing = 1
        }
        if(sPressed){
            this.yvel += this.acc
            this.facing = 3
        }
        
    }

    collision(){
        if(this.x + this.xvel > canvas.width-this.radius || this.x + this.xvel < this.radius) {
            this.xvel = 0;
        }
        if(this.y + this.yvel > canvas.height-this.radius || this.y + this.yvel < this.radius) {
            this.yvel = 0;
        }
        if(this.x + this.xvel + this.radius > player1.x + player1.xvel - player1.radius && this.x + this.xvel - this.radius < player1.x + player1.xvel + player1.radius
            && this.y + this.yvel + this.radius > player1.y + player1.yvel - player1.radius && this.y + this.yvel - this.radius < player1.y + player1.yvel + player1.radius)
        {
            this.xvel =  player1.xvel
            this.yvel =  player1.yvel
        }
    }

    shoot(){
        if(spacePressed && this.facing == 0)
        {
            ball2 = new Ball(this.x + this.radius, this.y, ballSpeed, 0, 2)
        }
        if(spacePressed && this.facing == 1)
        {
            ball2 = new Ball(this.x, this.y - this.radius, 0, -ballSpeed, 2)
        }
        if(spacePressed && this.facing == 2)
        {
            ball2 = new Ball(this.x - this.radius, this.y, -ballSpeed, 0, 2)
        }
        if(spacePressed && this.facing == 3)
        {
            ball2 = new Ball(this.x,this.y + this.radius, 0, ballSpeed, 2)
        }
    }

    update(){
        this.move()
        this.calcFriction()
        this.collision()
        this.shoot()
    }
}

class Ball{
    constructor(x,y,xvel,yvel,player){
        this.x = x
        this.y = y
        this.xvel = xvel
        this.yvel = yvel
        this.player = player
        this.radius = 15
    }

    collision(){
        if(this.x + this.xvel >= canvas.width - this.radius || this.x < this.radius) {
            this.xvel = -this.xvel;
        }
        if(this.y + this.yvel > canvas.height-this.radius || this.y + this.yvel < this.radius) {
            this.yvel = -this.yvel;
        }
        if(this.x + this.radius > player1.x - player1.radius && this.x - this.radius < player1.x + player1.radius
            && this.y + this.radius > player1.y - player1.radius && this.y - this.radius < player1.y +  player1.radius && this.player == 2){
            console.log("hit player 1")
            clearInterval(interval)
            alert("A WINNER IS PLAYER 1");
            document.location.reload();
        }
        if(this.x + this.radius > player2.x - player2.radius && this.x - this.radius < player2.x + player2.radius
            && this.y + this.radius > player2.y - player2.radius && this.y - this.radius < player2.y + player2.radius && this.player == 1)
        {
            console.log("hit player 2")
            clearInterval(interval)
            alert("A WINNER IS PLAYER 2");
            document.location.reload();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        if(this.player == 1){
            ctx.fillStyle = player1.color
        }
        if(this.player == 2){
            ctx.fillStyle = player2.color
        }
        ctx.fill();
        ctx.closePath();
    }

    move(){
        this.x += this.xvel
        this.y += this.yvel
    }

    update(){
        this.move()
        this.collision()
    }
}

//Create Instance of Player1
var player1 = new Player1(canvas.width/2,canvas.width/2);
//Create Instance of Player2
var player2 = new Player2(50,50);
var ball1 = new Ball(-100,-100,0,0,1)
var ball2 = new Ball(-100,-100,0,0,2)


//Updates the Canvas whenever Called
function canvasUpdate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player2.update()
    player1.update()
    player1.draw()
    player2.draw()
    ball1.update()
    ball1.draw()
    ball2.update()
    ball2.draw()
    ballSpeed += 0.001
    
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    else if(e.key == "Up" || e.key == "ArrowUp"){
        upPressed = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown"){
        downPressed = true;
    }
    else if(e.key == "w" || e.key == "W") {
        wPressed = true;
    }
    else if(e.key == "a" || e.key == "A"){
        aPressed = true;
    }
    else if(e.key == "s" || e.key == "S"){
        sPressed = true;
    }
    else if(e.key == "d" || e.key == "D"){
        dPressed = true;
    }
    else if(e.key == " "){
        spacePressed = true;
    }
    else if(e.key == "0"){
        zeroPressed = true
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false
    }
    else if(e.key == "Up" || e.key == "ArrowUp"){
        upPressed = false
    }
    else if(e.key == "Down" || e.key == "ArrowDown"){
        downPressed = false
    }
    else if(e.key == "w" || e.key == "W") {
        wPressed = false;
    }
    else if(e.key == "a" || e.key == "A"){
        aPressed = false;
    }
    else if(e.key == "s" || e.key == "S"){
        sPressed = false;
    }
    else if(e.key == "d" || e.key == "D"){
        dPressed = false;
    }
    else if(e.key == " "){
        spacePressed = false;
    }
    else if(e.key == "0"){
        zeroPressed = false
    }
}

var interval = setInterval(canvasUpdate, 10);