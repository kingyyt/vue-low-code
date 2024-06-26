import { h, computed, toRefs } from 'vue'
import { Button, Input, FormItem } from 'ant-design-vue'
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
      },
      model: {
        type: Object,
        required: true
      },
      modelName: {
        type: String,
        required: true
      }
    },
    setup(props: any, { emit }: any) {
      const store = useLoginStore()
      const data = props.propsData.value
      return () =>
        h(
          FormItem,
          {
            name: data.name,
            rules: data.rules
          },
          () =>
            h(Input, {
              defaultValue: props.model[props.modelName],
              addonBefore: data.addonBefore,
              placeholder: data.placeholder ? data.placeholder : '请输入',
              // style: {
              //   marginTop: '10px'
              // },
              class: {
                'editor-props-input': !store.theme
              },
              onChange(e: any) {
                props.model[props.modelName] = e.target.value
              }
            })
        )
    }
  }
}
