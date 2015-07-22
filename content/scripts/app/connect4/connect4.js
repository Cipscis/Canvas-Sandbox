define([
	'canvasengine/engine',
	'connect4/token',
	'grid'
],
function (Engine, Token, grid) {
	var layers,
		config = {
			layers: [
				{
					canvas: document.getElementsByClassName('background')[0],
					name: 'background',
					scaleY: -1,
					y: -document.getElementsByClassName('background')[0].height
				},
				{
					canvas: document.getElementsByClassName('foreground')[0],
					name: 'foreground',
					scaleY: -1,
					y: -document.getElementsByClassName('foreground')[0].height
				},
				{
					canvas: document.getElementsByClassName('overlay')[0],
					name: 'overlay',
					scaleY: -1,
					y: -document.getElementsByClassName('overlay')[0].height
				}
			]
		};

	var columns = [
			[],
			[],
			[],
			[],
			[],
			[],
			[]
		],
		winningCount = 4,
		turn = 1;

	var _placeToken = function (x, team) {
		var column = columns[x];
		if (column.length >= 7) {
			return -1;
		}

		var token = new Token({
			x: grid.coordToPx(x),
			y: grid.coordToPx(column.length),
			data: {
				team: team || 1
			}
		});

		column.push(token);
		layers.foreground.addObject(token);
	};

	var _initBackground = function () {
		layers.background.addObject({
			draw: function (context) {
				context.fillStyle = '#ccc';
				context.fillRect(0, 0, context.canvas.width, context.canvas.height);
			}
		});
	};

	var _checkForWinner = function () {
		// Check each token, starting from the bottom left, moving up then right

		var i, j, k,
			column, token,
			team, count;

		for (i = 0; i < columns.length; i++) {
			column = columns[i];
			for (j = 0; j < column.length; j++) {
				token = column[j];
				team = token.data.team;

				// Check vertical
				count = 1;
				for (k = j+1; k < column.length && column[k].data.team === team; k++) {
					count++;
				}
				if (count >= winningCount) {
					console.log('vertical: ', team);
				}

				// Check horizontal
				count = 1;
				for (k = i+1; k < columns.length && j in columns[k] && columns[k][j].data.team === team; k++) {
					count++;
				}
				if (count >= winningCount) {
					console.log('horizontal: ', team);
				}

				// Check diagonal /
				count = 1;
				for (k = 1; i+k < columns.length && j+k in columns[i+k] && columns[i+k][j+k].data.team === team; k++) {
					count++;
				}
				if (count >= winningCount) {
					console.log('diagonal /: ', team);
				}

				// Check diagonal \
				count = 1;
				for (k = 1; i+k < columns.length && j-k in columns[i+k] && columns[i+k][j-k].data.team === team; k++) {
					count++;
				}
				if (count >= winningCount) {
					console.log('diagonal \\:', team);
				}
			}
		}
	};

	var _processClick = function (e) {
		var x = grid.pxToCoord(e.layerX),
			y = grid.pxToCoord(e.layerY);

		if (_placeToken(x, turn) !== -1) {
			turn = 3 - turn;
			_checkForWinner();
		}
	};

	var _initEvents = function () {
		var eventsLayer = document.getElementsByClassName('events-layer')[0];
		eventsLayer.addEventListener('click', _processClick);
	};

	var init = function () {
		layers = Engine.init(config);
		_initBackground();
		_initEvents();
	};

	return {
		init: init
	};
});