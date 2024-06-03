<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import editComponents from '@/packages/basic/button/data'
import type { list } from '@/components/microMain/editorPropsInterface'

// 初始化
const init = () => {}
onMounted(async () => {
  init()
})

const list2 = ref<list[]>([])
const currentEditComponent = ref<list | null>(null)

const props = defineProps<{
  jsonString: string
}>()
const jsonToList = async (currentComponentId?: string) => {
  await nextTick()
  list2.value = JSON.parse(props.jsonString)
  console.log('-------子---------')
  console.log(JSON.parse(props.jsonString), 'list[]')
  if (currentComponentId) {
    currentEditComponent.value = list2.value.find((item) => item.id === currentComponentId) || null
  }
  console.log(currentEditComponent.value, '1123123123')
}
defineExpose({ jsonToList })
</script>

<template>
  <div class="w-80 min-w-80 h-full shadow-md p-4">
    <editComponents />
  </div>
</template>
