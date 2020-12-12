export default class Tools {
    constructor(_stage) {
        this.stage = _stage;
        this.setTL();
        this.events();
    }

    events() {
        window["open-tools-btn"].addEventListener("click", () => this.show());
        window["close-tools-btn"].addEventListener("click", () => this.hide());
        // El dibujo de una forma requiere de 3 valores de color, background, relleno y stroke
        let changeColorInputs = document.querySelectorAll(".channel-input");
        // Se asigna evento a los inputs de cambio de valor, el evento se dispara al cambiar de valor
        for (let i = 0; i < changeColorInputs.length; i++) {
            changeColorInputs[i].addEventListener("change", (e) => {
                let _index = parseInt(e.target.getAttribute("data-index"));
                console.log(this.stage)
                this.stage.rgb[_index] = e.target.value;
                this.stage.stroke_color = "rgb(" + this.stage.rgb.join(",") + ")";
                this.stage.fill_color = "rgb(" + this.stage.rgb.join(",") + ")";
        		window["rgb-sample"].style.backgroundColor = this.stage.stroke_color;
            });
        }

    }

    show() {
        return this.tl.play();
    }

    hide() {
        return this.tl.reverse(0.35);
    }

    setTL() {
        this.tl = gsap.timeline({
            paused: true
        }).to("#tools", 0.35, {
            ease: Power2.easeOut,
            opacity: 1,
            y: 0,
            display: "block"
        }, 0).to(".tool-item", 0.35, {
            ease: Power2.easeOut,
            stagger: 0.035,
            opacity: 1,
            y: 0
        }, 0.15);
    }
}