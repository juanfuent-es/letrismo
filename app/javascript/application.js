import Layout from "./layout"
import Lenis from '@studio-freight/lenis'
// import {
//     DomGl, // Basic threejs setup
//     DomGlPost // threejs setup with postprocessor connected with effect composer
// } from "./dom_gl/index"
class App extends Layout {
    constructor() {
        super()
        this.setLenis()
        // <- domgl event
        window.event.on('resize', () => this.resize())
        this.resize()
    }

    setLenis() {
        this.lenis = new Lenis({
            duration: .1,
            lerp: this.lerp,
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            smoothTouch: true
        })
    }
    
    loaded() {
        this.preloader.hide()
        this.animate()
    }
    
    animate() {
        const time = new Date().getTime() * .1
        requestAnimationFrame(() => this.animate())
        // this.render(time) // <- domgl
        this.lenis.raf(time)
        STATS.update()
    }

}

const _app = new App()