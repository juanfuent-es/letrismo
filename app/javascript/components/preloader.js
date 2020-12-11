export default class Preloader {
	constructor(containerId) {
		if (containerId === undefined) throw "ContainerId es requerido";
		this.container = document.getElementById(containerId)
	}

	show(callback) {
		gsap.to(this.container, 0.35, {
			ease: Power2.easeOut,
			opacity: 1,
			scaleX: 1,
			scaleY: 1,
			display: "block",
			onComplete: () => {
				if (callback) callback();
			}
		});
	}

	hide() {
		gsap.to(this.container, 0.45, {
			ease: Power2.easeOut,
			opacity: 0,
			scaleX: 2,
			scaleY: 2,
			display: "none"
		});
		gsap.to(".intro-item", 0.45, {
			ease: Power2.easeOut,
			delay: 0.35,
			stagger: 0.05,
			opacity: 1,
			y: 0
		});
	}
}