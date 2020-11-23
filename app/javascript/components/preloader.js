export default class Preloader {
	constructor(containerId) {
		if (containerId === undefined) throw "ContainerId es requerido";
		this.container = document.getElementById(containerId)
	}

	show() {
		gsap.to(this.container, 0.3, {
			ease: Power2.easeOut,
			opacity: 1,
			scaleX: 1,
			scaleY: 1,
			display: "block"
		});
	}

	hide() {
		gsap.to(this.container, 0.3, {
			ease: Power2.easeOut,
			opacity: 0,
			scaleX: 2,
			scaleY: 2,
			display: "none"
		});
	}
}