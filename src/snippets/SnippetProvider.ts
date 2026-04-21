/**
 * Element Plus Snippets Provider
 * 在 Vue 文件中通过前缀触发代码片段
 */
import * as vscode from 'vscode';
import { elementPlusSnippets } from './snippetDefinitions';

export class ElementPlusSnippetProvider implements vscode.CompletionItemProvider {
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.CompletionItem[] {
    // 只在 Vue/HTML 文件中生效
    const lang = document.languageId;
    if (lang !== 'vue' && lang !== 'html') {
      return [];
    }

    const lineText = document.lineAt(position).text.substring(0, position.character);

    // 检测是否在 <script> 或 <template> 标签内输入
    return elementPlusSnippets
      .filter(snippet => lineText.endsWith(snippet.prefix) || snippet.prefix.startsWith(lineText.trim()))
      .map(snippet => {
        const item = new vscode.CompletionItem(snippet.prefix, vscode.CompletionItemKind.Snippet);
        item.detail = snippet.name;
        item.documentation = new vscode.MarkdownString(snippet.description);
        item.insertText = new vscode.SnippetString(snippet.body.join('\n'));
        // 移除已输入的前缀
        const prefixLength = lineText.trim().length;
        item.range = new vscode.Range(
          position.translate(0, -prefixLength),
          position
        );
        item.sortText = `0_${snippet.prefix}`;
        return item;
      });
  }
}
