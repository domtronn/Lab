/* Grid Prototype */

function Grid(ctx) {
  this.ctx = ctx;
	this.grid = this.createGrid();
	this.cells = [];

	var grid = this;
	this.animate = function () { Grid.step(grid); };
}

Grid.step =  function (grid) {
	if (!grid.cells.length) { return; }
	
	// Resurrect cells on grid to save creating a new grid between iterations
	grid.resurrect(grid.cells);

	// Loop over every cell in grid and create a list of cells which will be
	// alive next iteration
	var tempCells = [];
	var lim = grid.getBoundingLimits();
	for (var x = lim.lx; x <= lim.Lx; x++) {
		for (var y = lim.ly; y <= lim.Ly; y++) {
			var cell = grid.getCell(x, y);
			var neighbourCount = grid.countNeighbours(cell);

			if (neighbourCount === 3 || (cell.isAlive && neighbourCount === 2)) {
				var n = grid.normalise(x, y);
				tempCells.push(new Cell(n.x, n.y, true));
			}
		}
	}

	// Kill all cells in grid resulting in a blank grid
	grid.kill(grid.cells);
	// Set the cells for next iteration as the newly created list of cells
	grid.setCells(tempCells.slice());
	grid.render();
};

Grid.getPatterns = function () {
  var arr = [];
	for (var pattern in Grid.prototype.patterns) {
		arr.push(pattern);
	}
	return arr;
};

Grid.prototype.render = function () {
	var ctx = this.ctx;
	
	ctx.fillStyle = this.fillColour || 'white';
	ctx.fillRect(0, 0, this.width, this.height);

	var c = 0, len = this.cells.length;
	for (c; c < len; c++) {
		this.cells[c].draw(this.ctx);
	}
};


Grid.prototype.countNeighbours = function (cell) {
	// As cell will be counted, adjust starting value so it zero bases correctly
	var neighbourCount = cell.isAlive ? -1 : 0,
			lx = this.getNeighbourLimits(cell.x),
			ly = this.getNeighbourLimits(cell.y),
			x, y, grid = this;

	lx.some(function (x) {
		ly.some(function (y) {
			if (grid.getCell(x, y).isAlive) { neighbourCount += 1; }
			if (neighbourCount > 3) { return true; } else { return false; }
		});
	});
	
	return neighbourCount;
};

Grid.prototype.getNeighbourLimits = function (dim) {
  return [dim - 1, dim, dim + 1];
};

Grid.prototype.normalise = function (x, y) {
  x = (this.size.x + x) % this.size.x;
	y = (this.size.y + y) % this.size.y;
	return {x: x, y: y};
};

Grid.prototype.getCell = function (x, y) {
	var n = this.normalise(x, y);
  return this.grid[n.x][n.y];
};

Grid.prototype.getBoundingLimits = function() {
	var maxX = 0, minX = this.size.x,
			maxY = 0, minY = this.size.y;
	this.cells.forEach(function(cell) {
		minX = Math.min(cell.x, minX);
		maxX = Math.max(cell.x, maxX);
		minY = Math.min(cell.y, minY);
		maxY = Math.max(cell.y, maxY);
	});
	return {lx: minX - 1, Lx: maxX + 1, ly: minY - 1, Ly: maxY + 1};
};

Object.defineProperty(Grid.prototype, 'width', {get: function() {
  return this.ctx.canvas.width;
}});

Object.defineProperty(Grid.prototype, 'height', {get: function() {
  return this.ctx.canvas.height;
}});

Grid.prototype.createGrid = function () {
	var grid = {};
	for (var x = 0; x < this.size.x; x++) {
		grid[x] = {};
		for (var y = 0; y < this.size.y; y++) {
			grid[x][y] = new Cell(x, y, false);
		}
	}

	return grid;
};

Grid.prototype.setCells = function (cells) {
	this.cells = cells;
};

Grid.prototype.perform = function (func) {
	var grid = this.grid;
	return {
		on: function (cells) {
			cells.forEach(function(cell) {
				grid[cell.x][cell.y][func]();
			});
		}
	};
};

Grid.prototype.resurrect = function (cells) {
	this.perform('resurrect').on(cells);
};

Grid.prototype.kill = function (cells) {
	this.perform('kill').on(cells);
};

Grid.prototype.clear = function () {
	this.cells = [];
	this.render();
};

// Pattern creation

// Patterns for different game of life generators/spaceships/pulsers
Grid.prototype.patterns = {};
Grid.prototype.patterns.spaceship = [ [0, 0], [0, 2], [1, 3], [2, 3], [3, 0], [3, 3], [4, 1], [4, 2], [4, 3] ];
Grid.prototype.patterns.glider = [ [0, 0], [2, 0], [1, 1], [2, 1], [1, 2] ];
Grid.prototype.patterns.glider = [ [0, 0], [2, 0], [1, 1], [2, 1], [1, 2] ];
Grid.prototype.patterns.blinker = [ [0, 0], [0, 1], [0, 2] ];
Grid.prototype.patterns.toad = [ [0, 3], [0, 2], [1, 4], [2, 1], [3, 2], [3, 3] ];
Grid.prototype.patterns.gosperglidergun = [
	[0, 4], [1, 4], [0, 5], [1, 5],
	[35, 2], [35, 3], [34, 2], [34, 3],
	[10, 4], [10, 5], [10, 6], [11, 3], [11, 7], [12, 2], [12, 8], [13, 2], [13, 8], [14, 5], [15, 3], [15, 7], [16, 4], [16, 5], [16, 7], [17, 5],
	[20, 2], [20, 3], [20, 4], [21, 2], [21, 3], [21, 4], [22, 1], [22, 5], [24, 0], [24, 1], [24, 5], [24, 6]
];
Grid.prototype.patterns.pulsar = [
	[4, 1], [5, 1], [6, 1], [10, 1], [11, 1], [12, 1], [4, 6], [5, 6], [6, 6], [10, 6], [11, 6], [12, 6],
	[4, 8], [5, 8], [6, 8], [10, 8], [11, 8], [12, 8], [4, 13], [5, 13], [6, 13], [10, 13], [11, 13], [12, 13],
	[2, 3], [2, 4], [2, 5], [2, 9], [2, 10], [2, 11], [7, 3], [7, 4], [7, 5], [7, 9], [7, 10], [7, 11],
	[9, 3], [9, 4], [9, 5], [9, 9], [9, 10], [9, 11], [14, 3], [14, 4], [14, 5], [14, 9], [14, 10], [14, 11],
];

Grid.prototype.createCell = function (x, y) {
	if (x < this.size.x && y < this.size.y) {
		this.cells.push(new Cell(x, y, true));
	}
};

Grid.prototype.createPulsar = function (xOffset, yOffset) {
	this.createOffsetPattern(this.patterns.pulsar, [xOffset, yOffset]);
};

Grid.prototype.createGlider = function (xOffset, yOffset) {
	this.createOffsetPattern(this.patterns.glider, [xOffset, yOffset]);
};

Grid.prototype.createSpaceship = function (xOffset, yOffset) {
	this.createOffsetPattern(this.patterns.spaceship, [xOffset, yOffset]);
};

Grid.prototype.createGosperGliderGun = function (xOffset, yOffset) {
	this.createOffsetPattern(this.patterns.gosperglidergun, [xOffset, yOffset]);
};

Grid.prototype.createOffsetPattern = function (pattern, offset) {
	var self = this,
			cells = pattern.map(
				function(arr) {
					return arr.map(function(val, x) {
						return val + offset[x];
					});
				}
			);

	cells.forEach(function(cell) { self.createCell(cell[0], cell[1]); });
};
