import * as vscode from 'vscode';
import { ElementPlusCompletionProvider } from './completion/ElementPlusCompletionProvider';
import { ElementPlusSnippetProvider } from './snippets/SnippetProvider';
import { TemplatePanel } from './templates/TemplatePanel';

export function activate(context: vscode.ExtensionContext) {
  console.log('Element Plus Low-Code Tool is now active!');

  // ========== 1. 注册代码自动联想 ==========
  const completionProvider = new ElementPlusCompletionProvider();

  // 在 Vue 和 HTML 文件中注册组件标签联想
  const vueSelector: vscode.DocumentSelector = [
    { scheme: 'file', language: 'vue' },
    { scheme: 'file', language: 'html' },
  ];

  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      vueSelector,
      completionProvider,
      '-', // 输入 el- 时触发
      ' ', // 空格触发属性联想
      '@'  // @ 触发事件联想
    )
  );

  // ========== 2. 注册代码片段联想 ==========
  const snippetProvider = new ElementPlusSnippetProvider();

  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      vueSelector,
      snippetProvider
    )
  );

  // ========== 3. 注册模版面板命令 ==========
  const openTemplatePanelCmd = vscode.commands.registerCommand(
    'vuequick.openTemplatePanel',
    () => {
      TemplatePanel.createOrShow(context);
    }
  );

  // ========== 4. 注册快速插入模版命令 ==========
  const quickInsertCmd = vscode.commands.registerCommand(
    'vuequick.quickInsertTemplate',
    async () => {
      const templateItems = [
        { label: '$(table) CRUD 表格页面', description: '包含搜索、表格、分页、弹窗的完整 CRUD 页面', id: 'crud-table' },
        { label: '$(file-code) 表单页面', description: '包含各种表单控件的完整表单页面', id: 'form-page' },
        { label: '$(info) 详情页面', description: '使用描述列表展示详细信息的页面', id: 'detail-page' },
        { label: '$(key) 登录页面', description: '简洁美观的登录页面', id: 'login-page' },
        { label: '$(graph) 仪表盘页面', description: '包含统计卡片、图表区域的管理后台仪表盘', id: 'dashboard-page' },
        { label: '$(layout-sidebar) 侧边栏布局', description: '带侧边导航的经典后台管理布局', id: 'layout-sidebar' },
      ];

      const selected = await vscode.window.showQuickPick(templateItems, {
        placeHolder: '选择要插入的模版',
        title: 'Element Plus 快速模版',
      });

      if (selected) {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
          const { pageTemplates } = require('./templates/templateData');
          const template = (pageTemplates as any[]).find((t: any) => t.id === selected.id);
          if (template) {
            await editor.edit((editBuilder) => {
              editBuilder.insert(editor.selection.active, template.code);
            });
            vscode.window.showInformationMessage(`模版 "${template.name}" 已插入`);
          }
        } else {
          vscode.window.showWarningMessage('请先打开一个文件');
        }
      }
    }
  );

  // ========== 5. 注册复制模版到剪贴板命令 ==========
  const copyTemplateCmd = vscode.commands.registerCommand(
    'vuequick.copyTemplateToClipboard',
    async () => {
      const templateItems = [
        { label: '$(table) CRUD 表格页面', id: 'crud-table' },
        { label: '$(file-code) 表单页面', id: 'form-page' },
        { label: '$(info) 详情页面', id: 'detail-page' },
        { label: '$(key) 登录页面', id: 'login-page' },
        { label: '$(graph) 仪表盘页面', id: 'dashboard-page' },
        { label: '$(layout-sidebar) 侧边栏布局', id: 'layout-sidebar' },
      ];

      const selected = await vscode.window.showQuickPick(templateItems, {
        placeHolder: '选择要复制的模版',
        title: '复制模版到剪贴板',
      });

      if (selected) {
        const { pageTemplates } = require('./templates/templateData');
        const template = (pageTemplates as any[]).find((t: any) => t.id === selected.id);
        if (template) {
          await vscode.env.clipboard.writeText(template.code);
          vscode.window.showInformationMessage(`模版 "${template.name}" 已复制到剪贴板`);
        }
      }
    }
  );

  // ========== 6. 注册创建模版文件命令 ==========
  const createTemplateFileCmd = vscode.commands.registerCommand(
    'vuequick.createTemplateFile',
    async (uri?: vscode.Uri) => {
      const templateItems = [
        { label: '$(table) CRUD 表格页面', id: 'crud-table' },
        { label: '$(file-code) 表单页面', id: 'form-page' },
        { label: '$(info) 详情页面', id: 'detail-page' },
        { label: '$(key) 登录页面', id: 'login-page' },
        { label: '$(graph) 仪表盘页面', id: 'dashboard-page' },
        { label: '$(layout-sidebar) 侧边栏布局', id: 'layout-sidebar' },
      ];

      const selected = await vscode.window.showQuickPick(templateItems, {
        placeHolder: '选择要创建的模版',
        title: '创建模版文件',
      });

      if (selected) {
        const { pageTemplates } = require('./templates/templateData');
        const template = (pageTemplates as any[]).find((t: any) => t.id === selected.id);
        if (template) {
          const fileName = await vscode.window.showInputBox({
            prompt: '请输入文件名',
            value: `${selected.id}.vue`,
            placeHolder: '例如: user-list.vue',
          });

          if (fileName) {
            let targetDir: vscode.Uri;
            if (uri && uri.fsPath) {
              // 右键菜单选择的是文件夹
              const stat = await vscode.workspace.fs.stat(uri);
              if (stat.type === vscode.FileType.Directory) {
                targetDir = uri;
              } else {
                targetDir = vscode.Uri.file(require('path').dirname(uri.fsPath));
              }
            } else {
              // 没有右键上下文，默认放在 src/views
              const workspaceFolders = vscode.workspace.workspaceFolders;
              if (workspaceFolders) {
                targetDir = vscode.Uri.joinPath(workspaceFolders[0].uri, 'src', 'views');
                // 确保 views 目录存在
                try {
                  await vscode.workspace.fs.stat(targetDir);
                } catch {
                  await vscode.workspace.fs.createDirectory(targetDir);
                }
              } else {
                vscode.window.showWarningMessage('请先打开一个工作区');
                return;
              }
            }

            const filePath = vscode.Uri.joinPath(targetDir, fileName);
            // 检查文件是否存在
            try {
              await vscode.workspace.fs.stat(filePath);
              const overwrite = await vscode.window.showWarningMessage(
                `文件 ${fileName} 已存在，是否覆盖？`,
                '覆盖', '取消'
              );
              if (overwrite !== '覆盖') {
                return;
              }
            } catch {
              // 文件不存在，可以直接创建
            }

            await vscode.workspace.fs.writeFile(filePath, Buffer.from(template.code, 'utf8'));
            const doc = await vscode.workspace.openTextDocument(filePath);
            await vscode.window.showTextDocument(doc);
            vscode.window.showInformationMessage(`文件 ${fileName} 已创建`);
          }
        }
      }
    }
  );

  context.subscriptions.push(
    openTemplatePanelCmd,
    quickInsertCmd,
    copyTemplateCmd,
    createTemplateFileCmd
  );
}

export function deactivate() {}
