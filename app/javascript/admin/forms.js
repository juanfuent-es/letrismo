export default class Forms {
    constructor() {
        this.events()
        this.plugins()
    }

    sanitize(str = "") {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(" ", "-")
    }

    plugins() {
        $(".editor").each(function (index, el) {
            ClassicEditor.create( el, {});
        })
        $('.selectize').selectize({
            create: true,
            sortField: "text"
        })
    }

    events() {
        $(document).on("change", '.input-img', (el) => {
            const [file] = $(el.target)[0].files
            let target = $(el.target).data("target")
            if (file) return $(target).attr("src", URL.createObjectURL(file))
            else return $(target).attr("src", "")
        })

        // $(document).on("keyup", '#page_title', (el) => {
        //     let str = this.sanitize($(el.target).val())
        //     // Algunas url están restringidas a cambios
        //     if ($("#page_slug").attr("required") != "required") return $("#page_slug").val(str)
        // })

        // Contador de caracteres
        $(document).on("keyup", '.str-counter', (el) => {
            let str = $(el.target).val()
            let target = $(el.target).data("target")
            $(target).text(str.length)
        })

        // .input-og-value se ocupa para los campos que se reflejan en la miniatura de la  og card
        $(document).on("keyup", '.input-og-value', (el) => {
            let str = $(el.target).val()
            let attr = $(el.target).data("attr")
            $(`#page-og-${attr}`).text(str)
        })
    }
}