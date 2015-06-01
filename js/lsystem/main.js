var canvas,
		ctx,
		width,
		height, 
		mouse;

canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

width = ctx.canvas.width = window.innerWidth,
height = ctx.canvas.height = window.innerHeight;

mouse = {};

resetVars();
redraw();

document.addEventListener( 'keydown', function ( e ) {
	
	e.keyCode === 82 && resetVars() && redraw();
	e.keyCode === 68 && toggleDebug();
	e.keyCode === 77 && toggleMouse();

});

function toggleMouse() {

	canvas.onmousemove ?
		canvas.onmousemove = null:
		canvas.onmousemove = onMouseMove;
	
	A.prototype.ROTATION_BASE = A.prototype.ROTATION;
	B.prototype.ROTATION_BASE = B.prototype.ROTATION;
	C.prototype.ROTATION_BASE = C.prototype.ROTATION;

}

function toggleDebug() {
	
	LSystem.prototype.DEBUG = !LSystem.prototype.DEBUG;
	redraw();
	
}


function resize() {

	width = ctx.canvas.width = window.innerWidth,  height = ctx.canvas.height = window.innerHeight;
	s6.setAttribute( 'max', width );
	s6.setValue( width / 2 );y
	Point.prototype.OFFSET = ( width / 2 );
	redraw();
	
}

function resetVars() {

	Point.prototype.OFFSET = ( width / 2 );
	
	A.prototype.ROTATION_BASE = A.prototype.ROTATION = -30;
	B.prototype.ROTATION_BASE = B.prototype.ROTATION = 30;
	C.prototype.ROTATION_BASE = C.prototype.ROTATION = 20;
	
	A.prototype.SCALE = 1.1;
	B.prototype.SCALE = 0.9;
	C.prototype.SCALE = 1;

	A.prototype.COLOR = '#e74c3c';
	B.prototype.COLOR = '#3498db';
	C.prototype.COLOR = '#2ecc71';
	
	LSystem.prototype.N = 10;
	LSystem.prototype.M = 250;
	LSystem.prototype.M_SCALE = 0.75;
	LSystem.prototype.LINE_WIDTH = 20;
	LSystem.prototype.LINE_SCALE = 1;
	LSystem.prototype.INITIAL_ANGLE = 0;

	redraw();
}

function onMouseMove( evt ) {
	
	var n =  Math.min(Math.floor( 18 - ((evt.offsetY * 18) / height) ), LSystem.prototype.MOUSE_LIMIT);
	mouse.n = Math.min(18 - ((evt.offsetY * 18) / height), 10) - n;
		
	LSystem.prototype.N = n;

	var r = ((evt.offsetX * 80) / width) - 40;
	
	C.prototype.ROTATION = C.prototype.ROTATION_BASE + r;
	B.prototype.ROTATION = B.prototype.ROTATION_BASE + r;
	A.prototype.ROTATION = A.prototype.ROTATION_BASE + r;

	sa.setValue( A.prototype.ROTATION );
	sb.setValue( B.prototype.ROTATION );
	sc.setValue( C.prototype.ROTATION );

	redraw();
	
};

function redraw() {

	ctx.clearRect(0, 0, width, height);

	new LSystem( new A( undefined, true ) );

}

// Slider Definitions :(

var s1 = new Slider('#nSlider',{ min:0, max:12, step:1, value: LSystem.prototype.N});
s1.on('change', function (v) { LSystem.prototype.N = v.newValue; redraw();});

var sa = new Slider('#aSlider',{
	min:-LSystem.prototype.MAX_ANGLE, max:LSystem.prototype.MAX_ANGLE, step:1, value:A.prototype.ROTATION
});
sa.on('change', function (v) { A.prototype.ROTATION_BASE = A.prototype.ROTATION = v.newValue; redraw(); });
var sa_s = new Slider('#aScaleSlider',{ min:0.5, max:1.5, step:0.01, value:A.prototype.SCALE});
sa_s.on('change', function (v) { A.prototype.SCALE = v.newValue; redraw(); });

var sb = new Slider('#bSlider',{
	min:-LSystem.prototype.MAX_ANGLE, max:LSystem.prototype.MAX_ANGLE, step:1, value:B.prototype.ROTATION
});
sb.on('change', function (v) { B.prototype.ROTATION_BASE = B.prototype.ROTATION = v.newValue; redraw(); });
var sb_s = new Slider('#bScaleSlider',{ min:0.5, max:1.5, step:0.01, value:B.prototype.SCALE});
sb_s.on('change', function (v) { B.prototype.SCALE = v.newValue; redraw(); });

var sc = new Slider('#cSlider',{
	min:-LSystem.prototype.MAX_ANGLE, max:LSystem.prototype.MAX_ANGLE, value:C.prototype.ROTATION
});
sc.on('change', function (v) { C.prototype.ROTATION_BASE = C.prototype.ROTATION = v.newValue; redraw(); });
var sc_s = new Slider('#cScaleSlider',{ min:0.5, max:1.5, step:0.01, value:C.prototype.SCALE});
sc_s.on('change', function (v) { C.prototype.SCALE = v.newValue; redraw(); });

var s4 = new Slider('#mSlider',{ min:0.5, max:1, step:0.01, value:LSystem.prototype.M_SCALE});
s4.on('change', function (v) { LSystem.prototype.M_SCALE = v.newValue; redraw(); });

var s4_5 = new Slider('#MSlider',{ min:250, max:500, step:1, value:LSystem.prototype.M});
s4_5.on('change', function (v) { LSystem.prototype.M = v.newValue; redraw(); });

var s5 = new Slider('#wSlider',{ min:0.5, max:1, step:0.01, value:LSystem.prototype.LINE_SCALE});
s5.on('change', function (v) { LSystem.prototype.LINE_SCALE = v.newValue; redraw(); });
var s6 = new Slider('#hSlider',{ min:0, max:width, step:1, value:Point.prototype.OFFSET});
s6.on('change', function (v) { Point.prototype.OFFSET = v.newValue; redraw(); });
var s7 = new Slider('#iSlider',{ min: -90, max:90, step:1, value:LSystem.prototype.INITIAL_ANGLE});
s7.on('change', function (v) { LSystem.prototype.INITIAL_ANGLE = v.newValue; redraw(); });

