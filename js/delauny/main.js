var svg,
		triangulation, 
		boundingTriangle,
		width,
		height,
		compColours;


svg = document.getElementById( 'svg' );
svg.onmousedown = insert;

compColours = [
	['#aa3939', '#116611'],
	['#d16300', '#02757f'],
	['#98a800', '#70048a'],
	['#486325', '#354b12'],
	['#552040', '#40102d'],
	['#2e3842', '#1c2935'],
	['#2e3842', '#21b2a6']
];

Triangle.prototype.COLOURS = compColours[ Math.floor( Math.random() * compColours.length ) ];
Triangulation.prototype.POINTS = 75;

setBoundingTriangle();
asyncRefresh();


/*
 Helper functions used for Scene behaviour
 */


function generateBoundingTriangle( width, height, padding ) {
	
	padding = padding || height * 0.2;

	return new Triangle(
		[
			new Point( -( width / 2 ), -padding ),
			new Point( 1.5 * width, -padding ),
			new Point( ( width / 2), ( height * 2 ) + padding )
		]
	);
	
}

function generatePoints( triangulation ) {

	var i = 0, len = triangulation.POINTS, pointList = [];

	for (i; i < len; i++) {

		var point = new Point((Math.random() * (width + 400)) - 200, (Math.random() * (height + 400)) - 200);

		if ( triangulation.getSuperTriangle().contains( point ).inTriangle() )
			pointList.push(point);

	}
	
	return pointList;
	
}

function setBoundingTriangle() {

	width = svg.getBoundingClientRect().width;
	height = svg.getBoundingClientRect().height;
	
  boundingTriangle = generateBoundingTriangle( width, height, 500 );

}

function renderPolygons(t) {
	
	t.triangles.forEach(function (triangle, j) {
		svg.innerHTML += polygonTemplate({triangle: triangle, j: j, fill: triangle.col});
	});
	
	svg.onmousedown !== null ?
		svg.classList.add('hover') : 
		svg.classList.remove('hover');
	
}

function refresh(t) {
	
	svg.innerHTML = '';
	renderPolygons(triangulation);
	
}

function resize() {
	
	setBoundingTriangle();
	asyncRefresh();
	
}

function asyncRefresh( ) {
	
	triangulation = new Triangulation( boundingTriangle );

	setTimeout(function () {

		BowyerWatson( generatePoints( triangulation ), triangulation );
		refresh( triangulation );

		svg.classList.remove( 'fadeOut' );
		svg.classList.add( 'fadeIn' );

	}, 0);

	svg.classList.remove('fadeIn');
	svg.classList.add('fadeOut');

}

function changeColor() {

	Triangle.prototype.COLOURS = compColours[Math.floor(Math.random() * compColours.length)];

	asyncRefresh();

}

function insert ( evt ) {

	BowyerWatsonInsert(new Point(evt.offsetX, evt.offsetY), triangulation);
	refresh( triangulation );

}

function paint ( evt ) {

	var point =  new Point( evt.offsetX, evt.offsetY );

	triangulation.triangles.forEach( function ( t ) {

		if ( t.contains( point ).inTriangle() )
			t.col = t.randomColour( Triangle.prototype.COLOURS );

	});

	refresh( triangulation );
}

var s = new Slider('#triSlider',{ min:25, max:250, step:1, value: 75});
s.on('slideStop', function (v) {

	Triangulation.prototype.POINTS = v; ;

	asyncRefresh();
	
});

/*
 Event Listeners
 */

document.addEventListener( 'keydown',  function ( e ) {

	if ( e.keyCode === 82 )
		changeColor();

});
