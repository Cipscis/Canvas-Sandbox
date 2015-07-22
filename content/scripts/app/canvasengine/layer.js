define([
	'canvasengine/canvasobject',
	'canvasengine/integration'
],
function (CanvasObject, integration) {
	var integrate = integration.eulerImplicit;

	var Layer = function (config) {
		this.canvas = config.canvas;
		this.context = config.context || config.canvas.getContext('2d');
		this.objects = config.objects || [];
		this.paused = false;

		this.scaleX = config.scaleX || 1;
		this.scaleY = config.scaleY || 1;
		this.x = config.x || 0;
		this.y = config.y || 0;
		this.w = config.w || 0;
	};

	Layer.prototype.addObject = function (config) {
		var object = config instanceof CanvasObject ? config : new CanvasObject(config);
		this.objects.push(object);
		return object;
	};

	Layer.prototype.removeObject = function (object) {
		var i;

		for (i = 0; i < this.objects.length; i++) {
			if (this.objects[i] === object) {
				this.objects.splice(i, 1);
			}
		}
	};

	Layer.prototype.update = function (dt) {
		integrate(dt, this.objects);
	};

	Layer.prototype.clear = function () {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};

	Layer.prototype.draw = function () {
		this.context.save();

		this.context.scale(this.scaleX, this.scaleY);
		this.context.translate(this.x, this.y);
		this.context.rotate(this.w);

		for (j = 0; j < this.objects.length; j++) {
			this.objects[j].draw(this.context);
		}

		this.context.restore();
	};

	Layer.prototype.redraw = function () {
		this.clear();
		this.draw();
	};

	Layer.prototype.pause = function () {
		this.paused = true;
	};
	Layer.prototype.play = function () {
		this.paused = false;
	};

	return Layer;
});