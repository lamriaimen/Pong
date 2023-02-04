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
ball.x += 5;
    ball.y += 5;
    for(let key in buttons) {
        if(buttons[key]) {
            switch (key) {
                case "p1_up": updatePadle(padle1,true);break;
                case "p1_down": updatePadle(padle1, false); break;
                case "p2_up": updatePadle(padle2, true); break;
                case "p2_down": updatePadle(padle2, false); break;
            }
        }
    }
place_objects([ball, padle1, padle2]);
}

function updatePadle(padle,up) {
   if(up) {
      padle.y -= 15;
      if(padle.y < 0 ) padle.y = 0;
   }
   else {
      let bodyRect = document.body.getBoundingClientRect();
      padle.y += 15;
      if(padle.y > bodyRect.height - padle.height) {
          padle.y = bodyRect.height - padle.height
      }
   }
}

function track_player_input(event) {
    if (event.type == "keydown") {
        switch (event.key) {
            case "a": buttons.p1_up = true; break;
            case "q": buttons.p1_down = true; break;
            case "p": buttons.p2_up = true; break;
            case "m": buttons.p2_down = true; break;
        }
    } else if (event.type == "keyup") {
        switch (event.key) {
            case "a": buttons.p1_up = false; break;
            case "q": buttons.p1_down = false; break;
            case "p": buttons.p2_up = false; break;
            case "m": buttons.p2_down = false; break;
        }
    }
}

let ball, padle1, padle2;
let buttons = {
    "p1_up":false,
    "p1_down":false,
    "p2_up":false,
    "p2_down": false,
}
function init() {
    ball = new Ball();
    padle1 = new Paddle("left");
    padle2 = new Paddle("right");
    place_objects([ball, padle1, padle2]);
    setInterval(update, 100);
}

document.addEventListener("keydown", track_player_input);
document.addEventListener("keyup", track_player_input);
window.addEventListener("load", init);