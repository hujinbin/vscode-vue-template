/**
 * Element Plus 组件定义数据
 * 用于代码自动联想
 */

export interface ComponentProp {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export interface ComponentEvent {
  name: string;
  description: string;
  params?: string;
}

export interface ComponentSlot {
  name: string;
  description: string;
}

export interface ElementPlusComponent {
  tag: string;
  name: string;
  description: string;
  props: ComponentProp[];
  events: ComponentEvent[];
  slots: ComponentSlot[];
  snippet: string;
}

export const elementPlusComponents: ElementPlusComponent[] = [
  {
    tag: 'el-button',
    name: 'Button 按钮',
    description: '常用的操作按钮',
    props: [
      { name: 'type', type: "'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'", description: '按钮类型', default: "'primary'" },
      { name: 'size', type: "'large' | 'default' | 'small'", description: '按钮尺寸', default: "'default'" },
      { name: 'plain', type: 'boolean', description: '是否为朴素按钮', default: 'false' },
      { name: 'round', type: 'boolean', description: '是否为圆角按钮', default: 'false' },
      { name: 'circle', type: 'boolean', description: '是否为圆形按钮', default: 'false' },
      { name: 'loading', type: 'boolean', description: '是否加载中', default: 'false' },
      { name: 'disabled', type: 'boolean', description: '是否禁用', default: 'false' },
      { name: 'icon', type: 'string | Component', description: '按钮图标' },
      { name: 'native-type', type: "'button' | 'submit' | 'reset'", description: '原生 type 属性', default: "'button'" },
    ],
    events: [
      { name: 'click', description: '按钮点击事件', params: 'MouseEvent' },
    ],
    slots: [
      { name: 'default', description: '按钮内容' },
      { name: 'icon', description: '自定义图标' },
    ],
    snippet: '<el-button type="${1|primary,success,warning,danger,info|}" $2>$3</el-button>$0',
  },
  {
    tag: 'el-input',
    name: 'Input 输入框',
    description: '通过鼠标或键盘输入内容',
    props: [
      { name: 'type', type: 'string', description: '输入框类型', default: "'text'" },
      { name: 'model-value', type: 'string | number', description: '绑定值' },
      { name: 'placeholder', type: 'string', description: '占位文本' },
      { name: 'clearable', type: 'boolean', description: '是否可清空', default: 'false' },
      { name: 'disabled', type: 'boolean', description: '是否禁用', default: 'false' },
      { name: 'size', type: "'large' | 'default' | 'small'", description: '输入框尺寸', default: "'default'" },
      { name: 'prefix-icon', type: 'string | Component', description: '前缀图标' },
      { name: 'suffix-icon', type: 'string | Component', description: '后缀图标' },
      { name: 'maxlength', type: 'number', description: '最大输入长度' },
      { name: 'show-word-limit', type: 'boolean', description: '是否显示字数统计', default: 'false' },
    ],
    events: [
      { name: 'input', description: '输入时触发', params: 'string | number' },
      { name: 'change', description: '值改变时触发', params: 'string | number' },
      { name: 'blur', description: '失焦时触发', params: 'FocusEvent' },
      { name: 'focus', description: '聚焦时触发', params: 'FocusEvent' },
      { name: 'clear', description: '清空时触发' },
    ],
    slots: [
      { name: 'prefix', description: '输入框头部内容' },
      { name: 'suffix', description: '输入框尾部内容' },
      { name: 'prepend', description: '输入框前置内容' },
      { name: 'append', description: '输入框后置内容' },
    ],
    snippet: '<el-input v-model="${1:formData}.${2:field}" placeholder="${3:请输入}" clearable$4 />$0',
  },
  {
    tag: 'el-select',
    name: 'Select 选择器',
    description: '当选项过多时，使用下拉菜单展示并选择内容',
    props: [
      { name: 'model-value', type: 'string | number | boolean | object | array', description: '绑定值' },
      { name: 'multiple', type: 'boolean', description: '是否多选', default: 'false' },
      { name: 'disabled', type: 'boolean', description: '是否禁用', default: 'false' },
      { name: 'clearable', type: 'boolean', description: '是否可清空', default: 'false' },
      { name: 'placeholder', type: 'string', description: '占位文本' },
      { name: 'filterable', type: 'boolean', description: '是否可搜索', default: 'false' },
      { name: 'remote', type: 'boolean', description: '是否为远程搜索', default: 'false' },
      { name: 'loading', type: 'boolean', description: '是否正在加载', default: 'false' },
    ],
    events: [
      { name: 'change', description: '值改变时触发', params: 'string | number | boolean | object | array' },
      { name: 'visible-change', description: '下拉框出现/隐藏时触发', params: 'boolean' },
      { name: 'remove-tag', description: '多选模式下移除tag时触发', params: 'string | number' },
      { name: 'clear', description: '可清空模式下清空时触发' },
    ],
    slots: [
      { name: 'default', description: 'Option 组件列表' },
      { name: 'prefix', description: 'Select 组件头部内容' },
    ],
    snippet: '<el-select v-model="${1:formData}.${2:field}" placeholder="${3:请选择}" clearable$4>\n\t<el-option v-for="item in ${5:options}" :key="item.value" :label="item.label" :value="item.value" />\n</el-select>$0',
  },
  {
    tag: 'el-table',
    name: 'Table 表格',
    description: '用于展示多条结构类似的数据，可对数据进行排序、筛选、对比等操作',
    props: [
      { name: 'data', type: 'array', description: '显示的数据' },
      { name: 'height', type: 'string | number', description: '表格高度' },
      { name: 'max-height', type: 'string | number', description: '表格最大高度' },
      { name: 'stripe', type: 'boolean', description: '是否为斑马纹', default: 'false' },
      { name: 'border', type: 'boolean', description: '是否带有纵向边框', default: 'false' },
      { name: 'size', type: "'large' | 'default' | 'small'", description: '表格尺寸', default: "'default'" },
      { name: 'show-header', type: 'boolean', description: '是否显示表头', default: 'true' },
      { name: 'row-key', type: 'string | Function', description: '行数据的 Key' },
      { name: 'lazy', type: 'boolean', description: '是否懒加载', default: 'false' },
    ],
    events: [
      { name: 'select', description: '勾选时触发', params: 'selection, row' },
      { name: 'select-all', description: '全选时触发', params: 'selection' },
      { name: 'selection-change', description: '选择项变化时触发', params: 'selection' },
      { name: 'sort-change', description: '排序变化时触发', params: '{ column, prop, order }' },
      { name: 'row-click', description: '行点击时触发', params: 'row, column, event' },
    ],
    slots: [
      { name: 'default', description: 'TableColumn 组件列表' },
      { name: 'append', description: '插入至表格最后一行之后的内容' },
      { name: 'empty', description: '空数据时的内容' },
    ],
    snippet: '<el-table :data="${1:tableData}" stripe border$2>\n\t<el-table-column prop="${3:prop}" label="${4:标签}" />\n$5</el-table>$0',
  },
  {
    tag: 'el-table-column',
    name: 'Table-column 表格列',
    description: '表格列配置',
    props: [
      { name: 'prop', type: 'string', description: '对应列字段名' },
      { name: 'label', type: 'string', description: '对应列标题' },
      { name: 'width', type: 'string', description: '对应列宽度' },
      { name: 'min-width', type: 'string', description: '对应列最小宽度' },
      { name: 'fixed', type: "'left' | 'right' | boolean", description: '列是否固定' },
      { name: 'sortable', type: 'boolean | \"custom\"', description: '是否可排序', default: 'false' },
      { name: 'align', type: "'left' | 'center' | 'right'", description: '对齐方式', default: "'left'" },
    ],
    events: [],
    slots: [
      { name: 'default', description: '自定义列内容', description2: 'scope: { row, column, $index }' },
      { name: 'header', description: '自定义表头内容' },
    ],
    snippet: '<el-table-column prop="${1:prop}" label="${2:标签}"$3 />$0',
  },
  {
    tag: 'el-form',
    name: 'Form 表单',
    description: '由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据',
    props: [
      { name: 'model', type: 'object', description: '表单数据对象' },
      { name: 'rules', type: 'object', description: '表单验证规则' },
      { name: 'inline', type: 'boolean', description: '行内表单模式', default: 'false' },
      { name: 'label-position', type: "'left' | 'right' | 'top'", description: '标签位置', default: "'right'" },
      { name: 'label-width', type: 'string', description: '标签宽度' },
      { name: 'size', type: "'large' | 'default' | 'small'", description: '控件尺寸' },
      { name: 'disabled', type: 'boolean', description: '是否禁用', default: 'false' },
    ],
    events: [
      { name: 'validate', description: '任一表单项被校验后触发', params: 'prop, isValid, message' },
    ],
    slots: [
      { name: 'default', description: '表单内容' },
    ],
    snippet: '<el-form ref="${1:formRef}" :model="${2:formData}" :rules="${3:rules}" label-width="${4:100px}"$5>\n\t$6\n</el-form>$0',
  },
  {
    tag: 'el-form-item',
    name: 'Form-item 表单项',
    description: '表单项组件',
    props: [
      { name: 'prop', type: 'string', description: '模型字段名' },
      { name: 'label', type: 'string', description: '标签文本' },
      { name: 'label-width', type: 'string', description: '标签宽度' },
      { name: 'required', type: 'boolean', description: '是否必填', default: 'false' },
      { name: 'rules', type: 'object | array', description: '验证规则' },
      { name: 'size', type: "'large' | 'default' | 'small'", description: '控件尺寸' },
    ],
    events: [],
    slots: [
      { name: 'default', description: '表单项内容' },
    ],
    snippet: '<el-form-item label="${1:标签}" prop="${2:prop}"$3>\n\t$4\n</el-form-item>$0',
  },
  {
    tag: 'el-dialog',
    name: 'Dialog 对话框',
    description: '在保留当前页面状态的情况下，告知用户并承载相关操作',
    props: [
      { name: 'model-value', type: 'boolean', description: '是否显示', default: 'false' },
      { name: 'title', type: 'string', description: '对话框标题' },
      { name: 'width', type: 'string', description: '对话框宽度', default: "'50%'" },
      { name: 'fullscreen', type: 'boolean', description: '是否全屏', default: 'false' },
      { name: 'draggable', type: 'boolean', description: '是否可拖拽', default: 'false' },
      { name: 'close-on-click-modal', type: 'boolean', description: '是否点击遮罩层关闭', default: 'true' },
      { name: 'destroy-on-close', type: 'boolean', description: '关闭时销毁', default: 'false' },
    ],
    events: [
      { name: 'open', description: '对话框打开时触发' },
      { name: 'opened', description: '对话框打开动画结束时触发' },
      { name: 'close', description: '对话框关闭时触发' },
      { name: 'closed', description: '对话框关闭动画结束时触发' },
    ],
    slots: [
      { name: 'default', description: '对话框内容' },
      { name: 'header', description: '对话框头部内容' },
      { name: 'footer', description: '对话框底部内容' },
    ],
    snippet: '<el-dialog v-model="${1:dialogVisible}" title="${2:对话框标题}" width="${3:30%}"$4>\n\t$5\n\t<template #footer>\n\t\t<el-button @click="${1:dialogVisible} = false">取消</el-button>\n\t\t<el-button type="primary" @click="$6">确定</el-button>\n\t</template>\n</el-dialog>$0',
  },
  {
    tag: 'el-pagination',
    name: 'Pagination 分页',
    description: '当数据量过多时，使用分页分解数据',
    props: [
      { name: 'total', type: 'number', description: '总条目数' },
      { name: 'page-size', type: 'number', description: '每页显示条目个数', default: '10' },
      { name: 'current-page', type: 'number', description: '当前页数' },
      { name: 'page-sizes', type: 'array', description: '每页显示个数选择器选项', default: '[10, 20, 30, 40]' },
      { name: 'layout', type: 'string', description: '布局', default: "'prev, pager, next, jumper, ->, total'" },
      { name: 'background', type: 'boolean', description: '是否为分页按钮添加背景色', default: 'false' },
    ],
    events: [
      { name: 'current-change', description: '当前页改变时触发', params: 'currentPage' },
      { name: 'size-change', description: '每页条数改变时触发', params: 'pageSize' },
    ],
    slots: [],
    snippet: '<el-pagination\n\t:current-page="${1:currentPage}"\n\t:page-size="${2:pageSize}"\n\t:page-sizes="[10, 20, 50, 100]"\n\t:total="${3:total}"\n\tlayout="total, sizes, prev, pager, next, jumper"\n\tbackground\n\t@size-change="${4:handleSizeChange}"\n\t@current-change="${5:handleCurrentChange}"\n/>$0',
  },
  {
    tag: 'el-tabs',
    name: 'Tabs 标签页',
    description: '分隔内容上有关联但属于不同类别的数据集合',
    props: [
      { name: 'model-value', type: 'string | number', description: '绑定值，选中选项卡的 name' },
      { name: 'type', type: "'line' | 'card' | 'border-card'", description: '风格类型', default: "'line'" },
      { name: 'closable', type: 'boolean', description: '标签是否可关闭', default: 'false' },
      { name: 'tab-position', type: "'top' | 'right' | 'bottom' | 'left'", description: '标签位置', default: "'top'" },
    ],
    events: [
      { name: 'tab-click', description: 'tab 被选中时触发', params: 'TabPaneName' },
      { name: 'tab-change', description: '激活的标签改变时触发', params: 'TabPaneName' },
      { name: 'tab-remove', description: 'tab 被移除时触发', params: 'TabPaneName' },
    ],
    slots: [
      { name: 'default', description: 'TabPane 组件列表' },
    ],
    snippet: '<el-tabs v-model="${1:activeTab}" type="${2|border-card,card,line|}"$3>\n\t<el-tab-pane label="${4:标签1}" name="${5:tab1}">$6</el-tab-pane>\n\t<el-tab-pane label="${7:标签2}" name="${8:tab2}">$9</el-tab-pane>\n</el-tabs>$0',
  },
  {
    tag: 'el-card',
    name: 'Card 卡片',
    description: '将信息聚合在卡片容器中展示',
    props: [
      { name: 'header', type: 'string', description: '卡片标题' },
      { name: 'shadow', type: "'always' | 'hover' | 'never'", description: '阴影显示时机', default: "'always'" },
      { name: 'body-style', type: 'object', description: 'body 样式', default: "{ padding: '20px' }" },
    ],
    events: [],
    slots: [
      { name: 'default', description: '卡片内容' },
      { name: 'header', description: '卡片标题内容' },
    ],
    snippet: '<el-card shadow="${1|always,hover,never|}"$2>\n\t<template #header>$3</template>\n\t$4\n</el-card>$0',
  },
  {
    tag: 'el-tag',
    name: 'Tag 标签',
    description: '用于标记和选择',
    props: [
      { name: 'type', type: "'primary' | 'success' | 'warning' | 'danger' | 'info'", description: '标签类型', default: "'primary'" },
      { name: 'closable', type: 'boolean', description: '是否可关闭', default: 'false' },
      { name: 'effect', type: "'dark' | 'light' | 'plain'", description: '主题', default: "'light'" },
      { name: 'round', type: 'boolean', description: '是否圆角', default: 'false' },
      { name: 'size', type: "'large' | 'default' | 'small'", description: '标签尺寸' },
    ],
    events: [
      { name: 'click', description: '点击标签时触发', params: 'MouseEvent' },
      { name: 'close', description: '关闭标签时触发' },
    ],
    slots: [
      { name: 'default', description: '标签内容' },
    ],
    snippet: '<el-tag type="${1|primary,success,warning,danger,info|}" effect="${2|dark,light,plain|}"$3>$4</el-tag>$0',
  },
  {
    tag: 'el-radio',
    name: 'Radio 单选框',
    description: '在一组备选项中进行单选',
    props: [
      { name: 'model-value', type: 'string | number | boolean', description: '绑定值' },
      { name: 'label', type: 'string | number | boolean', description: 'Radio 的 value' },
      { name: 'disabled', type: 'boolean', description: '是否禁用', default: 'false' },
      { name: 'border', type: 'boolean', description: '是否显示边框', default: 'false' },
      { name: 'size', type: "'large' | 'default' | 'small'", description: '尺寸' },
    ],
    events: [
      { name: 'change', description: '绑定值变化时触发', params: 'string | number | boolean' },
    ],
    slots: [
      { name: 'default', description: '单选框内容' },
    ],
    snippet: '<el-radio v-model="${1:formData}.${2:field}" :label="${3:1}"$4>${5:选项}</el-radio>$0',
  },
  {
    tag: 'el-checkbox',
    name: 'Checkbox 多选框',
    description: '一组备选项中进行多选',
    props: [
      { name: 'model-value', type: 'string | number | boolean | array', description: '绑定值' },
      { name: 'label', type: 'string | number | boolean | object', description: 'Checkbox 的 value' },
      { name: 'disabled', type: 'boolean', description: '是否禁用', default: 'false' },
      { name: 'border', type: 'boolean', description: '是否显示边框', default: 'false' },
      { name: 'checked', type: 'boolean', description: '当前是否勾选', default: 'false' },
    ],
    events: [
      { name: 'change', description: '绑定值变化时触发', params: 'string | number | boolean | array' },
    ],
    slots: [
      { name: 'default', description: '多选框内容' },
    ],
    snippet: '<el-checkbox v-model="${1:formData}.${2:field}" :label="${3:1}"$4>${5:选项}</el-checkbox>$0',
  },
  {
    tag: 'el-switch',
    name: 'Switch 开关',
    description: '表示两种相互对立的状态间的切换，多用于触发真实的开/关',
    props: [
      { name: 'model-value', type: 'boolean | string | number', description: '绑定值' },
      { name: 'disabled', type: 'boolean', description: '是否禁用', default: 'false' },
      { name: 'active-text', type: 'string', description: '打开时的文字描述' },
      { name: 'inactive-text', type: 'string', description: '关闭时的文字描述' },
      { name: 'active-value', type: 'boolean | string | number', description: '打开时的值', default: 'true' },
      { name: 'inactive-value', type: 'boolean | string | number', description: '关闭时的值', default: 'false' },
    ],
    events: [
      { name: 'change', description: '绑定值变化时触发', params: 'boolean | string | number' },
    ],
    slots: [
      { name: 'active-action', description: '打开时的自定义内容' },
      { name: 'inactive-action', description: '关闭时的自定义内容' },
    ],
    snippet: '<el-switch v-model="${1:formData}.${2:field}"$3 />$0',
  },
  {
    tag: 'el-date-picker',
    name: 'DatePicker 日期选择器',
    description: '用于选择或输入日期',
    props: [
      { name: 'model-value', type: 'string | Date | array | number', description: '绑定值' },
      { name: 'type', type: "'year' | 'month' | 'date' | 'dates' | 'datetime' | 'week' | 'datetimerange' | 'daterange' | 'monthrange'", description: '显示类型', default: "'date'" },
      { name: 'format', type: 'string', description: '显示格式', default: "'YYYY-MM-DD'" },
      { name: 'value-format', type: 'string', description: '绑定值格式' },
      { name: 'placeholder', type: 'string', description: '占位文本' },
      { name: 'disabled', type: 'boolean', description: '是否禁用', default: 'false' },
      { name: 'clearable', type: 'boolean', description: '是否可清空', default: 'true' },
    ],
    events: [
      { name: 'change', description: '值改变时触发', params: 'string | Date | array' },
    ],
    slots: [],
    snippet: '<el-date-picker v-model="${1:formData}.${2:field}" type="${3|date,datetime,daterange,datetimerange|}" placeholder="${4:选择日期}" value-format="YYYY-MM-DD"$5 />$0',
  },
  {
    tag: 'el-upload',
    name: 'Upload 上传',
    description: '通过点击或者拖拽上传文件',
    props: [
      { name: 'action', type: 'string', description: '上传地址（必填）', required: true },
      { name: 'headers', type: 'object', description: '请求头' },
      { name: 'multiple', type: 'boolean', description: '是否支持多选', default: 'false' },
      { name: 'drag', type: 'boolean', description: '是否启用拖拽上传', default: 'false' },
      { name: 'accept', type: 'string', description: '接受上传的文件类型' },
      { name: 'list-type', type: "'text' | 'picture' | 'picture-card'", description: '文件列表类型', default: "'text'" },
      { name: 'auto-upload', type: 'boolean', description: '是否自动上传', default: 'true' },
      { name: 'limit', type: 'number', description: '最大允许上传个数' },
    ],
    events: [
      { name: 'success', description: '上传成功时触发', params: 'response, uploadFile, uploadFiles' },
      { name: 'error', description: '上传失败时触发', params: 'error, uploadFile, uploadFiles' },
      { name: 'change', description: '文件状态改变时触发', params: 'uploadFile, uploadFiles' },
      { name: 'exceed', description: '超出限制时触发', params: 'uploadFile, uploadFiles' },
    ],
    slots: [
      { name: 'default', description: '触发文件选择框的内容' },
      { name: 'trigger', description: '触发文件选择框的内容' },
      { name: 'tip', description: '提示说明文字' },
      { name: 'file', description: '自定义文件缩略图' },
    ],
    snippet: '<el-upload\n\taction="${1:/api/upload}"\n\t:headers="${2:headers}"\n\tlist-type="${3|text,picture,picture-card|}"\n\t:on-success="${4:handleSuccess}"\n\t:on-error="${5:handleError}"\n$6>\n\t<el-button type="primary">点击上传</el-button>\n\t<template #tip>\n\t\t<div class="el-upload__tip">$7</div>\n\t</template>\n</el-upload>$0',
  },
  {
    tag: 'el-menu',
    name: 'Menu 导航菜单',
    description: '为网站提供导航功能的菜单',
    props: [
      { name: 'mode', type: "'horizontal' | 'vertical'", description: '模式', default: "'vertical'" },
      { name: 'default-active', type: 'string', description: '当前激活菜单的 index' },
      { name: 'default-openeds', type: 'array', description: '默认展开的 SubMenu 的 index 数组' },
      { name: 'unique-opened', type: 'boolean', description: '是否只保持一个子菜单展开', default: 'false' },
      { name: 'background-color', type: 'string', description: '背景色' },
      { name: 'text-color', type: 'string', description: '文字颜色' },
      { name: 'active-text-color', type: 'string', description: '激活文字颜色' },
      { name: 'collapse', type: 'boolean', description: '是否折叠', default: 'false' },
    ],
    events: [
      { name: 'select', description: '菜单激活时触发', params: 'index, indexPath, item, routeResult' },
      { name: 'open', description: 'Sub-menu 展开时触发', params: 'index, indexPath' },
      { name: 'close', description: 'Sub-menu 收起时触发', params: 'index, indexPath' },
    ],
    slots: [
      { name: 'default', description: '菜单内容' },
    ],
    snippet: '<el-menu :default-active="${1:activeIndex}" mode="${2|horizontal,vertical|}"$3>\n\t<el-menu-item index="${4:1}">${5:导航一}</el-menu-item>\n\t<el-sub-menu index="${6:2}">\n\t\t<template #title>${7:导航二}</template>\n\t\t<el-menu-item index="${8:2-1}">${9:选项1}</el-menu-item>\n\t</el-sub-menu>\n</el-menu>$0',
  },
  {
    tag: 'el-tree',
    name: 'Tree 树形控件',
    description: '用清晰的层级结构展示信息，可展开或折叠',
    props: [
      { name: 'data', type: 'array', description: '树形数据' },
      { name: 'props', type: 'object', description: '配置选项' },
      { name: 'node-key', type: 'string', description: '节点唯一标识' },
      { name: 'default-expand-all', type: 'boolean', description: '是否默认展开所有节点', default: 'false' },
      { name: 'highlight-current', type: 'boolean', description: '是否高亮当前选中节点', default: 'false' },
      { name: 'check-strictly', type: 'boolean', description: '是否严格的遵循父子不互相关联', default: 'false' },
      { name: 'show-checkbox', type: 'boolean', description: '节点是否可被选择', default: 'false' },
    ],
    events: [
      { name: 'node-click', description: '节点被点击时触发', params: 'data, node, component' },
      { name: 'node-contextmenu', description: '节点被右键点击时触发', params: 'event, data, node, component' },
      { name: 'check-change', description: '节点选中状态变化时触发', params: 'data, checked, indeterminate' },
      { name: 'check', description: '复选框被点击时触发', params: 'data, { checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys }' },
    ],
    slots: [
      { name: 'default', description: '自定义树节点内容', description2: 'scope: { node, data }' },
    ],
    snippet: '<el-tree :data="${1:treeData}" :props="${2:defaultProps}" node-key="${3:id}"$4 />$0',
  },
  {
    tag: 'el-message',
    name: 'Message 消息提示',
    description: '常用于主动操作后的反馈提示（JS API 调用）',
    props: [
      { name: 'message', type: 'string | VNode', description: '消息文字' },
      { name: 'type', type: "'success' | 'warning' | 'info' | 'error'", description: '消息类型' },
      { name: 'duration', type: 'number', description: '显示时间(毫秒)', default: '3000' },
      { name: 'show-close', type: 'boolean', description: '是否显示关闭按钮', default: 'false' },
      { name: 'center', type: 'boolean', description: '文字是否居中', default: 'false' },
    ],
    events: [
      { name: 'close', description: '关闭时的回调函数' },
    ],
    slots: [],
    snippet: "ElMessage({ message: '${1:消息内容}', type: '${2|success,warning,info,error|}'$3 })$0",
  },
  {
    tag: 'el-notification',
    name: 'Notification 通知',
    description: '悬浮出现在页面角落，显示全局的通知提醒消息（JS API 调用）',
    props: [
      { name: 'title', type: 'string', description: '通知标题' },
      { name: 'message', type: 'string | VNode', description: '通知文字' },
      { name: 'type', type: "'success' | 'warning' | 'info' | 'error'", description: '通知类型' },
      { name: 'duration', type: 'number', description: '显示时间(毫秒)', default: '4500' },
      { name: 'position', type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'", description: '位置', default: "'top-right'" },
    ],
    events: [
      { name: 'close', description: '关闭时的回调函数' },
    ],
    slots: [],
    snippet: "ElNotification({ title: '${1:标题}', message: '${2:通知内容}', type: '${3|success,warning,info,error|}'$4 })$0",
  },
  {
    tag: 'el-container',
    name: 'Container 布局容器',
    description: '用于布局的容器组件，方便快速搭建页面的基本结构',
    props: [],
    events: [],
    slots: [
      { name: 'default', description: '容器内容' },
    ],
    snippet: '<el-container$1>\n\t<el-aside width="${2:200px}">$3</el-aside>\n\t<el-main>$4</el-main>\n</el-container>$0',
  },
  {
    tag: 'el-row',
    name: 'Row 栅格行',
    description: '栅格布局中的行容器',
    props: [
      { name: 'gutter', type: 'number', description: '栅格间隔', default: '0' },
      { name: 'justify', type: "'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'", description: '水平排列方式', default: "'start'" },
      { name: 'align', type: "'top' | 'middle' | 'bottom'", description: '垂直排列方式', default: "'top'" },
    ],
    events: [],
    slots: [
      { name: 'default', description: '行内容' },
    ],
    snippet: '<el-row :gutter="${1:20}"$2>\n\t<el-col :span="${3:12}">$4</el-col>\n</el-row>$0',
  },
  {
    tag: 'el-col',
    name: 'Col 栅格列',
    description: '栅格布局中的列容器',
    props: [
      { name: 'span', type: 'number', description: '栅格占据的列数', default: '24' },
      { name: 'offset', type: 'number', description: '栅格左侧的间隔格数', default: '0' },
      { name: 'push', type: 'number', description: '栅格向右移动格数', default: '0' },
      { name: 'pull', type: 'number', description: '栅格向左移动格数', default: '0' },
      { name: 'xs', type: 'number | object', description: '<768px 响应式栅格数或属性对象' },
      { name: 'sm', type: 'number | object', description: '≥768px 响应式栅格数或属性对象' },
      { name: 'md', type: 'number | object', description: '≥992px 响应式栅格数或属性对象' },
      { name: 'lg', type: 'number | object', description: '≥1200px 响应式栅格数或属性对象' },
    ],
    events: [],
    slots: [
      { name: 'default', description: '列内容' },
    ],
    snippet: '<el-col :span="${1:12}"$2>$3</el-col>$0',
  },
  {
    tag: 'el-drawer',
    name: 'Drawer 抽屉',
    description: '有些时候，Dialog 组件并不满足我们的需求，比如你的表单很长，亦或是你需要临时展示一些文档',
    props: [
      { name: 'model-value', type: 'boolean', description: '是否显示', default: 'false' },
      { name: 'title', type: 'string', description: '标题' },
      { name: 'size', type: 'string | number', description: ' Drawer 窗体的大小', default: "'30%'" },
      { name: 'direction', type: "'rtl' | 'ltr' | 'ttb' | 'btt'", description: '打开方向', default: "'rtl'" },
      { name: 'before-close', type: 'function', description: '关闭前的回调' },
      { name: 'destroy-on-close', type: 'boolean', description: '关闭时销毁', default: 'false' },
    ],
    events: [
      { name: 'open', description: '打开时触发' },
      { name: 'opened', description: '打开动画结束时触发' },
      { name: 'close', description: '关闭时触发' },
      { name: 'closed', description: '关闭动画结束时触发' },
    ],
    slots: [
      { name: 'default', description: '抽屉内容' },
      { name: 'header', description: '标题区内容' },
      { name: 'footer', description: '底部内容' },
    ],
    snippet: '<el-drawer v-model="${1:drawerVisible}" title="${2:抽屉标题}" direction="${3|rtl,ltr,ttb,btt|}" size="${4:30%}"$5>\n\t$6\n</el-drawer>$0',
  },
  {
    tag: 'el-tooltip',
    name: 'Tooltip 文字提示',
    description: '常用于展示鼠标 hover 时的提示信息',
    props: [
      { name: 'content', type: 'string', description: '提示文字' },
      { name: 'placement', type: "'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'", description: '出现位置', default: "'bottom'" },
      { name: 'effect', type: "'dark' | 'light'", description: '主题', default: "'dark'" },
      { name: 'disabled', type: 'boolean', description: '是否禁用', default: 'false' },
    ],
    events: [],
    slots: [
      { name: 'default', description: '触发元素' },
      { name: 'content', description: '自定义内容' },
    ],
    snippet: '<el-tooltip content="${1:提示文字}" placement="${2|top,top-start,top-end,bottom,bottom-start,bottom-end,left,left-start,left-end,right,right-start,right-end|}"$3>\n\t$4\n</el-tooltip>$0',
  },
  {
    tag: 'el-badge',
    name: 'Badge 标记',
    description: '出现在按钮、图标旁的数字或状态标记',
    props: [
      { name: 'value', type: 'string | number', description: '显示值' },
      { name: 'max', type: 'number', description: '最大值', default: '99' },
      { name: 'is-dot', type: 'boolean', description: '小圆点', default: 'false' },
      { name: 'hidden', type: 'boolean', description: '隐藏 badge', default: 'false' },
      { name: 'type', type: "'primary' | 'success' | 'warning' | 'danger' | 'info'", description: '类型', default: "'primary'" },
    ],
    events: [],
    slots: [
      { name: 'default', description: '触发元素' },
    ],
    snippet: '<el-badge :value="${1:12}" type="${2|primary,success,warning,danger,info|}"$3>\n\t$4\n</el-badge>$0',
  },
  {
    tag: 'el-alert',
    name: 'Alert 警告',
    description: '用于页面中展示重要的提示信息',
    props: [
      { name: 'title', type: 'string', description: '标题', required: true },
      { name: 'type', type: "'success' | 'warning' | 'info' | 'error'", description: '主题', default: "'info'" },
      { name: 'description', type: 'string', description: '辅助性文字' },
      { name: 'closable', type: 'boolean', description: '是否可关闭', default: 'true' },
      { name: 'center', type: 'boolean', description: '文字是否居中', default: 'false' },
      { name: 'show-icon', type: 'boolean', description: '是否显示图标', default: 'false' },
      { name: 'effect', type: "'light' | 'dark'", description: '主题样式', default: "'light'" },
    ],
    events: [
      { name: 'close', description: '关闭时触发' },
    ],
    slots: [
      { name: 'default', description: '内容' },
      { name: 'title', description: '标题' },
    ],
    snippet: '<el-alert title="${1:提示信息}" type="${2|success,warning,info,error|}" show-icon closable$3 />$0',
  },
  {
    tag: 'el-image',
    name: 'Image 图片',
    description: '图片容器，在保留原生img的特性下，支持懒加载、自定义占位、加载失败等',
    props: [
      { name: 'src', type: 'string', description: '图片路径' },
      { name: 'fit', type: "'fill' | 'contain' | 'cover' | 'none' | 'scale-down'", description: '适应方式' },
      { name: 'lazy', type: 'boolean', description: '是否懒加载', default: 'false' },
      { name: 'preview-src-list', type: 'array', description: '预览图片列表' },
    ],
    events: [
      { name: 'load', description: '图片加载成功时触发' },
      { name: 'error', description: '图片加载失败时触发' },
    ],
    slots: [
      { name: 'error', description: '加载失败的内容' },
      { name: 'placeholder', description: '加载中的内容' },
    ],
    snippet: '<el-image src="${1:imageUrl}" fit="${2|fill,contain,cover,none,scale-down|}" lazy$3 />$0',
  },
  {
    tag: 'el-progress',
    name: 'Progress 进度条',
    description: '展示操作进度',
    props: [
      { name: 'percentage', type: 'number', description: '百分比（必填）', required: true },
      { name: 'type', type: "'line' | 'circle' | 'dashboard'", description: '进度条类型', default: "'line'" },
      { name: 'stroke-width', type: 'number', description: '进度条宽度', default: '6' },
      { name: 'status', type: "'success' | 'warning' | 'exception'", description: '进度条状态' },
      { name: 'color', type: 'string | Function | array', description: '进度条颜色' },
      { name: 'show-text', type: 'boolean', description: '是否显示文字', default: 'true' },
    ],
    events: [],
    slots: [],
    snippet: '<el-progress :percentage="${1:50}" type="${2|line,circle,dashboard|}"$3 />$0',
  },
  {
    tag: 'el-steps',
    name: 'Steps 步骤条',
    description: '引导用户按照流程完成任务的分步导航条',
    props: [
      { name: 'active', type: 'number', description: '当前激活步骤', default: '0' },
      { name: 'process-status', type: "'wait' | 'process' | 'finish' | 'error' | 'success'", description: '步骤状态', default: "'process'" },
      { name: 'finish-status', type: "'wait' | 'process' | 'finish' | 'error' | 'success'", description: '结束步骤的状态', default: "'finish'" },
      { name: 'align-center', type: 'boolean', description: '是否居中', default: 'false' },
      { name: 'direction', type: "'vertical' | 'horizontal'", description: '方向', default: "'horizontal'" },
      { name: 'simple', type: 'boolean', description: '简洁风格', default: 'false' },
    ],
    events: [],
    slots: [
      { name: 'default', description: 'Step 组件列表' },
    ],
    snippet: '<el-steps :active="${1:activeStep}" finish-status="success"$2>\n\t<el-step title="${3:步骤1}" />\n\t<el-step title="${4:步骤2}" />\n\t<el-step title="${5:步骤3}" />\n</el-steps>$0',
  },
  {
    tag: 'el-timeline',
    name: 'Timeline 时间线',
    description: '可视化地呈现时间流信息',
    props: [],
    events: [],
    slots: [
      { name: 'default', description: 'TimelineItem 组件列表' },
    ],
    snippet: '<el-timeline$1>\n\t<el-timeline-item timestamp="${2:2024-01-01}" placement="top">$3</el-timeline-item>\n</el-timeline>$0',
  },
  {
    tag: 'el-descriptions',
    name: 'Descriptions 描述列表',
    description: '列表形式展示多个字段',
    props: [
      { name: 'title', type: 'string', description: '标题' },
      { name: 'border', type: 'boolean', description: '是否带边框', default: 'false' },
      { name: 'column', type: 'number', description: '一行显示的数量', default: '3' },
      { name: 'direction', type: "'vertical' | 'horizontal'", description: '排列方向', default: "'horizontal'" },
      { name: 'size', type: "'large' | 'default' | 'small'", description: '列表尺寸' },
    ],
    events: [],
    slots: [
      { name: 'default', description: 'DescriptionsItem 组件列表' },
      { name: 'title', description: '自定义标题' },
      { name: 'extra', description: '自定义额外内容' },
    ],
    snippet: '<el-descriptions title="${1:标题}" :column="${2:2}" border$3>\n\t<el-descriptions-item label="${4:标签}">${5:内容}</el-descriptions-item>\n</el-descriptions>$0',
  },
  {
    tag: 'el-result',
    name: 'Result 结果',
    description: '用于对用户的操作结果或者运行状态作为反馈',
    props: [
      { name: 'title', type: 'string', description: '标题' },
      { name: 'sub-title', type: 'string', description: '副标题' },
      { name: 'icon', type: "'success' | 'warning' | 'info' | 'error'", description: '图标', default: "'info'" },
    ],
    events: [],
    slots: [
      { name: 'icon', description: '自定义图标' },
      { name: 'title', description: '自定义标题' },
      { name: 'sub-title', description: '自定义副标题' },
      { name: 'extra', description: '自定义额外内容' },
    ],
    snippet: '<el-result icon="${1|success,warning,info,error|}" title="${2:标题}" sub-title="${3:请根据提示进行操作}"$4>\n\t<template #extra>\n\t\t<el-button type="primary">$5</el-button>\n\t</template>\n</el-result>$0',
  },
];
