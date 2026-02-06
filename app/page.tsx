'use client'

import { useState } from 'react'
import MarkdownEditor from '@/components/MarkdownEditor'
import PreviewPanel from '@/components/PreviewPanel'
import TemplateSelector from '@/components/TemplateSelector'
import StylePanel from '@/components/StylePanel'
import { Copy, Download, Sun } from 'lucide-react'

export default function Home() {
  const [markdown, setMarkdown] = useState(`# 欢迎使用微信公众号排版工具

## 开始创作

这是一个简单易用的排版工具，让你的文章更美观。

### 功能特点

- 📝 Markdown 编辑
- 🎨 多种精美模板
- ⚡ 实时预览
- 📋 一键复制

### 开始使用

在左侧输入 Markdown 文本，右侧实时预览排版效果。

> 选择合适的模板，让你的文章脱颖而出！
`)

  const [selectedTemplate, setSelectedTemplate] = useState('editorial')
  const [styleConfig, setStyleConfig] = useState({
    fontSize: 16,
    lineHeight: 1.75,
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
  })

  const templates = [
    { id: 'editorial', name: '杂志风', icon: '📰' },
    { id: 'brutalist', name: '野兽派', icon: '🎨' },
    { id: 'glassmorphism', name: '毛玻璃', icon: '🔮' },
    { id: 'swiss', name: '瑞士设计', icon: '🇨🇭' },
    { id: 'zen', name: '禅意', icon: '☯️' },
  ]

  const handleCopy = async () => {
    const previewElement = document.getElementById('preview-content')
    if (previewElement) {
      const computedStyles = window.getComputedStyle(previewElement)

      const inlineStyledHtml = previewElement.innerHTML.replace(/<([a-z][a-z0-9]*)\s+([^>]*?)>/gi, (match, tag, attrs) => {
        const element = document.createElement(tag)

        if (tag === 'h1' || tag === 'h2' || tag === 'h3') {
          element.style.fontFamily = computedStyles.getPropertyValue('--heading-font') || 'inherit'
          element.style.color = computedStyles.color || 'inherit'
        }

        if (tag === 'p') {
          element.style.fontFamily = computedStyles.getPropertyValue('--body-font') || 'inherit'
          element.style.fontSize = computedStyles.fontSize || '16px'
          element.style.lineHeight = computedStyles.lineHeight || '1.75'
          element.style.color = computedStyles.color || '#333'
        }

        if (tag === 'blockquote') {
          element.style.backgroundColor = computedStyles.backgroundColor || '#f5f5f5'
          element.style.borderLeftColor = computedStyles.borderLeftColor || '#888'
          element.style.padding = '10px 15px'
          element.style.margin = '15px 0'
        }

        if (tag === 'code') {
          element.style.backgroundColor = '#f5f5f5'
          element.style.padding = '2px 6px'
          element.style.borderRadius = '3px'
          element.style.fontFamily = 'monospace'
        }

        if (tag === 'strong' || tag === 'b') {
          element.style.color = styleConfig.primaryColor
        }

        if (tag === 'a') {
          element.style.color = styleConfig.primaryColor
          element.style.textDecoration = 'underline'
        }

        return `<${tag}${attrs}>`
      })

      const fullHtml = `
        <section style="max-width: 677px; margin: 0 auto; padding: 20px; background: ${previewElement.style.backgroundColor || '#fff'}; font-size: ${styleConfig.fontSize}px; line-height: ${styleConfig.lineHeight}; color: ${previewElement.style.color || '#333'};">
          ${inlineStyledHtml}
        </section>
      `

      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': new Blob([fullHtml], { type: 'text/html' }),
            'text/plain': new Blob([previewElement.innerText], { type: 'text/plain' })
          })
        ])
        alert('✅ 已复制HTML到剪贴板！\n\n直接粘贴到微信公众号编辑器即可使用')
      } catch (err) {
        console.error('复制失败:', err)

        const textArea = document.createElement('textarea')
        textArea.value = fullHtml
        document.body.appendChild(textArea)
        textArea.select()
        try {
          document.execCommand('copy')
          alert('✅ 已复制HTML到剪贴板！\n\n直接粘贴到微信公众号编辑器即可使用')
        } catch (e) {
          alert('❌ 复制失败，请手动选择预览区域内容复制')
        }
        document.body.removeChild(textArea)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-[1800px] mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">微</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">微信公众号排版工具</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">智能排版，一键生成</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <Copy size={18} />
              <span>复制HTML</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto p-4">
        {/* Template Selector */}
        <div className="mb-4">
          <TemplateSelector
            templates={templates}
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
          />
        </div>

        {/* Editor and Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Panel - Editor */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3 bg-gray-50 dark:bg-gray-900">
              <h2 className="font-semibold text-gray-700 dark:text-gray-300">Markdown 编辑器</h2>
            </div>
            <MarkdownEditor
              value={markdown}
              onChange={setMarkdown}
            />
          </div>

          {/* Right Panel - Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3 bg-gray-50 dark:bg-gray-900">
              <h2 className="font-semibold text-gray-700 dark:text-gray-300">实时预览</h2>
            </div>
            <PreviewPanel
              markdown={markdown}
              template={selectedTemplate}
              styleConfig={styleConfig}
            />
          </div>
        </div>

        {/* Style Panel */}
        <div className="mt-4">
          <StylePanel
            styleConfig={styleConfig}
            onStyleChange={setStyleConfig}
          />
        </div>
      </div>
    </div>
  )
}
