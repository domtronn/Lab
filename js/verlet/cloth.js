function darken( color, p ) {
	var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * p), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
};

function rgb2hex(r, g, b) {
	return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function byte2Hex(n) {
  var nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

var Cloth = function (width, height, spacing) {

	this.points = [ ];
	this.constraints = [ ];
	
	var start_x = (ctx.canvas.width / 2) - ((this.WIDTH * this.SPACING.x) / 2),
			start_y = 60;

	for (var j = 0, y = start_y; j < this.HEIGHT; j++, y += this.SPACING.y) {

		for (var i = 0, x = start_x; i < this.WIDTH; i++, x += this.SPACING.x) {
						
			var p = new Point(x, y + ((( this.WIDTH / 2 ) - Math.abs( i - ( this.WIDTH / 2 ) )) *  this.OFFSET));

			if ( i !== 0 )
				this.constraints.push(new Constraint(p, this.points[ this.points.length - 1 ] ) );

			if ( j !== 0 )
				this.constraints.push(new Constraint(p, this.points[ ( ( j - 1 ) * this.WIDTH ) + i ] ) );

			( i === 0 || i === (this.WIDTH - 1) ) && p.pin();
			
			this.CURTAINS ?
				j === 0 && i % Math.floor( this.WIDTH / this.PIN_WIDTH ) === 0 && p.pin() :
				j === 0 && p.pin();

			this.points.push( p );

		}

	}

};

Cloth.prototype.renderSquare = function ( p ) {

	var i = this.points.indexOf( p ) + 1,
			row = Math.floor( i / this.WIDTH ),
			col = i - ( row * this.WIDTH );

	if (!( col % this.WIDTH) || (row === this.HEIGHT - 1))
		return;
	
	var v = p.getCurrent();
	var lower = this.points[ ((row + 1) * this.WIDTH) - 1 + col ].getCurrent();
	var right = this.points[ ((row ) * this.WIDTH) + col ].getCurrent();
	var lowerRight = this.points[ ((row + 1) * this.WIDTH) + col ].getCurrent();

	var angle = Math.abs(
		v.minus(lower).dot(v.minus(right))
	);

	ctx.beginPath();

	ctx.moveTo(v.x, v.y);
	ctx.lineTo(lower.x, lower.y);
	ctx.lineTo(lowerRight.x, lowerRight.y);
	ctx.lineTo(right.x, right.y);
	ctx.closePath();

	var color = this.RAINBOW ?
				rgb2hex(
					Math.sin((0.3 * col) + 0) * 127 + 128, 
					Math.sin((0.3 * col) + 2) * 127 + 128, 
					Math.sin((0.3 * col) + 4) * 127 + 128
				) : this.COLOUR;
	
	ctx.strokeStyle = ctx.fillStyle = darken(color, 30 - (angle * 30));

	ctx.fill();
	ctx.stroke();

};

Cloth.prototype.getClosestPoint = function ( m ) {

	var dist, minPoint, minDist = 100000;
	
	this.points.forEach( function (p) {

		dist = m.minus(p.getCurrent()).length();
		
		if ( dist < minDist ) {

			minDist = dist;
			minPoint = p;
			
		}
		
	});

	return minPoint;
};

Cloth.prototype.update = function () {

	this.points.forEach( function ( p ) {
		p.move();
	});

	var i = this.ITERATIONS;
	for (i; i--;) {
		this.constraints.forEach( function ( c ) {
			c.resolve();
		});
	}

	this.render();
};

Cloth.prototype.render = function () {

	var self = this;

	if ( this.RENDER )
		this.points.forEach( function ( p ) {
			self.renderSquare( p );
		});

	if ( this.DRAW_POINTS )
		this.points.forEach( function ( p ) {
			p.draw();
		});

	if ( this.DRAW_CONSTRAINTS )
		this.constraints.forEach( function ( c ) {
			c.draw();
		});

};

Cloth.prototype.WIDTH = 61;
Cloth.prototype.HEIGHT = 10;
Cloth.prototype.SPACING = { x: 10, y: 30 };

Cloth.prototype.PIN_WIDTH = 5;

Cloth.prototype.CURTAINS = true;
Cloth.prototype.OFFSET = 1;

Cloth.prototype.ITERATIONS = 2;
Cloth.prototype.DRAW_POINTS = false;
Cloth.prototype.DRAW_CONSTRAINTS = true;
Cloth.prototype.RENDER = true;
Cloth.prototype.RAINBOW = true;
Cloth.prototype.COLOUR = '#9862a4';
