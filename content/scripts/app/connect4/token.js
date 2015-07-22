define([
	'canvasengine/canvasobject',
	'grid'
],
function (CanvasObject, grid) {
	var Token = function (config) {
		CanvasObject.call(this, config);
		this.drawCallback = drawToken;
	};

	Token.prototype = Object.create(CanvasObject.prototype);

	var teamColours = {
		1: '#ff2',
		2: '#f22'
	};

	var drawToken = function (context) {
		context.fillStyle = teamColours[this.data.team] || teamColours[1];
		context.beginPath();
		context.arc(0, 0, grid.size/2, 0, Math.PI*2);
		context.fill();
	};

	return Token;
});