import { h, defineComponent } from 'vue'
import { createEditorButtonProp, createEditorInputProp } from '@/components/microMain/editorProps'

export const editComponents = defineComponent({
  script: {
    lang: 'ts'
  },
  data() {
    return {
      inputValue: {
        defaultValue: '按钮',
        addonBefore: '按钮文字'
      }
    }
  },
  render() {
    return h('div', [h('div', createEditorInputProp(this.inputValue))])
  }
})
