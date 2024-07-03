<script setup lang="ts">
import { onMounted, ref, shallowRef, nextTick, computed, watch } from 'vue'
import type { DefineComponent } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import type { list } from '@/components/microMain/editorPropsInterface'
import { useMainListStore } from '@/stores/modules/microPage'
import type { FormState } from '@/api/microMain/model/microModel'

const tabbars = import.meta.glob(`@/packages/tabbar/index.vue`)
// 获取tabbar组件
const tabbarComponent = shallowRef<any>({})
const tabbarList = ref<list>({ name: 'tabbar', id: 'tabbar' })
const tabbarComponentRef = ref<any>()
const setTabbarRef = (el: any) => {
  tabbarComponentRef.value = el
  tabbarList.value.props = tabbarComponentRef.value?.editorPropsData
}
const tabbarComponents = async () => {
  const module = shallowRef()
  for (const path in tabbars) {
    module.value = await tabbars[path]()
    tabbarComponent.value = module.value.default
  }
  if (tabbarComponent.value && !Object.prototype.hasOwnProperty.call(tabbarList.value, 'comName')) {
    tabbarList.value.comName = shallowRef(tabbarComponent.value) || {}
  }
}

interface BaseComponent extends DefineComponent {
  name: string
  id: string
}

const list2 = ref<list[]>([])
let components = shallowRef<BaseComponent[]>([])
const componentModules = import.meta.glob(`@/packages/*/*/index.vue`)

// 父组件数据处理
const props = defineProps<{
  mainList: any
}>()
const jsonToList = (e: any) => {
  list2.value = e
  if (!e.length) return
  onSort({ newIndex: 0 })
}

// 处理后的json数据 发送到父组件
const sendListToParent = (editorPropsData?: any) => {
  emit('send-list', list2.value, currentComponentId.value, editorPropsData)
}

const emit = defineEmits(['send-list', 'call-validate-fields', 'receive-content-page-setting-data'])

// 获取所有组件
const importComponents = async () => {
  const module = shallowRef<{ default: BaseComponent }>()
  for (const path in componentModules) {
    module.value = (await componentModules[path]()) as { default: BaseComponent }
    components.value.push(module.value.default)
  }
}
// 遍历获取对应组件
const componentRef = ref<any>([])
const setComponentRef = (index: number) => (el: any) => {
  if (componentRef.value) {
    componentRef.value[index] = el
  }
}
const jsonComponents = async (id: string) => {
  list2.value.forEach((i, index) => {
    if (!Object.prototype.hasOwnProperty.call(i, 'comName')) {
      components.value.forEach(async (j) => {
        if (i.id.split('-')[0] == j.id) {
          i.comName = shallowRef({ ...j, comId: id })
          await nextTick()
          if (componentRef.value && !Object.prototype.hasOwnProperty.call(i, 'props')) {
            // 若存在model 说明已经设置过属性 直接赋值 否则创建新的数据
            const prop = ref(componentRef.value[index].editorPropsData)
            i.props = prop.value
            if (Object.prototype.hasOwnProperty.call(i, 'model') && i.props) {
              i.props.formData.model = i.model
            }
          }
        }
      })
    }
  })
  await nextTick()

  currentComponentId.value = id

  sendListToParent(list2.value.find((item) => item.id === id)?.comName?.dataComponents || null)
}
// 为list2 添加唯一id
const onSort = (e?: any) => {
  list2.value.map((item) => {
    if (!item.id.includes('-')) {
      item.id = item.id.split('-')[0]
      item.id = item.id + `-${list2.value.length}`
    }
  })
  jsonComponents(list2.value[e.newIndex].id ? list2.value[e.newIndex].id : list2.value[0].id)
}

