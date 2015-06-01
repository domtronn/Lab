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

/*
 VECTOR DEFINITION
 */

function Vector( vertices ) {
	
	this.vertices = vertices;
	this.length = this.calculateLength( vertices );
	this.midpoint = this.calculateMidpoint( vertices );
	
}
Vector.prototype.vertex = function ( i ) { return this.vertices[i]; };

Vector.prototype.calculateLength = function ( v ) {
	
	return Math.sqrt(Math.pow(Math.abs(v[0].x - v[1].x), 2) +
									 Math.pow(Math.abs(v[0].y - v[1].y), 2));
	
};

Vector.prototype.calculateMidpoint = function ( v ) {
	
	return new Point( ( v[0].x + v[1].x ) / 2, ( v[0].y + v[1].y ) / 2 );
	
};
Vector.prototype.calculateGradient = function ( v ) {
	
	return ( v[1].y - v[0].y ) / ( v[1].x - v[0].x );
	
};

Vector.prototype.minus = function( v ) {
	
	return new Vector([
		new Point( this.vertex(0) - v.vertex(0).x, this.vertex(0).y - v.vertex(0).y ),
		new Point( this.vertex(1) - v.vertex(1).x, this.vertex(1).y - v.vertex(1).y )
	]);
	
};
