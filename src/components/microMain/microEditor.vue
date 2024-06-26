<script setup lang="ts">
import { onMounted, ref, nextTick, shallowRef, watch } from 'vue'
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue'
import type { list } from '@/components/microMain/editorPropsInterface'
import pageSetting from '@/components/microMain/child/pageSetting.vue'

const activeKey = ref('1')

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
    if (currentEditComponent.value && newValue) {
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

// 编辑组件校验

const componentRefs = ref<any>([])
const setComponentRef = () => (el: any) => {
  if (el) {
    componentRefs.value.push(el)
    console.log(el.$refs)
    console.log(el.$refs.value)
    console.log(Object.keys(el.$refs))
  }
}

const callValidateFields = () => {
  componentRefs.value.forEach((componentRef: any) => {
    componentRef.$refs['fff']
      .validateFields()
      .then(() => {
        console.log('success')
      })
      .catch((error: any) => {
        console.error('验证失败:', error)
      })
  })
}

defineExpose({ editorPropsComPonent })
</script>

<template>
  <div class="w-80 min-w-80 h-full shadow-md p-2">
    <a-button @click="callValidateFields()"></a-button>
    <a-tabs v-model:activeKey="activeKey" class="pl-2 pb-2 dark:text-gray-400">
      <a-tab-pane key="1">
        <template #tab>
          <span>
            <appstore-outlined />
            页面设置
          </span>
        </template>
        <pageSetting />
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #tab>
          <span>
            <setting-outlined />
            编辑组件
          </span>
        </template>
        <component
          :ref="setComponentRef()"
          :is="editorPropsDataComponent"
          :propsData="currentEditComponent?.props"
        />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
