<template>
  <div>
    <a-modal
      class="ant-modal-content-dark"
      v-model:open="open"
      title="构建uniapp代码"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      ok-text="下载"
      cancel-text="取消"
      :ok-button-props="{ disabled: progress != 100 && filename }"
    >
      <a-radio-group v-model:value="value">
        <a-radio :style="radioStyle" :value="1">完整代码（推荐）</a-radio>
        <a-radio :style="radioStyle" :value="2">纯前端代码（不使用内置接口）</a-radio>
      </a-radio-group>
      <div style="margin-top: 16px">
        <a-button type="primary" @click="startBuild">开始构建</a-button>
      </div>
      <a-progress :percent="progress" status="active" />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { Ref } from 'vue'
// import io from 'socket.io-client'
import type { JsonListData } from '@/api/microMain/model/microModel'
import { buildCodeApi, downbuildCodeApi } from '@/api/buildCode/buildCode'
import { DownloadBlob } from '@/utils/public/downDocument'

// a-modal
// const modalText = ref<string>('Content of the modal')
const open = ref<boolean>(false)
const confirmLoading = ref<boolean>(false)
const buildList: Ref<JsonListData | null> = ref(null)
const filename = ref<string>('')

const progress = ref(0)
const socket = new WebSocket(`ws://${import.meta.env.VITE_APP_API_WS_URL}/ws/build_uniapp_file/`)
socket.onmessage = (event) => {
  progress.value = JSON.parse(event.data).progress
}
const currentPageId = ref()

const showModal = (currentPageList: JsonListData | null) => {
  if (currentPageList?.tabbars.isUseTabbar) {
    console.log(currentPageList, 'currentPageList.tabbars.isUseTabbar')
    currentPageId.value = currentPageList?.tabbars.tabbars.tabbars[0].select
  } else {
    currentPageId.value = currentPageList?.id
  }
  buildList.value = currentPageList
  open.value = true
  socket.addEventListener('open', (event) => {
    console.log('WebSocket 连接已打开：', event)
  })
}

const handleOk = async () => {
  const responseBlob = await downbuildCodeApi({ filename: filename.value })
  if (!responseBlob) return
  DownloadBlob(responseBlob, filename.value)
  confirmLoading.value = true
  setTimeout(() => {
    open.value = false
    confirmLoading.value = false
  }, 500)
}

// a-radio
const value = ref<number>(1)
const radioStyle = reactive({
  display: 'flex',
  height: '30px',
  lineHeight: '30px'
})

const startBuild = async () => {
  console.log(buildList.value, 'buildListbuildList')
  try {
    const response = await buildCodeApi(
      { id: currentPageId.value },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    // const response = await buildCodeApi(
    //   { json: JSON.stringify(buildList.value?.json) },
    //   {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   }
    // )
    // 处理响应，例如获取工作ID
    filename.value = response.name.id
    // 可以通过workId来标识特定的构建过程
    // 如果需要的话，可以将其发送到WebSocket服务器
  } catch (error) {
    console.error('API call failed:', error)
  }
}

defineExpose({ showModal })
</script>
