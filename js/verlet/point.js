function Point( x, y ) {
	
	this.x = x;
	this.y = y;
	this.px = x;
	this.py = y;
	
	this.pinned = false;
	this.pin_x = null;
	this.pin_y = null;
	
	this.constraints = [];

}

Point.prototype.pin = function () {

	this.pinned = true;
	this.pin_x = this.x;
	this.pin_y = this.y;

	return this;

};
Point.prototype.unpin = function () {

	this.pinned = false;

	return this;

};
Point.prototype.attach = function ( point ) {

	this.constraints.push(
		new Constraint( this, point )
	);
	
};

Point.prototype.resolve_constraints = function () {
	
	this.pinned && (this.x = this.pin_x);
	this.pinned && (this.y = this.pin_y);
	
	var i = this.constraints.forEach( function ( c ) {

		c.resolve();
		
	});

};
Point.prototype.step = function ( d ) {

	var d2 = d * d, nx, ny,
			force = {x: 0, y: 70};

	nx = this.x + (this.x - this.px) + (force.x * d2);
	ny = this.y + (this.y - this.py) + (force.y * d2);

	this.px = this.x;
	this.py = this.y;

	this.x = nx;
	this.y = ny;

};
