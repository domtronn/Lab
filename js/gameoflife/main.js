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

Cell.prototype.strokeColour = 'white';
Cell.prototype.fillColour = '#393838';

Grid.prototype.size = { x: 120, y: 40 };
Grid.prototype.scale = 20;

// Function to find if cell is defined in cells array based on ids
Array.prototype.find = function (cell) {
	
	var indexOf = -1;
	
	this.forEach(function (el, i) {
		if (el.id === cell.id) { indexOf = i; }
	});
	
	return indexOf;
	
};

// Start Game of Life here

var canvas = document.getElementById( 'canvas' ),
		ctx = canvas.getContext( '2d' );
resize();

var gameoflife;

gameoflife = new Grid(ctx);
gameoflife.clear();

gameoflife.id = setInterval(gameoflife.animate, 100);

function resize() {
	
	canvas.width = window.innerWidth; canvas.height = window.innerHeight;

	setScale( Grid.prototype.scale );
	
}

function pause () {
	
	clearInterval(gameoflife.id);
	delete gameoflife.id;
	
}

function play () {

	if (!gameoflife.id) 
		gameoflife.id = setInterval(gameoflife.animate, 100);
	
}

function generate () {
	
	var x = parseInt(document.getElementById('form-x').value) || 0;
	var y = parseInt(document.getElementById('form-y').value) || 0;
	
	if (x >= 0 && y >= 0) {

		var pattern = Grid.prototype.patterns[ document.getElementsByTagName( 'select' )[0].value ];
		
		gameoflife.createOffsetPattern( pattern, [x, y] );
		gameoflife.render();
		
	}
	
}

function setScale ( s ) {
	
	var scale = Cell.prototype.scale = Grid.prototype.scale = s;
	
	Grid.prototype.size = { x: Math.ceil( canvas.width / scale ), y: Math.ceil( canvas.height / scale ) };

	if (gameoflife)
		gameoflife.render();
	
}

function toggleCoords( ) {
	
	var tooltip = document.getElementById( 'tooltip' );
			
	tooltip.classList.contains('show') ?
		tooltip.classList.remove('show') :
		tooltip.classList.add('show');
}

var s = new Slider('#scaleSlider',{ min:30, max:100, step:1 });
s.on('change', function (v) { setScale( v.newValue ); });

canvas.onmousemove = function ( evt ) {
	
	var tooltip = document.getElementById( 'tooltip' ),
			x = Math.floor( evt.offsetX / Grid.prototype.scale ),
			y = Math.floor( evt.offsetY / Grid.prototype.scale );
	
	tooltip.style.left = evt.offsetX + 'px';
	tooltip.style.top = (evt.offsetY - 20) + 'px';

	tooltip.textContent = "( x: " + x + ", y: " + y + " )"; 
	
};

canvas.addEventListener('mousedown', function ( evt ) {
	
	var x = Math.floor(evt.offsetX / Grid.prototype.scale),
			y = Math.floor(evt.offsetY / Grid.prototype.scale),
			cellIndex = gameoflife.cells.find(gameoflife.getCell(x, y));

	cellIndex < 0 ?
		gameoflife.createCell(x, y) :
		gameoflife.cells.splice(cellIndex, 1);
	
	gameoflife.render();
	
});

document.addEventListener('keydown', function ( e ) {

	if (e.keyCode === 84)
		toggleCoords();

	if (e.keyCode === 82)
		gameoflife.clear();

	if (e.keyCode === 71)
		generate();

	if (e.keyCode === 80) {

		gameoflife.id ? pause() : play();
		
	}
		
	
});
