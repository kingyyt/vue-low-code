import { h, ref } from 'vue'
import { createEditorButtonProp, createEditorInputProp } from '@/components/microMain/editorProps'
import type { inputComponentProps } from '@/components/microMain/editorPropsInterface'

// 控制的组件数据
function componentsProps() {
  return ref<inputComponentProps>({
    defaultValue: '按钮',
    addonBefore: '按钮文字',
    placeholder: '请输入内容'
  })
}

export const editorPropsData = componentsProps

export default {
  props: {
    propsData: {
      type: Object,
      required: true
    }
  },
  setup(props: any) {
    return () =>
      h(createEditorInputProp(), {
        propsData: props.propsData
      })
  }
}
