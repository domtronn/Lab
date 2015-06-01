Handlebars.registerHelper('list', function(items) {
  var result = "<select class=\"form-control\" name=\"Game of Life pattern\">";

	for(var i=0, l=items.length; i<l; i++) {
    result += "<option>"+items[i]+"</option>";
  }
	return result += "</select>";
});

var template = Handlebars.compile( document.getElementById( "patterns-template" ).innerHTML );
var context = { patterns: Grid.getPatterns() };

document.getElementById('patterns').innerHTML += template( context );
