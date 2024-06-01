import { h } from 'vue'
import { Button, Input } from 'ant-design-vue'

// 按钮
export function createEditorButtonProp() {
  const p = h('p', '按钮')
  return h(Button, { type: 'primary' }, () => [p])
}

// 输入框
export function createEditorInputProp() {
  return h(Input, {})
}
