var Cloth = function (width, height, spacing) {

	this.points = [ ];
	this.spacing = spacing;
	this.width = width;
	this.height = height;

	var start_x = (ctx.canvas.width / 2) - ((width * spacing.x) / 2),
			start_y = 60;

	for (var j = 0, y = start_y; j < height; j++, y += spacing.y) {

		for (var i = 0, x = start_x; i < width; i++, x += spacing.x) {

			var p = new Point(
				x,
				y + ((( width / 2 ) - Math.abs( i - ( width / 2 ) )) * 2)
			);

			if ( i !== 0 )
				p.attach( this.points[ this.points.length - 1 ] );

			if ( j !== 0 )
				p.attach( this.points[ ( ( j - 1 ) * width ) + i ] );

			j === 0 &&
				i % Math.floor( width / 4 ) === 0 && p.pin();

			this.points.push( p );

		}

	}

};

Cloth.prototype.renderSquare = function ( p ) {

	var i = this.points.indexOf( p ) + 1,
			row = Math.floor( i / cloth.width ),
			col = i - ( row * cloth.width );

	if (!( col % cloth.width) || (row === cloth.height - 1))
		return;

	var lower = this.points[ ((row + 1) * this.width) - 1 + col ];
	var right = this.points[ ((row ) * this.width) + col ];
	var lowerRight = this.points[ ((row + 1) * this.width) + col ];

	var angle = Math.abs( (new Vector([p, lower])).dot(new Vector([p, right])) );

	ctx.beginPath();

	ctx.moveTo(p.x, p.y);
	ctx.lineTo(lower.x, lower.y);
	ctx.lineTo(lowerRight.x, lowerRight.y);
	ctx.lineTo(right.x, right.y);
	ctx.closePath();

	ctx.strokeStyle = ctx.fillStyle = darken(this.COLOUR, 30 - (angle * 30));

	ctx.fill();
	ctx.stroke();

};

Cloth.prototype.update = function () {

	this.points.forEach( function ( p ) {

		var i = 3;

		while( i-- ) p.resolve_constraints();

		p.step(0.028);


	});

	var self = this;
	this.points.forEach( function ( p ) {

		self.renderSquare( p );

	});

};

Cloth.prototype.COLOUR = '#9862a4';
