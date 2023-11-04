import "@hotwired/turbo-rails"

export default class Page {
    constructor() {
        this.turbo()
        this.mount()
    }

    turbo() {
        // https://turbo.hotwired.dev/reference/events
        document.addEventListener("turbo:click", async (event) => this.unmount(event))
        document.addEventListener("turbo:frame-load", async (event) => {
            this.mount()
        })
    }

    mount() {
        gsap.to("#turbo-frame", {
            opacity: 1,
            onComplete: () => {
                // this.blazy()
            }
        })
    }
    
    unmount(e) {
        e.preventDefault()
        gsap.to("#turbo-frame", {
            opacity: 0,
            onComplete: () => {
                window.ScrollTo(0, 0)
            }
        })
    }

    // blazy() {
    //     return new Blazy()
    // }

}