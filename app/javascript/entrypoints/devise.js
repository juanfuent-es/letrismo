import Layout from "../layout"

class App extends Layout {
    constructor() {
        super()
    }
    
    loaded() {
        this.preloader.hide()
    }

}

const _app = new App()