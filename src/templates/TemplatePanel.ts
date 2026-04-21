/**
 * 模版选择面板 - 使用 Webview 实现
 */
import * as vscode from 'vscode';
import { pageTemplates } from './templateData';

export class TemplatePanel {
  public static currentPanel: TemplatePanel | undefined;
  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];

  private constructor(panel: vscode.WebviewPanel, context: vscode.ExtensionContext) {
    this._panel = panel;

    this._panel.webview.html = this._getWebviewContent();

    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    this._panel.webview.onDidReceiveMessage(
      async (message) => {
        switch (message.command) {
          case 'insertTemplate': {
            const template = pageTemplates.find(t => t.id === message.templateId);
            if (template) {
              const editor = vscode.window.activeTextEditor;
              if (editor) {
                await editor.edit((editBuilder) => {
                  editBuilder.insert(editor.selection.active, template.code);
                });
                vscode.window.showInformationMessage(`模版 "${template.name}" 已插入`);
              } else {
                // 没有打开的编辑器，创建新文件
                const doc = await vscode.workspace.openTextDocument({
                  language: 'vue',
                  content: template.code,
                });
                await vscode.window.showTextDocument(doc);
                vscode.window.showInformationMessage(`模版 "${template.name}" 已创建`);
              }
            }
            this._panel.dispose();
            return;
          }
          case 'copyTemplate': {
            const template = pageTemplates.find(t => t.id === message.templateId);
            if (template) {
              await vscode.env.clipboard.writeText(template.code);
              vscode.window.showInformationMessage(`模版 "${template.name}" 已复制到剪贴板`);
            }
            return;
          }
          case 'createFile': {
            const template = pageTemplates.find(t => t.id === message.templateId);
            if (template) {
              const fileName = await vscode.window.showInputBox({
                prompt: '请输入文件名',
                value: `${template.id}.vue`,
                placeHolder: '例如: user-list.vue',
              });
              if (fileName) {
                const workspaceFolders = vscode.workspace.workspaceFolders;
                if (workspaceFolders) {
                  const filePath = vscode.Uri.joinPath(workspaceFolders[0].uri, 'src', 'views', fileName);
                  await vscode.workspace.fs.writeFile(filePath, Buffer.from(template.code, 'utf8'));
                  const doc = await vscode.workspace.openTextDocument(filePath);
                  await vscode.window.showTextDocument(doc);
                  vscode.window.showInformationMessage(`文件 ${fileName} 已创建`);
                }
              }
            }
            this._panel.dispose();
            return;
          }
        }
      },
      null,
      this._disposables
    );
  }

  public static createOrShow(context: vscode.ExtensionContext) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    if (TemplatePanel.currentPanel) {
      TemplatePanel.currentPanel._panel.reveal(column);
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      'elementPlusTemplates',
      'Element Plus 模版',
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
      }
    );

    TemplatePanel.currentPanel = new TemplatePanel(panel, context);
  }

  private dispose() {
    TemplatePanel.currentPanel = undefined;
    this._panel.dispose();
    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  private _getWebviewContent(): string {
    const categories = [...new Set(pageTemplates.map(t => t.category))];

    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Element Plus 模版</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f7fa;
      color: #303133;
      padding: 20px;
    }
    .header {
      text-align: center;
      margin-bottom: 24px;
    }
    .header h1 {
      font-size: 24px;
      color: #409EFF;
      margin-bottom: 8px;
    }
    .header p {
      color: #909399;
      font-size: 14px;
    }
    .category-tabs {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    .category-tab {
      padding: 6px 16px;
      border-radius: 20px;
      border: 1px solid #dcdfe6;
      background: #fff;
      cursor: pointer;
      font-size: 13px;
      transition: all 0.2s;
    }
    .category-tab:hover {
      border-color: #409EFF;
      color: #409EFF;
    }
    .category-tab.active {
      background: #409EFF;
      color: #fff;
      border-color: #409EFF;
    }
    .templates-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 16px;
    }
    .template-card {
      background: #fff;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.06);
      transition: all 0.3s;
      border: 2px solid transparent;
    }
    .template-card:hover {
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      border-color: #409EFF;
      transform: translateY(-2px);
    }
    .template-icon {
      font-size: 32px;
      margin-bottom: 12px;
    }
    .template-name {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 6px;
    }
    .template-desc {
      color: #909399;
      font-size: 13px;
      margin-bottom: 16px;
      line-height: 1.5;
    }
    .template-category {
      display: inline-block;
      padding: 2px 8px;
      background: #ecf5ff;
      color: #409EFF;
      border-radius: 4px;
      font-size: 12px;
      margin-bottom: 12px;
    }
    .template-actions {
      display: flex;
      gap: 8px;
    }
    .btn {
      flex: 1;
      padding: 8px 0;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      font-size: 13px;
      transition: all 0.2s;
    }
    .btn-primary {
      background: #409EFF;
      color: #fff;
    }
    .btn-primary:hover {
      background: #66b1ff;
    }
    .btn-success {
      background: #67C23A;
      color: #fff;
    }
    .btn-success:hover {
      background: #85ce61;
    }
    .btn-default {
      background: #f5f7fa;
      color: #606266;
      border: 1px solid #dcdfe6;
    }
    .btn-default:hover {
      color: #409EFF;
      border-color: #c6e2ff;
      background: #ecf5ff;
    }
    .hidden { display: none !important; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🧩 Element Plus 低代码模版</h1>
    <p>选择模版快速生成页面代码，支持插入编辑器、复制到剪贴板或创建新文件</p>
  </div>

  <div class="category-tabs">
    <div class="category-tab active" data-category="all" onclick="filterCategory('all', this)">全部</div>
    ${categories.map(cat => `<div class="category-tab" data-category="${cat}" onclick="filterCategory('${cat}', this)">${cat}</div>`).join('')}
  </div>

  <div class="templates-grid">
    ${pageTemplates.map(t => `
      <div class="template-card" data-category="${t.category}">
        <div class="template-icon">${t.icon}</div>
        <div class="template-category">${t.category}</div>
        <div class="template-name">${t.name}</div>
        <div class="template-desc">${t.description}</div>
        <div class="template-actions">
          <button class="btn btn-primary" onclick="insertTemplate('${t.id}')">插入</button>
          <button class="btn btn-success" onclick="createFile('${t.id}')">新建文件</button>
          <button class="btn btn-default" onclick="copyTemplate('${t.id}')">复制</button>
        </div>
      </div>
    `).join('')}
  </div>

  <script>
    const vscode = acquireVsCodeApi();

    function filterCategory(category, el) {
      document.querySelectorAll('.category-tab').forEach(tab => tab.classList.remove('active'));
      el.classList.add('active');

      document.querySelectorAll('.template-card').forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    }

    function insertTemplate(id) {
      vscode.postMessage({ command: 'insertTemplate', templateId: id });
    }

    function copyTemplate(id) {
      vscode.postMessage({ command: 'copyTemplate', templateId: id });
    }

    function createFile(id) {
      vscode.postMessage({ command: 'createFile', templateId: id });
    }
  </script>
</body>
</html>`;
  }
}
