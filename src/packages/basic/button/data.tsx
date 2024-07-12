import { h, ref } from 'vue'
import { createEditorInputProp } from '@/components/microMain/editorProps'
import type { inputComponentProps } from '@/components/microMain/editorPropsInterface'
import { Form } from 'ant-design-vue'

// 控制的组件数据
function componentsProps() {
  return {
    formData: ref({
      model: {
        btnText: '按钮',
        color: 'red',
        textColor: 'white'
      },
      data: [
        ref<inputComponentProps>({
          addonBefore: '按钮文字',
          placeholder: '请输入内容',
          name: 'btnText',
          rules: [{ required: true, message: '请输入按钮文字!' }]
        }),
        ref<inputComponentProps>({
          addonBefore: '按钮颜色',
          placeholder: '请输入颜色',
          name: 'color',
          rules: [{ required: true, message: '请输入按钮颜色' }],
          color: '#333'
        }),
        ref<inputComponentProps>({
          addonBefore: '文字颜色',
          placeholder: '请输入颜色',
          name: 'textColor',
          rules: [{ required: true, message: '请输入文字颜色' }],
          color: 'white'
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
          ref: 'FormRef',
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
          }),
          h(createEditorInputProp(), {
            propsData: props.propsData.formData.data[2],
            modelName: Object.keys(props.propsData.formData.model)[2],
            model: props.propsData.formData.model
          })
        ]
      )
  }
}
