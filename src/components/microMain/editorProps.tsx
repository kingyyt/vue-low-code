import { h, ref } from 'vue'
import { Button, Input } from 'ant-design-vue'
import { useLoginStore } from '@/stores/modules/user'
// 按钮
export function createEditorButtonProp() {
  const p = h('p', '按钮')
  return h(Button, { type: 'primary' }, () => [p])
}

// 输入框
export function createEditorInputProp() {
  return {
    props: {
      propsData: {
        type: Object,
        required: true
      }
    },
    setup(props: any) {
      const store = useLoginStore()
      return () =>
        h(Input, {
          defaultValue: props.propsData.defaultValue,
          addonBefore: props.propsData.addonBefore,
          placeholder: props.propsData.placeholder ? props.propsData.placeholder : '请输入',
          style: {
            marginTop: '10px'
          },
          class: {
            'editor-props-input': !store.theme
          },
          onChange(e: any) {
            props.propsData.defaultValue = e.target.value
          }
        })
    }
  }
}
