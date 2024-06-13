<script setup lang="ts">
import { onMounted } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'

// 初始化
const init = () => {}
onMounted(async () => {
  init()
})
</script>

<template>
  <div>
    <div class="wx-container w-80 h-16 bg-white relative">
      <div class="title text-lg text-center font-weight pt-4">h5标题</div>
      <div class="btn flex items-center absolute top-4 right-2">
        <div class="close flex items-center justify-center">
          <div class="r-sm"></div>
          <div class="r-sm"></div>
          <div class="r-sm"></div>
        </div>
      </div>
      <div class="btn flex items-center absolute top-4 left-2">
        <div class="close-2 flex items-center justify-center">
          <CloseOutlined />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.wx-container {
  .btn {
    margin: 4px;
    padding: 0 4px;
    .close {
      padding: 6px;
      .r-sm {
        width: 4px;
        height: 4px;
        background-color: #000;
        margin: 0 1px;
        border-radius: 50%;
      }
      .r-lg {
        width: 6px;
        height: 6px;
        background-color: #000;
        margin: 0 1px;
        border-radius: 50%;
      }
    }
  }
}
</style>
