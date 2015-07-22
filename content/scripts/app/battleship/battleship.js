define([
	'canvasengine/engine',
	'battleship/ship',
	'grid'
],
function (Engine, Ship, grid) {
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

	var sea,
		ships = [],
		misses = [],
		attemptCount = 0;

	var _initSea = function () {
		sea = layers.background.addObject({
			draw: function (context) {
				context.fillStyle = '#00f';
				context.fillRect(0, 0, 300, 300);
			}
		});
	};

	var _addShip = function (x, y, length, horizontal) {
		var components = [],
			i;

		for (i = 0; i < length; i++) {
			components.push(1);
		}

		ships.push(layers.foreground.addObject(new Ship({
			x: grid.coordToPx(x),
			y: grid.coordToPx(y),
			data: {
				components: components,
				horizontal: horizontal || false
			}
		})));
	};

	var _initShips = function () {
		_addShip(3, 3, 3, false);
		_addShip(2, 0, 2, true);
		_addShip(5, 7, 5, true);
	};

	var _getShipInfoFromCoords = function (x, y) {
		var i, j;

		var ship, components,
			shipX, shipY;

		for (i = 0; i < ships.length; i++) {
			ship = ships[i];
			for (j = 0; j < ship.data.components.length; j++) {
				components = ship.data.components;
				shipX = grid.pxToCoord(ship.x);
				shipY = grid.pxToCoord(ship.y);

				if (ship.data.horizontal) {
					shipX += j;
				} else {
					shipY += j;
				}

				if (x === shipX && y === shipY) {
					return {
						ship: ship,
						componentIndex: j
					};
				}
			}
		}
	};

	var _getMissFromCoords = function (x, y) {
		var i;

		var miss,
			missX, missY;

		for (i = 0; i < misses.length; i++) {
			miss = misses[i];
			missX = grid.pxToCoord(miss.x);
			missY = grid.pxToCoord(miss.y);

			if (x === missX && y === missY) {
				return miss;
			}
		}
	};

	var _processClick = function (e) {
		var x = grid.pxToCoord(e.layerX),
			y = grid.pxToCoord(e.layerY);

		var componentInfo = _getShipInfoFromCoords(x, y),
			miss = _getMissFromCoords(x, y);

		if (componentInfo) {
			attemptCount++;
			componentInfo.ship.destroyComponent(componentInfo.componentIndex);
		} else if (miss) {
			// Already tried here
		} else {
			attemptCount++;
			misses.push(layers.foreground.addObject({
				x: grid.coordToPx(x),
				y: grid.coordToPx(y),
				draw: function (context) {
					context.fillStyle = '#ddd';
					context.fillRect(-grid.size/2, -grid.size/2, grid.size, grid.size);
				}
			}));
		}

		console.log(attemptCount);
	};

	var _initEvents = function () {
		var eventsLayer = document.getElementsByClassName('events-layer')[0];

		eventsLayer.addEventListener('click', _processClick);
	};

	var init = function () {
		layers = Engine.init(config);
		_initSea();
		_initShips();
		_initEvents();
	};

	return {
		init: init
	};
});