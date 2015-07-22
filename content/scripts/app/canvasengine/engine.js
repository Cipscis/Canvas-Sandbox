define([
	'canvasengine/layer',
	'canvasengine/integration'
],
function (Layer, integration) {
	var animFrameId,
		timestamp;

	var maxStepSize = 32,
		timescale = 1,
		iterations = 1;

	var layers = {};

	var _initLayers = function (config) {
		var i;

		for (i = 0; i < config.layers.length; i++) {
			layers[config.layers[i].name || i] = new Layer(config.layers[i]);
		}
	};

	var play = function () {
		animFrameId = requestAnimationFrame(_step);
	};
	var pause = function () {
		if (animFrameId) {
			cancelAnimationFrame(animFrameId);
			animFrameId = undefined;
		}
	};

	var _update = function (dt) {
		var i, j;

		dt = dt / iterations;

		for (i in layers) {
			for (j = 0; j < iterations; j++) {
				layers[i].update(dt);
			}
		}
	};

	var _drawFrame = function () {
		var i, layer;

		for (i in layers) {
			layer = layers[i];
			if (!layer.paused) {
				layer.redraw();
			}
		}
	};

	var _step = function (time) {
		var dt = timestamp ? (time - timestamp) : 16;
		timestamp = time;

		if (dt > maxStepSize) {
			dt = maxStepSize;
		}

		_update(dt*timescale/1000);
		_drawFrame();

		play();
	};

	var init = function (config) {
		_initLayers(config);
		if (config.maxStepSize) {
			maxStepSize = config.maxStepSize;
		}
		if (config.timescale) {
			timescale = config.timescale;
		}
		if (config.iterations) {
			iterations = config.iterations;
		}

		play();

		return layers;
	};

	return {
		init: init,
		play: play,
		pause: pause
	};
});