'use client'

import { useState, useEffect } from 'react'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [content, setContent] = useState(value)

  useEffect(() => {
    setContent(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setContent(newContent)
    onChange(newContent)
  }

  return (
    <div className="h-[600px]">
      <textarea
        value={content}
        onChange={handleChange}
        className="w-full h-full p-4 resize-none focus:outline-none font-mono text-sm leading-relaxed"
        placeholder="在此输入 Markdown 内容..."
        spellCheck={false}
      />
    </div>
  )
}
