const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
export const Acorde = (p5) => {
    this.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioCtx;
    this.oscillators = new Map();
    this.gainNode;
    this.started = false;
    this.chunks = [];
    this.dest;
    this.mediaRecorder;
    this.loop;

    p5.setup = () => {
        p5.canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight); //, p5.WEBGL
        p5.colorMode(p5.HSB);
        
        p5.started = true;
		p5.audioCtx = new AudioContext();
		p5.oscillators.set('c4',p5.audioCtx.createOscillator());
		p5.oscillators.set('mapY',p5.audioCtx.createOscillator());
		p5.oscillators.set('speed',p5.audioCtx.createOscillator());
		p5.gainNode = p5.audioCtx.createGain();
		p5.gainNode.gain.value = 0.0001;
		p5.chunks = [];
 		p5.dest = p5.audioCtx.createMediaStreamDestination();
 		p5.oscillators.forEach((osc)=>{
 			osc.connect(p5.gainNode);
 			osc.start();
 			osc.detune.value = 100; // value in cents
 		});
 		p5.gainNode.connect(p5.dest);
		p5.gainNode.connect(p5.audioCtx.destination);
 		p5.mediaRecorder = new MediaRecorder(p5.dest.stream);

		p5.oscillators.get('c4').frequency.value = 261.63;
		p5.mediaRecorder.addEventListener('dataavailable', function(event) {p5.chunks.push(event.data);}.bind(p5),false);
		p5.mediaRecorder.addEventListener('stop', function(event) {
			// Make blob out of our blobs, and open it.
	       var blob = new Blob(p5.chunks, { 'type' : 'audio/ogg; codecs=opus' });
	       document.querySelector("audio").src = URL.createObjectURL(blob);
	       document.getElementById("controls").classList.add('active');

	       let url = URL.createObjectURL(blob);
	       document.getElementById('linkDownload').href = url;
	       document.getElementById('linkDownload').download = 'equill-audio.ogg';
		 }.bind(p5),false);
    }

    p5.events = () => {
        window["flow-input"].addEventListener("change", (e) => {
            LIGHT.flow = parseFloat(window["flow-input"].value);
        });

        window["layers-input"].addEventListener("change", (e) => {
            LIGHT.filaments = parseFloat(window["layers-input"].value);
        });
    }

    p5.draw = () => {
        let time = new Date().getTime() / 1000;
        // p5.background("rgba(21, 21, 18, 0.00)");
        // p5.background("rgba(0, 0, 0, 0.001)");
        for (let i = 0; i < LIGHT.bulb.length; i++) {
            let light = LIGHT.bulb[i];
            for (let j = 0; j < light.length; j++) {
                const filament = light[j];
                filament.update(p5.mouse, time);
                p5.strokeWeight(0.5);
                let hsl = filament.hsl;
                p5.stroke(hsl[0], hsl[1], hsl[2]);

                filament.render(p5, time);
            }
        }
    }

    /* Se vacía el arreglo contenedor de shapes, y el contenedor del 'current shape'*/
    p5.reset = () => {
        // p5.background(p5.bg_color);
        p5.clear();
        p5.shapes = [];
        p5.shape = [];

        LIGHT.bulb = [];
        LIGHT.light = [];
        p5.hideSaveBtn();
    }

    p5.updateAttr = (key, value) => {
        return p5[key] = value;
    }

    /* Actualiza tamaño del stage al tamaño de ventana */
    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    }

    p5.mouseDragged = throttle((e) => {
        if (p5.preventDraw) return;
        p5.shape.push({
            x: p5.mouseX, // - p5.windowWidth / 2,
            y: p5.mouseY // - p5.windowHeight / 2
        });
    }, 40);

    p5.mousePressed = () => {
        if (p5.preventDraw) return;
        p5.shapes.push(p5.shape);
        for (let i = 0; i < LIGHT.filaments; i++) {
            const _needle = new Needle({
                movement: Math.abs(Math.sin(i * 3) * 0.1) + LIGHT.movement,
                size: ~~((i + 1) / LIGHT.total_vertices),
                position: {
                    x: p5.mouseX,
                    y: p5.mouseY
                }
            });
            LIGHT.light.push(_needle);
        }
        LIGHT.bulb.push(LIGHT.light);
    };

    p5.hideSaveBtn = () => {
        gsap.to("#save-letrism", 0.6, {
            ease: Power2.easeOut,
            opacity: 0,
            y: 15,
            display: "none"
        });
    }

    p5.showSaveBtn = () => {
        gsap.to("#save-letrism", 0.6, {
            ease: Power2.easeOut,
            opacity: 1,
            y: 0,
            display: "block"
        });
        window["letrism_img"].value = p5.screenshot();
        window["letrism_paths"].value = p5.data();
    }


    p5.mouseReleased = () => {
        if (p5.preventDraw) return;
        p5.shape = [];
        for (var i = 0; i < LIGHT.light.length; i++) {
            LIGHT.light[i].die();
        }
        LIGHT.light = [];
        p5.showSaveBtn();
    };

    p5.data = () => {
        let html = "";
        for (let i = 0; i < p5.shapes.length; i++) {
            let shape = p5.shapes[i];
            let node = "[";
            for (let j = 0; j < shape.length; j++) {
                let _point = shape[j];
                node += "{x:" + _point.x + ",y:" + _point.y + "}"
            }
            node += "]";
            html += node;
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