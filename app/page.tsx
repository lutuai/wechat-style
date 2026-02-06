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

  const [showToast, setShowToast] = useState(false)

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
    if (!previewElement) return

    const clone = previewElement.cloneNode(true) as HTMLElement
    clone.style.maxWidth = '677px'
    clone.style.margin = '0 auto'
    clone.style.padding = '20px'

    const elements = previewElement.querySelectorAll('*')
    const cloneElements = clone.querySelectorAll('*')
    let hasBase64Images = false

    elements.forEach((originalEl, index) => {
      const cloneEl = cloneElements[index] as HTMLElement
      if (!cloneEl) return

      const computedStyle = window.getComputedStyle(originalEl)
      const tagName = originalEl.tagName.toLowerCase()

      cloneEl.style.color = computedStyle.color
      cloneEl.style.backgroundColor = computedStyle.backgroundColor
      cloneEl.style.fontFamily = computedStyle.fontFamily
      cloneEl.style.fontSize = computedStyle.fontSize
      cloneEl.style.lineHeight = computedStyle.lineHeight
      cloneEl.style.fontWeight = computedStyle.fontWeight
      cloneEl.style.padding = computedStyle.padding
      cloneEl.style.margin = computedStyle.margin
      cloneEl.style.border = computedStyle.border
      cloneEl.style.borderLeft = computedStyle.borderLeft
      cloneEl.style.borderLeftColor = computedStyle.borderLeftColor
      cloneEl.style.borderLeftWidth = computedStyle.borderLeftWidth
      cloneEl.style.borderLeftStyle = computedStyle.borderLeftStyle
      cloneEl.style.borderRadius = computedStyle.borderRadius
      cloneEl.style.textAlign = computedStyle.textAlign
      cloneEl.style.textDecoration = computedStyle.textDecoration

      if (tagName === 'img') {
        const imgEl = originalEl as HTMLImageElement
        if (imgEl.src && imgEl.src.startsWith('data:')) {
          hasBase64Images = true
        }
        cloneEl.style.maxWidth = computedStyle.maxWidth
        cloneEl.style.height = computedStyle.height
        cloneEl.style.borderRadius = computedStyle.borderRadius
        cloneEl.style.boxShadow = computedStyle.boxShadow
      }
    })

    const htmlContent = clone.innerHTML

    if (hasBase64Images) {
      const proceed = confirm('⚠️ 检测到Base64图片\n\n微信公众号不支持直接粘贴Base64图片。\n\n建议：\n1. 先复制HTML文字内容\n2. 然后手动拖拽图片到微信编辑器\n\n是否继续复制？')
      if (!proceed) return
    }

    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([htmlContent], { type: 'text/html' }),
          'text/plain': new Blob([previewElement.innerText], { type: 'text/plain' })
        })
      ])
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    } catch (err) {
      console.error('Clipboard API失败，尝试备用方案:', err)

      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = htmlContent
      tempDiv.style.position = 'fixed'
      tempDiv.style.left = '-9999px'
      document.body.appendChild(tempDiv)

      const range = document.createRange()
      range.selectNodeContents(tempDiv)
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)

      try {
        document.execCommand('copy')
        setShowToast(true)
        setTimeout(() => setShowToast(false), 2000)
      } catch (e) {
        console.error('❌ 复制失败', e)
      }

      selection.removeAllRanges()
      document.body.removeChild(tempDiv)
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

        {/* Theme Selector and Style Panel */}
        <div className="mb-4 flex flex-wrap gap-4">
          {templateThemes[selectedTemplate as keyof typeof templateThemes] && (
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3">
              <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                主题配色 - {templates.find(t => t.id === selectedTemplate)?.name}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {templateThemes[selectedTemplate as keyof typeof templateThemes].map((theme, index) => (
                  <button
                    key={index}
                    onClick={() => handleThemeChange(index)}
                    className={`
                      flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all
                      ${
                        selectedTheme === index
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }
                    `}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border-2 border-white shadow"
                      style={{ backgroundColor: theme.primary }}
                    />
                    <span className="text-sm font-medium">{theme.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3">
            <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              样式调整
            </h3>
            <StylePanel
              styleConfig={styleConfig}
              onStyleChange={setStyleConfig}
            />
          </div>
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
            <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3 bg-gray-50 dark:bg-gray-900 flex items-center justify-between">
              <h2 className="font-semibold text-gray-700 dark:text-gray-300">实时预览</h2>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <Copy size={18} />
                <span>复制HTML</span>
              </button>
            </div>
            <PreviewPanel
              markdown={markdown}
              template={selectedTemplate}
              styleConfig={styleConfig}
            />
          </div>
        </div>
      </div>

      {showToast && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-green-500 text-white px-8 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in-0 zoom-in-95">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium text-lg">复制成功！</span>
          </div>
        </div>
      )}
    </div>
  )
}
