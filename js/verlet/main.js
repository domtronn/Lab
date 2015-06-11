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
cloth = new Cloth( 13, 10, { x: 50, y: 30 }, ctx );

var mouse = { minPoint: null };


canvas.onmousedown = function (evt) {
	mouse.minPoint = cloth.getClosestPoint( new Vector(evt.offsetX, evt.offsetY) );
};

canvas.onmouseup = function (e) {
	mouse.minPoint = null;
};

canvas.onmousemove = function (evt) {

	if ( mouse.minPoint ) 
		mouse.minPoint.setCurrent( new Vector(evt.offsetX, evt.offsetY) );
	
  evt.preventDefault();
	
};

function toggleColourful() { Cloth.prototype.RENDER = !Cloth.prototype.RENDER; }
function toggleConstraints() { Cloth.prototype.DRAW_CONSTRAINTS = !Cloth.prototype.DRAW_CONSTRAINTS; }
function togglePoints() { Cloth.prototype.DRAW_POINTS = !Cloth.prototype.DRAW_POINTS; }

(function animLoop() {

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.lineWidth = 1;

	cloth.update();

	requestAnimFrame(animLoop);

})();


