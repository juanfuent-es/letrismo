const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
}).join('')

export default class Images {
    constructor() {
        this.events()
    }

    updatePalette(colors) {
        let palette = []
        $(".palette-container").html("")
        for (let i = 0; i < colors.length; i++) {
            const rgb = colors[i]
            const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
            palette.push(hex)
            const hexHTML = this.hexLink(hex)
            $(".palette-container").append(hexHTML)
        }
        $("#colors-container").removeAttr("style")
        $("#image_color").val("#FFF")
        $("#bg_color").val("#000")
        $("#image_rainbow").val("#000|#FFF")
        $("#image_rainbow").val(palette.join(","))
        $("#bg-palette .palette-color-btn")[0].click()
        $("#color-palette .palette-color-btn")[1].click()
    }

    hexLink(hex) {
        return `<a href="${hex}" class="palette-color-btn" style="color: ${hex}">${hex}</a>`
    }

    events() {
        // form
        const colorThief = new ColorThief()
        $(document).on("change", '#image_file', (el) => {
            const [file] = $(el.target)[0].files
            if (file) {
                let img = new Image()
                img.onload = () => {
                    let colors = colorThief.getPalette(img, 8, 10)
                    this.updatePalette(colors)
                }
                img.src = URL.createObjectURL(file)
            }
        })
        $(document).on("click", "#bg-palette .palette-color-btn", function() {
            let hex = $(this).attr("href")
            $("#bg-palette .palette-color-btn.active").removeClass("active")
            $(this).addClass("active")
            $("#image_bg").val(hex)
            $("#colors-container")[0].style.setProperty("--bg-color", hex)
        })
        $(document).on("click", "#color-palette .palette-color-btn", function() {
            let hex = $(this).attr("href")
            $("#color-palette .palette-color-btn.active").removeClass("active")
            $(this).addClass("active")
            $("#image_color").val(hex)
            $("#colors-container")[0].style.setProperty("--color", hex)
        })
        // modal
        $(document).on("click", ".search-image-btn", function (e) {
            e.preventDefault()
            let target = $(this).find("input").attr("id")
            $("#select-img-btn").data("target", `#${target}`)
            let label = $(this).data("label")
            $("#select-img-btn").data("label", label)
            let preview = $(this).data("preview")
            console.log(preview)
            $("#select-img-btn").data("preview", preview)
        })
        $(document).on("click", ".image-item", function (e) {
            e.preventDefault()
            $('.image-item.active').removeClass("active")
            $(this).addClass("active")
        })
        $(document).on("click", "#select-img-btn", function () {
            let label = $("#select-img-btn").data("label")
            let alt_title = $(".image-item.active").data("title")
            $(label).val(alt_title)
            //
            let target = $("#select-img-btn").data("target")
            let imgSelected = $(".image-item.active").data("id")
            $(target).val(imgSelected)
            //
            let targetPreview = $("#select-img-btn").data("preview")
            $(targetPreview).attr("src", $(".image-item.active").data("preview"))
            $("#images-modal").modal("hide")
        })
    }
}