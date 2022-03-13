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

export default class Needle {
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

    updateHSL(t) {
        const hue = ~~Math.abs(Math.sin(this.lineWidth + t) * 360);
        const sat = ~~Math.abs(Math.cos(this.lineWidth - t) * 50) + 50;
        const light = ~~Math.abs(Math.sin(t) * 50) + 50;
        return [hue,sat,light];
    }

    update(prev, t) {
        this.guide = this.live ? prev : this.vertex[0];
        let movement = this.movement;
        for (let i = 0; i < this.vertex.length; i++) {
            let vtx = this.vertex[i];
            vtx.integration(this.guide.pos, movement);
            vtx.vel.multBy(0.5);
            vtx.pos0.addTo(vtx.vel);
            vtx.pos.addTo(vtx.vel);
            movement *= 0.999;
            this.guide = this.vertex[i];
        }
        this.hsl = this.updateHSL(t);
    }

    render(p5, t) {
        p5.curveTightness(-1);
        p5.beginShape();
        p5.strokeWeight(0.1);
        for (let i = 0; i < this.vertex.length; i++) {
            let pos = this.vertex[i].pos;
            p5.vertex(pos.x, pos.y);
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