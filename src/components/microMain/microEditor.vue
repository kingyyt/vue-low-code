<script setup lang="ts">
import { onMounted, ref, nextTick, shallowRef, watch } from 'vue'
import type { list } from '@/components/microMain/editorPropsInterface'

// 初始化
const init = () => {}
onMounted(async () => {
  init()
})

const list2 = ref<list[]>([])
const currentEditComponent = ref<list | null>(null)
let editorPropsDataComponent = shallowRef<any>(null)

// 处理后的json数据 发送到父组件
const emit = defineEmits(['send-list'])
const sendListToParent = () => {
  emit('send-list', list2.value)
}
// 监听 props 变化
watch(
  () => currentEditComponent.value?.props,
  (newValue, oldValue) => {
    if (currentEditComponent.value) {
      currentEditComponent.value.props = newValue
      sendListToParent()
    }
  },
  {
    deep: true
  }
)

const props = defineProps<{
  mainList: any
}>()
const editorPropsComPonent = async (currentComponentId?: string, editorPropsData?: any) => {
  await nextTick()
  list2.value = props.mainList
  if (currentComponentId) {
    currentEditComponent.value = list2.value.find((item) => item.id === currentComponentId) || null
  }
  editorPropsDataComponent.value = editorPropsData
}

defineExpose({ editorPropsComPonent })
</script>

<template>
  <div class="w-80 min-w-80 h-full shadow-md p-4">
    <component :is="editorPropsDataComponent" :propsData="currentEditComponent?.props" />
  </div>
</template>
