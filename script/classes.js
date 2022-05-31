const gravity = new Vector(0, 0);
const k = 5e6; //1/4πEo


class Ball {
  constructor(x, y, radius, mass, charge = 0, fixed = false, airFriction = 0.90, cor = 0.9) {
    //Physics;
    this.pos = new Vector(x, y);
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 0);

    //Body properties;
    this.fixed = fixed;
    this.radius = radius;
    this.mass = mass || 1;
    this.airFriction = airFriction;
    this.groundFriction = 0.5;
    this.cor = cor; //Coefficient Of Restitution;
    this.charge = charge;

    //Looks;
    this.color = (charge > 0 ? "blue" : (charge == 0 ? "red" : "green"));
  }
  addVel(vel) {
    this.vel = this.vel.add(vel);
  }
  applyForce(force) {
    this.acc = this.acc.add(force.mult(1 / this.mass));
  }
  update(dt) {
    if (!this.fixed) {
      this.dt = dt;
      if (this.pos.x + this.radius >= ch && this.vel.magSq() > 0.000001) {
        this.vel = this.vel.mult(this.groundFriction);
      }
      this.vel = this.vel.mult(this.airFriction)
      this.vel = this.vel.add(this.acc.mult(dt));
      this.vel = this.vel.add(gravity.mult(dt));
      this.pos = this.pos.add(this.vel.mult(dt));
      this.acc.x = 0;
      this.acc.y = 0;
    }
  }
  constrains() {
    if (this.pos.x + this.radius >= cw) {
      this.pos.x = cw - this.radius;
      this.vel.x = -Math.abs(this.vel.x)
    } else if (this.pos.x - this.radius <= 0) {
      this.pos.x = this.radius;
      this.vel.x = Math.abs(this.vel.x)
    }
    if (this.pos.y + this.radius >= ch) {
      this.pos.y = ch - this.radius;
      this.vel.y = -Math.abs(this.vel.y)
    } else if (this.pos.y - this.radius <= 0) {
      this.pos.y = this.radius;
      this.vel.y = Math.abs(this.vel.y)
    }
  }
  show() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, twoPi)
    ctx.fill();
    ctx.closePath();
  }
}
