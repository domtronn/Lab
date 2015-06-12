var canvas,
		ctx, 
		cloth,
		lastCallTime,
		fps;

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
ctx.canvas.width = window.innerWidth, ctx.canvas.height = window.innerHeight;

cloth = new Cloth();

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
function toggleRainbow() { Cloth.prototype.RAINBOW = !Cloth.prototype.RAINBOW; }

var s1 = new Slider('#width',{ min:1, max:81, step:4});
s1.on('change', function (v) {
	Cloth.prototype.WIDTH = v.newValue;
	cloth = new Cloth();
});

var s2 = new Slider('#height',{ min:1, max:80, step:1});
s2.on('change', function (v) {
	Cloth.prototype.HEIGHT = v.newValue;
	cloth = new Cloth();
});


var s3 = new Slider('#hspacing',{ min:1, max:60, step:1});
s3.on('change', function (v) {
	Cloth.prototype.SPACING.x = v.newValue;
	cloth = new Cloth();
});

var s4 = new Slider('#vspacing',{ min:1, max:60, step:1});
s4.on('change', function (v) {
	Cloth.prototype.SPACING.y = v.newValue;
	cloth = new Cloth();
});

function setFPSCounter( fps ) {

	var fpsCounter = document.getElementById( 'fps-counter' );
	fpsCounter.textContent = fps;
	
}


(function animLoop() {

	if (!lastCallTime) 
		lastCallTime = Date.now(), fps = 0;

	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.lineWidth = 1;

	cloth.update();
	
	fps = 1000/(new Date().getTime() - lastCallTime);
	lastCallTime = Date.now();
	
	setFPSCounter(fps.toPrecision( 4 ));
	requestAnimFrame(animLoop);

})();
