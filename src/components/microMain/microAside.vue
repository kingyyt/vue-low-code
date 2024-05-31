<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'
import type { DefineComponent } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { PlusCircleOutlined } from '@ant-design/icons-vue'
// const components = import.meta.glob('@/packages/basic/*/index.vue')
// 使用 import.meta.glob 动态导入 components 文件夹下的所有 .vue 文件
interface BaseComponent extends DefineComponent {
  name: string
  id: string
}
interface list {
  name: string
  id: string
}
const components = shallowRef<BaseComponent[]>([])
const getComponents = ref(false)

const importComponents = async (href: string) => {
  let componentModules: any = {}
  if (href == 'basic') {
    componentModules = import.meta.glob(`@/packages/basic/*/index.vue`)
  } else if (href == 'business') {
    componentModules = import.meta.glob(`@/packages/business/*/index.vue`)
  } else if (href == 'form') {
    componentModules = import.meta.glob(`@/packages/form/*/index.vue`)
  }
  const module = shallowRef<{ default: BaseComponent }>()

  for (const path in componentModules) {
    module.value = (await componentModules[path]()) as { default: BaseComponent }
    components.value.push(module.value.default)
    list1.value.push({
      name: module.value.default.name,
      id: module.value.default.id
    })
  }
  getComponents.value = true
}

const list1 = ref<list[]>([])

// 初始化
const init = () => {
  importComponents('basic')
}
// 更改锚点
const activeKey = ref('1')
const changeAnchor = (key: string) => {
  list1.value = []
  if (key == '1') {
    importComponents('basic')
  } else if (key == '2') {
    importComponents('business')
  } else if (key == '3') {
    importComponents('form')
  }
}

const onClone = () => {
  console.log('clone')
}

onMounted(async () => {
  init()
})
</script>

<template>
  <div class="w-72">
    <a-tabs
      @change="changeAnchor"
      class="pl-2 pb-2 dark:text-white"
      size="large"
      v-model:activeKey="activeKey"
    >
      <a-tab-pane key="1" tab="基础组件"></a-tab-pane>
      <a-tab-pane key="2" tab="业务组件"></a-tab-pane>
      <a-tab-pane key="3" tab="表单组件"></a-tab-pane>
    </a-tabs>
    <VueDraggable
      v-if="getComponents"
      @onClone="onClone"
      v-model="list1"
      :animation="150"
      ghostClass="ghost"
      :group="{ name: 'people', pull: 'clone', put: false }"
      :sort="false"
      class="flex flex-wrap"
    >
      <!-- <component v-for="(component, path) in components" :key="path" :is="component" /> -->
      <div v-for="item in list1" :key="item.id" class="w-1/3 cursor-pointer">
        <div class="m-4 flex flex-col items-center justify-center whitespace-nowrap">
          <PlusCircleOutlined />
          <div class="mt-2">{{ item.name }}</div>
        </div>
      </div>
    </VueDraggable>
  </div>
</template>
