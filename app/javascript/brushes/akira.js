/*
    Brush que imprime una PARTÍCULA
    en la posición de cada vértice guardado.
*/

import { Particle_Attracted } from "./particle-attracted";
import { Particle_Rotating } from "./particle--rotating";
import { Particle } from "./particle";
import { Cursor } from "./cursor";

export const Akira = (p5) => {
    p5.shapes = [];
    p5.undoneShapes = []; /* Necesario para utilizar undo() y redo() o sea ctrl+z y ctrl+y (aunque los comandos son las flechas izquierda y derecha) */
    p5.virtualShape = []; /* Necesario para guardar las formas una vez que se levante el lápiz */
    
    // colors
    p5.bg_color = "#000";
    p5.stroke_color = "#FFF";
    p5.rgb = [255,255,255];
    p5.fill_color = "#000";
    // colors

    p5.points = []; /* Necesario para previsualizar los trazos que se están dibujando porque "p5.shapes" se dibuja hasta que la forma se haya terminado */

    p5.virtualParticleShape = []; /* Para habilitar undo() y redo(), es necesario crear un "array" de partículas por cada trazo, este array comienza a recibir partículas cuando el usuario apoya el lápiz, luego se cierra al levantarlo, se inserta en "p5.particleShapes" y se limpia para recibir un trazo nuevo */
    p5.particleShapes = []; /* "Array" que almacena todos los "trazos" de partículas */
    p5.undoneParticleShapes = []; /* "Array" que almacena los "trazos" de partículas borrados al "undo()" */

    p5.drawingShape = false; /* Bandera para detectar si el usuario creó un "shape" que debe ser guardado al hacer click o no */
    p5.drawLines = false; /* Bandera para mostrar/esconder el trazo básico de la forma y solo mostrar las partículas */

    p5.preventDraw = false; /* Bandera para prevenir trazos mientras interactuas con el menu */


    /* Akira variables */
    p5.filaments = [];
    p5.filamentsCount = 5;
    p5.filament = {
        velocity: {x: 1, y: 1},
        radius: 16,
        circlingRadius: 50,
        strokeWeight: 1,
    };

    p5.setCursorPrview = () => {
        p5.filaments = [];

        for (var i = 0; i < p5.filamentsCount; i++) {
            p5.filaments[i] = new Particle_Rotating({
                anchor: {
                    x: p5.mouseX,
                    y: p5.mouseY
                },

                velocity: {
                    x: p5.filament.velocity.x,
                    y: p5.filament.velocity.y
                },

                circlingRadius: p5.filament.circlingRadius,
                radius:  p5.filament.radius,
                angle: ( (Math.PI * 2) / p5.filamentsCount ) * i
            });
        }
    }

    p5.setup = () => {
        p5.canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
        p5.mouseX = window.innerWidth /2;
        p5.mouseY = window.innerHeight /2;

        p5.setCursorPrview();

        p5.events();
    }

    p5.events = () => {
        // circling radius
        window["flow-input"].min = 1;
        window["flow-input"].max = 100;
        window["flow-input"].step = 5;
        window["flow-input"].style.cssText = `--value:${window["flow-input"].value}; --min:${window["flow-input"].min}; --max:${window["flow-input"].max};`;
        window["flow-input"].addEventListener("change", (e) => {
            p5.filament.circlingRadius = parseFloat(window["flow-input"].value);
            p5.setCursorPrview();
        });

        // particles amount
        window["layers-input"].addEventListener("change", (e) => {
            p5.filamentsCount = parseFloat(window["layers-input"].value) * 3;
            p5.setCursorPrview();
        });
        
        
        // rotation speed
        window["velocityX-input"].addEventListener("change", (e) => {
            p5.filament.velocity.x = parseFloat(window["velocityX-input"].value);
            p5.setCursorPrview();
        });
        window["velocityY-input"].addEventListener("change", (e) => {
            p5.filament.velocity.y = parseFloat(window["velocityY-input"].value);
            p5.setCursorPrview();
        });
        
        // Particle radius
        window["particleRadius-input"].addEventListener("change", (e) => {
            p5.filament.radius = parseFloat(window["particleRadius-input"].value);
            p5.setCursorPrview();
        });

        // Particle stroke width
        window["strokeWeight-input"].addEventListener("change", (e) => {
            p5.filament.strokeWeight = parseFloat(window["strokeWeight-input"].value);
        });
    }

    p5.updateAttr = (key, value) => {
        return p5[key] = value;
    }

    p5.draw = () => {
        p5.background(p5.bg_color);
        p5.noFill();
        p5.stroke(p5.stroke_color);
        p5.strokeWeight(p5.filament.strokeWeight);

        // Previsualuzación de la línea que se está dibujando
        p5.beginShape();
        for (let i = 0; i < p5.points.length; i++) {
            let p = p5.points[i];
            p5.curveVertex(p.x, p.y);
        }
        p5.endShape();


        // Particulas de previsualizacion siempre presentes
        // son las que dan origen al trazo/particulas a almacenar
        for (var i = 0; i < p5.filaments.length; i++) {
            p5.filaments[i].updateAnchor(p5.mouseX, p5.mouseY);
            p5.filaments[i].animate(p5.mouseX, p5.mouseY);

            p5.ellipse(p5.filaments[i].position.x, p5.filaments[i].position.y, p5.filaments[i].radius);
        }


        // Dibuja los "p5.shapes" guardados hasta el momento,
            // si es que el usuario decide verlos presionando "x"
        if (p5.drawLines) {
            for (let i = 0; i < p5.shapes.length; i++) {
                p5.beginShape();
                let shape = p5.shapes[i];
                for (let j = 0; j < shape.length; j++) {
                    let p = shape[j];
                    p5.curveVertex(p.x, p.y);
                }
                p5.endShape();
            }
        }
        

        // Operaciones para dibujar y animar las partículas
        p5.stroke(p5.stroke_color);

        // Partículas que se están creando mientras el usuario dibuja
        // if (p5.virtualParticleShape.length > 0) <- Se puede eliminar, el if consume más memoria que si hace la evaluación al ciclo en 0, simplemente lo saltaría
        for (let i = 0; i < p5.virtualParticleShape.length; i++) {
            p5.ellipse(p5.virtualParticleShape[i].position.x, p5.virtualParticleShape[i].position.y, p5.virtualParticleShape[i].radius)
            p5.virtualParticleShape[i].animate();
        }

        // Partículas guardadas
        for (let i = 0; i < p5.particleShapes.length; i++) {
            for (let j = 0; j < p5.particleShapes[i].length; j++) {
                // Dibuja la partícula
                p5.ellipse(p5.particleShapes[i][j].position.x, p5.particleShapes[i][j].position.y, p5.particleShapes[i][j].radius)

                // Modifica las propiedades de la partícula para que en el siguiente "frame" se vea distinto
                p5.particleShapes[i][j].animate();
            }
        }

        // console.log(p5.particleShapes);

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
        let _particle = new Particle({
            position: {
                x: p5.mouseX,
                y: p5.mouseY,
            }
        });

        // Guarda la partícula para ser dibujada constantemente
        p5.virtualParticleShape.push(_particle);
    }, 40);

    p5.mouseReleased = () => {
        // console.log("mouseReleased triggered", p5.points);
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
    }

    p5.hideSaveBtn = () => {
        gsap.to("#save-letrism, #equill-bottom-actions", 0.6, {
            ease: Power2.easeOut,
            opacity: 0,
            y: 15,
            display: "none"
        });
    }

    p5.showSaveBtn = () => {
        gsap.to("#save-letrism, #equill-bottom-actions", 0.6, {
            ease: Power2.easeOut,
            opacity: 1,
            y: 0,
            display: "block"
        });
        window["letrism_img"].value = p5.screenshot();
        window["letrism_paths"].value = p5.data();
    }


    p5.reset = () => {
        p5.points = [];

        p5.shapes = [];
        p5.undoneShapes = [];
        
        p5.particleShapes = [];
        p5.undoneParticleShapes = [];
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