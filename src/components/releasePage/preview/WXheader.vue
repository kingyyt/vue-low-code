<script setup lang="ts">
import { onMounted } from 'vue'

// 初始化
const init = () => {}
onMounted(async () => {
  init()
})
</script>

<template>
  <div>
    <div class="wx-container w-80 h-16 bg-white relative">
      <div class="title text-lg text-center font-weight pt-4">标题</div>
      <div class="btn flex items-center absolute top-4 right-2 rounded-full border border-gray-300">
        <div class="close flex items-center justify-center">
          <div class="r-sm"></div>
          <div class="r-lg"></div>
          <div class="r-sm"></div>
        </div>
        <div class="col-line"></div>
        <div class="more">
          <div class="relative">
            <div class="c-lg">
              <div class="c-sm"></div>
            </div>
          </div>
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
      padding: 4px;
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
    .col-line {
      margin: 0 2px;
      width: 1px;
      height: 20px;
      background-color: #bcbcbc;
    }
    .more {
      padding: 4px;
      .c-lg {
        position: relative;
        padding: 5px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid #000;
      }
      .c-sm {
        position: absolute;
        top: 3px;
        left: 3px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #000;
      }
    }
  }
}
</style>
