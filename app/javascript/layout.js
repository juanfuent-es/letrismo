import "./core/functions"
import "./core/constants"
// import "./core/ui"

import Preloader from "./components/preloader"
import Credits from './components/credits'
import Share from './components/share'

export default class Layout {
    constructor() {
        this.preloader = new Preloader()
        this.credits = new Credits("eQuills | Letrismo")
        this.share = new Share()
        this.events()
    }

    events() {
        window.onload = (e) => this.loaded(e)
        window.addEventListener("pageshow",  (e) => this.pageShow(e))
        window.onpopstate = (e) => this.reload(e)
    }

    pageShow(e) {
        let historyTraversal = e.persisted || (typeof window.performance != "undefined" && window.performance.navigation.type === 2)
        if (historyTraversal) this.reload()
        else this.loaded()
    }

    reload(e) {
        return window.location.reload()
    }

    loaded() {
        this.preloader.hide()
    }
}