class EquillAudio {
    constructor() {
        this.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx;
        this.oscillators = new Map();
        this.gainNode;
        this.started = false;
        this.chunks = [];
        this.dest;
        this.isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        this.mediaRecorder;
        this.loop;
        if (!this.isChrome) {
            this.init();
        }
    }

    init() {
        this.started = true;
        this.audioCtx = new AudioContext();
        this.oscillators.set('c4', this.audioCtx.createOscillator());
        this.oscillators.set('mapY', this.audioCtx.createOscillator());
        this.oscillators.set('speed', this.audioCtx.createOscillator());
        this.gainNode = this.audioCtx.createGain();
        this.gainNode.gain.value = 0.0001;
        this.chunks = [];
        this.dest = this.audioCtx.createMediaStreamDestination();
        this.oscillators.forEach((osc) => {
            osc.connect(this.gainNode);
            osc.start();
            osc.detune.value = 100; // value in cents
        });
            
        this.gainNode.connect(this.dest);
        this.gainNode.connect(this.audioCtx.destination);
        this.mediaRecorder = new MediaRecorder(this.dest.stream);

        this.oscillators.get('c4').frequency.value = 261.63;
        this.mediaRecorder.addEventListener('dataavailable', function (event) {
            this.chunks.push(event.data);
        }.bind(this), false);
        this.mediaRecorder.addEventListener('stop', function (event) {
            // Make blob out of our blobs, and open it.
            var blob = new Blob(this.chunks, {
                'type': 'audio/ogg; codecs=opus'
            });
            document.querySelector("audio").src = URL.createObjectURL(blob);
            document.getElementById("controls").classList.add('active');

            let url = URL.createObjectURL(blob);
            document.getElementById('linkDownload').href = url;
            document.getElementById('linkDownload').download = 'equill-audio.ogg';
        }.bind(this), false);
    }

    playNote(noteDist, noteMapY, amp) {
        this.oscillators.get('mapY').frequency.value = noteMapY;
        this.oscillators.get('speed').frequency.value = noteDist;
    }

    play() {
        if (!this.started) {
            this.init();
        }
        if (this.isChrome) {
            this.gainNode.gain.value = 0.1;
        } else {
            this.gainNode.gain.setTargetAtTime(1.0, this.audioCtx.currentTime, 0.5);
        }
    }
    stop() {
        this.gainNode.gain.setTargetAtTime(0, this.audioCtx.currentTime, 0.5);
    }

    startRecording() {
        if (!this.started) {
            this.init();
        }
        this.mediaRecorder.start();
        this.loop = setInterval(() => {
            this.mediaRecorder.requestData();
        }, 100);
    }
    stopRecording() {
        clearInterval(this.loop);
        this.mediaRecorder.stop();
        this.oscillators.forEach((osc) => {
            osc.stop();
        });
    }

    getFrecuencieOscillator(id) {
        return this.oscillators.get(id).frequency.value;
    }


}
// let notes = [64,65,67,69,71,72, 76]; //midi
const notes = [329.63, 349.23, 392.00, 440.00, 493.88, 523.25, 659.25]; //frecuencies
const maxFrequency = notes[notes.length - 1];
const maxSize = 100;
let playing = false,
    clicked = false,
    finished = false;
let button, buttonRecord;
let a = document.getElementById('linkDownload');
let audioPlayer = document.getElementById('audioPlayer');
let playBnt = document.getElementById('play');
let opacity = 1;
let _osc = new EquillAudio();
let cnv;
function setup() {
    cnv = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    cnv.mousePressed(playOscillator);
    cnv.touchStarted(playOscillator);

    pixelDensity(3); // for p5 Community Book only
    noStroke();

    buttonRecord = createButton('Record');
    buttonRecord.addClass("record");
    buttonRecord.mousePressed(clickedRecord);
}

function clickedRecord() {
    if (!clicked) {
        buttonRecord.addClass("active");
        clicked = true;
        _osc.startRecording();
    } else {
        buttonRecord.removeClass("active");
        buttonRecord.addClass("finished");
        buttonRecord.disabled = true;
        finished = true;
        noLoop();
        _osc.stopRecording();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    if (playing) {
        let d = int(dist(mouseX, mouseY, pmouseX, pmouseY));
        if (d > maxSize) {
            d = maxSize;
        }

        let colorR = Math.floor(map(d, 0, maxSize, 150, 255));
        let colorG = 0;
        let colorB = Math.floor(map(_osc.getFrecuencieOscillator('mapY'), 0, maxFrequency, 255, 0));
        let locX = mouseX - height / 2;
        let locY = mouseY - width / 2;

        translate(-width / 2, -height / 2);
        push();
        pointLight(colorR, colorG, colorB, 0, 0, 250);
        translate(mouseX, mouseY);
        rotateX(millis() / 1000);
        fill(`rgba(255,255,255,${opacity})`);
        box(d);
        pop();
    }
}

function playOscillator() {
    _osc.play();
    playing = true;
}

function mouseReleased() {
    _osc.stop();
    playing = false;
    window["letrism_img"].value = cnv.canvas.toDataURL("image/png");
    gsap.to("#save-letrism", 0.6, {
        ease: Power2.easeOut,
        opacity: 1,
        y: 0,
        display: "block"
    });
}

function keyPressed() {
    if (keyCode == 32) {
        opacity -= .1;
    }
    if (keyCode == 13) {
        opacity = 1;
    }
}

function mouseDragged(event) {
    if (!finished) {
        if (event.button == 0 && event.clientX < width && event.clientY < height) {
            let d = int(dist(mouseX, mouseY, pmouseX, pmouseY));

            let keyX = 0;
            if (d < 10) keyX += 1;
            else if (d < 50) keyX += 2;
            else if (d < 100) keyX += 3;
            else if (d < 150) keyX += 4;
            else if (d < 200) keyX += 5;

            let keyY = floor(map(mouseY, 0, height, 0, notes.length));
            _osc.playNote(notes[keyX], notes[keyY], 0.5);
        }
    }
}

function touchMoved(event) {
    if (!finished) {
        if (event.clientX < width && event.clientY < height) {
            let d = int(dist(mouseX, mouseY, pmouseX, pmouseY));

            let keyX = 0;
            if (d < 10) keyX += 1;
            else if (d < 50) keyX += 2;
            else if (d < 100) keyX += 3;
            else if (d < 150) keyX += 4;
            else if (d < 200) keyX += 5;

            let keyY = floor(map(mouseY, 0, height, 0, notes.length));
            _osc.playNote(notes[keyX], notes[keyY], 0.5);
        }
    }
}
document.querySelector("#clear-btn").addEventListener("click", (e) => {
    window.location.reload()
})
playBnt.addEventListener("click", () => {
    audioPlayer.play();
    playBnt.classList.add('playing');
});
audioPlayer.onended = function () {
    playBnt.classList.remove('playing');
}