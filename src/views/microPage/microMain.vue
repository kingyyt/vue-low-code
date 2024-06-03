<template>
  <div class="flex justify-between dark:text-gray-100" style="height: calc(100vh - 3rem)">
    <microAside />
    <microContainer
      ref="microContainerRef"
      :jsonString="jsonString"
      @send-list="handleListReceived"
    />
    <microEditor ref="microEditorRef" :jsonString="jsonString" />
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

// 列表json字符串
const jsonString = ref('')
// const jsonString = ref(
//   '[{"id":"icon","name":"图标"},{"id":"button","name":"按钮"},{"id":"button","name":"按钮"}]'
// )
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
const handleListReceived = (list: string, currentComponentId?: string) => {
  jsonString.value = list
  console.log('-------父---------')
  console.log(JSON.parse(list), 'list[]')
  callEditChildMethod(currentComponentId)
}
// 调用编辑组件 传递json参数
const microEditorRef = ref<InstanceType<typeof microEditor> | null>(null)

const callEditChildMethod = (currentComponentId?: string) => {
  if (microEditorRef.value) {
    microEditorRef.value.jsonToList(currentComponentId)
  }
}
</script>
