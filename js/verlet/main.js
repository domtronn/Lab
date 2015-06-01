var canvas,
		ctx,
		width,
		height, 
		points,
		spacing,
		cloth, 
		start_x,
		start_y;

window.requestAnimFrame = (function() {

	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function ( callback ) {
			window.setTimeout(callback, 1000/60);
		};

})();

canvas = document.getElementById( 'canvas' );
ctx = canvas.getContext( '2d' );

width = ctx.canvas.width = window.innerWidth, height = ctx.canvas.height = window.innerHeight;
points = [ ];

spacing = { i: 30, j: 50}, cloth = { width: 41, height: 30 }, 
start_x = (width / 2) - ((cloth.width * spacing.i) / 2),
start_y = 60;

var j = 0, jMax = cloth.height;
for (j; j < jMax; j++) {

	var i = 0, iMax = cloth.width;
	for (i; i < iMax; i++) {

		var p = new Point( start_x + ( i * spacing.i ), start_y + ( j * spacing.j )
											 + (((cloth.width / 2) - Math.abs( i - (cloth.width/2) )) * 5)
										 );
		
		if ( i !== 0 ) 
			p.attach( points[ points.length - 1 ] );

		if ( j !== 0 )
			p.attach( points[ ( ( j - 1 ) * cloth.width ) + i ] );

		j === 0 &&
		i % Math.floor( cloth.width / 4 ) === 0 &&
			p.pin();
			
		points.push( p );
		
	}
	
}

function darken( color, p ) {
	var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * p), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
};

function renderSquare( p ) {
	
	var i = points.indexOf( p ) + 1,
			row = Math.floor( i / cloth.width ),
			col = i - ( row * cloth.width );
	
	if (!( col % cloth.width) || (row === cloth.height - 1))
		return;		
	
	var lower = points[ ((row + 1) * cloth.width) - 1 + col ];
	var right = points[ ((row ) * cloth.width) + col ];
	var lowerRight = points[ ((row + 1) * cloth.width) + col ];
	
	var maxArea = spacing.i * spacing.j;
	var area = Math.abs(((p.x - lower.x) * (lowerRight.y - lower.y))
											- ((p.y - lower.y) * (lowerRight.x - lower.x)));
	var angle = Math.abs( (new Vector([p, lower])).dot(new Vector([p, right])) );
	
	ctx.beginPath();
	
	ctx.moveTo(p.x, p.y);
	ctx.lineTo(lower.x, lower.y);
	ctx.lineTo(lowerRight.x, lowerRight.y);
	ctx.lineTo(right.x, right.y);
	ctx.closePath();
	
	ctx.strokeStyle = ctx.fillStyle = darken(renderSquare.prototype.COLOUR, 30 - angle * 30);
	
	ctx.fill();
	ctx.stroke();
	
}
renderSquare.prototype.COLOUR = '#9862a4';

var mouse = { nearestPoint: null };

canvas.onmousedown = function (evt) {

	var m,
			dist, 
			l = 100000, 
			nearestPoint;
	
	m = new Point(evt.offsetX, evt.offsetY);
	l = (new Vector([points[0], m])).length;
	
	points.forEach( function (p) {

		dist = (new Vector([p, m])).length;
		
		if ( dist < l ) {

			l = dist;
			nearestPoint = p;
			
		}
		
	});

	
	mouse.nearestPoint = nearestPoint;
	
};

canvas.onmouseup = function (e) {

	mouse.nearestPoint = null;
	
};

canvas.onmousemove = function (evt) {

	if ( mouse.nearestPoint ) {
		
		mouse.nearestPoint.x = evt.x;
		mouse.nearestPoint.y = evt.y;
		
	}
	
  evt.preventDefault();
	
};

(function animLoop() {

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.lineWidth = 1;
	
	points.forEach( function ( p ) {

		var i = 3;
		
		while( i--) p.resolve_constraints();
		
		p.step(0.028);

		
	});

	points.forEach( function ( p ) {

		renderSquare( p );
		
	});
	
	requestAnimFrame(animLoop);

})();
