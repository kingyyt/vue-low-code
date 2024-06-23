<template>
  <div>
    <a-modal
      v-model:open="open"
      title="构建uniapp代码"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      ok-text="下载"
      cancel-text="取消"
      :ok-button-props="{ disabled: progress != 100 }"
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
import io from 'socket.io-client'
import type { JsonListData } from '@/api/microMain/model/microModel'
import { buildCodeApi, downbuildCodeApi } from '@/api/buildCode/buildCode'

// a-modal
const modalText = ref<string>('Content of the modal')
const open = ref<boolean>(false)
const confirmLoading = ref<boolean>(false)
const buildList: Ref<JsonListData | null> = ref(null)

const showModal = (currentPageList: JsonListData | null) => {
  buildList.value = currentPageList
  console.log(currentPageList)
  console.log(currentPageList)
  open.value = true
}

const handleOk = () => {
  modalText.value = 'The modal will be closed after two seconds'
  confirmLoading.value = true
  setTimeout(() => {
    open.value = false
    confirmLoading.value = false
  }, 2000)
}

// a-radio
const value = ref<number>(1)
const radioStyle = reactive({
  display: 'flex',
  height: '30px',
  lineHeight: '30px'
})

const progress = ref(0)
const socket = new WebSocket('ws://localhost:8000/ws/build_uniapp_file/')
socket.addEventListener('open', (event) => {
  console.log('WebSocket 连接已打开：', event)
  // 在这里可以发送初始消息或者进行其他操作
})
socket.onmessage = (event) => {
  progress.value = JSON.parse(event.data).progress
}

const startBuild = async () => {
  socket.send('123')
  try {
    const response = await buildCodeApi(
      { json: JSON.stringify(buildList.value?.json) },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    // 处理响应，例如获取工作ID
    const workId = response
    console.log(workId)
    // 可以通过workId来标识特定的构建过程
    // 如果需要的话，可以将其发送到WebSocket服务器
  } catch (error) {
    console.error('API call failed:', error)
  }
}

defineExpose({ showModal })
</script>
