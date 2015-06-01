function Vector( vertices ) {
	
	this.vertices = vertices;
	this.x = vertices[0].x - vertices[1].x;
	this.y = vertices[0].y - vertices[1].y;
	this.length = this.calculateLength( vertices );
	
}
Vector.prototype.vertex = function ( i ) { return this.vertices[i]; };

Vector.prototype.calculateLength = function ( v ) {
	
	return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	
};

Vector.prototype.dot = function ( v ) {

	return (( this.x * v.x ) + ( this.y * v.y )) / ( this.length * v.length );
	
};
