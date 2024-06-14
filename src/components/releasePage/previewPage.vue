<script setup lang="ts">
import { onMounted, shallowRef, ref, nextTick } from 'vue'
import WXheader from './preview/WXheader.vue'
import H5header from './preview/H5header.vue'
import type { DefineComponent } from 'vue'

// 获取所有组件
interface BaseComponent extends DefineComponent {
  name: string
  id: string
}
let components = shallowRef<BaseComponent[]>([])
const componentModules = import.meta.glob(`@/packages/*/*/index.vue`)

const importComponents = async () => {
  const module = shallowRef<{ default: BaseComponent }>()
  for (const path in componentModules) {
    module.value = (await componentModules[path]()) as { default: BaseComponent }
    components.value.push(module.value.default)
  }
}
// 遍历获取对应组件
const componentRef = ref<any>([])
const setComponentRef = (index: number) => (el: any) => {
  if (componentRef.value) {
    componentRef.value[index] = el
  }
}

const jsonComponents = async () => {
  props.releaseNavData.currentPage.json.forEach((i: any, index: any) => {
    components.value.forEach(async (j) => {
      if (i.id.split('-')[0] == j.id) {
        i.comName = shallowRef({ ...j })
        await nextTick()
        if (componentRef.value && !Object.prototype.hasOwnProperty.call(i, 'props')) {
          const prop = ref(componentRef.value[index].editorPropsData)
          i.props = prop.value
        }
      }
    })
  })
}

const props = defineProps<{
  releaseNavData: any
}>()

defineExpose({ jsonComponents })
// 初始化
const init = () => {
  importComponents()
}
onMounted(async () => {
  init()
})
</script>

<template>
  <div class="flex items-center drop-shadow-xl" style="height: calc(100vh - 3rem)">
    <div class="container rounded-lg overflow-hidden w-80 bg-white" style="height: 700px">
      <div class="header">
        <H5header v-if="props.releaseNavData && props.releaseNavData.proType == 'h5'" />
        <WXheader v-if="props.releaseNavData && props.releaseNavData.proType == 'WX'" />
      </div>
      <div class="content overflow-auto" style="height: 700px">
        <div
          v-for="(component, path) in props.releaseNavData && props.releaseNavData.currentPage
            ? props.releaseNavData.currentPage.json
            : []"
          :key="path"
        >
          <component
            :ref="setComponentRef(path)"
            :props="component.props"
            :is="component.comName"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less"></style>
