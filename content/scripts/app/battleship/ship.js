define([
	'canvasengine/canvasobject',
	'grid'
],
function (CanvasObject, grid) {
	var Ship = function (config) {
		CanvasObject.call(this, config);
		this.drawCallback = drawShip;
	};

	Ship.prototype = Object.create(CanvasObject.prototype);

	var drawShip = function (context) {
		var i, j,
			colours = ['#faa', 'rgba(255, 255, 255, 0)', '#aaa'];

		for (i = 0; i < colours.length; i++) {
			context.fillStyle = colours[i];
			for (j = 0; j < this.data.components.length; j++) {
				if (this.data.components[j] === i) {
					if (this.data.horizontal) {
						context.fillRect(grid.size*j-grid.size/2, -grid.size/2, grid.size, grid.size);
					} else {
						context.fillRect(-grid.size/2, grid.size*j-grid.size/2, grid.size, grid.size);
					}
				}
			}
		}
	};

	Ship.prototype.destroyComponent = function (i) {
		var components = this.data.components;

		if (i > components.length) {
			return -1;
		} else if (components[i] === 0) {
			return 0;
		} else {
			components[i] = 0;
			return 1;
		}
	};

	return Ship;
});