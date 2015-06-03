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

function Star( x, y ) {
	
	this.x = x;
	this.y = y;
	this.r = Math.random();
	
}

Star.prototype.move = function( xDelta, yDelta ) {
	
	this.x += xDelta;
	this.y += yDelta;
	
};

Star.prototype.draw = function() {
	
	ctx.beginPath();
	
	ctx.fillStyle = 'white';
	ctx.arc( this.x, this.y, this.r + this.MIN_RADIUS, 0, 2 * Math.PI );
	
	ctx.fill();
	
};

function Layer( count, depth ) {
	
	this.stars = [];
	this.depth = depth;
	
	for ( var j = 0; j < count; j++ ) {
		
		var x = ( Math.random() * canvas.width * 2 ) - ( canvas.width / 2 ),
				y = ( Math.random() * canvas.height * 2 ) - ( canvas.height / 2 );
		
		this.stars.push( new Star( x, y ) );
		
	}
	
}

Layer.prototype.getParallaxAmount = function() {
	
	return this.PARALLAX / this.depth;
	
};

Layer.prototype.remove = function ( star ) {
	
	var index = this.stars.indexOf( star );
	
  this.stars.splice( index, 1 );
	
};

function StarField( count, layers ) {
	count = count || this.COUNT;
	layers = layers || this.LAYERS;
	
	this.layers = [];
	
	for (var i = 1; i <= layers; i++) {
		
		this.layers.push( new Layer( count * i, i ) );
		
	}
	
}

StarField.prototype.reset = function () {
  
	ctx.beginPath();
	
	ctx.fillStyle = 'black';
	
	ctx.fillRect( 0, 0, canvas.width, canvas.height );
	
};

StarField.prototype.forAllStarsCall = function ( func ) {
	
  this.layers.forEach(function (layer) {
		
		layer.stars.forEach(function (star) {
			
			func( star, layer );
			
		});
	});
	
};

StarField.prototype.render = function () {
  
	this.forAllStarsCall(function (star) { star.draw(); });
	
};

StarField.prototype.move = function ( x, y ) {
	
	this.forAllStarsCall(function (star, layer) {
		
		star.move( x * layer.getParallaxAmount(), y * layer.getParallaxAmount() );
		star.draw();
		
	});
	
};

StarField.prototype.zoom = function ( direction ) {
	var self = this, x, y;
	direction = direction || 1;
	
	this.stop();
	this.intervalId = setInterval(function () {
		
		self.reset();
		self.forAllStarsCall(function (star, layer) {
			
			x = ( star.x - canvas.width/2 ) * self.ZOOM_SPEED * 0.1 * layer.getParallaxAmount() * direction;
			y = ( star.y - canvas.height/2 ) * self.ZOOM_SPEED * 0.1 * layer.getParallaxAmount() * direction;

			star.move( x, y );
			star.draw();
			
		});
		
	}, 10);
	
};

StarField.prototype.calculateDelta = function ( delta ) {
	
	var shiftDelta = this.SHIFT_DELTA,
			result = delta + Math.round( ( Math.random() * shiftDelta ) - ( shiftDelta / 2 ) );
	
  return Math.min( Math.max( result, -shiftDelta ), shiftDelta );
	
};

StarField.prototype.stop = function () {
	
  if ( this.intervalId ) {
		
		clearInterval( this.intervalId );
		this.intervalId = undefined;
		
	}
	
};

StarField.prototype.shift = function () {
	
  var self = this, xDelta = 0, yDelta = 0;
	
	this.stop();
	this.intervalId = setInterval(function () {
		
		xDelta = self.calculateDelta( xDelta );
		yDelta = self.calculateDelta( yDelta );

		self.reset();
		self.move( xDelta, yDelta );
		
	}, 50);
	
};

// Prototype Vars

Layer.prototype.PARALLAX = 1;
Star.prototype.MIN_RADIUS = 0.3;
StarField.prototype.ZOOM_SPEED = 1;
StarField.prototype.SHIFT_DELTA = 20;
StarField.prototype.COUNT = 20;
StarField.prototype.LAYERS = 10;
