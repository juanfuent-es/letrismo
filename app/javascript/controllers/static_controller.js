import { defineStore } from 'pinia'

export const StaticController = defineStore('static', {
  state: () => {
    return {
      page: {}
    }
  },
  actions: {
    async find(id) {
      return this.axios.get(`/${id}.json`).then(response => {
        this.page = response.data
      })  
    }
  },
})