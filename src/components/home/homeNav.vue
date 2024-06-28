<template>
  <div class="contents">
    <a-menu
      class="text-gray-400 bg-slate-800 h-screen overflow-x-auto"
      :class="!state.collapsed ? 'w-48 min-w-48' : 'max-w-12'"
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      :inline-collapsed="state.collapsed"
      :items="items"
      @click="toPage($event)"
    ></a-menu>
  </div>
</template>
<script lang="ts" setup>
import { reactive, watch, h, onMounted } from 'vue'
import { MailOutlined, DesktopOutlined } from '@ant-design/icons-vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

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

// watch(
//   () => route.path,
//   (newPath, oldPath) => {
//     state.selectedKeys = [newPath.slice(1)]
//   }
// )
const toggleCollapsed = () => {
  state.collapsed = !state.collapsed
  state.openKeys = state.collapsed ? [] : state.preOpenKeys
}

const toPage = (e: any) => {
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
</style>
