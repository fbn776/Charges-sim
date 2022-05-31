function handleCollision(a, b) {
  const d = ((a.pos.x - b.pos.x) ** 2) + ((a.pos.y - b.pos.y) ** 2);
  let r = a.radius + b.radius;
  if (d <= r ** 2) {
    //Collision axis
    let ba = b.pos.sub(a.pos).unit();

    if (!a.fixed) {
      let a_ = b.pos.add(ba.mult(-r));
      a.pos = a_;
    }
    if (!b.fixed) {
      let b_ = a.pos.add(ba.mult(r));
      b.pos = b_;
    }
    //Collision solving;
    let velRel = a.vel.sub(b.vel);
    let speed = velRel.dot(ba);
    speed *= Math.min(a.cor, b.cor);
    let impulse = 2 * speed / (a.mass + b.mass);

    a.vel = a.vel.add(ba.mult(-impulse * b.mass));
    b.vel = b.vel.add(ba.mult(impulse * a.mass));
  }
}


function handleStaticForces(a, b) {
  let axis = b.pos.sub(a.pos);
  let distSq = axis.magSq();
  axis = axis.unit();
  //F = kq1q2/r² n
  let charges = a.charge * b.charge;
  if (charges != 0) {
    let force = axis.mult(-k * charges / distSq);

    if (!properties.pause) {
      a.applyForce(force);
      b.applyForce(force.neg());
    }

    let force_lim = force.limit(100);

    let color = charges > 0 ? "#F57C00" : "#795548";

    if (Boolean(properties.force_debug)) {
      debug.ctx.drawVector(a.pos.x, a.pos.y, force_lim, { color: color });
      debug.ctx.drawVector(b.pos.x, b.pos.y, force_lim.neg(), { color: color });
    }
    if (Boolean(properties.axis_debug)) {
      debug.ctx.line(a.pos.x, a.pos.y, b.pos.x, b.pos.y, {
        color: "#673AB7",
        dash: [5, 2]
      })
    }
  }
}
