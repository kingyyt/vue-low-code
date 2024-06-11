import { defineStore } from 'pinia'

export const useMainListStore = defineStore('mainList', {
  state: () => {
    return {
        mainList:[],
        name:'',
        update:0, // 0:新建页面 1:编辑已创建页面 2:保存新页面 3:重置页面 4:二次选择
    }
  },
  actions: {
    setMainList(mainList: any) {
      this.mainList = mainList
    },
    setPageName(name: string) {
      this.name = name
    },
    setUpdate(num:number){
      this.update = num
      setTimeout(() => {
        this.update = 0 // 使用 setTimeout 确保在异步操作完成后重置状态
      }, 0)
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
