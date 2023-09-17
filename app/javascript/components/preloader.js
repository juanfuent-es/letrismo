import {
    gsap
} from "gsap"

export default class Preloader {
    constructor() {
        this.container = document.querySelector("#preloader")
        this.loaded = false
        this.setTL()
    }

    setTL() {
        this.tl = gsap.timeline({
            paused: true
        }).to(this.container, {
            ease: 'power2.easeInOut',
            duration: .45,
            display: 'none',
            opacity: 0,
        }, 0)
    }

    show() {
        if (!this.loaded) return false
        this.loaded = false
        return this.tl.reverse()
    }

    hide() {
        if (this.loaded) return false
        this.loaded = true
        return this.tl.delay(3).play()
    }
}