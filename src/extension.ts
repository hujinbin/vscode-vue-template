// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vuequick" is now active!');

	// 创建标准Vue页面命令
	let newVuePageDisposable = vscode.commands.registerCommand('vuequick.newVuePage', (uri: vscode.Uri) => {
		// 显示输入框让用户输入文件名
		vscode.window.showInputBox({
			prompt: '请输入Vue页面文件名（无需.vue后缀）',
			placeHolder: '例如：HomePage'
		}).then((fileName) => {
			if (!fileName) return;

			// 确保文件名以.vue结尾
			const vueFileName = fileName.endsWith('.vue') ? fileName : `${fileName}.vue`;
			const filePath = path.join(uri.fsPath, vueFileName);

			// 创建标准Vue页面模板内容
			const vuePageContent = generateVuePageTemplate(fileName.replace('.vue', ''));

			// 写入文件
			fs.writeFile(filePath, vuePageContent, (err) => {
				if (err) {
					vscode.window.showErrorMessage(`创建文件失败: ${err.message}`);
					return;
				}

				// 打开创建的文件
				vscode.workspace.openTextDocument(filePath).then((doc) => {
					vscode.window.showTextDocument(doc);
					vscode.window.showInformationMessage(`Vue页面 ${vueFileName} 创建成功！`);
				});
			});
		});
	});

	context.subscriptions.push(newVuePageDisposable);
}

// 生成标准Vue页面模板内容
function generateVuePageTemplate(componentName: string): string {
	return `
<template>
  <div class="${componentName.toLowerCase()}-container">
    <div class="${componentName.toLowerCase()}-header">
      ${componentName} Page
    </div>
    <div class="${componentName.toLowerCase()}-content">
      <!-- 页面内容 -->
    </div>
    <div class="${componentName.toLowerCase()}-footer">
      <!-- 页脚内容 -->
    </div>
  </div>
</template>

<script>
export default {
  name: '${componentName}',
  components: {},
  props: {},
  data() {
    return {
      // 数据
    };
  },
  computed: {},
  watch: {},
  created() {
    // 组件创建时执行
  },
  mounted() {
    // 组件挂载时执行
  },
  methods: {
    // 方法
  }
}
</script>

<style scoped>
.${componentName.toLowerCase()}-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.${componentName.toLowerCase()}-header {
  padding: 16px;
  background-color: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
  font-size: 20px;
  font-weight: bold;
}

.${componentName.toLowerCase()}-content {
  flex: 1;
  padding: 16px;
  overflow: auto;
}

.${componentName.toLowerCase()}-footer {
  padding: 16px;
  background-color: #f5f7fa;
  border-top: 1px solid #e4e7ed;
  text-align: center;
  font-size: 14px;
  color: #909399;
}
</style>
`;
}

// this method is called when your extension is deactivated
export function deactivate() {}
