require("@rails/ujs").start()
import Preloader from "components/preloader";
import Controls from "components/controls";
import Tools from "components/tools";
import p5 from 'p5';
// import { Brush } from "brushes/brush"; /* Esqueleto de brush esencial */
import { Brush2 } from "brushes/brush-particle-2";
import { Brush3 } from "brushes/brush-particle-3";
import { Brush6 } from "brushes/brush-particle-6";
import { LightBrush } from "brushes/light";
import { Bulb } from "brushes/bulb";
// import { LightBulb } from "brushes/lightbulb";

// import { Cursor } from "brushes/cursor";

class App {
    constructor() {
        this.preloader = new Preloader("preloader");
        if (window["letrism-form"]) {
            switch(eQuill) {
                case 0:
                    this.sketch = new p5(Brush6);
                break;
                case 1:
                    this.sketch = new p5(Brush2);
                break;
                case 2:
                    this.sketch = new p5(Brush3);
                break;
                case 3:
                    this.sketch = new p5(LightBrush);
                break;
                case 4:
                    this.sketch = new p5(Bulb);
                break;
            }
            this.controls = new Controls(this.sketch);
            this.tools = new Tools(this.sketch);
        }
        this.events();
    }

    events() {
        document.addEventListener('click', (event) => {
            if (event.target.matches('.change-page')) {
                event.preventDefault();
                let href = event.target.getAttribute("href");
                this.preloader.show((e) => {
                    return window.location.href = href;
                });
            } else if (event.target.matches('#save-letrism')) {
                this.controls.save();
                this.preloader.show();
            }
        });

        // window.addEventListener('mousemove', throttle ((e) => {
        //     console.log(Cursor.angle);
        //     // console.log(Cursor.angle * 180 / Math.PI);
        // }, 200));
    }

    loaded() {
        this.preloader.hide();
    }

}

let _app = new App();
window.onload = () => _app.loaded();