var canvas,
		ctx,
		width,
		height,
		cloth;

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
cloth = new Cloth( 17, 10, { x: 20, y: 30 }, ctx );

var mouse = { nearestPoint: null };

(function animLoop() {

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.lineWidth = 1;

	cloth.update();

	requestAnimFrame(animLoop);

})();
