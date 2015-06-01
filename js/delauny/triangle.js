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

function Triangle(vertices, col) {
	this.new = true;
	this.vertices = vertices;
	this.edges = [new Vector([this.vertices[0], this.vertices[1]]),
								new Vector([this.vertices[0], this.vertices[2]]),
								new Vector([this.vertices[1], this.vertices[2]])];
	this.circumRadius = this.calculateCircumRadius();
	this.circumCenter = this.calculateCircumCenter();
	this.col = this.randomColour(this.COLOURS);
}

Triangle.prototype.COLOURS = ['#ae02ae', '#bbae02'];
Triangle.prototype.vertex = function (i) { return this.vertices[i]; };

// Calculation methods
Triangle.prototype.calculateCircumRadius = function () {
	var a = this.edges[0].length,
			b = this.edges[1].length,
			c = this.edges[2].length;
	var resultant = Math.sqrt((a + b + c) * (b + c - a) * (c + a - b) * (a + b - c)) || a/2;
	return resultant ? (a * b * c)/resultant : a/2;
};

Triangle.prototype.calculateCircumCenter = function () {
	var a = this.vertices[0],
			b = this.vertices[1],
			c = this.vertices[2];
	var D = 2 * ((a.x * (b.y - c.y)) + (b.x * (c.y - a.y)) + (c.x * (a.y - b.y)));
	var Ux = (((Math.pow(a.x, 2) + Math.pow(a.y, 2)) * (b.y - c.y)) +
						((Math.pow(b.x, 2) + Math.pow(b.y, 2)) * (c.y - a.y)) +
						((Math.pow(c.x, 2) + Math.pow(c.y, 2)) * (a.y - b.y))) / D,
			Uy = (((Math.pow(a.x, 2) + Math.pow(a.y, 2)) * (c.x - b.x)) +
						((Math.pow(b.x, 2) + Math.pow(b.y, 2)) * (a.x - c.x)) +
						((Math.pow(c.x, 2) + Math.pow(c.y, 2)) * (b.x - a.x))) / D;
	return new Point(Ux, Uy);
};

Triangle.prototype.randomColour = function(colours) {
	var color = Math.round(Math.random()) ? colours[0] : colours[1];
	var percent = Math.random() * 40 - 15 ;

	var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
};

// Contains methods
Triangle.prototype.contains = function (thing) {
	this._contains = thing;
	return this;
};
Triangle.prototype.inCircumcircle = function () {
  return (new Vector([this.circumCenter, this._contains])).length <= this.circumRadius ? true : false;
};
Triangle.prototype.inEdges = function () {
	var edge = this._contains;
	return this.edges.some(function (e) {
		return edge.vertices[0] == e.vertices[0] && edge.vertices[1] == e.vertices[1];
	});
};
Triangle.prototype.inTriangle = function () {
  var point = this._contains,
			B = this.vertex(1).minus(this.vertex(0)),
			C = this.vertex(2).minus(this.vertex(0)),
			P = point.minus(this.vertex(0)),
			d = (B.x * C.y) - (C.x * B.y);
	var weights =
				[
					((P.x * (B.y - C.y)) + (P.y * (C.x - B.x)) + (B.x * C.y) - (C.x * B.y))/d,
					((P.x * C.y) - (P.y * C.x))/d,
					((P.y * B.x) - (P.x * B.y))/d
				];
	return weights.every(function (w) { return w >= 0 && w <= 1; });
};
