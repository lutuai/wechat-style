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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
        样式调整
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
        {/* 字号 */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
            字号: {styleConfig.fontSize}px
          </label>
          <input
            type="range"
            min="14"
            max="20"
            step="1"
            value={styleConfig.fontSize}
            onChange={(e) => handleStyleChange('fontSize', parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* 行高 */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
            行高: {styleConfig.lineHeight}
          </label>
          <input
            type="range"
            min="1.5"
            max="2.5"
            step="0.05"
            value={styleConfig.lineHeight}
            onChange={(e) => handleStyleChange('lineHeight', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
        💡 颜色主题请在上方的"主题配色"中选择
      </p>
    </div>
  )
}
