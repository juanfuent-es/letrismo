export default class Controls {
    constructor(_stage) {
        this.stage = _stage;
        this.events();
    }

    events() {
        window.addEventListener("keyup", (e) => {
            switch (e.keyCode) {
                /* ESC */
                case 27:
                    this.stage.reset();
                    break;
                    /*ENTER*/
                case 13:
                    this.save();
                    break;
            }
        });
    }

    redo() {
        this.stage.shapes.pop();
    }

    save() {
        window["letrism_img"].value = this.stage.screenshot();
        window["letrism_paths"].value = this.stage.data();
    }
}