// 点击组件
const currentComponentId = ref('')
const getEditor = (component: string) => {
  list2.value = props.mainList
  currentComponentId.value = component
  sendListToParent(
    list2.value.find((item) => item.id === component)?.comName?.dataComponents || null
  )
}
// 监听是否进行编辑组件校验
// 编辑组件校验
const storeMainList = useMainListStore()
const mainEditStatus = computed(() => storeMainList.update)
const isHideOverlay = ref(false) //  是否隐藏遮罩
watch(
  mainEditStatus,
  async (newVal) => {
    if (newVal == 7) {
      validateFields(0)
      isHideOverlay.value = true
    }
    if (newVal == 8) {
      isHideOverlay.value = false
    }
  },
  {
    deep: true
  }
)
// 触发校验
const validateFields = (index: number) => {
  if (!list2.value.length) {
    storeMainList.update = 8
    return
  }
  getEditor(list2.value[index].id)
  emit('call-validate-fields', index, list2.value.length)
  if (index == list2.value.length - 1) {
    isHideOverlay.value = false
  }
}
// 编辑器页面设置
const pageSettingData = ref<FormState>()
// 获取页面设置数据
const sendPageSettingData = async (data: FormState) => {
  pageSettingData.value = data
  if (data.isUseTabbar) {
    await nextTick()
    if (tabbarList.value.props) {
      tabbarList.value.props.formData.model = data.tabbars
    }
    // pageSettingData.value.tabbars = tabbarList.value.props?.formData.model
    emit('receive-content-page-setting-data', pageSettingData.value)
  }
}
//
const switchTabbar = (e: number) => {
  if (pageSettingData.value) {
    pageSettingData.value.tabbars.active = e
    sendPageSettingData(pageSettingData.value)
  }
}
// 初始化
const init = () => {
  importComponents()
  tabbarComponents()
}
onMounted(async () => {
  init()
})

defineExpose({ jsonToList, validateFields, sendPageSettingData, switchTabbar })
</script>

<template>
  <div class="h-full w-full min-w-96 checkered stripes flex justify-center items-center">
    <div
      class="flex flex-col content-center bg-white dark:bg-slate-50 rounded drop-shadow-lg"
      style="height: 700px"
    >
      <VueDraggable
        @sort="onSort"
        v-model="list2"
        :animation="150"
        group="people"
        ghostClass="ghost"
        class="flex flex-col w-80 max-h-350px m-auto rounded overflow-auto shadow-md"
        style="height: 700px"
      >
        <div class="container" v-for="(component, path) in list2" :key="path">
          <div
            v-if="!isHideOverlay"
            class="overlay"
            :class="currentComponentId === component.id ? 'active' : ''"
            @click="getEditor(component.id)"
          ></div>
          <component
            :ref="setComponentRef(path)"
            :props="component.props?.formData.model"
            class="content"
            :is="component.comName"
          />
        </div>
      </VueDraggable>
      <component
        v-if="pageSettingData?.isUseTabbar"
        :ref="setTabbarRef"
        :is="tabbarList.comName"
        :props="tabbarList.props ? tabbarList.props?.formData.model : {}"
        @clickItem="switchTabbar"
      ></component>
    </div>
  </div>
</template>

<style lang="less">
.stripes {
  height: 100%;
  width: 100%;
  float: left;
  background-size: 30px 30px; /* 控制条纹的大小 */
}
.checkered {
  background-image: linear-gradient(45deg, #f7f7f7 25%, transparent 25%, transparent),
    linear-gradient(-45deg, #f7f7f7 25%, transparent 25%, transparent),
    linear-gradient(45deg, transparent 75%, #f7f7f7 75%),
    linear-gradient(-45deg, transparent 75%, #f7f7f7 75%);
}
// rgb(75 85 99

.dark .checkered {
  background-image: linear-gradient(45deg, rgb(75, 85, 99) 25%, transparent 25%, transparent),
    linear-gradient(-45deg, rgb(75, 85, 99) 25%, transparent 25%, transparent),
    linear-gradient(45deg, transparent 75%, rgb(75, 85, 99) 75%),
    linear-gradient(-45deg, transparent 75%, rgb(75, 85, 99) 75%);
}
.container {
  position: relative;
  .content {
    position: relative;
    z-index: 1;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10; /* 将遮罩置于内容之上 */
  }
  .active {
    background-color: rgba(64, 158, 255, 0.5);
  }
}
.van-tabbar {
  position: relative;
}
</style>
