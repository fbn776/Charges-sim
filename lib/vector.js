function Vector(x,y,z){
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
	
	this.toStr = function(){
		return `(${this.x},${this.y},${this.z})`;
	};
	this.mult = function(s){
		return new Vector(this.x*s,this.y*s,this.z*s);
	}
	this.multScalar = this.mult;
	this.divScalar = function(b){
	  return this.mult(1/b);
	}
	this.neg = function(){
		return this.multScalar(-1);
	}
	this.add = function (b){
		return new Vector(this.x+b.x,this.y+b.y,this.z+b.z)
	}
	this.sub = function(b){
		return this.add(b.neg());
	}
	this.mag = function (){
		return Math.sqrt(this.x**2 + this.y ** 2 + this.z **2);
	}
	this.magSq = function(){
		return (this.x**2 + this.y ** 2 + this.z **2);
	}
	this.unit = function(){
		return this.divScalar(this.mag());
	}
	this.dot = function(b){
		return (this.x*b.x + this.y*b.y + this.z*b.z);
	};
	this.cross = function(b){
		return new Vector(this.y*b.z - this.z*b.y,-(this.x*b.z - this.z*b.x),this.x*b.y - this.y*b.x)
	};
	this.projectOn = function(b){
		return this.dot(b)/b.mag();
	};
	this.angleBW = function(b){
		return Math.acos(this.dot(b)/(this.mag()*b.mag()));
	};
	this.angle = function(){
		return this.angleBW(new Vector(1,0));
	}
	this.distBtw = function(b){
		return Math.sqrt((this.x-b.x)**2 + (this.y - b.y)**2 + (this.z - b.z)**2);
	}
	this.limit = function(amo){
	  if(this.magSq() > (amo*amo)){
	    return this.unit().mult(amo);
	  }else{
	    return this;
	  }
	}
}

function random2dVec(l = 1){
	let angle = Math.random()*(2*Math.PI);
	return new Vector(l*Math.cos(angle),l*Math.sin(angle),0);
}

