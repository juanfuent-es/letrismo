import Pressure from "pressure";
import Filament from "../components/filament.js";
import Mouse from "../lib/mouse.js";
const TAU = Math.PI * 2;
let LIGHT = {
    bulb: [],
    light: [],
    total_vertices: 30,
    filaments: 5, //[5, 10, 15, 20]
    current: null,
    movement: 0.35,
    pressure: 0
}
const WIDTH = Number(window.location.search.split("width=")[1]) || 2;
Pressure.set(document.body, {
    change: function(force, event) {
        LIGHT.pressure = force * WIDTH;
    },
    end: function() {
        LIGHT.pressure = 0;
    }
});

export const LightBrush = (p5) => {
    p5.mouse = new Mouse();
    p5.shapes = [];
    p5.pressure = 0;
    p5.shape = [];
    p5.friction = 0.1;
    // colors
    p5.bg_color = "rgba(21, 21, 18, 0.001)";
    p5.stroke_color = "#FFF";
    p5.fill_color = "#000";

    p5.setup = () => {
        p5.colorMode(p5.HSB);
        p5.canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight); //, p5.WEBGL
        // p5.background("rgb(21, 21, 18)");
    }

    p5.draw = () => {
        p5.pressure += (LIGHT.pressure - p5.pressure) * p5.friction;
        let time = new Date().getTime() * 0.001;
        // p5.background(p5.bg_color);
        p5.noFill();
        for (let i = 0; i < LIGHT.bulb.length; i++) {
            let _weight = ((i + 1) / LIGHT.total_vertices) * LIGHT.pressure;
            let light = LIGHT.bulb[i];
            p5.strokeWeight(_weight);
            for (let j = 0; j < light.length; j++) {
                let _h = ~~Math.abs(Math.sin(time + i - j) * 360);
                let _s = ~~Math.abs(Math.cos(time - i + j) * 100);
                let _a = (j / light.length);
                const filament = light[j];
                p5.stroke(_h, _s, 100, _a);
                filament.update(p5.mouse, time);
                filament.render(p5, time);
            }
        }
    }

    /* Se vacía el arreglo contenedor de shapes, y el contenedor del 'current shape'*/
    p5.reset = () => {
        // p5.background("#000");
        p5.clear();
        p5.shapes = [];
        p5.shape = [];
        p5.bulb = [];
        p5.light = [];
    }

    p5.updateAttr = (key, value) => {
        return p5[key] = value;
    }

    /* Actualiza tamaño del stage al tamaño de ventana */
    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    }

    p5.mouseDragged = throttle((e) => {
        p5.shape.push({
            x: p5.mouseX, // - p5.windowWidth / 2,
            y: p5.mouseY // - p5.windowHeight / 2
        });
    }, 40);

    p5.mousePressed = () => {
        p5.shapes.push(p5.shape);
        for (let i = 0; i < LIGHT.filaments; i++) {
            const _filament = new Filament({
                movement: (Math.sin(i * 3) * 0.1) + LIGHT.movement,
                size: LIGHT.total_vertices,
                position: {
                    x: p5.mouseX,
                    y: p5.mouseY
                }
            });
            LIGHT.light.push(_filament);
        }
        LIGHT.bulb.push(LIGHT.light);
    }

    p5.mouseReleased = () => {
        p5.shape = [];
        for (var i = 0; i < LIGHT.light.length; i++) {
            LIGHT.light[i].die();
        }
        LIGHT.light = [];
    };

    p5.data = () => {
        let html = "";
        for (let i = 0; i < p5.shapes.length; i++) {
            let shape = p5.shapes[i];
            let node = "[";
            for (let j = 0; j < shape.length; j++) {
                let _point = shape[j];
                node += "{x:" + _point.x + ",y:" + _point.y + "}"
            }
            node += "]";
            html += node;
        }
        return html;
    }

    p5.screenshot = () => {
        return p5.canvas.toDataURL("image/png");
    }
}