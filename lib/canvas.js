const width = window.innerWidth;
const height = window.innerHeight;
const twoPi = 2*Math.PI;

function setUpCanvas(c,w,h){
	c.width = w;
	c.height = h;
	return {
		canvas:c,
		ctx:c.getContext("2d"),
		cw:c.width,
		ch:c.height,
		cx:c.width/2,
		cy:c.height/2
	}
}

CanvasRenderingContext2D.prototype.line = function(x1,y1,x2,y2,opt = {}){
	this.beginPath();
	let strokeColor = (opt.color || opt.strokColor || "black"),
		lineWidth = (opt.width || opt.lineWidth || 1);
		if(opt.dash || opt.dashed){
			this.setLineDash(opt.dash || opt.dashed || [5,2]);
		}
		this.strokeStyle = strokeColor;
		this.lineWidth = lineWidth;
		this.moveTo(x1,y1);
		this.lineTo(x2,y2);
		this.stroke();
		this.setLineDash([0,0])
	this.closePath();
};
CanvasRenderingContext2D.prototype.box = function(x,y,w,h,opt={}){
	this.beginPath();
		this.strokeStyle = (opt.color || opt.strokeStyle || opt.borderColor || "black");
		this.fillStyle = (opt.fill || opt.fillColor || opt.bg || opt.bgColor || "black");
		this.lineWidth = (opt.width || opt.lineWidth || opt.borderWidth || 1);
		this.rect(x,y,w,h);
		this.fill();
		this.stroke();
	this.closePath();
};

CanvasRenderingContext2D.prototype.circle = function(x,y,r,opt={}){
	this.beginPath();
		this.strokeStyle = (opt.color || opt.strokeStyle || opt.borderColor || "black");
		this.fillStyle = (opt.fill || opt.fillColor || opt.bg || opt.bgColor || "black");
		this.lineWidth = (opt.width || opt.lineWidth || opt.borderWidth || 1);
		this.arc(x,y,r,0,twoPi);
		this.fill();
		this.stroke();
	this.closePath();
};

CanvasRenderingContext2D.prototype.text = function(x,y,txt,opt = {}){
	this.beginPath();
		this.font = opt.font || "10px Arial";
		this.fillText(txt,x,y);		
	this.closePath();
};
CanvasRenderingContext2D.prototype.Arrow = function(sX,sY,eX,eY,opt={}){
	let diffY = eY - sY,
		diffX = eX - sX,
		angle = Math.atan2((diffY), (diffX));
		
	this.line(sX,sY,eX,eY,{
		color:opt.color || "black",
		width:opt.width || 1,
	});
	let size = opt.arrowSize || opt.size || 8;
	this.save();
		this.translate(eX,eY);
		this.rotate(angle);
		this.beginPath();
			this.fillStyle = opt.color || "black";
			this.moveTo(0,0);
			this.lineTo(0,-size+2);
			this.lineTo(size+2,0);
			this.lineTo(0,size-2);
			this.lineTo(0,0);
			this.fill();
		this.closePath();
	this.restore();
	
};
CanvasRenderingContext2D.prototype.drawRect = function(obj,opt){
	this.box(obj.x,obj.y,obj.w,obj.h,opt);
}

CanvasRenderingContext2D.prototype.drawVector = function(x,y,vec,opt = {}){
  let magMult = opt.mag || 1;
  
  this.Arrow(x,y,(x+vec.x)*magMult,(y+vec.y)*magMult,opt);
}
