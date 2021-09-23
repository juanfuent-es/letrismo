/*
    Brush que considera la VELOCIDAD y la DIRECCIÓN
    en la que se realizan los trazos, modificando
    el tamaño de las partículas y rotándolas
    en el ángulo que se trazaron de acuerdo a la posición
    anterior.
*/

import { Particle } from "./particle";
import { Cursor } from "./cursor";

export const Brush2 = (p5) => {
    p5.shapes = [];
    p5.undoneShapes = []; /* Necesario para utilizar undo() y redo() o sea ctrl+z y ctrl+y (aunque los comandos son las flechas izquierda y derecha) */
    p5.virtualShape = []; /* Necesario para guardar las formas una vez que se levante el lápiz */

    p5.points = []; /* Necesario para previsualizar los trazos que se están dibujando porque "p5.shapes" se dibuja hasta que la forma se haya terminado */

    // colors
    p5.bg_color = "#000";
    p5.stroke_color = "#FFF";
    p5.fill_color = "#000";
    p5.rgb = [255,255,255];
    p5.preview_color = "#f60";
    // colors

    p5.motionAmplitude = 3;
    p5.speedMorphScale = 5;
    p5.mortality = true;

    p5.virtualParticleShape = []; /* Para habilitar undo() y redo(), es necesario crear un "array" de partículas por cada trazo, este array comienza a recibir partículas cuando el usuario apoya el lápiz, luego se cierra al levantarlo, se inserta en "p5.particleShapes" y se limpia para recibir un trazo nuevo */
    p5.particleShapes = []; /* "Array" que almacena todos los "trazos" de partículas */
    p5.undoneParticleShapes = []; /* "Array" que almacena los "trazos" de partículas borrados al "undo()" */

    p5.drawingShape = false; /* Bandera para detectar si el usuario creó un "shape" que debe ser guardado al hacer click o no */
    p5.drawLines = true; /* Bandera para mostrar/esconder el trazo básico de la forma y solo mostrar las partículas */

    p5.preventDraw = false;

    p5.updateAttr = (key, value) => {
        return p5[key] = value;
    }

    p5.setup = () => {
        p5.canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
        // p5.canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight, WEBGL);

        p5.events();
    }

    p5.events = () => {
        window["flow-input"].addEventListener("change", (e) => {
            // console.log(parseFloat(window["flow-input"].value));
            switch (parseFloat(window["flow-input"].value)) {
                case .2:
                    p5.speedMorphScale = 0.1;
                    break;
                case .25:
                    p5.speedMorphScale = 2;
                    break;
                case .3:
                    p5.speedMorphScale = 5;
                    break;
                case .35:
                    p5.speedMorphScale = 10;
                    break;
                case .4:
                    p5.speedMorphScale = 20;
                    break;
            }
        });

        window["layers-input"].addEventListener("change", (e) => {
            // console.log(parseFloat(window["layers-input"].value));
            
            switch (parseFloat(window["layers-input"].value)) {
                case 1:
                    p5.motionAmplitude = .8;
                    break;
                case 2:
                    p5.motionAmplitude = 1.5;
                    break;
                case 3:
                    p5.motionAmplitude = 3;
                    break;
                case 4:
                    p5.motionAmplitude = 6;
                    break;
                case 5:
                    p5.motionAmplitude = 10;
                    break;
            }
        });

        if (window["mortality-input"]) {
            window["mortality-input"].addEventListener("change", (e) => {
                let setMinimum = Math.max(0.2, parseFloat(window["mortality-input"].value));
                let pow = Math.pow(setMinimum, 3);
                let rangeValue = 1 / pow;
                
                p5.deathSpeed = rangeValue;
                p5.mortality = (setMinimum >= 6) ? false : true;
            });
        }
    }

    p5.draw = () => {
        // p5.background(p5.bg_color);
        // Actualiza los valores de Cursor
        Cursor.update(p5.mouseX, p5.mouseY);
        // console.log(Cursor.position);

        p5.clear();
        p5.noFill();
        p5.stroke(p5.stroke_color);

        // Previsualuzación de la línea que se está dibujando
        p5.beginShape();
        for (var i = 0; i < p5.points.length; i++) {
            let p = p5.points[i];
            p5.curveVertex(p.x, p.y);
        }
        p5.endShape();


        // Dibuja los "p5.shapes" guardados hasta el momento,
            // si es que el usuario decide verlos presionando "x"
        if (p5.drawLines) {
            for (var i = 0; i < p5.shapes.length; i++) {
                p5.beginShape();
                    for (var j = 0; j < p5.shapes[i].length; j++) {
                        let p = p5.shapes[i][j];
                        p5.curveVertex(p.x, p.y);
                    }
                p5.endShape();
            }
        }
        

        ///// Operaciones para dibujar y animar las partículas
        // Partículas que se están creando mientras el usuario dibuja
        p5.stroke(p5.stroke_color);
        if (p5.virtualParticleShape.length > 0){
            for (var i = 0; i < p5.virtualParticleShape.length; i++) {
                p5.push();
                    p5.translate(p5.virtualParticleShape[i].position.x, p5.virtualParticleShape[i].position.y);
                    p5.rotate(p5.virtualParticleShape[i].rotation);
                    // p5.ellipse(0,0, 10, p5.virtualParticleShape[i].radius)
                    // p5.ellipse(0,0, p5.virtualParticleShape[i].radius, 10);
                    // p5.ellipse(0,0, p5.virtualParticleShape[i].width, p5.virtualParticleShape[i].height);
                    p5.ellipse(0,0, p5.virtualParticleShape[i].height, p5.virtualParticleShape[i].width);
                p5.pop();
                
                p5.virtualParticleShape[i].animate();
            }
        }

        // Partículas guardadas
        for (var i = 0; i < p5.particleShapes.length; i++) {
            for (var j = 0; j < p5.particleShapes[i].length; j++) {
                // Dibuja la partícula
                p5.push();
                    p5.translate(p5.particleShapes[i][j].position.x, p5.particleShapes[i][j].position.y);
                    p5.rotate(p5.particleShapes[i][j].rotation);
                    // p5.ellipse(0,0, 10, p5.particleShapes[i][j].radius);
                    // p5.ellipse(0,0, p5.particleShapes[i][j].radius, 10);
                    // p5.ellipse(0,0, p5.particleShapes[i][j].width, p5.particleShapes[i][j].height);
                    p5.ellipse(0,0, p5.particleShapes[i][j].height, p5.particleShapes[i][j].width);
                p5.pop();

                // Modifica las propiedades de la partícula para que en el siguiente "frame" se vea distinto
                p5.particleShapes[i][j].animate();
            }
        }

        // console.log(p5.particleShapes);

        // Dibuja el cursor para previsualizar lo que se va a pintar
        let _preview = new Particle({
            position: {
                x: p5.mouseX,
                y: p5.mouseY
            },

            cursor: Cursor,

            mortality: true,

            motionAmplitude: p5.motionAmplitude,
            speedMorphScale: p5.speedMorphScale
        });
        // p5.noStroke();
        // p5.fill(p5.preview_color);
        // p5.ellipse(p5.mouseX, p5.mouseY, 10);
        p5.push();
            p5.translate(p5.mouseX, p5.mouseY);
            p5.rotate(_preview.rotation);
            p5.ellipse(0, 0, _preview.height, _preview.width );
            // p5.ellipse(0, 0, Cursor.distance, 10);
        p5.pop();
    }

    p5.reset = () => {
        p5.points = [];

        p5.shapes = [];
        p5.undoneShapes = [];
        
        p5.particleShapes = [];
        p5.undoneParticleShapes = [];
        p5.hideSaveBtn();
    }

    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    }


    /////////////////////////////////////////////////////////
    ///////// Interacciones con Mouse
    /////////////////////////////////////////////////////////
    p5.mousePressed = () => {
        // console.log("mousePressed triggered");
        if (p5.preventDraw) return;
        let _mousePos = {
            x: p5.mouseX,
            y: p5.mouseY
        }

        // Agrega coordenadas a la línea que se dibujará para previsualizar el "shape" que se está comenzando a trazar
        p5.points.push(_mousePos);

        // Agrega coordenadas al "shape" que se va a dibujar una vez se termine el trazo
        p5.virtualShape.push(_mousePos);
    }


    p5.mouseDragged = throttle((e) => {
        // console.log("mouseDragged triggered");
        if (p5.preventDraw) return;

        p5.drawingShape = true;

        let _mousePos = {
            x: p5.mouseX,
            y: p5.mouseY
        }

        // Mientras el mouse esté presionado y se esté moviendo, agrega puntos al "shape" que se está trazando
        p5.points.push(_mousePos);
        p5.virtualShape.push(_mousePos);

        // Creación y configuración de partículas
        var _particle = new Particle({
            position: {
                x: p5.mouseX,
                y: p5.mouseY
            },

            cursor: Cursor,

            mortality: p5.mortality,
            deathSpeed: p5.deathSpeed,

            motionAmplitude: p5.motionAmplitude,
            speedMorphScale: p5.speedMorphScale
        });

        // Guarda la partícula para ser dibujada constantemente
        p5.virtualParticleShape.push(_particle);
    }, 40);

    
    p5.mouseReleased = () => {
        // console.log("mouseReleased triggered");
        if (p5.preventDraw) return;

        let _mousePos = {
            x: p5.mouseX,
            y: p5.mouseY
        }

        // Valida si el usuario realmente dibujó algo o si solo apoyó el lápiz/hizo click
        if (p5.drawingShape) {
            // Agrega la última posición del mouse en caso de que el usuario se haya movido demasiado rápido
            p5.virtualShape.push(_mousePos);

            // Guarda el trazo para convertirlo en una forma independiente de las que siguen
            p5.shapes.push(p5.virtualShape);
            
            p5.particleShapes.push(p5.virtualParticleShape);

            // Borra las figuras guardades en el "undo()" para evitar revolverlas en el futuro,
            // Esto hace que se pierdan para siempre, como al hacer un reset()
            p5.undoneShapes = [];
            p5.undoneParticleShapes = [];
        }

        // Reset porque va a ser remplazado por su "p5.shape[n]" correspondiente
        p5.points = [];
        p5.virtualShape = [];
        p5.virtualParticleShape = [];

        p5.drawingShape = false;
        p5.showSaveBtn();
    };

    p5.speedMorphedHeight = () => {

    }

    p5.hideSaveBtn = () => {
        gsap.to("#save-letrism", 0.6, {
            ease: Power2.easeOut,
            opacity: 0,
            y: 15,
            display: "none"
        });
    }

    p5.showSaveBtn = () => {
        window["letrism_img"].value = p5.screenshot();
        window["letrism_paths"].value = p5.data();
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
            for (let j = 0; j < shape.length; j++) {
                let _point = shape[j];
                html += "{x:" + _point.x + ",y:" + _point.y + "}"
            }
        }
        return html;
    }

    p5.screenshot = () => {
        if (p5.canvas.elt) {
            return p5.canvas.elt.toDataURL("image/png");
        } else {
            return p5.canvas.toDataURL("image/png");
        }
    }
}