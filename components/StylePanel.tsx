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

  const colorOptions = [
    { name: '蓝色', value: '#3B82F6' },
    { name: '紫色', value: '#8B5CF6' },
    { name: '绿色', value: '#10B981' },
    { name: '橙色', value: '#F59E0B' },
    { name: '红色', value: '#EF4444' },
    { name: '青色', value: '#06B6D4' },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
        样式调整
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

        {/* 主色调 */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
            主色调
          </label>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                onClick={() => handleStyleChange('primaryColor', color.value)}
                className={`
                  w-8 h-8 rounded-full border-2 transition-all
                  ${styleConfig.primaryColor === color.value ? 'border-gray-900 scale-110' : 'border-gray-300'}
                `}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* 强调色 */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
            强调色
          </label>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                onClick={() => handleStyleChange('secondaryColor', color.value)}
                className={`
                  w-8 h-8 rounded-full border-2 transition-all
                  ${styleConfig.secondaryColor === color.value ? 'border-gray-900 scale-110' : 'border-gray-300'}
                `}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
