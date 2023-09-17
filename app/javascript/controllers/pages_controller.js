import {
  defineStore
} from 'pinia'

export const Pages = defineStore('pages', {
  state: () => {
    return {
      page: {},
      pages: []
    }
  },
  actions: {
    async index() {
      return this.axios.get('/').then(response => {
        this.pages = response.data
      })
    },
    async projects(id) {
      return this.axios.get(`/${id}`).then(response => {
        this.page = response.data
      })
    }
  },
})