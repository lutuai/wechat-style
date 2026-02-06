'use client'

import { useState, useEffect, useRef } from 'react'
import ImageUpload from './ImageUpload'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [content, setContent] = useState(value)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    setContent(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setContent(newContent)
    onChange(newContent)
  }

  const handleInsertImage = (markdown: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = content

    const newText = text.substring(0, start) + markdown + text.substring(end)

    setContent(newText)
    onChange(newText)

    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + markdown.length, start + markdown.length)
    }, 0)
  }

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items

    for (let i = 0; i < items.length; i++) {
      const item = items[i]

      if (item.type.indexOf('image') !== -1) {
        e.preventDefault()

        const file = item.getAsFile()
        if (file) {
          if (file.size > 10 * 1024 * 1024) {
            alert('图片太大，请使用小于10MB的图片')
            return
          }

          try {
            const { compressImage, generateImageMarkdown } = await import('@/lib/imageUtils')
            const compressedDataUrl = await compressImage(file, 1080, 0.8)
            const markdown = generateImageMarkdown(compressedDataUrl, '粘贴的图片')
            handleInsertImage(markdown)
          } catch (error) {
            console.error('图片处理失败:', error)
            alert('图片处理失败：' + (error instanceof Error ? error.message : '未知错误'))
          }
        }
        break
      }
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const { compressImage, generateImageMarkdown } = await import('@/lib/imageUtils')

      try {
        const compressedDataUrl = await compressImage(file, 1080, 0.8)
        const markdown = generateImageMarkdown(compressedDataUrl, file.name.replace(/\.[^/.]+$/, ''))
        handleInsertImage(markdown)
      } catch (error) {
        console.error('图片处理失败:', error)
        alert('图片处理失败，请重试')
      }
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  return (
    <div className="h-[600px] flex flex-col">
      <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-900 flex items-center gap-2">
        <ImageUpload onInsert={handleInsertImage} />
        <div className="flex-1" />
        <span className="text-xs text-gray-500">支持拖拽和粘贴图片</span>
      </div>

      <div className={`flex-1 relative ${isDragging ? 'ring-2 ring-blue-500' : ''}`}>
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleChange}
          onPaste={handlePaste}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className="w-full h-full p-4 resize-none focus:outline-none font-mono text-sm leading-relaxed"
          placeholder="在此输入 Markdown 内容...&#10;&#10;💡 提示：&#10;- 直接粘贴图片 (Ctrl+V)&#10;- 拖拽图片到编辑器&#10;- 点击上方图片按钮上传"
          spellCheck={false}
        />

        {isDragging && (
          <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center border-2 border-dashed border-blue-500 rounded-lg">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-lg font-semibold text-blue-600">释放以添加图片</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
