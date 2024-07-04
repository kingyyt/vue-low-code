import { defineStore } from 'pinia'
import type { FormState } from '@/api/microMain/model/microModel'

export const useMainListStore = defineStore('mainList', {
  state: () => {
    return {
      mainList: [],
      name: '',
      // 0:新建页面 1:编辑已创建页面 2:保存新页面 3:重置页面
      // 4:是否进行页面设置校验 5:页面设置是否通过校验 6:是否弹出下载代码窗口
      // 7:是否进行编辑组件校验 8:是否通过编辑页面校验
      update: 0,
      pageSetting: {},
      tabbarActive: 0
    }
  },
  actions: {
    setMainList(mainList: any) {
      this.mainList = mainList
    },
    setPageName(name: string) {
      this.name = name
    },
    setUpdate(num: number) {
      this.update = num
      setTimeout(() => {
        this.update = 0 // 使用 setTimeout 确保在异步操作完成后重置状态
      }, 0)
    },
    setPageSetting(data: FormState) {
      this.pageSetting = data
      this.tabbarActive = data.tabbars.active
    },
    setTabbarActive(active: number) {
      this.tabbarActive = active
    },
    removeMainList() {
      this.mainList = []
    },
    removeName() {
      this.name = ''
    },
    removePageSetting() {
      this.pageSetting = {
        isUserTabbar: false,
        pageName: '',
        tabbars: {
          active: 0,
          tabbars: []
        }
      }
    }
  },
  persist: true
})
