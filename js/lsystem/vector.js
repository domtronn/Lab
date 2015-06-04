// Copyright (C) 2015 Dominic Charlesworth <dgc336@gmail.com>

// Author: Dominic Charlesworth <dgc336@gmail.com>

// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 3
// of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program. If not, see <dgc336@gmail.com>.

function Vector( origin, magnitude, direction ) {

	this.o = origin;
	this.m = magnitude;
	this.d = direction || new Point( 0, 1 );

	return this;

}

Vector.prototype.scale = function ( s ) {

	this.m *= s;
	
	return this;
	
};

Vector.prototype.rotate = function ( d ) {

	var r = d * ( Math.PI / 180 ) * -1,
			x = (Math.cos(r) * this.d.x) - (Math.sin(r) * this.d.y),
			y = (Math.sin(r) * this.d.x) + (Math.cos(r) * this.d.y);

	this.d = new Point(x, y);

	return this;

};

Vector.prototype.setColor = function ( col ) {
  
	this.col = col;

	return this;
	
};

Vector.prototype.draw = function ( scale, colour ) {

	ctx.beginPath();
	ctx.moveTo( this.o.normal.x, this.o.normal.y );
	
	ctx.strokeStyle = LSystem.prototype.DEBUG ? this.col : colour;
		
	this.m = scale ? this.m * mouse.n: this.m;
	
	ctx.lineTo( this.o.normal.x + ( this.d.x * this.m ), this.o.normal.y - ( this.d.y * this.m ) );
	ctx.stroke();

	return this;

};

Vector.prototype.getDirection = function() { return this.d; };
Vector.prototype.getEndPoint = function() {

	return new Point( this.o.x + ( this.d.x * this.m ), this.o.y + ( this.d.y * this.m ) );

};


function Point( x, y ) {

	this.x = x;
	this.y = y;
	this.normal = { x: x + this.OFFSET , y: height - y };

}
