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

// Definition of Grammar
//
// A generic representation of a grammar

function Grammar( type, v, rule, rotation, scale, col ) {
	
	this.type = type;
	if (v === undefined) {
		this.vector = new Vector( new Point(0, 0), LSystem.prototype.M * LSystem.prototype.M_SCALE, new Point(0, 1) )
			.rotate( LSystem.prototype.INITIAL_ANGLE)
			.setColor( col );
	} else {
		this.vector = new Vector( v.getEndPoint(), v.m * LSystem.prototype.M_SCALE, v.getDirection())
			.rotate( rotation )
			.scale( scale )
			.setColor( col );
	}

	this.rule = rule;
	
}

// Definition of Grammar Implementations

function C( v ) {

	return new Grammar( "C", v, function ( v ) { return [ new A( v ), new B( v ), new C( v ) ]; },
											this.ROTATION, this.SCALE, this.COLOR );

}

function B( v ) {

	return new Grammar( "B", v, function ( v ) { return [ new B( v ), new C( v ) ]; },
											this.ROTATION, this.SCALE, this.COLOR );

}

function A( v ) {
	
	return new Grammar( "A", v, function ( v ) { return [ new A( v ), new B( v ) ]; },
											this.ROTATION, this.SCALE, this.COLOR);
	
}
