import Vector from "../math/vector.js";

export default class Vertex {
	constructor(x, y) {
		this.pos = new Vector(x, y);
		this.pos0 = new Vector(x, y);
		this.vel = new Vector(0, 0);
	}

	integration(v2, force) {
        this.vel.x += (v2.x - this.pos.x) * force;
        this.vel.y += (v2.y - this.pos.y) * force;
	}

}