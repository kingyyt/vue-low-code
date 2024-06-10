<script setup lang="ts">
import { onMounted,ref } from 'vue'
import type {Ref} from 'vue'
import {
  PlayCircleOutlined,
  ReloadOutlined,
  SaveOutlined,
  CloudDownloadOutlined,
  DownOutlined
} from '@ant-design/icons-vue'
import {
  GetJsonList,
  // PostJsonList,
  // GetJsonListDetail,
  // PatchJsonListDetail,
  // DeleteJsonListDetail
} from '@/api/microMain/microMain'

// 初始化
const init = () => {
  getJsonList()
}
onMounted(async () => {
  init()
})
// 获取json列表
interface JsonListData{
  id: number
  json:any
  name: string
  user_id: number
}

let list: Ref<JsonListData[]> = ref([])
const getJsonList = async ()=> {
  const res = await GetJsonList()
  if(res && res.data){
    list.value = res.data.map((item:JsonListData)=>{
      try{
        const parseData = JSON.parse(item.json)
        return{
          ...item,
          json:parseData
        }
        }
        catch(error){
          return{
            ...item,
            json:[]
          }
      }
    })
    console.log(list.value)
  }
}
// 列表点击
const openChange = (e:any)=>{
  console.log(e)
}

</script>

<template>
  <div class="dark:text-white">
  <a-popover >
    <template #content>
      <p>预览</p>
    </template>
    <PlayCircleOutlined class="mr-4" />
  </a-popover>
  <a-popover >
    <template #content>
      <p>重置</p>
    </template>
    <ReloadOutlined class="mr-4" />
  </a-popover>
  <a-popover >
    <template #content>
      <p>打包</p>
    </template>
    <SaveOutlined class="mr-4" />
  </a-popover>
  <a-popover >
    <template #content>
      <p>下载源码</p>
    </template>
    <CloudDownloadOutlined class="mr-4" />
  </a-popover>

  <a-dropdown >
    <a class="ant-dropdown-link text-sm" @click.prevent>
      选择页面
      <DownOutlined />
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item v-for="(item,index) in list" :key="index">
          <div @click="openChange(item.json)">{{ item.name }}</div>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  </div>
</template>
