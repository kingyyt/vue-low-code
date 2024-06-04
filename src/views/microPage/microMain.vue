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

// 初始化
const init = () => {}
onMounted(async () => {
  init()
})

const mainList = ref(null)

// 调用内容组件数据处理 《json参数生成列表方法》
const microContainerRef = ref<InstanceType<typeof microContainer> | null>(null)
const callContainerChildMethod = () => {
  if (microContainerRef.value) {
    microContainerRef.value.jsonToList()
  }
  // 生成表单后 json首次传递至编辑组件
  callEditChildMethod()
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
}
// 调用编辑组件 传递json参数
const microEditorRef = ref<InstanceType<typeof microEditor> | null>(null)

const callEditChildMethod = (currentComponentId?: string, editorPropsData?: any) => {
  if (microEditorRef.value) {
    microEditorRef.value.jsonToList(currentComponentId, editorPropsData)
  }
}

// 接受编辑组件参数
const handleEditListReceived = (list: any) => {
  console.log('编辑->主')
  console.log(mainList.value)
  mainList.value = list
}
</script>
