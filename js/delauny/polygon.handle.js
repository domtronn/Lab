Handlebars.registerHelper('getPoints', function(triangle) {
	var points = "";
  triangle.vertices.forEach(function (v) {points += v.x + "," + v.y + " ";});
	return points;
});

var polygonTemplate = Handlebars.compile(document.getElementById("polygon-template").innerHTML);
