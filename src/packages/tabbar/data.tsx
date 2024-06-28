import { h, ref } from 'vue'
import { createEditorInputProp } from '@/components/microMain/editorProps'
import type { inputComponentProps } from '@/components/microMain/editorPropsInterface'
import { Form } from 'ant-design-vue'

// 控制的组件数据
function componentsProps() {
  return {
    formData: ref({
      model: {
        active: 0,
        tabbars: [
          {
            icon: 'home-o',
            name: '首页'
          },
          {
            icon: 'search',
            name: '标签'
          },
          {
            icon: 'friends-o',
            name: '标签'
          },
          {
            icon: 'setting-o',
            name: '个人'
          }
        ]
      },
      data: [
        // ref<inputComponentProps>({
        //   addonBefore: '按钮文字',
        //   placeholder: '请输入内容',
        //   name: 'btnText',
        //   rules: [{ required: true, message: '请输入按钮文字!' }]
        // }),
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
          })
        ]
      )
  }
}
