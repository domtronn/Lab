
function Vector( x, y ) {
  
  this.x = x;
  this.y = y;

}

Vector.prototype = {
  add: function ( v ) {
    var nx = this.x + v.x,
        ny = this.y + v.y;

    return new Vector( nx, ny );
  },

  minus: function ( v ) {
    var nx = this.x - v.x,
        ny = this.y - v.y;

    return new Vector( nx, ny );
  },

  scale: function ( c ) {
    var nx = this.x * c,
        ny = this.y * c;

    return new Vector( nx, ny );
  },

  length: function () {
    return Math.sqrt( ( this.x * this.x ) + ( this.y * this.y ) );
  },

	dot: function ( v ) {
		return (( this.x * v.x ) + ( this.y * v.y )) / ( this.length() * v.length() );	
	}
};
