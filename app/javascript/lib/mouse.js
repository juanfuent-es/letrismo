import Vector from "../lib/vector.js";
const pxRatio = window.devicePixelRatio;
export default class Mouse {
	constructor() {
		this.pos = new Vector(1, 1);
		this.addEvents();
	}

	addEvents() {
		const mouseMove = throttle(this.update.bind(this), 80);
		document.addEventListener('mousemove', mouseMove, false);
		document.addEventListener('touchmove', mouseMove, false);
	}

	update(e) {
		if (e.touches) e = e.touches[0];
		this.pos.set(e.clientX*pxRatio, e.clientY*pxRatio);
	}

}