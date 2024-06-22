import { message } from 'ant-design-vue'
export const DownloadBlob = (responseBlob: Blob, filename: string) => {
  try {
    // 创建一个指向Blob的URL
    const url = window.URL.createObjectURL(responseBlob)
    // 创建一个临时的<a>标签
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}.zip` // 假设下载的是ZIP文件，可以指定文件名

    // 将<a>标签插入到DOM中，并触发点击事件
    document.body.appendChild(link)
    link.click()

    // 移除临时的<a>标签，并释放URL对象
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    message.success('下载成功')
  } catch (error) {
    console.error('文件错误', error)
    message.error('下载失败')
  }

  return true
}
