// 组件注册规则

export type VisualEditorComponent = {
  // 组件名称
  name: string
  // 组件唯一id
  id: string
  // 组件样式
  styles?: string
  // 组件属性
  props?: Record<string, VisualEditorProps>
}
export type VisualEditorProps = {
  type: VisualEditorPropsType
  // 标签名称
  label: string
  // 表单默认值
  defaultValue?: any
}
export enum VisualEditorPropsType {
  /** 输入框 */
  input = 'input',
  /** 数字输入框 */
  inputNumber = 'InputNumber',
  /** 颜色选择器 */
  color = 'color',
  /** 下拉选择器 */
  select = 'select',
  /** 表格 */
  table = 'table',
  /** 开关 */
  switch = 'switch',
  /** 模型绑定选择器 */
  modelBind = 'ModelBind',
  /** 可拖拽项 */
  crossSortable = 'CrossSortable'
}
