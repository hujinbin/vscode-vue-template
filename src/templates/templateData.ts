/**
 * Element Plus 页面模版定义
 */
export interface PageTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  code: string;
}

export const pageTemplates: PageTemplate[] = [
  {
    id: 'crud-table',
    name: 'CRUD 表格页面',
    description: '包含搜索、表格、分页、新增/编辑弹窗的完整 CRUD 页面',
    category: '表格',
    icon: '📊',
    code: `<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <el-card shadow="never" class="search-card">
      <el-form :model="queryParams" :inline="true" ref="queryFormRef">
        <el-form-item label="关键词" prop="keyword">
          <el-input v-model="queryParams.keyword" placeholder="请输入关键词" clearable @keyup.enter="handleQuery" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="dateRange">
          <el-date-picker v-model="queryParams.dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 表格区域 -->
    <el-card shadow="never" class="table-card">
      <template #header>
        <div class="card-header">
          <span>数据列表</span>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </div>
      </template>

      <el-table :data="tableData" v-loading="loading" stripe border>
        <el-table-column type="index" label="#" width="60" />
        <el-table-column prop="name" label="名称" min-width="120" show-overflow-tooltip />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">{{ row.status === 1 ? '启用' : '禁用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        background
        @size-change="handleQuery"
        @current-change="handleQuery"
        class="pagination"
      />
    </el-card>

    <!-- 新增/编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px" destroy-on-close>
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

// 查询参数
const queryParams = reactive({
  keyword: '',
  status: undefined as number | undefined,
  dateRange: [] as string[],
  pageNum: 1,
  pageSize: 10,
})

// 表格数据
const loading = ref(false)
const tableData = ref([])
const total = ref(0)

// 弹窗
const dialogVisible = ref(false)
const dialogTitle = computed(() => (formData.id ? '编辑' : '新增'))
const formRef = ref<FormInstance>()

const formData = reactive({
  id: undefined as number | undefined,
  name: '',
  status: 1,
})

const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }],
})

// 查询
const handleQuery = () => {
  loading.value = true
  // TODO: 调用接口获取数据
  setTimeout(() => {
    loading.value = false
  }, 500)
}

// 重置
const handleReset = () => {
  queryParams.keyword = ''
  queryParams.status = undefined
  queryParams.dateRange = []
  handleQuery()
}

// 新增
const handleAdd = () => {
  formData.id = undefined
  formData.name = ''
  formData.status = 1
  dialogVisible.value = true
}

// 编辑
const handleEdit = (row: any) => {
  formData.id = row.id
  formData.name = row.name
  formData.status = row.status
  dialogVisible.value = true
}

// 提交
const handleSubmit = async () => {
  await formRef.value?.validate()
  // TODO: 调用接口提交数据
  ElMessage.success(formData.id ? '编辑成功' : '新增成功')
  dialogVisible.value = false
  handleQuery()
}

// 删除
const handleDelete = async (row: any) => {
  await ElMessageBox.confirm('确认删除该条数据？', '提示', { type: 'warning' })
  // TODO: 调用接口删除数据
  ElMessage.success('删除成功')
  handleQuery()
}

// 初始化
handleQuery()
</script>

<style scoped>
.app-container {
  padding: 20px;
}
.search-card {
  margin-bottom: 16px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pagination {
  margin-top: 16px;
  justify-content: flex-end;
}
</style>`,
  },
  {
    id: 'form-page',
    name: '表单页面',
    description: '包含各种表单控件的完整表单页面',
    category: '表单',
    icon: '📝',
    code: `<template>
  <div class="app-container">
    <el-card shadow="never">
      <template #header>
        <span>{{ isEdit ? '编辑' : '新增' }}</span>
      </template>

      <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px" style="max-width: 600px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入名称" maxlength="50" show-word-limit />
        </el-form-item>

        <el-form-item label="分类" prop="category">
          <el-select v-model="formData.category" placeholder="请选择分类" clearable filterable>
            <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="日期" prop="date">
          <el-date-picker v-model="formData.date" type="date" placeholder="选择日期" value-format="YYYY-MM-DD" />
        </el-form-item>

        <el-form-item label="金额" prop="amount">
          <el-input-number v-model="formData.amount" :min="0" :precision="2" />
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-switch v-model="formData.status" active-text="启用" inactive-text="禁用" />
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" type="textarea" :rows="3" placeholder="请输入备注" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const props = defineProps<{
  id?: number
}>()

const isEdit = computed(() => !!props.id)

const formRef = ref<FormInstance>()

const categoryOptions = [
  { label: '分类一', value: '1' },
  { label: '分类二', value: '2' },
  { label: '分类三', value: '3' },
]

const formData = reactive({
  name: '',
  category: '',
  date: '',
  amount: 0,
  status: true,
  remark: '',
})

const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  category: [{ required: true, message: '请选择分类', trigger: 'change' }],
  date: [{ required: true, message: '请选择日期', trigger: 'change' }],
})

const handleSubmit = async () => {
  await formRef.value?.validate()
  // TODO: 调用接口
  ElMessage.success('提交成功')
}

const handleCancel = () => {
  // TODO: 返回上一页
}
</script>

<style scoped>
.app-container {
  padding: 20px;
}
</style>`,
  },
  {
    id: 'detail-page',
    name: '详情页面',
    description: '使用描述列表展示详细信息的页面',
    category: '详情',
    icon: '📋',
    code: `<template>
  <div class="app-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span>基本信息</span>
          <div>
            <el-button @click="handleBack">返回</el-button>
            <el-button type="primary" @click="handleEdit">编辑</el-button>
          </div>
        </div>
      </template>

      <el-descriptions :column="2" border>
        <el-descriptions-item label="名称">{{ detailData.name }}</el-descriptions-item>
        <el-descriptions-item label="分类">{{ detailData.category }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="detailData.status === 1 ? 'success' : 'danger'">
            {{ detailData.status === 1 ? '启用' : '禁用' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="金额">{{ detailData.amount }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ detailData.createTime }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{ detailData.updateTime }}</el-descriptions-item>
        <el-descriptions-item label="备注" :span="2">{{ detailData.remark || '-' }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="never" style="margin-top: 16px">
      <template #header>
        <span>操作记录</span>
      </template>

      <el-timeline>
        <el-timeline-item v-for="item in timelineData" :key="item.id" :timestamp="item.time" placement="top">
          <el-card shadow="never">
            <p>{{ item.content }}</p>
            <p style="color: #999; font-size: 12px">操作人：{{ item.operator }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const detailData = reactive({
  name: '',
  category: '',
  status: 1,
  amount: 0,
  createTime: '',
  updateTime: '',
  remark: '',
})

const timelineData = ref<any[]>([])

const handleBack = () => {
  // TODO: 返回列表
}

const handleEdit = () => {
  // TODO: 跳转编辑
}

// TODO: 获取详情数据
</script>

<style scoped>
.app-container {
  padding: 20px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>`,
  },
  {
    id: 'login-page',
    name: '登录页面',
    description: '简洁美观的登录页面',
    category: '登录',
    icon: '🔐',
    code: `<template>
  <div class="login-container">
    <el-card class="login-card" shadow="always">
      <div class="login-header">
        <h2>系统登录</h2>
        <p>欢迎回来，请登录您的账号</p>
      </div>

      <el-form ref="formRef" :model="formData" :rules="rules" size="large">
        <el-form-item prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名" prefix-icon="User" />
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="formData.password" type="password" placeholder="请输入密码" prefix-icon="Lock" show-password @keyup.enter="handleLogin" />
        </el-form-item>

        <el-form-item>
          <div class="login-options">
            <el-checkbox v-model="formData.remember">记住密码</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="loading" style="width: 100%" @click="handleLogin">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const formRef = ref<FormInstance>()
const loading = ref(false)

const formData = reactive({
  username: '',
  password: '',
  remember: false,
})

const rules = reactive<FormRules>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 6, message: '密码至少6位', trigger: 'blur' }],
})

const handleLogin = async () => {
  await formRef.value?.validate()
  loading.value = true
  try {
    // TODO: 调用登录接口
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success('登录成功')
  } catch (error) {
    ElMessage.error('登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.login-card {
  width: 420px;
  border-radius: 12px;
}
.login-header {
  text-align: center;
  margin-bottom: 30px;
}
.login-header h2 {
  margin: 0 0 8px;
  font-size: 24px;
  color: #303133;
}
.login-header p {
  margin: 0;
  color: #909399;
  font-size: 14px;
}
.login-options {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>`,
  },
  {
    id: 'dashboard-page',
    name: '仪表盘页面',
    description: '包含统计卡片、图表区域的管理后台仪表盘',
    category: '仪表盘',
    icon: '📈',
    code: `<template>
  <div class="dashboard-container">
    <!-- 统计卡片 -->
    <el-row :gutter="16" class="stat-row">
      <el-col :span="6" v-for="item in statCards" :key="item.title">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-info">
              <p class="stat-title">{{ item.title }}</p>
              <p class="stat-value">{{ item.value }}</p>
              <p class="stat-desc">
                <span :class="item.trend > 0 ? 'trend-up' : 'trend-down'">
                  {{ item.trend > 0 ? '↑' : '↓' }} {{ Math.abs(item.trend) }}%
                </span>
                较昨日
              </p>
            </div>
            <el-icon class="stat-icon" :style="{ color: item.color }" :size="48">
              <component :is="item.icon" />
            </el-icon>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 内容区域 -->
    <el-row :gutter="16" style="margin-top: 16px">
      <el-col :span="16">
        <el-card shadow="never">
          <template #header>
            <span>趋势图</span>
          </template>
          <div class="chart-placeholder">图表区域 - 接入 ECharts</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never">
          <template #header>
            <span>快捷操作</span>
          </template>
          <div class="quick-actions">
            <el-button v-for="action in quickActions" :key="action.name" @click="action.handler" style="width: 100%; margin-bottom: 8px">
              {{ action.name }}
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 最近记录 -->
    <el-card shadow="never" style="margin-top: 16px">
      <template #header>
        <span>最近记录</span>
      </template>
      <el-table :data="recentRecords" stripe>
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="type" label="类型">
          <template #default="{ row }">
            <el-tag>{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="时间" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status === '成功' ? 'success' : 'danger'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const statCards = reactive([
  { title: '访问量', value: '12,345', trend: 12.5, color: '#409EFF', icon: 'View' },
  { title: '订单数', value: '1,234', trend: -3.2, color: '#67C23A', icon: 'ShoppingCart' },
  { title: '用户数', value: '5,678', trend: 8.1, color: '#E6A23C', icon: 'User' },
  { title: '收入', value: '¥98,765', trend: 15.3, color: '#F56C6C', icon: 'Money' },
])

const quickActions = reactive([
  { name: '新增用户', handler: () => {} },
  { name: '创建订单', handler: () => {} },
  { name: '数据导出', handler: () => {} },
  { name: '系统设置', handler: () => {} },
])

const recentRecords = ref<any[]>([])
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}
.stat-card {
  border-radius: 8px;
}
.stat-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.stat-title {
  color: #909399;
  font-size: 14px;
  margin: 0 0 8px;
}
.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #303133;
  margin: 0 0 4px;
}
.stat-desc {
  font-size: 12px;
  color: #909399;
  margin: 0;
}
.trend-up { color: #67C23A; }
.trend-down { color: #F56C6C; }
.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
  border-radius: 4px;
  color: #909399;
}
.quick-actions {
  display: flex;
  flex-direction: column;
}
</style>`,
  },
  {
    id: 'layout-sidebar',
    name: '侧边栏布局',
    description: '带侧边导航的经典后台管理布局',
    category: '布局',
    icon: '🏠',
    code: `<template>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '64px' : '220px'" class="layout-aside">
      <div class="logo">
        <h1 v-show="!isCollapse">Admin</h1>
        <h1 v-show="isCollapse">A</h1>
      </div>
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        router
      >
        <el-menu-item index="/dashboard">
          <el-icon><Odometer /></el-icon>
          <template #title>仪表盘</template>
        </el-menu-item>
        <el-sub-menu index="/system">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="/system/user">用户管理</el-menu-item>
          <el-menu-item index="/system/role">角色管理</el-menu-item>
          <el-menu-item index="/system/menu">菜单管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/content">
          <template #title>
            <el-icon><Document /></el-icon>
            <span>内容管理</span>
          </template>
          <el-menu-item index="/content/article">文章管理</el-menu-item>
          <el-menu-item index="/content/category">分类管理</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <!-- 主内容区 -->
    <el-container>
      <el-header class="layout-header">
        <div class="header-left">
          <el-icon class="collapse-btn" @click="isCollapse = !isCollapse" :size="20">
            <Fold v-if="!isCollapse" />
            <Expand v-else />
          </el-icon>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>当前页</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <el-badge :value="3" :max="99">
            <el-icon :size="20"><Bell /></el-icon>
          </el-badge>
          <el-dropdown>
            <span class="user-info">
              <el-avatar :size="32">U</el-avatar>
              <span>Admin</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-main class="layout-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isCollapse = ref(false)
const activeMenu = ref('/dashboard')
</script>

<style scoped>
.layout-container {
  height: 100vh;
}
.layout-aside {
  background-color: #304156;
  transition: width 0.3s;
  overflow: hidden;
}
.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: #263445;
}
.logo h1 {
  margin: 0;
  font-size: 18px;
}
.layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e6e6e6;
  background: #fff;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}
.collapse-btn {
  cursor: pointer;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.layout-main {
  background: #f0f2f5;
}
</style>`,
  },
];
