import { h, ref } from 'vue'
import { createEditorButtonProp, createEditorInputProp } from '@/components/microMain/editorProps'

// 编辑器数据
const editorProps = ref({
  inputValue: {
    defaultValue: '按钮',
    addonBefore: '按钮文字'
  }
})
// 控制的组件数据
const componentsProps = ref({
  defaultValue: '按钮1'
})

export const editorPropsData = () => componentsProps

export default {
  props: {
    propsData: {
      type: Object,
      required: true
    }
  },
  setup(props: any) {
    return () =>
      h(createEditorInputProp(editorProps.value.inputValue), {
        propsData: props.propsData
      })
  }
}
