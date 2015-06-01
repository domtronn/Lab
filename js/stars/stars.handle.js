// var sliders = [
// 	{
// 		title: "Parallax Amount : ", id: "parallax",
// 		min: 0.1, max: 1, step: 0.05, value: 1, 
// 		onslide: function (v) { Layer.prototype.PARALLAX = v; }
// 	},
// 	{
// 		title: "Star Size : ", id: "size",
// 		min: 0.1, max: 1, step: 0.05, value: 0.3, 
// 		onslide: function (v) {
// 			Star.prototype.MIN_RADIUS = v; sf.reset(); sf.render();
// 		}
// 	},
// 	{
// 		title: "Zoom Speed : ", id: "zoom",
// 		min: -1, max: 1, step: 0.01, value: 1, 
// 		onslide: function (v) { StarField.prototype.ZOOM_SPEED = v; }
// 	},
// 	{
// 		title: "Shift Speed : ", id: "shift",
// 		min: 0, max: 50, step: 1, value: 10, 
// 		onslide: function (v) { StarField.prototype.SHIFT_DELTA = v; }
// 	}
// ];

// var template = Handlebars.compile(document.getElementById("control-slider").innerHTML),
// 		s = {};

// sliders.forEach(function ( slider, i ) {
	
// 	document.getElementById('control-container').innerHTML += template(slider);
// 	var model = { min: slider.min, max: slider.max, step: slider.step, value: slider.value };

// 	debugger;
	
// 	s[i] = new Slider( '#' + slider.id + 'Slider', model );
// 	// s[i].on('slide', slider.onslide);
	
// 	slider.onslide(slider.value);
	
// });
