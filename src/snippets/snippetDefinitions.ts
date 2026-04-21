/**
 * Element Plus Snippets 定义
 * 用于在 Vue 文件中快速输入组件代码片段
 */

export interface SnippetDefinition {
  prefix: string;
  name: string;
  description: string;
  body: string[];
}

export const elementPlusSnippets: SnippetDefinition[] = [
  // ========== 基础组件 ==========
  {
    prefix: 'el-button',
    name: 'ElButton',
    description: 'Element Plus 按钮组件',
    body: [
      '<el-button type="${1|primary,success,warning,danger,info|}" ${2| ,plain,round,circle|} $3>$4</el-button>$0',
    ],
  },
  {
    prefix: 'el-button-group',
    name: 'ElButtonGroup',
    description: 'Element Plus 按钮组',
    body: [
      '<el-button-group>',
      '\t<el-button type="primary">$1</el-button>',
      '\t<el-button type="primary">$2</el-button>',
      '</el-button-group>$0',
    ],
  },
  {
    prefix: 'el-link',
    name: 'ElLink',
    description: 'Element Plus 链接组件',
    body: [
      '<el-link type="${1|primary,success,warning,danger,info,default|}" :underline="false">$2</el-link>$0',
    ],
  },

  // ========== 表单组件 ==========
  {
    prefix: 'el-input',
    name: 'ElInput',
    description: 'Element Plus 输入框组件',
    body: [
      '<el-input v-model="${1:formData}.${2:field}" placeholder="${3:请输入}" clearable$4 />$0',
    ],
  },
  {
    prefix: 'el-textarea',
    name: 'ElTextarea',
    description: 'Element Plus 文本域',
    body: [
      '<el-input v-model="${1:formData}.${2:field}" type="textarea" :rows="${3:3}" placeholder="${4:请输入}"$5 />$0',
    ],
  },
  {
    prefix: 'el-select',
    name: 'ElSelect',
    description: 'Element Plus 下拉选择框',
    body: [
      '<el-select v-model="${1:formData}.${2:field}" placeholder="${3:请选择}" clearable$4>',
      '\t<el-option v-for="item in ${5:options}" :key="item.value" :label="item.label" :value="item.value" />',
      '</el-select>$0',
    ],
  },
  {
    prefix: 'el-radio-group',
    name: 'ElRadioGroup',
    description: 'Element Plus 单选框组',
    body: [
      '<el-radio-group v-model="${1:formData}.${2:field}">',
      '\t<el-radio :label="${3:1}">${4:选项1}</el-radio>',
      '\t<el-radio :label="${5:2}">${6:选项2}</el-radio>',
      '</el-radio-group>$0',
    ],
  },
  {
    prefix: 'el-checkbox-group',
    name: 'ElCheckboxGroup',
    description: 'Element Plus 多选框组',
    body: [
      '<el-checkbox-group v-model="${1:formData}.${2:field}">',
      '\t<el-checkbox :label="${3:1}">${4:选项1}</el-checkbox>',
      '\t<el-checkbox :label="${5:2}">${6:选项2}</el-checkbox>',
      '</el-checkbox-group>$0',
    ],
  },
  {
    prefix: 'el-switch',
    name: 'ElSwitch',
    description: 'Element Plus 开关组件',
    body: [
      '<el-switch v-model="${1:formData}.${2:field}"$3 />$0',
    ],
  },
  {
    prefix: 'el-date-picker',
    name: 'ElDatePicker',
    description: 'Element Plus 日期选择器',
    body: [
      '<el-date-picker v-model="${1:formData}.${2:field}" type="${3|date,datetime,daterange,datetimerange,month,year|}" placeholder="${4:选择日期}" value-format="YYYY-MM-DD"$5 />$0',
    ],
  },
  {
    prefix: 'el-input-number',
    name: 'ElInputNumber',
    description: 'Element Plus 数字输入框',
    body: [
      '<el-input-number v-model="${1:formData}.${2:field}" :min="${3:0}"$4 />$0',
    ],
  },
  {
    prefix: 'el-cascader',
    name: 'ElCascader',
    description: 'Element Plus 级联选择器',
    body: [
      '<el-cascader v-model="${1:formData}.${2:field}" :options="${3:options}" :props="${4:cascaderProps}" placeholder="${5:请选择}" clearable$6 />$0',
    ],
  },

  // ========== 表单 ==========
  {
    prefix: 'el-form',
    name: 'ElForm',
    description: 'Element Plus 表单',
    body: [
      '<el-form ref="${1:formRef}" :model="${2:formData}" :rules="${3:rules}" label-width="${4:100px}"$5>',
      '\t$6',
      '</el-form>$0',
    ],
  },
  {
    prefix: 'el-form-item',
    name: 'ElFormItem',
    description: 'Element Plus 表单项',
    body: [
      '<el-form-item label="${1:标签}" prop="${2:prop}"$3>',
      '\t$4',
      '</el-form-item>$0',
    ],
  },
  {
    prefix: 'el-form-item-input',
    name: 'ElFormItemInput',
    description: '表单项 + 输入框 组合',
    body: [
      '<el-form-item label="${1:标签}" prop="${2:prop}">',
      '\t<el-input v-model="${3:formData}.${2:prop}" placeholder="请输入${1:标签}" clearable />',
      '</el-form-item>$0',
    ],
  },
  {
    prefix: 'el-form-item-select',
    name: 'ElFormItemSelect',
    description: '表单项 + 下拉选择 组合',
    body: [
      '<el-form-item label="${1:标签}" prop="${2:prop}">',
      '\t<el-select v-model="${3:formData}.${2:prop}" placeholder="请选择${1:标签}" clearable>',
      '\t\t<el-option v-for="item in ${4:options}" :key="item.value" :label="item.label" :value="item.value" />',
      '\t</el-select>',
      '</el-form-item>$0',
    ],
  },

  // ========== 数据展示 ==========
  {
    prefix: 'el-table',
    name: 'ElTable',
    description: 'Element Plus 表格',
    body: [
      '<el-table :data="${1:tableData}" stripe border$2>',
      '\t<el-table-column prop="${3:prop}" label="${4:标签}" />',
      '</el-table>$0',
    ],
  },
  {
    prefix: 'el-table-column',
    name: 'ElTableColumn',
    description: 'Element Plus 表格列',
    body: [
      '<el-table-column prop="${1:prop}" label="${2:标签}"$3 />$0',
    ],
  },
  {
    prefix: 'el-table-column-slot',
    name: 'ElTableColumnSlot',
    description: '表格列（自定义内容插槽）',
    body: [
      '<el-table-column prop="${1:prop}" label="${2:标签}">',
      '\t<template #default="{ row }">',
      '\t\t$3',
      '\t</template>',
      '</el-table-column>$0',
    ],
  },
  {
    prefix: 'el-table-column-action',
    name: 'ElTableColumnAction',
    description: '表格操作列',
    body: [
      '<el-table-column label="操作" width="${1:200}" fixed="right">',
      '\t<template #default="{ row }">',
      '\t\t<el-button type="primary" link @click="handleEdit(row)">编辑</el-button>',
      '\t\t<el-button type="danger" link @click="handleDelete(row)">删除</el-button>',
      '\t</template>',
      '</el-table-column>$0',
    ],
  },
  {
    prefix: 'el-pagination',
    name: 'ElPagination',
    description: 'Element Plus 分页',
    body: [
      '<el-pagination',
      '\t:current-page="${1:queryParams}.pageNum"',
      '\t:page-size="${1:queryParams}.pageSize"',
      '\t:page-sizes="[10, 20, 50, 100]"',
      '\t:total="${2:total}"',
      '\tlayout="total, sizes, prev, pager, next, jumper"',
      '\tbackground',
      '\t@size-change="${3:handleQuery}"',
      '\t@current-change="${3:handleQuery}"',
      '/>$0',
    ],
  },
  {
    prefix: 'el-tag',
    name: 'ElTag',
    description: 'Element Plus 标签',
    body: [
      '<el-tag type="${1|primary,success,warning,danger,info|}"$2>${3:标签内容}</el-tag>$0',
    ],
  },
  {
    prefix: 'el-badge',
    name: 'ElBadge',
    description: 'Element Plus 标记',
    body: [
      '<el-badge :value="${1:12}"$2>',
      '\t$3',
      '</el-badge>$0',
    ],
  },
  {
    prefix: 'el-descriptions',
    name: 'ElDescriptions',
    description: 'Element Plus 描述列表',
    body: [
      '<el-descriptions title="${1:标题}" :column="${2:2}" border$3>',
      '\t<el-descriptions-item label="${4:标签}">${5:内容}</el-descriptions-item>',
      '</el-descriptions>$0',
    ],
  },
  {
    prefix: 'el-tree',
    name: 'ElTree',
    description: 'Element Plus 树形控件',
    body: [
      '<el-tree :data="${1:treeData}" :props="${2:defaultProps}" node-key="${3:id}"$4 />$0',
    ],
  },

  // ========== 反馈组件 ==========
  {
    prefix: 'el-dialog',
    name: 'ElDialog',
    description: 'Element Plus 对话框',
    body: [
      '<el-dialog v-model="${1:dialogVisible}" title="${2:对话框标题}" width="${3:30%}"$4>',
      '\t$5',
      '\t<template #footer>',
      '\t\t<el-button @click="${1:dialogVisible} = false">取消</el-button>',
      '\t\t<el-button type="primary" @click="$6">确定</el-button>',
      '\t</template>',
      '</el-dialog>$0',
    ],
  },
  {
    prefix: 'el-drawer',
    name: 'ElDrawer',
    description: 'Element Plus 抽屉',
    body: [
      '<el-drawer v-model="${1:drawerVisible}" title="${2:抽屉标题}" direction="${3|rtl,ltr,ttb,btt|}"$4>',
      '\t$5',
      '</el-drawer>$0',
    ],
  },
  {
    prefix: 'el-message',
    name: 'ElMessage',
    description: 'Element Plus 消息提示（JS API）',
    body: [
      "ElMessage({ message: '${1:消息内容}', type: '${2|success,warning,info,error|}'$3 })$0",
    ],
  },
  {
    prefix: 'el-message-box',
    name: 'ElMessageBox',
    description: 'Element Plus 消息弹框（JS API）',
    body: [
      "await ElMessageBox.confirm('${1:确认删除该条数据？}', '${2:提示}', { type: 'warning' })$0",
    ],
  },
  {
    prefix: 'el-notification',
    name: 'ElNotification',
    description: 'Element Plus 通知（JS API）',
    body: [
      "ElNotification({ title: '${1:标题}', message: '${2:通知内容}', type: '${3|success,warning,info,error|}'$4 })$0",
    ],
  },
  {
    prefix: 'el-alert',
    name: 'ElAlert',
    description: 'Element Plus 警告',
    body: [
      '<el-alert title="${1:提示信息}" type="${2|success,warning,info,error|}" show-icon closable$3 />$0',
    ],
  },

  // ========== 导航组件 ==========
  {
    prefix: 'el-tabs',
    name: 'ElTabs',
    description: 'Element Plus 标签页',
    body: [
      '<el-tabs v-model="${1:activeTab}" type="${2|border-card,card,line|}"$3>',
      '\t<el-tab-pane label="${4:标签1}" name="${5:tab1}">$6</el-tab-pane>',
      '</el-tabs>$0',
    ],
  },
  {
    prefix: 'el-breadcrumb',
    name: 'ElBreadcrumb',
    description: 'Element Plus 面包屑',
    body: [
      '<el-breadcrumb separator="/">',
      '\t<el-breadcrumb-item :to="{ path: \\'/${1:home}\\' }">${2:首页}</el-breadcrumb-item>',
      '\t<el-breadcrumb-item>${3:当前页}</el-breadcrumb-item>',
      '</el-breadcrumb>$0',
    ],
  },
  {
    prefix: 'el-menu',
    name: 'ElMenu',
    description: 'Element Plus 导航菜单',
    body: [
      '<el-menu :default-active="${1:activeIndex}" mode="${2|horizontal,vertical|}"$3>',
      '\t<el-menu-item index="${4:1}">${5:导航一}</el-menu-item>',
      '\t<el-sub-menu index="${6:2}">',
      '\t\t<template #title>${7:导航二}</template>',
      '\t\t<el-menu-item index="${8:2-1}">${9:选项1}</el-menu-item>',
      '\t</el-sub-menu>',
      '</el-menu>$0',
    ],
  },
  {
    prefix: 'el-dropdown',
    name: 'ElDropdown',
    description: 'Element Plus 下拉菜单',
    body: [
      '<el-dropdown$1>',
      '\t<span class="el-dropdown-link">$2</span>',
      '\t<template #dropdown>',
      '\t\t<el-dropdown-menu>',
      '\t\t\t<el-dropdown-item>${3:选项1}</el-dropdown-item>',
      '\t\t\t<el-dropdown-item>${4:选项2}</el-dropdown-item>',
      '\t\t</el-dropdown-menu>',
      '\t</template>',
      '</el-dropdown>$0',
    ],
  },

  // ========== 布局组件 ==========
  {
    prefix: 'el-row',
    name: 'ElRow',
    description: 'Element Plus 栅格行',
    body: [
      '<el-row :gutter="${1:20}"$2>',
      '\t<el-col :span="${3:12}">$4</el-col>',
      '</el-row>$0',
    ],
  },
  {
    prefix: 'el-container',
    name: 'ElContainer',
    description: 'Element Plus 布局容器',
    body: [
      '<el-container$1>',
      '\t<el-aside width="${2:200px}">$3</el-aside>',
      '\t<el-main>$4</el-main>',
      '</el-container>$0',
    ],
  },
  {
    prefix: 'el-card',
    name: 'ElCard',
    description: 'Element Plus 卡片',
    body: [
      '<el-card shadow="${1|always,hover,never|}"$2>',
      '\t<template #header>$3</template>',
      '\t$4',
      '</el-card>$0',
    ],
  },
  {
    prefix: 'el-collapse',
    name: 'ElCollapse',
    description: 'Element Plus 折叠面板',
    body: [
      '<el-collapse v-model="${1:activeNames}"$2>',
      '\t<el-collapse-item title="${3:标题}" name="${4:1}">$5</el-collapse-item>',
      '</el-collapse>$0',
    ],
  },

  // ========== 其他组件 ==========
  {
    prefix: 'el-image',
    name: 'ElImage',
    description: 'Element Plus 图片',
    body: [
      '<el-image src="${1:imageUrl}" fit="${2|fill,contain,cover,none,scale-down|}"$3 />$0',
    ],
  },
  {
    prefix: 'el-upload',
    name: 'ElUpload',
    description: 'Element Plus 文件上传',
    body: [
      '<el-upload action="${1:/api/upload}" list-type="${2|text,picture,picture-card|}"$3>',
      '\t<el-button type="primary">点击上传</el-button>',
      '\t<template #tip>',
      '\t\t<div class="el-upload__tip">$4</div>',
      '\t</template>',
      '</el-upload>$0',
    ],
  },
  {
    prefix: 'el-progress',
    name: 'ElProgress',
    description: 'Element Plus 进度条',
    body: [
      '<el-progress :percentage="${1:50}" type="${2|line,circle,dashboard|}"$3 />$0',
    ],
  },
  {
    prefix: 'el-steps',
    name: 'ElSteps',
    description: 'Element Plus 步骤条',
    body: [
      '<el-steps :active="${1:activeStep}" finish-status="success"$2>',
      '\t<el-step title="${3:步骤1}" />',
      '\t<el-step title="${4:步骤2}" />',
      '\t<el-step title="${5:步骤3}" />',
      '</el-steps>$0',
    ],
  },
  {
    prefix: 'el-timeline',
    name: 'ElTimeline',
    description: 'Element Plus 时间线',
    body: [
      '<el-timeline$1>',
      '\t<el-timeline-item timestamp="${2:2024-01-01}" placement="top">$3</el-timeline-item>',
      '</el-timeline>$0',
    ],
  },
  {
    prefix: 'el-result',
    name: 'ElResult',
    description: 'Element Plus 结果页',
    body: [
      '<el-result icon="${1|success,warning,info,error|}" title="${2:标题}" sub-title="${3:描述}">',
      '\t<template #extra>',
      '\t\t<el-button type="primary">$4</el-button>',
      '\t</template>',
      '</el-result>$0',
    ],
  },
  {
    prefix: 'el-divider',
    name: 'ElDivider',
    description: 'Element Plus 分割线',
    body: [
      '<el-divider$1>${2:分割线}</el-divider>$0',
    ],
  },
  {
    prefix: 'el-empty',
    name: 'ElEmpty',
    description: 'Element Plus 空状态',
    body: [
      '<el-empty description="${1:暂无数据}"$1 />$0',
    ],
  },
  {
    prefix: 'el-skeleton',
    name: 'ElSkeleton',
    description: 'Element Plus 骨架屏',
    body: [
      '<el-skeleton :loading="${1:loading}" animated$2>',
      '\t$3',
      '</el-skeleton>$0',
    ],
  },

  // ========== Vue 3 Composition API 常用代码 ==========
  {
    prefix: 'v3-setup',
    name: 'Vue3SetupScript',
    description: 'Vue 3 <script setup> 模版',
    body: [
      '<script setup lang="ts">',
      'import { ref, reactive, computed, onMounted } from "vue"',
      '',
      '$1',
      '</script>$0',
    ],
  },
  {
    prefix: 'v3-ref',
    name: 'Vue3Ref',
    description: 'Vue 3 ref 定义',
    body: [
      'const ${1:name} = ref${2:<string>}(${3:\'\'})$0',
    ],
  },
  {
    prefix: 'v3-reactive',
    name: 'Vue3Reactive',
    description: 'Vue 3 reactive 定义',
    body: [
      'const ${1:state} = reactive({',
      '\t${2:key}: ${3:value},',
      '})$0',
    ],
  },
  {
    prefix: 'v3-computed',
    name: 'Vue3Computed',
    description: 'Vue 3 计算属性',
    body: [
      'const ${1:name} = computed(() => {',
      '\treturn ${2:value}',
      '})$0',
    ],
  },
  {
    prefix: 'v3-watch',
    name: 'Vue3Watch',
    description: 'Vue 3 侦听器',
    body: [
      'watch(${1:source}, (newVal, oldVal) => {',
      '\t$2',
      '}, { immediate: ${3:false}, deep: ${4:true} })$0',
    ],
  },
  {
    prefix: 'v3-onMounted',
    name: 'Vue3OnMounted',
    description: 'Vue 3 onMounted 生命周期',
    body: [
      'onMounted(() => {',
      '\t$1',
      '})$0',
    ],
  },
  {
    prefix: 'v3-api-request',
    name: 'Vue3ApiRequest',
    description: 'API 请求模板',
    body: [
      'const loading = ref(false)',
      'const ${1:data} = ref${2:<any[]>}([])',
      '',
      'const get${3:Data} = async () => {',
      '\tloading.value = true',
      '\ttry {',
      '\t\tconst res = await ${4:apiMethod}(${5:params})',
      '\t\t${1:data}.value = res.data',
      '\t} catch (error) {',
      '\t\tconsole.error(error)',
      '\t} finally {',
      '\t\tloading.value = false',
      '\t}',
      '}$0',
    ],
  },
  {
    prefix: 'v3-form-rules',
    name: 'Vue3FormRules',
    description: 'Element Plus 表单验证规则',
    body: [
      'const rules = reactive<FormRules>({',
      '\t${1:field}: [{ required: true, message: \'${2:请输入}\', trigger: \'${3|blur,change|}\' }],',
      '})$0',
    ],
  },
];
