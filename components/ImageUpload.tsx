'use client'

import { useState, useRef } from 'react'
import { Image, Upload, X } from 'lucide-react'
import { compressImage, formatFileSize, generateImageMarkdown } from '@/lib/imageUtils'

interface ImageUploadProps {
  onInsert: (markdown: string) => void
}

export default function ImageUpload({ onInsert }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('图片大小不能超过10MB')
      return
    }

    setIsUploading(true)
    setPreview(null)

    try {
      const compressedDataUrl = await compressImage(file, 1080, 0.8)
      setPreview(compressedDataUrl)

      const markdown = generateImageMarkdown(compressedDataUrl, file.name.replace(/\.[^/.]+$/, ''))
      onInsert(markdown)
    } catch (error) {
      console.error('图片处理失败:', error)
      alert('图片处理失败，请重试')
    } finally {
      setIsUploading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
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

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />

      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        title="插入图片"
      >
        <Image size={18} />
        <span className="text-sm">图片</span>
      </button>

      {(isDragging || isUploading) && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            fixed inset-0 bg-black/50 flex items-center justify-center z-50
            ${isDragging ? 'cursor-copy' : 'cursor-wait'}
          `}
        >
          <div className="bg-white rounded-2xl p-12 shadow-2xl text-center">
            {isUploading ? (
              <div className="space-y-4">
                <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
                <p className="text-lg font-medium text-gray-700">正在处理图片...</p>
                <p className="text-sm text-gray-500">压缩中，请稍候</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload size={48} className="mx-auto text-blue-500" />
                <p className="text-lg font-medium text-gray-700">拖放图片到这里</p>
                <p className="text-sm text-gray-500">支持 JPG、PNG、GIF 格式</p>
              </div>
            )}
          </div>
        </div>
      )}

      {preview && !isUploading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">图片已添加</h3>
              <button
                onClick={() => setPreview(null)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <img
                src={preview}
                alt="预览"
                className="w-full rounded-lg"
              />
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>图片已插入到编辑器</span>
                <button
                  onClick={() => setPreview(null)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  确定
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
