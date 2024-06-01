import { h } from 'vue'
import { Button } from 'ant-design-vue'

export function createEditorButtonProp() {
  const p = h('p', 'h11i')
  return h(Button, { type: 'primary' }, () => [p])
}
