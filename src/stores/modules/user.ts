import { defineStore } from 'pinia'

export const useLoginStore = defineStore('main', {
  state: () => {
    return {
      token: ''
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    removeToken() {
      this.token = ''
    }
  },
  persist: true
})
