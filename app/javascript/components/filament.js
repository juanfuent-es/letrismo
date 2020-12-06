import Vector from "../math/vector.js";
import Vertex from "../components/vertex.js";

let SCREEN = {
    x: window.innerWidth * window.devicePixelRatio,
    y: window.innerHeight * window.devicePixelRatio
};

SCREEN.center = {
    x: SCREEN.x / 2,
    y: SCREEN.y / 2
};

export default class Filament {
    constructor(args) {
        if (args === undefined) args = {};
        this.movement = args.movement || (Math.random() * 0.1) + 0.4;
        this.size = args.size || 20;
        this.vertex = [];
        this.live = true;
        this.guide = null;
        this.lineWidth = args.movement * 1;
        this.start(args.position);
    }

    start(pos) {
        for (let i = 0; i < this.size; i++)
            this.vertex.push(new Vertex(pos.x, pos.y));
    }

    update(prev, t) {
        this.guide = this.live ? prev : this.vertex[0];
        let movement = this.movement;
        for (let i = 0; i < this.vertex.length; i++) {
            let vtx = this.vertex[i];
            vtx.integration(this.guide.pos, movement);
            vtx.vel.multBy(0.5);
            vtx.pos.addTo(vtx.vel);
            movement *= 0.99;
            this.guide = this.vertex[i];
        }
    }

    render(p5, t) {
        p5.beginShape();
        for (let i = 0; i < this.vertex.length; i++) {
            let p = this.vertex[i].pos;
            p5.curveVertex(p.x, p.y);
        }
        p5.endShape();
    }

    die() {
        this.live = false;
    }

    isLive() {
        return this.live;
    }
}