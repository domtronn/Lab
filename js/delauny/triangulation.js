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

function Triangulation( superTriangle ) {
	
	this.superTriangle = superTriangle;
	this.triangles = [ superTriangle ];

}

Triangulation.prototype.add = function ( triangle ) {
	
  this.triangles.push( triangle );
	
};

Triangulation.prototype.remove = function ( triangle ) {
	
	var index = this.triangles.indexOf( triangle );
	
  this.triangles.splice( index, 1 );
	
};

Triangulation.prototype.getSuperTriangle = function () {
	
  return this.superTriangle;
	
};
