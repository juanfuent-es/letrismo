require("@rails/ujs").start()
import Preloader from "components/preloader";
import { Side_Menu } from "components/side-menu";
import Controls from "components/controls";
import ToolBar from "components/toolbar";
import _P5 from 'p5';
// import { Brush } from "brushes/brush"; /* Esqueleto de brush esencial */
import { Brush1 } from "brushes/brush-particle-1";
import { Brush2 } from "brushes/brush-particle-2";
import { Brush6 } from "brushes/brush-particle-6";
import { LightBrush } from "brushes/light";
import { Sgraffito } from "brushes/sgraffito";
// import { Acorde } from "brushes/bulb";
// import { LightBulb } from "brushes/lightbulb";

// import { Cursor } from "brushes/cursor";

class App {
    constructor() {
        this.preloader = new Preloader("preloader");
        if (window["letrism-form"]) {
            switch(eQuill) {
                case "enjambre":
                    this.sketch = new _P5(Brush6);
                break;
                case "espuma":
                    this.sketch = new _P5(Brush1);
                break;
                case "portal":
                    this.sketch = new _P5(Brush2);
                break;
                case "bulbo":
                    this.sketch = new _P5(LightBrush);
                break;
                case "esgrafiado":
                    this.sketch = new _P5(Sgraffito);
                break;
                // case "acorde":
                //     this.sketch = new _P5(Acorde);
                // break;
            }
            if (this.sketch) {
                this.controls = new Controls(this.sketch);
                this.sketch.pixelDensity(2); // for _P5 Community Book only
            }
        }
        Side_Menu.init();
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
                // this.controls.save();
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
        this.toolbar = new ToolBar({parent: this});
    }

}

let _app = new App();
window.onload = () => _app.loaded();