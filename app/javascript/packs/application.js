require("@rails/ujs").start()
import Preloader from "components/preloader";
import Controls from "components/controls";
import p5 from 'p5';
// import { Brush } from "brushes/brush"; /* Esqueleto de brush esencial */
import { Brush0 } from "brushes/brush-particle-0"; /* Esqueleto de brush con partícula(s) */
import { Brush1 } from "brushes/brush-particle-1";
import { Brush2 } from "brushes/brush-particle-2";
import { Brush3 } from "brushes/brush-particle-3";
import { Brush4 } from "brushes/brush-particle-4";
import { LightBrush } from "brushes/light";
// import { LightBrush } from "brushes/lightbulb";

// import { Cursor } from "brushes/cursor";

class App {
    constructor() {
        this.preloader = new Preloader("preloader");
        if (window["letrism-form"]) {
            // console.log(LightBrush)
            switch(eQuill) {
                case 0:
                    this.sketch = new p5(Brush0);
                break;
                case 1:
                    this.sketch = new p5(Brush1);
                break;
                case 2:
                    this.sketch = new p5(Brush2);
                break;
                case 3:
                    this.sketch = new p5(Brush3);
                break;
                case 4:
                    this.sketch = new p5(Brush4);
                break;
                case 5:
                    this.sketch = new p5(LightBrush);
                break;
            }
            // this.sketch = new p5(Brush);

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