import { h, ref } from 'vue'
import { createEditorButtonProp, createEditorInputProp } from '@/components/microMain/editorProps'

const editorProps = ref({
  inputValue: {
    defaultValue: '按钮',
    addonBefore: '按钮文字'
  }
})

const componentsProps = ref({
  text: '按钮2'
})

export const editorPropsData = () => componentsProps

export default {
  setup() {
    return () => [h('div', [h('div', createEditorInputProp(editorProps.value.inputValue))])]
  }
}
