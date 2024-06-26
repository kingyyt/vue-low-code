<script setup lang="ts">
import { onMounted, ref, nextTick, shallowRef, watch, reactive } from 'vue'
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
      currentEditComponent.value.props = newValue.formData.model
      sendListToParent()
    }
  },
  {
    deep: true
  }
)
// 表单
interface FormState {
  btnText: string
}

const formState = reactive<FormState>({
  btnText: ''
})
const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

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
  <div class="w-80 min-w-80 h-full shadow-md p-2">
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
        <a-form
          :model="formState"
          name="basic"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <component :is="editorPropsDataComponent" :propsData="currentEditComponent?.props" />
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
