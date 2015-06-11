function Constraint( p1, p2 ) {

  this.p1 = p1;
  this.p2 = p2;

  this.length = this.p1.getCurrent().minus(this.p2.getCurrent()).length();
  
}

Constraint.prototype = {
	resolve: function () {

		var p1 = this.p1.getCurrent(), 
				p2 = this.p2.getCurrent(),
				delta = p2.minus(p1);
		
		var d = delta.length();
		var diff = (d - this.length) / ((this.length + d) * 2);

		var translation = delta.scale( 0.5 * diff );
		
		if ( !this.p1.pinned )
			this.p1.setCurrent( p1.add(translation) );
		
		if ( !this.p2.pinned )
			this.p2.setCurrent( p2.minus(translation) );
	}, 

	draw:  function () {

		ctx.beginPath();
		ctx.strokeStyle = 'black';
		ctx.moveTo(this.p1.getCurrent().x, this.p1.getCurrent().y);
		ctx.lineTo(this.p2.getCurrent().x, this.p2.getCurrent().y);
		ctx.stroke();  
		
	}
};
