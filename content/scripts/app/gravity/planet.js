define([
	'canvasengine/canvasobject',
	'canvasengine/integration'
],
function (CanvasObject, integration) {
	var G = 1000;

	var Planet = function (config) {
		config = config || {};

		CanvasObject.call(this, config);
		this.drawCallback = drawPlanet;

		config.data = config.data || {};

		this.data.mass = config.data.mass || 5;
		this.data.colour = config.data.colour || '#aaa';
		this.data.radius = config.data.radius || Math.sqrt(this.data.mass);
	};

	Planet.prototype = Object.create(CanvasObject.prototype);

	Planet.prototype.ax = function (objects) {
		var i, object,
			dx, dy, d, dr,
			force = 0;

		for (i = 0; i < objects.length; i++) {
			object = objects[i];
			if (!(object instanceof Object && object.data.mass) || object === this) {
				continue;
			}

			dx = this.x-object.x;
			dy = this.y-object.y;
			d2 = dx*dx + dy*dy;

			dr = -dx/Math.sqrt(d2);

			force += this.data.mass*object.data.mass / d2 * dr;
		}

		return G*force/this.data.mass;
	};
	Planet.prototype.ay = function (objects) {
		var i, object,
			dx, dy, d2, dr,
			force = 0;

		for (i = 0; i < objects.length; i++) {
			object = objects[i];
			if (!(object instanceof Planet) || object === this) {
				continue;
			}

			dx = this.x-object.x;
			dy = this.y-object.y;
			d2 = dx*dx + dy*dy;

			dr = -dy/Math.sqrt(d2);

			force += this.data.mass*object.data.mass / d2 * dr;
		}

		return G*force/this.data.mass;
	};

	var drawPlanet = function (context) {
		context.fillStyle = this.data.colour;
		context.beginPath();
		context.arc(0, 0, this.data.radius, 0, Math.PI*2);
		context.fill();
	};

	return Planet;
});