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
 ALGORITHM
 */

function BowyerWatson( pointList, triangulation ) {

	var superTriangle = triangulation.getSuperTriangle();

	pointList.forEach(function ( point ) {

		BowyerWatsonInsert( point, triangulation );

	});

}

function BowyerWatsonInsert( point, triangulation ) {
	var badTriangles = [];

	triangulation.triangles.forEach(function (triangle) {

		if ( triangle.contains( point ).inCircumcircle() )
			badTriangles.push( triangle );

	});

	var polygon = [];

	badTriangles.forEach(function( triangle ) {

		triangle.edges.forEach(function ( edge ) {

			if (badTriangles.every(function (t) { return t == triangle || !t.contains( edge ).inEdges(); }))
				polygon.push( edge );

		});

	});

	badTriangles.forEach(function( triangle ) {

		triangulation.remove( triangle );

	});

	polygon.forEach(function ( edge ) {

		triangulation.add( new Triangle( edge.vertices.concat( point ) ) );

	});
};
