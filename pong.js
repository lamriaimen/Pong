function Ball() {
this.id = "ball";
this.x = 0;
this.y = 0;
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
ball.x += 5;
ball.y += 5;
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