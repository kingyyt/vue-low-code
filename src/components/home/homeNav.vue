<template>
  <div>
    <div v-if="!state.collapsed" @click="toggleCollapsed" class="mask sm:mask-pc"></div>
    <div class="ms:home-nav">
      <a-menu
        class="text-gray-400 bg-slate-800 h-screen overflow-x-auto"
        :class="!state.collapsed ? 'w-48 min-w-72  sm:min-w-48' : 'w-0 sm:max-w-12'"
        v-model:openKeys="state.openKeys"
        v-model:selectedKeys="state.selectedKeys"
        mode="inline"
        :inline-collapsed="state.collapsed"
        :items="items"
        @click="toPage($event)"
      ></a-menu>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, watch, h, onMounted, computed } from 'vue'
import { MailOutlined, DesktopOutlined } from '@ant-design/icons-vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const screenWidth = computed(() => {
  return window.innerWidth
})

const state = reactive({
  collapsed: false,
  selectedKeys: [''],
  openKeys: [''],
  preOpenKeys: ['']
})

const items = reactive([
  {
    key: 'subMenu',
    icon: () => h(DesktopOutlined),
    label: '工作台',
    title: '工作台'
  },
  {
    key: 'sub2',
    icon: () => h(MailOutlined),
    label: '微页面',
    title: '微页面',
    children: [
      {
        key: 'microMain',
        label: '页面设计',
        title: '页面设计'
      },
      {
        key: 'releasePage',
        label: '页面发布',
        title: '页面发布'
      }
    ]
  }
])
watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal
  }
)
// 初始化路由
const init = () => {
  if (screenWidth.value < 500) {
    state.collapsed = true
  }
  state.selectedKeys = [route.path.slice(1)]
  const openKeys = items.find(
    (item) => item.children && item.children.some((child) => child.key === state.selectedKeys[0])
  )

  if (openKeys) {
    // console.log(openKeys)
    state.openKeys = [openKeys.key]
  }
}

onMounted(async () => {
  init()
})

const toggleCollapsed = () => {
  state.collapsed = !state.collapsed
  state.openKeys = state.collapsed ? [] : state.preOpenKeys
}

const toPage = (e: any) => {
  if (screenWidth.value < 500) {
    state.collapsed = true
  }
  router.push(e.key)
}

defineExpose({
  toggleCollapsed
})
</script>
<style lang="less">
.ant-menu-item-selected {
  @apply bg-gray-400;
}

.ant-menu-light
  .ant-menu-submenu-title:hover:not(.ant-menu-item-selected):not(.ant-menu-submenu-selected) {
  @apply text-gray-300;
}
.ant-menu-light .ant-menu-item:hover:not(.ant-menu-item-selected):not(.ant-menu-submenu-selected) {
  @apply text-gray-300;
}
.ant-menu-light .ant-menu-item-selected {
  @apply bg-gray-300;
}

::-webkit-scrollbar {
  /*滚动条整体样式*/
  @apply h-1 /*高宽分别对应横竖滚动条的尺寸*/;
  width: 0.25rem;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  @apply rounded-xl bg-slate-600;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  @apply rounded-xl bg-gray-500;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
}
</style>
