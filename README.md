# VueQuick - Element Plus 低代码工具 🧩

基于 Element Plus 的 VSCode 低代码插件，支持组件自动联想、属性/事件提示、内置页面模版快速生成。

## ✨ 功能特性

### 1. 组件自动联想

在 Vue/HTML 文件中输入 `<el-` 即可触发 Element Plus 组件自动补全：

- **组件标签补全**：输入 `<el-` 自动联想所有 Element Plus 组件，选中后自动插入完整代码片段
- **属性补全**：组件标签内按空格触发属性联想，包含类型、默认值、是否必填等提示
- **事件补全**：输入 `@` 触发事件联想，包含事件参数说明
- **插槽补全**：输入 `#` 触发插槽联想

### 2. 代码片段（Snippets）

在 Vue 文件中通过前缀快速插入代码片段：

| 前缀 | 说明 |
|------|------|
| `el-button` | 按钮组件 |
| `el-input` | 输入框 |
| `el-select` | 下拉选择框 |
| `el-table` | 表格 |
| `el-table-column` | 表格列 |
| `el-table-column-slot` | 表格列（自定义插槽） |
| `el-table-column-action` | 表格操作列 |
| `el-form` | 表单 |
| `el-form-item` | 表单项 |
| `el-form-item-input` | 表单项+输入框 |
| `el-form-item-select` | 表单项+选择框 |
| `el-dialog` | 对话框 |
| `el-pagination` | 分页 |
| `el-card` | 卡片 |
| `el-tabs` | 标签页 |
| `el-switch` | 开关 |
| `el-date-picker` | 日期选择器 |
| `el-drawer` | 抽屉 |
| `el-message` | 消息提示 |
| `el-message-box` | 消息弹框 |
| `el-upload` | 文件上传 |
| `el-tag` | 标签 |
| `el-row` | 栅格行 |
| `v3-setup` | Vue3 script setup |
| `v3-ref` | ref 定义 |
| `v3-reactive` | reactive 定义 |
| `v3-watch` | 侦听器 |
| `v3-form-rules` | 表单验证规则 |
| ... | 更多片段持续更新 |

### 3. 内置页面模版

通过 Webview 面板选择并生成完整页面：

| 模版 | 说明 |
|------|------|
| 📊 CRUD 表格页面 | 搜索+表格+分页+弹窗完整 CRUD |
| 📝 表单页面 | 各种表单控件的完整表单 |
| 📋 详情页面 | 描述列表展示详细信息 |
| 🔐 登录页面 | 简洁美观的登录页 |
| 📈 仪表盘页面 | 统计卡片+图表区域 |
| 🏠 侧边栏布局 | 后台管理经典布局 |

## 🚀 使用方式

### 命令面板

- `VueQuick: 打开模版面板` — 打开可视化模版选择面板
- `VueQuick: 快速插入模版` — 快速选择模版插入当前文件
- `VueQuick: 复制模版到剪贴板` — 复制模版代码
- `VueQuick: 创建模版文件` — 创建新的 Vue 文件

### 快捷键

- `Ctrl+Shift+T` (Mac: `Cmd+Shift+T`) — 打开模版面板
- `Ctrl+Shift+I` (Mac: `Cmd+Shift+I`) — 快速插入模版

### 右键菜单

- 文件管理器右键 — 创建模版文件 / 打开模版面板
- 编辑器右键 (Vue文件) — 快速插入模版 / 打开模版面板

## 🔧 配置

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| `vuequick.enableCompletion` | `true` | 启用组件自动联想 |
| `vuequick.enableSnippets` | `true` | 启用代码片段 |

## 📦 支持的 Element Plus 组件

Button, Input, Select, Table, TableColumn, Form, FormItem, Dialog, Pagination, Tabs, Card, Tag, Radio, Checkbox, Switch, DatePicker, Upload, Menu, Tree, Message, Notification, Container, Row, Col, Drawer, Tooltip, Badge, Alert, Image, Progress, Steps, Timeline, Descriptions, Result

## 🛠️ 开发

```bash
# 安装依赖
npm install

# 编译
npm run compile

# 监听模式
npm run watch

# 打包
npm run package
```

按 F5 在 VSCode 中启动调试。

## 📄 License

MIT
