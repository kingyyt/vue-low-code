<script setup lang="ts">
import { onMounted } from 'vue'
import { darkMode, lightMode } from '@/utils/public/dark'
import { ref } from 'vue'
import { AlertFilled, CloseOutlined } from '@ant-design/icons-vue'
import loginFormLogin from '@/components/login/loginFormLogin.vue'
import loginFormRegister from '@/components/login/loginFormRegister.vue'

// 注册 登录
const showLoginRegister = ref<boolean>(true)

const toggleLoginRegister = () => {
  showLoginRegister.value = !showLoginRegister.value
}

// 夜间模式开关
const darkChecked = ref<boolean>(true)
const switchDark = () => {
  if (darkChecked.value) {
    lightMode()
  } else {
    darkMode()
  }
}

// 初始化
const init = () => {
  switchDark()
}
onMounted(async () => {
  init()
})
</script>

<template>
  <div class="bg-gray-700 h-screen">
    <div class="flex justify-end pt-4 mt-0 m-4 ant-switch-handle:">
      <a-space direction="vertical">
        <a-switch v-model:checked="darkChecked" @change="switchDark">
          <template #checkedChildren><AlertFilled /></template>
          <template #unCheckedChildren><close-outlined /></template>
        </a-switch>
      </a-space>
    </div>
    <div class="flex justify-center items-center dark:bg-gray-700 mt-20">
      <div
        class="flex flex-col justify-items-center p-12 min-w-80 md:min-w-96 md:p-8 shadow-gray-400 bg-white dark:bg-gray-700 rounded-lg shadow-md dark:shadow-gray-800"
      >
        <div v-if="showLoginRegister">
          <loginFormLogin @register-btn="toggleLoginRegister" />
        </div>
        <div v-if="!showLoginRegister">
          <loginFormRegister @register-btn="toggleLoginRegister" />
        </div>
      </div>
    </div>

    <!-- <div class="m-4 text-center">
      <ul class="">
        <li>
          <a-typography-link href="https://beian.miit.gov.cn/">
            备案号：<span class="dark:text-gray-400">粤ICP备2024267556号-2</span>
          </a-typography-link>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<style lang="less">
.dark .ant-input {
  @apply bg-gray-700 text-gray-400;
}
.dark .ant-checkbox-inner {
  @apply bg-gray-700;
}
</style>
