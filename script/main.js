const canvas_cont = s(".canvas");
const { canvas, ctx, cx, cy, cw, ch } = setUpCanvas(s("#main"), width, height);
const debug = setUpCanvas(s("#debug"), width, height);
const eraser = setUpCanvas(s("#eraser"), width, height);

const iterations = 1;
let last_erased = 0;
let eraser_cleared = true;
let now;
let lastTime = Date.now();

var balls = [];


const properties = {
  radius: 10,
  mass: 1,
  charge: 0,
  airFriction: 0.99,
  cor: 0.9,
  velX: 0,
  velY: 0,
  fixed: false,
  enable_gravity: false,
  axis_debug: false,
  force_debug: false,
  pause: false,
  eraseMode: false,
  eraser_size: 10,
  sim_speed: 1,
};


let charge = 1;

function addBodies(e) {
  let x = (e.touches ? e.touches[0].clientX : e.clientX),
    y = (e.touches ? e.touches[0].clientY : e.clientY);
  var rect = canvas.getBoundingClientRect();
  x -= rect.left;
  y -= rect.top;


  if (!properties.eraseMode) {
    let vel = new Vector(properties.velX, properties.velY);
    let ball = new Ball(x, y,
      properties.radius,
      properties.mass,
      properties.charge,
      properties.fixed,
      properties.airFriction,
      properties.cor
    );
    balls.push(ball);
    ball.addVel(vel);
  } else {
    eraser_cleared = false;
    last_erased = Date.now();
    //For erasing elements;
    eraser.ctx.clearRect(0, 0, cw, ch);
    eraser.ctx.beginPath();
    eraser.ctx.arc(x, y, properties.eraser_size, 0, twoPi);
    eraser.ctx.stroke();
    eraser.ctx.closePath();

    for (let i = 0; i < balls.length; i++) {
      let ball = balls[i];
      let dist = { x: ball.pos.x - x, y: ball.pos.y - y };
      dist = (dist.x ** 2) + (dist.y ** 2);
      if (dist <= ((ball.radius + properties.eraser_size) ** 2)) {
        balls.splice(i, 1);
        i --;
      }
    }
  }
}
canvas_cont.ontouchmove = addBodies;
canvas_cont.onclick = addBodies;


function draw() {
  now = Date.now();
  let dt = ((now - lastTime) / 1000) * properties.sim_speed;
  dt = Math.min(dt, 0.1);

  ctx.clearRect(0, 0, cw, ch);
  debug.ctx.clearRect(0, 0, cw, ch);
  if(!eraser_cleared && now - last_erased > 1000){
    eraser.ctx.clearRect(0, 0, cw, ch);
    eraser_cleared = true;
  }


  if (properties.enable_gravity) {
    gravity.y = 200;
  } else {
    gravity.y = 0;
  }

  for (let n = 0; n < balls.length; n++) {
    let ball = balls[n];
    if (!properties.pause) {
      ball.update(dt);
      ball.constrains(dt);
    }
    for (let m = n + 1; m < balls.length; m++) {
      let ball2 = balls[m];
      handleCollision(ball, ball2);
      handleStaticForces(ball, ball2);
    }
    ball.show();
  }

  window.requestAnimationFrame(draw);
  lastTime = now;
};
draw();
