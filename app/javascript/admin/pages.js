export default class Pages {
    constructor() {
        this.events()
    }

    events() {
        $(document).on("click", "#add-new-block", function(e) {
            e.preventDefault()
            let time = new Date().getTime()
            let regexp = new RegExp(e.target.dataset.id, 'g')
            $("#page-blocks-container").prepend(e.target.dataset.fields.replace(regexp, time))
        })
    }
}