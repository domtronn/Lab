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

function LSystem( axiom ) {
	var state = [ axiom ],
			newState;

	var n = 0, len = this.N;
	for (n; n < len; n++) {

		newState = [];
		state.forEach( function (v) {

			ctx.lineWidth = (LSystem.prototype.LINE_WIDTH / (n + 1)) * LSystem.prototype.LINE_SCALE;

			v.vector && v.vector.draw(  n === len - 1  );

			newState = newState.concat( v.rule( v.vector ) );

		});

		state = newState.slice();
	}

	return new Vector();
	
}
LSystem.prototype.DEBUG = false;
LSystem.prototype.MOUSE_LIMIT = 10;
LSystem.prototype.MAX_ANGLE = 80;
