function Point( x, y ) {

  this.current = new Vector(x, y);
  this.previous = new Vector(x, y);
  
  this.pinned = false;
  this.acc = (new Vector(0.0, 5)).scale(0.05 * 0.05);

}

Point.prototype = {
  getCurrent: function () {
    return this.current;
  },

  setCurrent: function ( v ) {
    this.current = v;
  },

  getPrevious: function () {
    return this.previous;
  },

  setPrevious: function ( v ) {
    this.previous = v;
  },

  pin: function () {
    this.pinned = true;    
  }, 

  move: function () {
    
		if ( !this.pinned ) {
    
      var newPos = this.current.scale(2).minus(this.previous).add(this.acc);

      this.setPrevious( this.current );
      this.setCurrent( newPos );

    }

  },

  draw: function () {
    
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(this.current.x, this.current.y, 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

  }
};
