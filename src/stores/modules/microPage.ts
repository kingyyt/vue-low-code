import { defineStore } from 'pinia'

export const useMainListStore = defineStore('mainList', {
  state: () => {
    return {
        mainList:[],
        name:'',
    }
  },
  actions: {
    setMainList(mainList: any) {
      this.mainList = mainList
    },
    setPageName(name: string) {
      this.name = name
    },
    removeMainList() {
      this.mainList = []
    },
    removeName() {
      this.name = ''
    },
  },
  persist: true
})
