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

  const [selectedTemplate, setSelectedTemplate] = useState('news')
  const [styleConfig, setStyleConfig] = useState({
    fontSize: 16,
    lineHeight: 1.75,
    primaryColor: '#0066CC',
    secondaryColor: '#00A0E9',
  })

  const templates = [
    { id: 'editorial', name: '杂志风', icon: '📰', category: 'editorial' },
    { id: 'brutalist', name: '野兽派', icon: '🎨', category: 'creative' },
    { id: 'glassmorphism', name: '毛玻璃', icon: '🔮', category: 'creative' },
    { id: 'swiss', name: '瑞士设计', icon: '🇨🇭', category: 'minimal' },
    { id: 'zen', name: '禅意', icon: '☯️', category: 'minimal' },
    { id: 'news', name: '新闻资讯', icon: '📰', category: 'business' },
    { id: 'academic', name: '学术论文', icon: '📚', category: 'formal' },
    { id: 'literary', name: '简约文艺', icon: '🌸', category: 'literary' },
    { id: 'modern', name: '现代科技', icon: '⚡', category: 'tech' },
    { id: 'classic', name: '经典商务', icon: '💼', category: 'business' },
  ]

  const templateThemes = {
    editorial: [
      { name: '酒红', primary: '#722F37', secondary: '#8B3A43' },
      { name: '深蓝', primary: '#1E3A5F', secondary: '#2C5282' },
      { name: '墨绿', primary: '#2D5A3D', secondary: '#3D7A52' },
    ],
    brutalist: [
      { name: '黄黑', primary: '#000000', secondary: '#FFD600' },
      { name: '红白', primary: '#000000', secondary: '#FF0000' },
      { name: '蓝白', primary: '#000000', secondary: '#0066FF' },
    ],
    glassmorphism: [
      { name: '紫蓝', primary: '#6366F1', secondary: '#8B5CF6' },
      { name: '青绿', primary: '#06B6D4', secondary: '#10B981' },
      { name: '粉橙', primary: '#F43F5E', secondary: '#F97316' },
    ],
    swiss: [
      { name: '经典红', primary: '#FF3B30', secondary: '#FF6B6B' },
      { name: '瑞士蓝', primary: '#007AFF', secondary: '#5AC8FA' },
      { name: '活力黄', primary: '#FFCC00', secondary: '#FFD60A' },
    ],
    zen: [
      { name: '禅意棕', primary: '#8B7355', secondary: '#A0896C' },
      { name: '青灰', primary: '#5F8D78', secondary: '#7BA89C' },
      { name: '墨韵', primary: '#4A5568', secondary: '#718096' },
    ],
    news: [
      { name: '科技蓝', primary: '#0066CC', secondary: '#00A0E9' },
      { name: '财经绿', primary: '#00A86B', secondary: '#20B2AA' },
      { name: '热门红', primary: '#E60012', secondary: '#FF6B6B' },
      { name: '深空灰', primary: '#2C3E50', secondary: '#34495E' },
    ],
    academic: [
      { name: '学术蓝', primary: '#003366', secondary: '#0055A4' },
      { name: '严谨黑', primary: '#1A1A1A', secondary: '#4A4A4A' },
      { name: '经典棕', primary: '#8B4513', secondary: '#A0522D' },
    ],
    literary: [
      { name: '古韵红', primary: '#8B0000', secondary: '#B22222' },
      { name: '水墨青', primary: '#2F4F4F', secondary: '#696969' },
      { name: '桃花粉', primary: '#DB7093', secondary: '#E9967A' },
    ],
    modern: [
      { name: '科技紫', primary: '#8B5CF6', secondary: '#A78BFA' },
      { name: '未来蓝', primary: '#0EA5E9', secondary: '#38BDF8' },
      { name: '活力橙', primary: '#F97316', secondary: '#FB923C' },
      { name: '渐变绿', primary: '#10B981', secondary: '#34D399' },
    ],
    classic: [
      { name: '商务蓝', primary: '#1E40AF', secondary: '#3B82F6' },
      { name: '稳重灰', primary: '#374151', secondary: '#6B7280' },
      { name: '精英绿', primary: '#047857', secondary: '#059669' },
    ],
  }

  const [selectedTheme, setSelectedTheme] = useState(0)

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId)
    setSelectedTheme(0)
    const themes = templateThemes[templateId as keyof typeof templateThemes]
    if (themes && themes[0]) {
      setStyleConfig({
        ...styleConfig,
        primaryColor: themes[0].primary,
        secondaryColor: themes[0].secondary,
      })
    }
  }

  const handleThemeChange = (themeIndex: number) => {
    setSelectedTheme(themeIndex)
    const themes = templateThemes[selectedTemplate as keyof typeof templateThemes]
    if (themes && themes[themeIndex]) {
      setStyleConfig({
        ...styleConfig,
        primaryColor: themes[themeIndex].primary,
        secondaryColor: themes[themeIndex].secondary,
      })
    }
  }

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
            onTemplateChange={handleTemplateChange}
          />
        </div>

        {/* Theme Selector */}
        {templateThemes[selectedTemplate as keyof typeof templateThemes] && (
          <div className="mb-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              主题配色 - {templates.find(t => t.id === selectedTemplate)?.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {templateThemes[selectedTemplate as keyof typeof templateThemes].map((theme, index) => (
                <button
                  key={index}
                  onClick={() => handleThemeChange(index)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                    ${
                      selectedTheme === index
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }
                  `}
                >
                  <span
                    className="w-4 h-4 rounded-full border-2 border-white shadow"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <span className="font-medium">{theme.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

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
