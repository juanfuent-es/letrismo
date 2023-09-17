function Api() {}

Api.prototype.call = (request) => {
    return new Promise((resolve) => {
        request.then((response) => {
            resolve(response)
        })
    })
}

Api.prototype.install = function (app) {
    app.plugin = this;
    app.config.globalProperties.$api = this;
}

export function createApi(args) {
    args.handler.defaults.baseURL = window.location.protocol;
    args.handler.defaults.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    args.handler.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            switch (error.response.status) {
                case 500:
                    window.location.href = '/500'
                    break;
                case 401:
                    alert('not authenticated')
                    break;
            }
            return Promise.reject(error);
        }
    );

    return new Api();
}