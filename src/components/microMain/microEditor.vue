<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import { editComponents } from '@/packages/basic/button/data'

// 初始化
const init = () => {}
onMounted(async () => {
  init()
})

interface list {
  name: string
  id: string
  comName?: object
}

const list2 = ref<list[]>([])

const props = defineProps<{
  jsonString: string
}>()
const jsonToList = async () => {
  await nextTick()
  list2.value = JSON.parse(props.jsonString)
  console.log('-------子---------')
  console.log(JSON.parse(props.jsonString), 'list[]')
}
defineExpose({ jsonToList })
</script>

<template>
  <div class="w-80 min-w-80 h-full shadow-md p-4">
    <editComponents />
  </div>
</template>
