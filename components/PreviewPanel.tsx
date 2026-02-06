'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface PreviewPanelProps {
  markdown: string
  template: string
  styleConfig: {
    fontSize: number
    lineHeight: number
    primaryColor: string
    secondaryColor: string
  }
}

export default function PreviewPanel({ markdown, template, styleConfig }: PreviewPanelProps) {
  const getTemplateStyles = () => {
    const baseStyles = {
      fontSize: `${styleConfig.fontSize}px`,
      lineHeight: styleConfig.lineHeight,
    }

    switch (template) {
      case 'editorial':
        return {
          ...baseStyles,
          backgroundColor: '#FAF7F2',
          color: '#2C2C2C',
          headingColor: '#1A1A1A',
          headingFont: '"Georgia", "Merriweather", serif',
          bodyFont: '"Georgia", "Times New Roman", serif',
          quoteBg: '#F5F1E8',
          quoteBorder: styleConfig.primaryColor,
          codeBg: '#F0EBE3',
          accent: styleConfig.primaryColor,
          templateClass: 'template-editorial',
        }
      case 'brutalist':
        return {
          ...baseStyles,
          backgroundColor: '#FFFFFF',
          color: '#000000',
          headingColor: '#000000',
          headingFont: '"JetBrains Mono", "Courier New", monospace',
          bodyFont: '"Arial", sans-serif',
          quoteBg: styleConfig.secondaryColor,
          quoteBorder: '#000000',
          codeBg: '#F0F0F0',
          accent: styleConfig.secondaryColor,
          templateClass: 'template-brutalist',
        }
      case 'glassmorphism':
        return {
          ...baseStyles,
          backgroundColor: '#E8F4F8',
          color: '#1E293B',
          headingColor: '#0F172A',
          headingFont: '"Inter", system-ui, sans-serif',
          bodyFont: '"Inter", system-ui, sans-serif',
          quoteBg: 'rgba(255, 255, 255, 0.5)',
          quoteBorder: styleConfig.primaryColor + '99',
          codeBg: 'rgba(255, 255, 255, 0.7)',
          accent: styleConfig.primaryColor,
          templateClass: 'template-glassmorphism',
        }
      case 'swiss':
        return {
          ...baseStyles,
          backgroundColor: '#FFFFFF',
          color: '#1A1A1A',
          headingColor: '#000000',
          headingFont: '"Helvetica Neue", "Arial", sans-serif',
          bodyFont: '"Helvetica Neue", "Arial", sans-serif',
          quoteBg: '#F5F5F5',
          quoteBorder: styleConfig.primaryColor,
          codeBg: '#F8F8F8',
          accent: styleConfig.primaryColor,
          templateClass: 'template-swiss',
        }
      case 'zen':
        return {
          ...baseStyles,
          backgroundColor: '#FAFAFA',
          color: '#4A4A4A',
          headingColor: '#2D2D2D',
          headingFont: '"Crimson Text", "Georgia", serif',
          bodyFont: '"Source Sans Pro", sans-serif',
          quoteBg: '#F0F0F0',
          quoteBorder: styleConfig.secondaryColor,
          codeBg: '#F5F5F5',
          accent: styleConfig.secondaryColor,
          templateClass: 'template-zen',
        }
      case 'news':
        return {
          ...baseStyles,
          backgroundColor: '#FFFFFF',
          color: '#333333',
          headingColor: '#1A1A1A',
          headingFont: '"PingFang SC", "Microsoft YaHei", sans-serif',
          bodyFont: '"PingFang SC", "Microsoft YaHei", sans-serif',
          quoteBg: '#F8F9FA',
          quoteBorder: styleConfig.primaryColor,
          codeBg: '#F5F5F5',
          accent: styleConfig.primaryColor,
          templateClass: 'template-news',
        }
      case 'academic':
        return {
          ...baseStyles,
          backgroundColor: '#FFFEF8',
          color: '#2C2C2C',
          headingColor: '#1A1A1A',
          headingFont: '"Times New Roman", "SimSun", serif',
          bodyFont: '"Times New Roman", "SimSun", serif',
          quoteBg: '#F5F5DC',
          quoteBorder: '#8B4513',
          codeBg: '#FAF0E6',
          accent: styleConfig.primaryColor,
          templateClass: 'template-academic',
        }
      case 'literary':
        return {
          ...baseStyles,
          backgroundColor: '#FFFAFA',
          color: '#4A4A4A',
          headingColor: '#8B0000',
          headingFont: '"KaiTi", "STKaiti", serif',
          bodyFont: '"FangSong", "STFangsong", serif',
          quoteBg: '#FFF8DC',
          quoteBorder: '#DAA520',
          codeBg: '#FAFAD2',
          accent: '#8B0000',
          templateClass: 'template-literary',
        }
      case 'modern':
        return {
          ...baseStyles,
          backgroundColor: '#F8F9FA',
          color: '#212529',
          headingColor: styleConfig.primaryColor,
          headingFont: '"SF Pro Display", -apple-system, sans-serif',
          bodyFont: '"SF Pro Text", -apple-system, sans-serif',
          quoteBg: 'linear-gradient(135deg, ' + styleConfig.primaryColor + '15 0%, ' + styleConfig.secondaryColor + '15 100%)',
          quoteBorder: styleConfig.primaryColor,
          codeBg: '#E9ECEF',
          accent: styleConfig.primaryColor,
          templateClass: 'template-modern',
        }
      case 'classic':
        return {
          ...baseStyles,
          backgroundColor: '#FFFFFF',
          color: '#2C3E50',
          headingColor: '#1A252F',
          headingFont: '"Arial", "Helvetica", sans-serif',
          bodyFont: '"Arial", "Helvetica", sans-serif',
          quoteBg: '#ECF0F1',
          quoteBorder: styleConfig.primaryColor,
          codeBg: '#F8F9FA',
          accent: styleConfig.primaryColor,
          templateClass: 'template-classic',
        }
      default:
        return baseStyles
    }
  }

  const styles = getTemplateStyles()

  return (
    <div className="h-[600px] overflow-y-auto">
      <div
        id="preview-content"
        className="wechat-article"
        style={{
          fontSize: styles.fontSize,
          lineHeight: styles.lineHeight,
          backgroundColor: styles.backgroundColor,
          color: styles.color,
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1
                style={{
                  color: styles.headingColor,
                  fontFamily: styles.headingFont,
                }}
                className={styles.templateClass}
              >
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2
                style={{
                  color: styles.headingColor,
                  fontFamily: styles.headingFont,
                  borderLeftColor: styles.accent,
                }}
                className={styles.templateClass}
              >
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3
                style={{
                  color: styles.headingColor,
                  fontFamily: styles.headingFont,
                }}
                className={styles.templateClass}
              >
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p style={{ fontFamily: styles.bodyFont }}>
                {children}
              </p>
            ),
            blockquote: ({ children }) => (
              <blockquote
                style={{
                  backgroundColor: styles.quoteBg,
                  borderLeftColor: styles.quoteBorder,
                  fontFamily: styles.bodyFont,
                }}
                className={styles.templateClass}
              >
                {children}
              </blockquote>
            ),
            code: ({ node, inline, className, children, ...props }: any) => {
              if (inline) {
                return (
                  <code
                    style={{
                      backgroundColor: styles.codeBg,
                      fontFamily: template === 'brutalist' ? '"JetBrains Mono", monospace' : 'inherit',
                    }}
                    className={styles.templateClass}
                    {...props}
                  >
                    {children}
                  </code>
                )
              }
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
            pre: ({ children }) => (
              <pre className={styles.templateClass}>{children}</pre>
            ),
            ul: ({ children }) => (
              <ul
                className="list-disc list-inside my-4"
                style={{ fontFamily: styles.bodyFont }}
              >
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol
                className="list-decimal list-inside my-4"
                style={{ fontFamily: styles.bodyFont }}
              >
                {children}
              </ol>
            ),
            li: ({ children }) => <li className="my-2">{children}</li>,
            strong: ({ children }) => (
              <strong style={{ color: styles.accent, fontFamily: styles.headingFont }}>
                {children}
              </strong>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                style={{
                  color: styles.accent,
                  fontFamily: styles.bodyFont,
                }}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.templateClass}
              >
                {children}
              </a>
            ),
            img: ({ src, alt }) => (
              <img
                src={src}
                alt={alt}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: template === 'glassmorphism' ? '12px' : '0',
                  boxShadow: template === 'brutalist' ? '4px 4px 0 #000' : 'none',
                }}
                className={styles.templateClass}
              />
            ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  )
}
