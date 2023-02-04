function Ball() {
this.id = "ball";
this.x = 0;
this.y = 0;
this.vx=10;
this.vy=10;
let ball = document.getElementById("ball");
this.height = ball.offsetHeight;
this.width = ball.offsetWidth;


}
function Paddle(side) {
    this.id = side == "left" ? "padle1" : "padle2";
    this.x = side == "left" ? 0 : window.innerWidth - 24;
    this.y = window.innerHeight / 2 - 96;
    this.height = 192;
    this.width = 24;
}
function place_objects(objects) {
for(let object of objects) {
let element = document.getElementById(object.id);
element.style.left = object.x + "px";
element.style.top = object.y + "px";
}
}
function update() {
ball.x += ball.vx;
ball.y += ball.vy;
let bodyRect = document.body.getBoundingClientRect();
if (ball.x <= 0 || ball.x >= bodyRect.width - ball.height) {
  ball.vx = -ball.vx;
}
if (ball.y <=0 || ball.y >= bodyRect.height -ball.width) {
  ball.vy = -ball.vy;
}
place_objects([ball, padle1, padle2]);
}


let ball, padle1, padle2;
function init() {
    ball = new Ball();
    padle1 = new Paddle("left");
    padle2 = new Paddle("right");
    place_objects([ball, padle1, padle2]);
    setInterval(update, 100);
}


window.addEventListener("load", init);