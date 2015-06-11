// lsystem.js ---

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


function darken( color, p ) {
	var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * p), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
};

LSystem.prototype.getColour = function ( level ) {

	return darken( this.BASE_COLOUR, level * -8 );

};

function LSystem( axiom ) {
	var state = [ axiom ],
			newState,
			colour;

	var n = 0, len = this.N;
	for (n; n < len; n++) {

		newState = [];
		state.forEach( function (v) {

			ctx.lineWidth = (LSystem.prototype.LINE_WIDTH / (n + 1)) * LSystem.prototype.LINE_SCALE;

			colour = LSystem.prototype.COLOURFUL ? LSystem.prototype.getColour( n ) : '#212121';
			
			v.vector && v.vector.draw( n === len - 1, colour );

			newState = newState.concat( v.rule( v.vector ) );

		});

		state = newState.slice();
	}

	return new Vector();

}

LSystem.prototype.BASE_COLOUR = '#73aa3c';
LSystem.prototype.DEBUG = false;
LSystem.prototype.COLOURFUL = false;
LSystem.prototype.MOUSE_LIMIT = 10;
LSystem.prototype.MAX_ANGLE = 80;
