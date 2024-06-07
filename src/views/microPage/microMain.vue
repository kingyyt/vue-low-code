<template>
  <div class="flex justify-between dark:text-gray-100" style="height: calc(100vh - 3rem)">
    <microAside />
    <microContainer
      ref="microContainerRef"
      :mainList="mainList"
      @send-list="handleContainerListReceived"
    />
    <microEditor ref="microEditorRef" :mainList="mainList" @send-list="handleEditListReceived" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import microAside from '@/components/microMain/microAside.vue'
import microContainer from '@/components/microMain/microContainer.vue'
import microEditor from '@/components/microMain/microEditor.vue'
import {
  GetJsonList,
  PostJsonList,
  GetJsonListDetail,
  PatchJsonListDetail,
  DeleteJsonListDetail
} from '@/api/microMain/microMain'
import type {
  JsonList,
  editJsonList,
  JsonListReturn,
  JsonListData
} from '@/api/microMain/model/microModel'

// 初始化
const textDas = async () => {
  let params = {
    name: '333333'
    // json: '{"key": "updated_value"}'
  }
  let res = await DeleteJsonListDetail(11)
  console.log(res)
  console.log(res)
  console.log(res)
}

const init = () => {
  textDas()
}
onMounted(async () => {
  init()
})

const mainList = ref(null)
const JSONS = ref(
  '[{"name":"按钮","id":"button-1","props":{"defaultValue":"按钮","addonBefore":"按钮文字","placeholder":"请输入内容"}},{"name":"单元格","id":"cell-4","props":{"text":"按钮2"}},{"name":"按钮","id":"button-2","props":{"defaultValue":"按钮11","addonBefore":"按钮文字","placeholder":"请输入内容"}},{"name":"按钮","id":"button-3","props":{"defaultValue":"按钮","addonBefore":"按钮文字","placeholder":"请输入内容"}}]'
)

// 调用内容组件数据处理 《json参数生成列表方法》
const microContainerRef = ref<InstanceType<typeof microContainer> | null>(null)
const callContainerChildMethod = () => {
  if (microContainerRef.value) {
    microContainerRef.value.jsonToList(JSONS.value)
  }
}
// 接受内容参数
const handleContainerListReceived = (
  list: any,
  currentComponentId?: string,
  editorPropsData?: any
) => {
  mainList.value = list
  callEditChildMethod(currentComponentId, editorPropsData)
  console.log('内容->主')
  console.log(mainList.value)
  console.log(listToJson())
}
// 调用编辑组件 传递json参数
const microEditorRef = ref<InstanceType<typeof microEditor> | null>(null)

const callEditChildMethod = (currentComponentId?: string, editorPropsData?: any) => {
  if (microEditorRef.value) {
    microEditorRef.value.editorPropsComPonent(currentComponentId, editorPropsData)
  }
}

// 接受编辑组件参数
const handleEditListReceived = (list: any) => {
  console.log('编辑->主')
  console.log(mainList.value)
  mainList.value = list
}

// 转化json数据
const listToJson = () => {
  // 使用JSON.parse()和JSON.stringify()进行深拷贝
  const clonedList = JSON.parse(JSON.stringify(mainList.value))

  // 删除comName对象
  const jsonData = clonedList.map((item: any) => {
    if (item.comName) {
      delete item.comName
    }
    return item
  })

  return JSON.stringify(jsonData)
}
</script>
