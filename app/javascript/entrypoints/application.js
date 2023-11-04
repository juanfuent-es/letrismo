import Layout from "../layout"
import Page from "../components/page"
class App extends Layout {
    constructor() {
        super()
        this.page = new Page()
    }
    
    loaded() {
        this.preloader.hide()
    }

}

const _app = new App()