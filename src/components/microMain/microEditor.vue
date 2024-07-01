<script setup lang="ts">
import { onMounted, ref, nextTick, shallowRef, watch } from 'vue'
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue'
import type { list } from '@/components/microMain/editorPropsInterface'
import pageSetting from '@/components/microMain/child/pageSetting.vue'
import { useMainListStore } from '@/stores/modules/microPage'
import type { FormState } from '@/api/microMain/model/microModel'

const activeKey = ref('1')
const storeMainList = useMainListStore()

const sendActiveKey = (e: any) => {
  activeKey.value = e
}
// 初始化
const init = () => {}
onMounted(async () => {
  init()
})

const list2 = ref<list[]>([])
const currentEditComponent = ref<list | null>(null)
let editorPropsDataComponent = shallowRef<any>(null)

// 处理后的json数据 发送到父组件
const emit = defineEmits(['send-list', 'next-validate-fields'])
const sendListToParent = () => {
  emit('send-list', list2.value)
}
// 监听 props 变化
watch(
  () => currentEditComponent.value?.props,
  (newValue) => {
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
const componentRefs = ref<any>()
const setComponentRef = (el: any) => {
  if (el && el.nodeName !== '#comment') {
    componentRefs.value = el
  }
}

const callValidateFields = (index?: number, length?: number) => {
  setTimeout(() => {
    componentRefs.value.$refs['FormRef']
      .validateFields()
      .then(() => {
        if ((index || index == 0) && length && index + 1 < length) {
          emit('next-validate-fields', (index += 1))
        } else if (length && index == length - 1) {
          storeMainList.update = 8
        }
      })
      .catch(async (error: any) => {
        if (activeKey.value != '2') {
          sendActiveKey('2')
          await nextTick()
          callValidateFields()
        }
        sendActiveKey('2')
        console.error('验证失败:', error)
      })
  })
}
const pageSettingData = ref<FormState>()
const receivePageSettingData = (data: FormState) => {
  pageSettingData.value = data
  console.log(pageSettingData.value)
  console.log(pageSettingData.value)
  console.log(pageSettingData.value)
}

defineExpose({ editorPropsComPonent, callValidateFields })
</script>

<template>
  <div class="w-80 min-w-80 h-full shadow-md p-2">
    <!-- <a-button @click="callValidateFields"></a-button> -->
    <a-tabs v-model:activeKey="activeKey" class="pl-2 pb-2 dark:text-gray-400">
      <a-tab-pane :forceRender="true" key="1">
        <template #tab>
          <span>
            <appstore-outlined />
            页面设置
          </span>
        </template>
        <pageSetting
          @send-activeKey="sendActiveKey"
          @receivePageSettingData="receivePageSettingData"
        />
      </a-tab-pane>
      <a-tab-pane key="2" :forceRender="true">
        <template #tab>
          <span>
            <setting-outlined />
            编辑组件
          </span>
        </template>
        <component
          :ref="(el: any) => setComponentRef(el)"
          :is="editorPropsDataComponent"
          :propsData="currentEditComponent?.props"
        />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
