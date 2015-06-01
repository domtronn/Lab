var canvas,
		ctx,
		sf;

canvas = document.getElementById( 'canvas' ), 
ctx = canvas.getContext( '2d' );
ctx.canvas.width = window.innerWidth; ctx.canvas.height = window.innerHeight;

newStarField();

function newStarField() {
	
	if (sf) 
		sf.stop();
		
	sf = new StarField();
	sf.reset();
	sf.render();
	
}

var s5 = new Slider('#starsSlider',{ min:1, max:200, step:1, value: 20});
s5.on('change', function (v) { StarField.prototype.COUNT = v.newValue; newStarField(); });
var s6 = new Slider('#layersSlider',{ min:1, max:20, step:1, value: 10});
s6.on('change', function (v) { StarField.prototype.LAYERS = v.newValue; newStarField(); });

var s1 = new Slider('#parallaxSlider',{ min:0.1, max:1, step:0.05});
s1.on('change', function (v) { Layer.prototype.PARALLAX = v.newValue; });
var s2 = new Slider('#sizeSlider',{ min:0.1, max:1, step:0.05, value:0.3});
s2.on('change', function (v) {Star.prototype.MIN_RADIUS = v.newValue; sf.reset(); sf.render();});
var s3 = new Slider('#zoomSlider',{ min:-1, max:1, step:0.01, value:1});
s3.on('change', function (v) { StarField.prototype.ZOOM_SPEED = v.newValue; });
var s4 = new Slider('#shiftSlider',{ min:0, max:50, step:1, value:10});
s4.on('change', function (v) { StarField.prototype.SHIFT_DELTA = v.newValue; });

/*
 Event Listeners
 */

canvas.onmousemove = function( evt ) {
	
	sf.reset();
	sf.move( evt.movementX, evt.movementY );
	
};

document.addEventListener( 'keydown', function ( e ) {
	
	e.keyCode === 83 && (sf.intervalId ? sf.stop() : sf.shift());
	e.keyCode === 90 && (sf.intervalId ? sf.stop() : sf.zoom());
	e.keyCode === 80 && sf.stop();
	e.keyCode === 82 && newStarField();

});
