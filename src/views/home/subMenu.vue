<script setup lang="ts">
import { onMounted } from 'vue'

// 初始化
const init = () => {}
onMounted(async () => {
  init()
})
</script>

<template>
  <div class="flex flex-col justify-between" style="height: calc(100vh - 64px)">
    <div class="p-4 sub-menu-page sm:flex items-center pb-32 sm:pb-0" style="min-width: 100%">
      <div>
        <a-typography>
          <a-typography-title :level="2">介绍</a-typography-title>
          <a-typography-paragraph>
            专注开发包括前端h5、pc、小程序、表单、stm32、esp32在内的所有
            <a-typography-text mark>『低码平台开发』</a-typography-text>
          </a-typography-paragraph>
          <a-typography-paragraph>
            基于
            <a-typography-text code>vue3/ts/ant-Design-vue/vant/uniapp/python</a-typography-text>
            的开发，通过模块化的解决方案，降低冗余的生产成本，
            <a-typography-text strong>获取更好的用户体验</a-typography-text>
            。
          </a-typography-paragraph>
          <a-typography-paragraph>
            <blockquote>
              通过
              <a-typography-text strong>微页面->页面设计</a-typography-text>
              生成页面
              <a-typography-text strong>微页面->页面发布</a-typography-text>
              发布生成页面
            </blockquote>
            <pre>支持私有、h5、各类小程序、及生成源码，亦可在线生成。</pre>
          </a-typography-paragraph>
          <!-- <a-typography-paragraph>
        后续将提供各类stm32、esp32等硬件开发。
      </a-typography-paragraph> -->
        </a-typography>
      </div>
      <div class="flex items-center">
        <div
          class="mt-4 sm:mt-0 rounded-lg border border-gray-300 p-6 shadow-lg sm:flex-col sm:items-center sm:justify-center sm:ml-4"
        >
          <a-qrcode
            bgColor="#fff"
            error-level="H"
            value="https://github.com/kingyyt"
            icon="http://localhost:8080/src/assets/images/avatar.jpeg"
          />

          <a-typography-paragraph class="mt-2">
            <ul class="">
              <li>
                <a-typography-link href="https://github.com/kingyyt">
                  <span class="dark:text-blue-500">github地址</span>
                </a-typography-link>
              </li>
              <li>欢迎加入</li>
              <li>yeyiteng@163.com</li>
            </ul>
          </a-typography-paragraph>
        </div>
      </div>
    </div>
    <div class="text-right m-4">
      <ul class="">
        <li>
          <a-typography-link href="https://beian.miit.gov.cn/">
            备案号：<span class="dark:text-gray-400">粤ICP备2024267556号-2</span>
          </a-typography-link>
        </li>
      </ul>
    </div>
  </div>
</template>
