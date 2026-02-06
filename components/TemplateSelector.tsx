'use client'

interface Template {
  id: string
  name: string
  icon: string
}

interface TemplateSelectorProps {
  templates: Template[]
  selectedTemplate: string
  onTemplateChange: (templateId: string) => void
}

export default function TemplateSelector({
  templates,
  selectedTemplate,
  onTemplateChange,
}: TemplateSelectorProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        选择模板
      </h3>
      <div className="flex flex-wrap gap-2">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onTemplateChange(template.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg transition-all
              ${
                selectedTemplate === template.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }
            `}
          >
            <span className="text-xl">{template.icon}</span>
            <span className="font-medium">{template.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
