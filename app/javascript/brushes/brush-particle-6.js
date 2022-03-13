/*
    Brush que imprime una PARTÍCULA
    en la posición de cada vértice guardado.
*/

import { Particle_Attracted } from "./particle-attracted";
import { Particle } from "./particle";
import { Cursor } from "./cursor";

export const Brush6 = (p5) => {
    p5.shapes = [];
    p5.undoneShapes = []; /* Necesario para utilizar undo() y redo() o sea ctrl+z y ctrl+y (aunque los comandos son las flechas izquierda y derecha) */
    p5.virtualShape = []; /* Necesario para guardar las formas una vez que se levante el lápiz */
    
    // colors
    p5.bg_color = "#151512";
    p5.stroke_color = "#FFF";
    p5.rgb = [255,255,255];
    p5.fill_color = "#151512";
    // colors

    p5.virtualParticleShape = []; /* Para habilitar undo() y redo(), es necesario crear un "array" de partículas por cada trazo, este array comienza a recibir partículas cuando el usuario apoya el lápiz, luego se cierra al levantarlo, se inserta en "p5.particleShapes" y se limpia para recibir un trazo nuevo */
    p5.particleShapes = []; /* "Array" que almacena todos los "trazos" de partículas */
    p5.undoneParticleShapes = []; /* "Array" que almacena los "trazos" de partículas borrados al "undo()" */


    p5.filaments = [];
    p5.filamentsCount = 5;
    p5.filament = {
        accelerationScale: .4,
        radius: 16,
        limit: 5
    };

    p5.proximityRate = 1;
    p5.proximityCounter = 0;

    p5.preventDraw = false;

    p5.setup = () => {
        p5.canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
        p5.mouseX = window.innerWidth /2;
        p5.mouseY = window.innerHeight /2;

        for (var i = 0; i < p5.filamentsCount; i++) {
            p5.filaments[i] = new Particle_Attracted({
                radius: p5.filament.radius,
                limit: p5.filament.limit,
                accelerationScale: p5.filament.accelerationScale,

                anchor: {
                    x: p5.mouseX,
                    y: p5.mouseY
                }
            });
        }

        p5.events();
        // console.log(p5.filaments);
    }

    p5.events = () => {
        window["flow-input"].addEventListener("change", (e) => {
            for (var i = 0; i < p5.filaments.length; i++) {
                p5.filaments[i].limit = parseFloat(window["flow-input"].value) * 30;
                p5.filament.limit = parseFloat(window["flow-input"].value) * 30;
                // console.log(p5.filaments[i].limit);
            }
        });

        window["layers-input"].addEventListener("change", (e) => {
            p5.filamentsCount = parseFloat(window["layers-input"].value) * 2;
            p5.disperse();
        });
    }

    p5.updateAttr = (key, value) => {
        return p5[key] = value;
    }

    p5.draw = () => {
        // Actualiza los valores de Cursor
        Cursor.update(p5.mouseX, p5.mouseY);

        p5.clear();
        // p5.background(p5.bg_color);
        // p5.background(0, 20);
        
        p5.noFill();
        p5.stroke(p5.stroke_color);
        // p5.fill(p5.stroke_color);
        // p5.stroke(p5.fill_color);


        // Particulas de atraccion siempre presentes
        for (var i = 0; i < p5.filaments.length; i++) {
            p5.filaments[i].updateAnchor(p5.mouseX, p5.mouseY);
            p5.filaments[i].animate(p5.mouseX, p5.mouseY);

            p5.ellipse(p5.filaments[i].position.x, p5.filaments[i].position.y, p5.filaments[i].radius);
        }
        

        // Operaciones para dibujar y animar las partículas
        // p5.stroke(p5.stroke_color);

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

        if (p5.mouseIsPressed && p5.proximityRate == p5.proximityCounter) {
            if (p5.preventDraw) return;
        	// Creación y configuración de partículas
	        for (var i = 0; i < p5.filaments.length; i++) {
	            let _particle = new Particle({
	                position: {
	                    x: p5.filaments[i].position.x,
	                    y: p5.filaments[i].position.y
	                },
	                radius: p5.filament.radius,
	                mortality: true,
	                lifespan: 100
	            });

	            // let _particle = new Particle_Attracted({
	            //     position: {
	            //         x: p5.filaments[i].position.x,
	            //         y: p5.filaments[i].position.y
	            //     }
	            // });

	            // Guarda la partícula para ser dibujada constantemente
	            p5.virtualParticleShape.push(_particle);
	        }
        }


        p5.proximityCounter++;
        if (p5.proximityCounter > p5.proximityRate) p5.proximityCounter = 0;
    }

    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    }


    /////////////////////////////////////////////////////////
    ///////// Interacciones con Mouse
    /////////////////////////////////////////////////////////

    p5.mouseReleased = () => {
        // console.log("mouseReleased triggered", p5.points);
        if (p5.preventDraw) return;

        let _mousePos = {
            x: p5.mouseX,
            y: p5.mouseY
        }

        
        p5.particleShapes.push(p5.virtualParticleShape);

        // Borra las figuras guardades en el "undo()" para evitar revolverlas en el futuro,
        // Esto hace que se pierdan para siempre, como al hacer un reset()
        p5.undoneParticleShapes = [];

        // Reset porque va a ser remplazado por su "p5.shape[n]" correspondiente
        p5.virtualParticleShape = [];

        // console.log(p5.particleShapes);
        p5.showSaveBtn();
    };

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

    p5.disperse = () => {
        p5.filaments = [];

        for (var i = 0; i < p5.filamentsCount; i++) {
            p5.filaments[i] = new Particle_Attracted({
                radius: p5.filament.radius,
                limit: p5.filament.limit,
                accelerationScale: p5.filament.accelerationScale,

                anchor: {
                    x: p5.mouseX,
                    y: p5.mouseY
                }
            });
        }
    }


    p5.reset = () => {
        p5.disperse();
        
        p5.particleShapes = [];
        p5.undoneParticleShapes = [];
        p5.hideSaveBtn();
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