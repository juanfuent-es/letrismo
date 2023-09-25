import Rails from "@rails/ujs"
import Forms from "./admin/forms"
import Pages from "./admin/pages"
import Images from "./admin/images"

class Admin {
    constructor() {
        Rails.start()
        // 
        this.forms = new Forms()
        this.pages = new Pages()
        this.images = new Images()
        this.sortable()
        this.datatable()
    }

    sortable() {
        $(".sortable").sortable({
			update: function() {
                let ids = []
                $(this).children("[data-id]").each((idx, el) => {
                    ids.push($(el).data("id"))
                })
                $.ajax({
                    url: $(this).data("url"),
                    data: {
                        sort: ids.join(",")
                    }
                })
            }
		})
    }

    datatable() {
        $('.datatable').DataTable( {
            pageLength: 50,
            responsive: true,
            dom: 'Bfrtip',
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.5/i18n/es-MX.json',
            }
        })
    }

    loaded() {
        console.log("load")
    }
}

window["app"] = new Admin()
window.addEventListener("load", () => {
    window["app"].loaded()
})