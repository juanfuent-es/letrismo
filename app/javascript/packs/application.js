require("@rails/ujs").start()
import Preloader from "components/preloader";
import Controls from "components/controls";
import p5 from 'p5';
// import { Brush } from "brushes/brush"; /* Esqueleto de brush esencial */
// import { Brush } from "brushes/brush-particle-0"; /* Esqueleto de brush con partícula(s) */
// import { Brush } from "brushes/brush-particle-1";
import { Brush } from "brushes/brush-particle-2";

class App {
    constructor() {
        this.sketch = new p5(Brush);
        this.preloader = new Preloader("preloader");
        this.controls = new Controls(this.sketch);
        this.events();
    }

    events() {
        if (window["save-letrism"]) {
            window["save-letrism"].addEventListener("click", () => {
                this.controls.save();
                this.preloader.show();
            });
        }
    }

    loaded() {
        this.preloader.hide();
    }

}

let _app = new App();
window.onload = () => _app.loaded();