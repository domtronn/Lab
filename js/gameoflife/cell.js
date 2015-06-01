/* Cell Prototype */
function Cell(x, y, status) {
	this.id = "cell_" + x + "_" + y;
	this.x = x;
	this.y = y;
	this.alive = status;
};

Cell.prototype.kill = function () {
  this.alive = false;
};

Cell.prototype.resurrect = function () {
  this.alive = true;
};

Object.defineProperty(Cell.prototype, 'isAlive', {get: function() {
  return this.alive;
}});

Cell.prototype.draw = function (ctx) {
	// Begin Path to refresh the current context
	ctx.beginPath();
  ctx.fillStyle = this.fillColour || 'black';
	if (this.strokeColour) {
		ctx.strokeStyle = this.strokeColour;
		ctx.strokeRect(this.x * this.scale, this.y * this.scale, this.scale, this.scale);
		ctx.stroke();
	}
	ctx.rect(this.x * this.scale, this.y * this.scale, this.scale, this.scale);
	ctx.fill();
};
