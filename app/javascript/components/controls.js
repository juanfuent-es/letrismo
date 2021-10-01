export default class Controls {
    constructor(_stage) {
        this.stage = _stage;
        this.events();
    }

    events() {
        window["clear-btn"].addEventListener("click", (e) => {
            this.stage.reset();
        });
        window["download-tif"].addEventListener("click", (e) => {
            this.stage.saveCanvas('00-equill-tif', 'tif');
        });
        window["download-jpg"].addEventListener("click", (e) => {
            this.stage.saveCanvas('00-equill-jpg', 'jpg');
        });
        window.addEventListener("keyup", (e) => {
            switch (e.keyCode) {
                /* ESC */
                case 27:
                    this.stage.reset();
                    break;
                    /* ENTER */
                case 13:
                    this.save();
                    break;
                    /* Flecha Izquierda */
                case 37:
                    this.undo();
                    break;
                    /* Flecha Derecha */
                case 39:
                    this.redo();
                    break;
                    /* "x" */
                case 88:
                    this.toggleXRay();
                    break;
                /* "barra espaciadora" */
                case 32:
                    if(this.disperse) this.disperse();
                    break;
            }
        });
        // grid selector
        let gridInput = document.querySelectorAll(".grid-btn");
        for (let i = 0; i < gridInput.length; i++) {
            gridInput[i].addEventListener("click", (e) => {
                let _grid = e.target.getAttribute("data-grid");
                window["guides-layer"].setAttribute("data-grid", _grid);
            });
        }

        
    }

    undo() {
        // Se ejecuta solo si hay formas que borrar
        if (this.stage.shapes.length > 0) {
            // Remueve la última figura de lo que se está dibujando y la guarda
            let _removedShape = this.stage.shapes.pop();
            this.stage.undoneShapes.push(_removedShape);
        }

        // Se ejecuta solo si hay partículas que borrar
        if (this.stage.particleShapes && this.stage.particleShapes.length > 0) {
            let _removedParticleShape = this.stage.particleShapes.pop();
            this.stage.undoneParticleShapes.push(_removedParticleShape);
        }
    }

    redo() {
        // Se ejecuta solo si hay formas que re-dibujar
        if (this.stage.undoneShapes && this.stage.undoneShapes.length > 0) {
            // Selecciona la última figura guardada y la agrega al "array" para que sea dibujada
            let _rescuedShape = this.stage.undoneShapes.pop();
            this.stage.shapes.push(_rescuedShape);
        }

        // Se ejecuta solo si hay partículas que re-dibujar
        if (this.stage.undoneParticleShapes && this.stage.undoneParticleShapes.length > 0) {
            let _rescuedParticleShape = this.stage.undoneParticleShapes.pop();
            this.stage.particleShapes.push(_rescuedParticleShape);
        }
    }

    toggleXRay() {
        this.stage.drawLines = !this.stage.drawLines;
    }

    disperse() {
        this.stage.disperse();
    }

    save() {
        window["letrism_img"].value = this.stage.screenshot();
        window["letrism_paths"].value = this.stage.data();
    }
}