import { h } from 'vue'
import { Button, Input } from 'ant-design-vue'
import type { inputComponentProps } from '@/components/microMain/editorPropsInterface'

// 按钮
export function createEditorButtonProp() {
  const p = h('p', '按钮')
  return h(Button, { type: 'primary' }, () => [p])
}

// 输入框
export function createEditorInputProp(inputValue: inputComponentProps) {
  return h(Input, {
    defaultValue: inputValue.defaultValue,
    addonBefore: inputValue.addonBefore,
    placeholder: inputValue.placeholder ? inputValue.placeholder : '请输入',
    style: {
      marginTop: '10px'
    }
  })
}
