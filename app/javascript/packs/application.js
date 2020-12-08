require("@rails/ujs").start()
import Preloader from "components/preloader";
import Controls from "components/controls";
import p5 from 'p5';
// import { Brush } from "brushes/brush"; /* Esqueleto de brush esencial */
// import { Brush } from "brushes/brush-particle-0"; /* Esqueleto de brush con partícula(s) */
// import { Brush } from "brushes/brush-particle-1";
// import { Brush } from "brushes/brush-particle-2";
// import { Brush } from "brushes/brush-particle-3";
import { LightBrush } from "brushes/lightbulb";

// import { Cursor } from "brushes/cursor";

class App {
    constructor() {
        this.preloader = new Preloader("preloader");
        if (window["letrism-form"]) {
            this.sketch = new p5(LightBrush);
            this.controls = new Controls(this.sketch);
            this.events();
        }
    }

    events() {
        window["save-letrism"].addEventListener("click", () => {
            this.controls.save();
            this.preloader.show();
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