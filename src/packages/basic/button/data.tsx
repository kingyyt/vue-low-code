import { h, defineComponent } from 'vue'
import { createEditorButtonProp, createEditorInputProp } from '@/components/microMain/editorProps'

export const editComponents = defineComponent({
  setup() {},
  render() {
    // return h('div', [h('div', createEditorButtonProp()), h('div', createEditorInputProp())])
    return h('div', [h('div', createEditorInputProp())])
  }
})
