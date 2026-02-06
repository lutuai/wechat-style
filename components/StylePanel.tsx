'use client'

interface StylePanelProps {
  styleConfig: {
    fontSize: number
    lineHeight: number
    primaryColor: string
    secondaryColor: string
  }
  onStyleChange: (config: any) => void
}

export default function StylePanel({ styleConfig, onStyleChange }: StylePanelProps) {
  const handleStyleChange = (key: string, value: any) => {
    onStyleChange({
      ...styleConfig,
      [key]: value,
    })
  }

  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-3">
        <label className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
          字号: {styleConfig.fontSize}px
        </label>
        <input
          type="range"
          min="14"
          max="20"
          step="1"
          value={styleConfig.fontSize}
          onChange={(e) => handleStyleChange('fontSize', parseInt(e.target.value))}
          className="w-24"
        />
      </div>

      <div className="flex items-center gap-3">
        <label className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
          行高: {styleConfig.lineHeight}
        </label>
        <input
          type="range"
          min="1.5"
          max="2.5"
          step="0.05"
          value={styleConfig.lineHeight}
          onChange={(e) => handleStyleChange('lineHeight', parseFloat(e.target.value))}
          className="w-24"
        />
      </div>
    </div>
  )
}
