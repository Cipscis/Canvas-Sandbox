define([],
function () {
	var eulerVel = function (dt, objects) {
		// Assumes constant acceleration!
		this.vx += this.ax(objects) * dt;
		this.vy += this.ay(objects) * dt;
		this.vw += this.aw(objects) * dt;
	};
	var eulerPos = function (dt, objects) {
		// Assumes constant velocity!
		this.x += this.vx * dt;
		this.y += this.vy * dt;
		this.w += this.vw * dt;
	};

	var euler = function (dt, objects) {
		var i;

		for (i = 0; i < objects.length; i++) {
			eulerVel.call(objects[i], dt, objects);
		}
		for (i = 0; i < objects.length; i++) {
			eulerPos.call(objects[i], dt, objects);
		}
	};

	var eulerImplicit = function (dt, objects) {
		var i;

		for (i = 0; i < objects.length; i++) {
			eulerPos.call(objects[i], dt, objects);
		}
		for (i = 0; i < objects.length; i++) {
			eulerVel.call(objects[i], dt, objects);
		}
	};


	var midPointVel = function (dt, objects) {
		this.data.oldVx = this.vx;
		this.data.oldVy = this.vy;
		this.data.oldVw = this.vw;

		eulerVel.call(this, dt, objects);
	};
	var midPointPos = function (dt, objects) {
		// Assumes constant acceleration!
		this.x += (this.data.oldVx + this.vx) * dt / 2;
		this.y += (this.data.oldVy + this.vy) * dt / 2;
		this.w += (this.data.oldVw + this.vw) * dt / 2;
	};

	var midpoint = function (dt, objects) {
		var i;

		for (i = 0; i < objects.length; i++) {
			midPointVel.call(objects[i], dt, objects);
		}
		for (i = 0; i < objects.length; i++) {
			midPointPos.call(objects[i], dt, objects);
		}
	};

	return {
		euler: euler,
		eulerImplicit: eulerImplicit,
		midpoint: midpoint
	};
});