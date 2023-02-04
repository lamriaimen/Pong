function Ball() {
this.id = "ball";
this.x = 50;
this.y = 50;
this.vx=10;
this.vy=10;
let ball = document.getElementById("ball");
this.height = ball.offsetHeight;
this.width = ball.offsetWidth;


}
function Paddle(side) {
  let bodyRect = document.body.getBoundingClientRect();

    this.id = side == "left" ? "paddle1" : "paddle2";
    this.x = side == "left" ? 0 : bodyRect.width - 24;
    this.y = bodyRect.height / 2 - 96;
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

if (ball.y <=0 || ball.y >= bodyRect.height -ball.height) {
  ball.vy = -ball.vy;
}
for(let key in buttons) {
        if(buttons[key]) {
            switch (key) {
                case "p1_up": updatePaddle(paddle1,true);break;
                case "p1_down": updatePaddle(paddle1, false); break;
                case "p2_up": updatePaddle(paddle2, true); break;
                case "p2_down": updatePaddle(paddle2, false); break;
            }
        }
    }


    let ballLeft = ball.x;
    let ballRight = ball.x + ball.width;
    let ballTop = ball.y;
    let ballBottom = ball.y + ball.height;
    let paddle1Left = paddle1.x;
    let paddle1Right = paddle1.x + paddle1.width;
    let paddle1Top = paddle1.y;
    let paddle1Bottom = paddle1.y + paddle1.height;
    let paddle2Left = paddle2.x;
    let paddle2Right = paddle2.x + paddle2.width;
    let paddle2Top = paddle2.y;
    let paddle2Bottom = paddle2.y + paddle2.height;

    if(ballLeft <= paddle1Right && ballRight >= paddle1Left && ballTop <= paddle1Bottom && ballBottom >= paddle1Top) {
        ball.vx *= -1;
    }
    else if(ballLeft <= paddle2Right && ballRight >= paddle2Left && ballTop <= paddle2Bottom && ballBottom >= paddle2Top) {
        ball.vx *= -1;
    }

    else if(ball.x < -20) {
      updateScore("right");
      reset();
  }
  else if( ballRight > bodyRect.width+20) {
      updateScore("left");
      reset();
  }
    function updateScore(side) {
      let scoreElement = document.getElementById("ScorePl" + (side == "left" ? "Left" : "Right"));
      let score = parseInt(scoreElement.textContent.trim());
      scoreElement.textContent = score + 1;
  }
  
place_objects([ball, paddle1, paddle2]);
}

function updatePaddle(paddle,up) {
   if(up) {
      paddle.y -= 15;
      if(paddle.y < 0 ) paddle.y = 0;
   }
   else {
      let bodyRect = document.body.getBoundingClientRect();
      paddle.y += 15;
      if(paddle.y > bodyRect.height - paddle.height) {
          paddle.y = bodyRect.height - paddle.height
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

let buttons = {
    "p1_up":false,
    "p1_down":false,
    "p2_up":false,
    "p2_down": false,
}

function reset(){


  ball = new Ball();
  paddle1 = new Paddle("left");
  paddle2 = new Paddle("right");
  let bodyRect = document.body.getBoundingClientRect();

  ball.x=bodyRect.width/2;
  ball.y=bodyRect.height/2;

  place_objects([ball, paddle1, paddle2]);

}

let ball, paddle1, paddle2;
function init() {
    ball = new Ball();
    paddle1 = new Paddle("left");
    paddle2 = new Paddle("right");
    let bodyRect = document.body.getBoundingClientRect();

  ball.x=bodyRect.width/2;
  ball.y=bodyRect.height/2;

    place_objects([ball, paddle1, paddle2]);
    setInterval(update, 100);
}

document.addEventListener("keydown", track_player_input);
document.addEventListener("keyup", track_player_input);
window.addEventListener("load", init);