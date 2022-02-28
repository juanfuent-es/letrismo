import Filament from "../components/filament.js";
import Mouse from "../lib/mouse.js";
let LIGHT = {
    bulb: [],
    light: [],
    total_vertices: 50,
    filaments: 10, //[5, 10, 15, 20]
    current: null,
    movement: 0.35
}

export const LightBulb = (p5) => {
    p5.mouse = new Mouse();
    p5.shapes = [];
    p5.shape = [];
    // colors
    p5.bg_color = "rgb(21, 21, 18)";
    p5.stroke_color = "#FFF";
    p5.fill_color = "#000";

    p5.setup = () => {
        p5.canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight); //, p5.WEBGL
        p5.colorMode(p5.HSB);
        p5.strokeCap(p5.ROUND);
        p5.noFill();
        p5.events();
    }

    p5.events = () => {
        window["flow-input"].addEventListener("change", (e) => {
            LIGHT.flow = parseFloat(window["flow-input"].value);
        });

        window["layers-input"].addEventListener("change", (e) => {
            LIGHT.filaments = parseFloat(window["layers-input"].value);
        });
    }

    p5.draw = () => {
        let time = new Date().getTime() * 0.0001;
        // p5.background("rgba(21, 21, 18, 0.00)");
        // p5.background("rgba(0, 0, 0, 0.001)");
        for (let i = 0; i < LIGHT.bulb.length; i++) {
            let light = LIGHT.bulb[i];
            for (let j = 0; j < light.length; j++) {
                const filament = light[j];
                filament.update(p5.mouse, time);

                let _weight = Math.max(0.2, Math.min(Math.abs(Math.tan((time + j) * 10)), 0.01));
                let _hue = ~~Math.abs(Math.sin(time + i + j) * 360);
                p5.strokeWeight(_weight);
                p5.stroke(_hue, 100, 100);

                filament.render(p5, time);
            }
        }
    }

    /* Se vacía el arreglo contenedor de shapes, y el contenedor del 'current shape'*/
    p5.reset = () => {
        // p5.background(p5.bg_color);
        p5.clear();
        p5.shapes = [];
        p5.shape = [];

        LIGHT.bulb = [];
        LIGHT.light = [];
        p5.hideSaveBtn();
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
                movement: Math.abs(Math.sin(i * 3) * 0.1) + LIGHT.movement,
                size: ~~((i + 1) / LIGHT.total_vertices),
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
        p5.showSaveBtn();
    };

    p5.hideSaveBtn = () => {
        gsap.to("#save-letrism, #equill-bottom-actions", 0.6, {
            ease: Power2.easeOut,
            opacity: 0,
            y: 15,
            display: "none"
        });
    }

    p5.showSaveBtn = () => {
        gsap.to("#save-letrism, #equill-bottom-actions", 0.6, {
            ease: Power2.easeOut,
            opacity: 1,
            y: 0,
            display: "block"
        });
        window["letrism_img"].value = this.screenshot();
        window["letrism_paths"].value = this.data();
    }

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