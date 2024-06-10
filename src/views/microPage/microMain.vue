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
import { onMounted, ref,watch,computed } from 'vue'
import microAside from '@/components/microMain/microAside.vue'
import microContainer from '@/components/microMain/microContainer.vue'
import microEditor from '@/components/microMain/microEditor.vue'
import {useMainListStore} from '@/stores/modules/microPage'


const store = useMainListStore()

const init = () => {
  store.removeMainList()
  store.removeName()
}
onMounted(async () => {
  init()
})

const mainList = ref<any[]>([])
const JSONS = ref<any[]>([])
// 监听列表数据变化
const mainPageName = computed(() => store.name);
watch(mainPageName, (newVal, oldVal) => {
  if(!store.mainList.length) return
  JSONS.value = store.mainList
  callContainerChildMethod()
  console.log('当前页面：',newVal)
},{
  deep: true
})

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
