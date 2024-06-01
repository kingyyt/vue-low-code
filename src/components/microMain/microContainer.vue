<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'
import type { DefineComponent } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

interface BaseComponent extends DefineComponent {
  name: string
  id: string
}
interface list {
  name: string
  id: string
  comName?: object
}

const list2 = ref<list[]>([])
let components = shallowRef<BaseComponent[]>([])
const componentModules = import.meta.glob(`@/packages/*/*/index.vue`)

// 父组件数据处理
const props = defineProps<{
  jsonString: string
}>()
const jsonToList = () => {
  list2.value = JSON.parse(props.jsonString)
  onSort()
}
defineExpose({ jsonToList })

// 处理后的json数据 发送到父组件
const sendListToParent = () => {
  emit('send-list', JSON.stringify(list2.value))
}

const emit = defineEmits(['send-list'])

// 获取所有组件
const importComponents = async () => {
  const module = shallowRef<{ default: BaseComponent }>()
  for (const path in componentModules) {
    module.value = (await componentModules[path]()) as { default: BaseComponent }
    components.value.push(module.value.default)
  }
}
// 遍历获取对应组件
const jsonComponents = () => {
  list2.value.forEach((i) => {
    if (!Object.prototype.hasOwnProperty.call(i, 'comName')) {
      components.value.forEach((j) => {
        if (i.id.split('-')[0] == j.id) {
          i.comName = shallowRef(j)
        }
      })
    }
  })
  sendListToParent()
}
// 为list2 添加唯一id
const onSort = () => {
  list2.value.map((item, index) => {
    item.id = item.id.split('-')[0]
    item.id = item.id + `-${index}`
  })
  jsonComponents()
}
// 传参
const propsList = {
  data: 1
}

// 初始化
const init = () => {
  importComponents()
}
onMounted(async () => {
  init()
})
</script>

<template>
  <div class="h-full w-full min-w-96 checkered stripes flex justify-center items-center">
    <div class="flex flex-col content-center bg-white dark:bg-slate-50" style="height: 700px">
      <VueDraggable
        @sort="onSort"
        v-model="list2"
        :animation="150"
        group="people"
        ghostClass="ghost"
        class="flex flex-col gap-2 w-80 max-h-350px m-auto rounded overflow-auto border-solid border-2 shadow-md border-gray-100"
        style="height: 700px"
      >
        <component
          :propsList="propsList"
          v-for="(component, path) in list2"
          :key="path"
          :is="component.comName"
        />
      </VueDraggable>
    </div>
  </div>
</template>

<style lang="less">
.stripes {
  height: 100%;
  width: 100%;
  float: left;
  background-size: 30px 30px; /* 控制条纹的大小 */
}
.checkered {
  background-image: linear-gradient(45deg, #f7f7f7 25%, transparent 25%, transparent),
    linear-gradient(-45deg, #f7f7f7 25%, transparent 25%, transparent),
    linear-gradient(45deg, transparent 75%, #f7f7f7 75%),
    linear-gradient(-45deg, transparent 75%, #f7f7f7 75%);
}
.dark .checkered {
  background-image: linear-gradient(45deg, #6e7b8b 25%, transparent 25%, transparent),
    linear-gradient(-45deg, #6e7b8b 25%, transparent 25%, transparent),
    linear-gradient(45deg, transparent 75%, #6e7b8b 75%),
    linear-gradient(-45deg, transparent 75%, #6e7b8b 75%);
}
</style>
