export async function compressImage(file: File, maxWidth: number = 1080, quality: number = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('文件不是图片格式'))
      return
    }

    const reader = new FileReader()

    reader.onload = (e) => {
      const img = new Image()

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height

          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }

          canvas.width = width
          canvas.height = height

          const ctx = canvas.getContext('2d')
          if (!ctx) {
            reject(new Error('无法获取canvas上下文'))
            return
          }

          ctx.drawImage(img, 0, 0, width, height)

          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality)
          resolve(compressedDataUrl)
        } catch (error) {
          reject(new Error('图片压缩失败：' + (error instanceof Error ? error.message : '未知错误')))
        }
      }

      img.onerror = () => {
        reject(new Error('图片加载失败，可能是格式不支持'))
      }

      img.src = e.target?.result as string
    }

    reader.onerror = () => {
      reject(new Error('文件读取失败'))
    }

    try {
      reader.readAsDataURL(file)
    } catch (error) {
      reject(new Error('文件读取失败：' + (error instanceof Error ? error.message : '未知错误')))
    }
  })
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

export function generateImageMarkdown(dataUrl: string, alt: string = '图片'): string {
  return `
![${alt}](${dataUrl})
`
}
