define([],
function () {

	var CanvasObject = function (config) {
		if (config.draw) {
			this.drawCallback = config.draw;
		}

		this.x = config.x || 0;
		this.y = config.y || 0;
		this.w = config.w || 0;

		this.vx = config.vx || 0;
		this.vy = config.vy || 0;
		this.vw = config.vw || 0;

		this.data = config.data || {};

		if (config.ax) {
			this.axCallback = config.ax;
		}
		if (config.ay) {
			this.ayCallback = config.ay;
		}
		if (config.aw) {
			this.awCallback = config.aw;
		}
	};

	CanvasObject.prototype.ax = function (objects) {
		return (this.axCallback ? this.axCallback(objects) : 0) || 0;
	};
	CanvasObject.prototype.ay = function (objects) {
		return (this.ayCallback ? this.ayCallback(objects) : 0) || 0;
	};
	CanvasObject.prototype.aw = function (objects) {
		return (this.awCallback ? this.awCallback(objects) : 0) || 0;
	};

	CanvasObject.prototype.draw = function (context) {
		if (this.drawCallback) {
			context.save();
			context.translate(this.x, this.y);
			context.rotate(this.w);

			this.drawCallback(context);

			context.restore();
		}
	};

	return CanvasObject;
});