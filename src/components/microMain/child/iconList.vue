<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { icons } from './iconList'
interface IconList {
  name: string
  path: string
}
const iconList = ref<IconList[]>([])
iconList.value = icons
const open = ref<boolean>(false)
const showModal = () => {
  open.value = true
}
const currentIcon = ref()
const choiceIcon = (name: string) => {
  currentIcon.value = name
  sendIconNameToParent()
  open.value = false
}
const emit = defineEmits(['receive-icon'])
const sendIconNameToParent = () => {
  emit('receive-icon', currentIcon.value)
}
// 初始化
const init = () => {}
onMounted(async () => {
  init()
})

defineExpose({ showModal })
</script>

<template>
  <div>
    <a-modal class="ant-modal-content-dark" v-model:open="open" title="图标列表" :footer="false">
      <ul class="anticons-list">
        <li v-for="item in iconList" :key="item.name" @click="choiceIcon(item.name)">
          <span class="anticon anticon-step-backward">
            <a-avatar shape="square" :size="64">
              <template #icon><span class="van-icon" :class="item.path"></span></template>
            </a-avatar>
          </span>
          <span class="anticon-class">
            <span class="ant-badge css-19iuou">
              {{ item.name }}
            </span>
          </span>
        </li>
      </ul>
    </a-modal>
  </div>
</template>
<style lang="less">
.anticons-list {
  margin: 10px 0;
  overflow: hidden;
  direction: ltr;
  list-style: none;
  li {
    position: relative;
    float: left;
    width: 16.66%;
    height: 100px;
    margin: 3px 0;
    overflow: hidden;
    color: #555;
    text-align: center;
    list-style: none;
    background-color: inherit;
    border-radius: 4px;
    cursor: pointer;
    transition:
      color 0.3s ease-in-out,
      background-color 0.3s ease-in-out;
    .anticon {
      margin: 8px 0 8px;
      transition: transform 0.3s ease-in-out;
      will-change: transform;
    }
    .anticon-class {
      display: block;
      white-space: nowrap;
      text-align: center;
      transform: scale(0.83);
      .ant-badge {
        color: #9ca3af;
        transition: color 0.3s ease-in-out;
      }
    }
  }
  :hover .anticon {
    transform: scale(1.4);
  }
  ::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #fff;
    line-height: 110px;
    text-align: center;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
    content: 'Copied!';
  }
}
</style>
