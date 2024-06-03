import { defineStore } from 'pinia'

export const useLoginStore = defineStore('main', {
  state: () => {
    return {
      token: '',
      theme: false
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setTheme(theme: boolean) {
      this.theme = theme
    },
    removeToken() {
      this.token = ''
    }
  },
  persist: true
})
