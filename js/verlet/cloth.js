function darken( color, p ) {
	var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * p), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
};

var Cloth = function (width, height, spacing) {

	this.points = [ ];
	this.constraints = [ ];
	this.spacing = spacing;
	this.width = width;
	this.height = height;

	var start_x = (ctx.canvas.width / 2) - ((width * spacing.x) / 2),
			start_y = 60;

	for (var j = 0, y = start_y; j < height; j++, y += spacing.y) {

		for (var i = 0, x = start_x; i < width; i++, x += spacing.x) {

			var p = new Point(x, y + ((( width / 2 ) - Math.abs( i - ( width / 2 ) )) * 2));

			if ( i !== 0 )
				this.constraints.push(new Constraint(p, this.points[ this.points.length - 1 ] ) );

			if ( j !== 0 )
				this.constraints.push(new Constraint(p, this.points[ ( ( j - 1 ) * width ) + i ] ) );
				
			j === 0 &&
				i % Math.floor( width / 4 ) === 0 && p.pin();

			this.points.push( p );

		}

	}

};

Cloth.prototype.renderSquare = function ( p ) {

	var i = this.points.indexOf( p ) + 1,
			row = Math.floor( i / this.width ),
			col = i - ( row * this.width );

	if (!( col % this.width) || (row === this.height - 1))
		return;
	
	var v = p.getCurrent();
	var lower = this.points[ ((row + 1) * this.width) - 1 + col ].getCurrent();
	var right = this.points[ ((row ) * this.width) + col ].getCurrent();
	var lowerRight = this.points[ ((row + 1) * this.width) + col ].getCurrent();

	var angle = Math.abs(
		v.minus(lower).dot(v.minus(right))
	);

	ctx.beginPath();

	ctx.moveTo(v.x, v.y);
	ctx.lineTo(lower.x, lower.y);
	ctx.lineTo(lowerRight.x, lowerRight.y);
	ctx.lineTo(right.x, right.y);
	ctx.closePath();

	ctx.strokeStyle = ctx.fillStyle = darken(this.COLOUR, 30 - (angle * 30));

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

Cloth.prototype.ITERATIONS = 3;
Cloth.prototype.DRAW_POINTS = false;
Cloth.prototype.DRAW_CONSTRAINTS = true;
Cloth.prototype.RENDER = true;
Cloth.prototype.COLOUR = '#9862a4';
