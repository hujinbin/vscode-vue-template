/**
 * Element Plus 代码自动联想 Provider
 */
import * as vscode from 'vscode';
import { elementPlusComponents, ElementPlusComponent } from './elementPlusComponents';

export class ElementPlusCompletionProvider implements vscode.CompletionItemProvider {
  /**
   * 组件标签联想
   */
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ): vscode.CompletionItem[] | undefined {
    const lineText = document.lineAt(position).text.substring(0, position.character);

    // 匹配 <el- 开头的标签
    const tagMatch = lineText.match(/<el-([\w-]*)$/);
    if (tagMatch !== null) {
      return this.getComponentCompletions(tagMatch[1]);
    }

    // 匹配组件属性联想: <el-xxx | 或 <el-xxx ... |
    const propMatch = lineText.match(/<el-([\w-]+)\s+[^>]*$/);
    if (propMatch !== null) {
      const component = elementPlusComponents.find(c => c.tag === `el-${propMatch[1]}`);
      if (component) {
        return this.getPropCompletions(component, lineText);
      }
    }

    // 匹配事件联想: @
    const eventMatch = lineText.match(/<el-([\w-]+)\s+[^>]*@([\w-]*)$/);
    if (eventMatch !== null) {
      const component = elementPlusComponents.find(c => c.tag === `el-${eventMatch[1]}`);
      if (component) {
        return this.getEventCompletions(component);
      }
    }

    return undefined;
  }

  /**
   * 获取组件标签补全
   */
  private getComponentCompletions(prefix: string): vscode.CompletionItem[] {
    return elementPlusComponents
      .filter(c => c.tag.startsWith(`el-${prefix}`))
      .map(component => {
        const item = new vscode.CompletionItem(component.tag, vscode.CompletionItemKind.Snippet);
        item.detail = component.name;
        item.documentation = new vscode.MarkdownString(component.description);
        item.insertText = new vscode.SnippetString(component.snippet);
        item.sortText = `0_${component.tag}`;
        item.command = {
          command: 'editor.action.triggerSuggest',
          title: '触发属性建议',
        };
        return item;
      });
  }

  /**
   * 获取组件属性补全
   */
  private getPropCompletions(component: ElementPlusComponent, lineText: string): vscode.CompletionItem[] {
    const items: vscode.CompletionItem[] = [];

    // 过滤掉已经写过的属性
    const existingProps = this.getExistingProps(lineText);

    // 属性
    for (const prop of component.props) {
      if (existingProps.has(prop.name)) {
        continue;
      }
      const item = new vscode.CompletionItem(prop.name, vscode.CompletionItemKind.Property);
      item.detail = `${prop.type}`;
      item.documentation = new vscode.MarkdownString(
        `**${prop.name}**\n\n${prop.description}${prop.default ? `\n\n默认值: \`${prop.default}\`` : ''}${prop.required ? '\n\n⚠️ **必填**' : ''}`
      );
      item.sortText = `1_${prop.name}`;

      // 如果属性是 boolean 类型，自动补全 =true 或 =false
      if (prop.type === 'boolean') {
        item.insertText = new vscode.SnippetString(`${prop.name}$1`);
      } else {
        item.insertText = new vscode.SnippetString(`${prop.name}="$1"`);
      }
      items.push(item);
    }

    // 事件
    for (const event of component.events) {
      if (existingProps.has(`@${event.name}`)) {
        continue;
      }
      const item = new vscode.CompletionItem(`@${event.name}`, vscode.CompletionItemKind.Event);
      item.detail = 'Event';
      item.documentation = new vscode.MarkdownString(
        `**@${event.name}**\n\n${event.description}${event.params ? `\n\n参数: \`${event.params}\`` : ''}`
      );
      item.insertText = new vscode.SnippetString(`@${event.name}="$1"`);
      item.sortText = `2_${event.name}`;
      items.push(item);
    }

    // 插槽
    for (const slot of component.slots) {
      const item = new vscode.CompletionItem(`#${slot.name}`, vscode.CompletionItemKind.Reference);
      item.detail = 'Slot';
      item.documentation = new vscode.MarkdownString(
        `**#${slot.name}**\n\n${slot.description}`
      );
      item.insertText = new vscode.SnippetString(`#${slot.name}>\n\t$1\n</template>`);
      item.filterText = slot.name;
      item.sortText = `3_${slot.name}`;
      items.push(item);
    }

    return items;
  }

  /**
   * 获取事件补全
   */
  private getEventCompletions(component: ElementPlusComponent): vscode.CompletionItem[] {
    return component.events.map(event => {
      const item = new vscode.CompletionItem(event.name, vscode.CompletionItemKind.Event);
      item.detail = 'Event';
      item.documentation = new vscode.MarkdownString(
        `**${event.name}**\n\n${event.description}${event.params ? `\n\n参数: \`${event.params}\`` : ''}`
      );
      item.insertText = new vscode.SnippetString(`${event.name}="$1"`);
      item.sortText = `0_${event.name}`;
      return item;
    });
  }

  /**
   * 解析已有属性，避免重复提示
   */
  private getExistingProps(lineText: string): Set<string> {
    const props = new Set<string>();
    const regex = /(?:@?)([\w-]+)=["']|(@?[\w-]+)\s/g;
    let match;
    while ((match = regex.exec(lineText)) !== null) {
      if (match[1]) {
        props.add(match[1]);
      }
      if (match[2]) {
        props.add(match[2]);
      }
    }
    return props;
  }
}
