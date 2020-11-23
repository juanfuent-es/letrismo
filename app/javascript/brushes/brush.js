export const Brush = (p5) => {
    p5.shapes = [];
    p5.points = [];

    p5.setup = () => {
        p5.canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    }

    p5.draw = () => {
        p5.clear();
        p5.noFill();
        p5.stroke("#FFF");
        p5.beginShape();
        for (var i = 0; i < p5.points.length; i++) {
            let p = p5.points[i];
            p5.curveVertex(p.x, p.y);
        }
        p5.endShape();
    }

    p5.reset = () => {
        p5.points = [];
    }

    p5.setup = () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
    }

    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    }

    p5.mouseDragged = throttle((e) => {
        p5.points.push({
            x: p5.mouseX,
            y: p5.mouseY
        });
    }, 40);

    p5.data = () => {
        let html = "";
        for (var i = 0; i < p5.points.length; i++) {
            let _point = p5.points[i];
            html += "{x:" + _point.x + ",y:" + _point.y + ",time:t}"
        }
        return html;
    }

    p5.screenshot = () => {
      return p5.canvas.toDataURL("image/png");
    }
}