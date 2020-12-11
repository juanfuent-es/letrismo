export const Brush = (p5) => {
    p5.shapes = [];
    p5.shape = [];
    // colors
    p5.bg_color = "#000";
    p5.stroke_color = "#FFF";
    p5.fill_color = "#000";

    p5.setup = () => {
        p5.canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
    }

    p5.draw = () => {
        p5.background(p5.bg_color);
        p5.noFill();
        p5.stroke(p5.stroke_color);
        for (let i = 0; i < p5.shapes.length; i++) {
            let shape = p5.shapes[i];
            p5.beginShape();
            for (let j = 0; j < shape.length; j++) {
                let p = shape[j];
                p5.curveVertex(p.x, p.y);
            }
            p5.endShape();
        }
    }

    /* Se vacía el arreglo contenedor de shapes, y el contenedor del 'current shape'*/
    p5.reset = () => {
        p5.shapes = [];
        p5.shape = [];
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
            x: p5.mouseX - p5.windowWidth / 2,
            y: p5.mouseY - p5.windowHeight / 2
        });
    }, 40);

    p5.mousePressed = () => {
        p5.shapes.push(p5.shape);
    }

    p5.mouseReleased = () => {
        p5.shape = [];
        p5.showSaveBtn();
    };

    p5.hideSaveBtn = () => {
        gsap.to("#save-letrism", 0.6, {
            ease: Power2.easeOut,
            opacity: 0,
            y: 15,
            display: "none"
        });
    }

    p5.showSaveBtn = () => {
        gsap.to("#save-letrism", 0.6, {
            ease: Power2.easeOut,
            opacity: 1,
            y: 0,
            display: "block"
        });
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