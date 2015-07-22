define([], function () {
	var size = 50;

	var coordToPx = function (x) {
		return x*size+size/2;
	};
	var pxToCoord = function (x) {
		return Math.floor(x/size);
	};

	return {
		coordToPx: coordToPx,
		pxToCoord: pxToCoord,
		size: size
	};
});