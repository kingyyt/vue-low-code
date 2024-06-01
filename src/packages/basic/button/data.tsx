import { h } from 'vue'
import { createEditorButtonProp } from '@/components/microMain/editorProps'

export function editComponents() {
  return h('div', createEditorButtonProp())
}
