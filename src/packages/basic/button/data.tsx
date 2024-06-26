import { h, ref } from 'vue'
import { createEditorButtonProp, createEditorInputProp } from '@/components/microMain/editorProps'
import type { inputComponentProps } from '@/components/microMain/editorPropsInterface'
import { Form } from 'ant-design-vue'

// 控制的组件数据
function componentsProps() {
  return {
    formData: ref({
      model: {
        color: '#333',
        btnText: '按钮2'
      },
      data: [
        ref<inputComponentProps>({
          addonBefore: '按钮文字',
          placeholder: '请输入内容',
          name: 'btnText',
          rules: [{ required: true, message: '请输入按钮文字!' }]
        }),
        ref<inputComponentProps>({
          addonBefore: '按钮文字1',
          placeholder: '请输入内容1',
          name: 'color',
          rules: [{ required: true, message: '请输入按钮颜色' }],
          color: '#333'
        })
      ]
    })
  }
}

export const editorPropsData = componentsProps

export default {
  props: {
    propsData: {
      type: Object,
      required: true
    }
  },
  setup(props: any) {
    return () =>
      h(
        Form,
        {
          model: props.propsData.formData.model
        },
        () => [
          h(createEditorInputProp(), {
            propsData: props.propsData.formData.data[0],
            modelName: Object.keys(props.propsData.formData.model)[0],
            model: props.propsData.formData.model
          }),
          h(createEditorInputProp(), {
            propsData: props.propsData.formData.data[1],
            modelName: Object.keys(props.propsData.formData.model)[1],
            model: props.propsData.formData.model
          })
        ]
      )
  }
}
