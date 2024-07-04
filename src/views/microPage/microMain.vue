<template>
  <div class="flex justify-between dark:text-gray-100" style="height: calc(100vh - 3rem)">
    <!-- <a-button @click="callValidateFields"></a-button> -->
    <microAside />
    <microContainer
      ref="microContainerRef"
      :mainList="mainList"
      @send-list="handleContainerListReceived"
      @call-validate-fields="callValidateFields"
      @receiveContentPageSettingData="receiveContentPageSettingData"
    />
    <microEditor
      ref="microEditorRef"
      :mainList="mainList"
      @send-list="handleEditListReceived"
      @next-validate-fields="nextValidateFields"
      @send-page-setting-data="sendPageSettingData"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import microAside from '@/components/microMain/microAside.vue'
import microContainer from '@/components/microMain/microContainer.vue'
import microEditor from '@/components/microMain/microEditor.vue'
import { useMainListStore } from '@/stores/modules/microPage'
import type { FormState } from '@/api/microMain/model/microModel'

const store = useMainListStore()

const init = () => {
  store.removeMainList()
  store.removeName()
}
onMounted(async () => {
  init()
})

const mainList = ref<any[]>([])
const JSONS = ref<any[]>([])
// 监听列表数据变化
const mainStatus = computed(() => store.update)
watch(
  mainStatus,
  (newVal, oldVal) => {
    if (store.update == 0) {
      return
    } else if (store.update == 1) {
      JSONS.value = store.mainList
      callContainerChildMethod()
      sendPageSettingData(store.pageSetting as FormState)
      receiveContentPageSettingData(store.pageSetting as FormState)
      // microContainerRef.value?.sendPageSettingData(store.pageSetting as FormState)
    } else if (store.update == 2) {
      store.setMainList(mainList.value)
    } else if (store.update == 3) {
      mainList.value = []
      JSONS.value = []
      callEditChildMethod()
      callContainerChildMethod()
      sendPageSettingData(store.pageSetting as FormState)
      receiveContentPageSettingData(store.pageSetting as FormState)
    }
  },
  {
    deep: true
  }
)

// 调用内容组件数据处理 《json参数生成列表方法》
const microContainerRef = ref<InstanceType<typeof microContainer> | null>(null)
const callContainerChildMethod = () => {
  if (microContainerRef.value) {
    microContainerRef.value.jsonToList(JSONS.value)
  }
}
// 接受内容参数
const handleContainerListReceived = (
  list: any,
  currentComponentId?: string,
  editorPropsData?: any
) => {
  mainList.value = list
  callEditChildMethod(currentComponentId, editorPropsData)
  // console.log(mainList.value)
}
// 调用编辑组件 传递json参数
const microEditorRef = ref<InstanceType<typeof microEditor> | null>(null)

const callEditChildMethod = (currentComponentId?: string, editorPropsData?: any) => {
  if (microEditorRef.value) {
    microEditorRef.value.editorPropsComPonent(currentComponentId, editorPropsData)
  }
}

// 接受编辑组件参数
const handleEditListReceived = (list: any) => {
  mainList.value = list
}
// 调用编辑组件校验方法
const callValidateFields = (index: number, length: number, active?: number) => {
  microEditorRef.value?.callValidateFields(index, length, active)
}
// 若校验成功 回调下一个校验方法
const nextValidateFields = (index: number) => {
  microContainerRef.value?.validateFields(index)
}
// 编辑器页面设置
const pageSettingData = ref<FormState>()
// 获取页面设置数据
const sendPageSettingData = (data: FormState) => {
  pageSettingData.value = data
  microContainerRef.value?.sendPageSettingData(data)
  store.setPageSetting(data)
}
// 接收内容组件页面设置数据
const receiveContentPageSettingData = (data: FormState) => {
  pageSettingData.value = data
  microEditorRef.value?.reactiveMainPageSettingData(data)
}
</script>
