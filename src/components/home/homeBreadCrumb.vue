<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { darkMode, lightMode } from '@/utils/public/dark'
import {
  AlertFilled,
  CloseOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons-vue'
// import { defineEmits } from 'vue'

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
// 导航菜单收缩
const emit = defineEmits(['toggle-collapsed'])
const state = reactive({
  collapsed: false
})
const toggleCollapsed = () => {
  emit('toggle-collapsed')
}
</script>

<template>
  <div class="dark:bg-slate-800 w-full border-solid border-b-2 border-gray-100">
    <div class="flex items-center justify-between h-12">
      <a-button class="ml-4" type="primary" @click="toggleCollapsed">
        <MenuUnfoldOutlined v-if="state.collapsed" />
        <MenuFoldOutlined v-else />
      </a-button>
      <div class="flex justify-end mr-4 ant-switch-handle:">
        <a-space direction="vertical">
          <a-switch v-model:checked="darkChecked" @change="switchDark">
            <template #checkedChildren><AlertFilled /></template>
            <template #unCheckedChildren><close-outlined /></template>
          </a-switch>
        </a-space>
      </div>
    </div>
  </div>
</template>
