var Constraint = function ( a, b ) {

	this.a = a;
	this.b = b;
	this.length = Math.sqrt( Math.pow(this.a.x - this.b.x, 2) + Math.pow(this.a.y - this.b.y, 2) );

};

Constraint.prototype.draw = function () {
	ctx.beginPath();
	
	ctx.moveTo( this.a.x, this.a.y );
	ctx.lineTo( this.b.x, this.b.y );

	ctx.stroke();

};

Constraint.prototype.resolve = function () {

	var diff_x  = this.a.x - this.b.x,
			diff_y  = this.a.y - this.b.y,
			dist    = Math.sqrt(diff_x * diff_x + diff_y * diff_y),
			diff    = (this.length - dist) / dist;

	var px = diff_x * diff * 0.5;
	var py = diff_y * diff * 0.5;

	this.a.x += px;
	this.a.y += py;
	this.b.x -= px;
	this.b.y -= py;

};
