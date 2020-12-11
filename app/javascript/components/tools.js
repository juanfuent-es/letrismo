export default class Tools {
	constructor() {
		this.setTL();
		this.events();
	}

	events() {
		window["open-tools-btn"].addEventListener("click", () => this.show());
		window["close-tools-btn"].addEventListener("click", () => this.hide());
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
		},0 ).to(".tool-item", 0.35, {
		    ease: Power2.easeOut,
		    stagger: 0.035,
		    opacity: 1,
		    y: 0
		}, 0.15);
	}
}