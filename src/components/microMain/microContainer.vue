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
    components.value.forEach((j) => {
      if (i.id.split('-')[0] == j.id) {
        i.comName = shallowRef(j)
      }
    })
  })
}
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
  <div class="h-full">
    <div class="w-96 h-full flex flex-col content-center">
      <VueDraggable
        @sort="onSort"
        v-model="list2"
        :animation="150"
        group="people"
        ghostClass="ghost"
        class="flex flex-col gap-2 w-80 max-h-350px m-auto rounded overflow-auto border-solid border-2 border-gray-100 dark:border-gray-800"
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
