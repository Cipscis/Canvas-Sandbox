define([
	'canvasengine/engine',
	'gravity/planet'
],
function (Engine, Planet) {
	var layers,
		config = {
			layers: [
				{
					canvas: document.getElementsByClassName('background')[0],
					name: 'background'
				},
				{
					canvas: document.getElementsByClassName('foreground')[0],
					name: 'foreground'
				},
				{
					canvas: document.getElementsByClassName('overlay')[0],
					name: 'overlay'
				}
			]
		};


	var _drawBackdrop = function (context) {
		context.fillStyle = '#101113';
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);
	};

	var _drawStar = function (context) {
		context.fillStyle = this.data.colour;
		context.fillRect(0, 0, 1, 1);
	};

	var _getStarConfig = function () {
		var x = Math.floor(Math.random()*layers.background.canvas.width),
			y = Math.floor(Math.random()*layers.background.canvas.height),
			brightness = Math.floor(Math.random() * ((Math.random() > 0.8) ? 220 : 75)),
			colour = 'rgb('+brightness+', '+brightness+', '+brightness+')';

		return {
			x: x,
			y: y,
			data: {
				colour: colour
			},
			draw: _drawStar
		};
	};

	var _addBackgroundObjects = function (numStars) {
		layers.background.addObject({
			draw: _drawBackdrop
		});

		for (var i = 0; i < numStars; i++) {
			layers.background.addObject(_getStarConfig());
		}
	};

	var _initBackground = function () {
		_addBackgroundObjects(10000);
		layers.background.draw();
		layers.background.pause();
	};





	var _addForegroundObjects = function () {
		var sun = new Planet({
			x: 450,
			y: 300,
			vy: -(35/(200/10)+60/(200/1)),
			data: {
				mass: 200,
				colour: '#ff0'
			}
		});

		var earth = new Planet({
			x: 600,
			y: 300,
			vy: 35,
			data: {
				mass: 10,
				colour: '#99f'
			}
		});

		var moon = new Planet({
			x: 620,
			y: 300,
			vy: 60,
			data: {
				mass: 1,
				colour: '#999'
			}
		});

		layers.foreground.addObject(sun);
		layers.foreground.addObject(earth);
		layers.foreground.addObject(moon);
	};

	var _initForeground = function () {
		_addForegroundObjects();
	};



	var init = function () {
		layers = Engine.init(config);
		_initBackground();
		_initForeground();
	};

	return {
		init: init
	};
});