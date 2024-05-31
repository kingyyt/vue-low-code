export function darkMode() {
  //这个条件用于判断当前系统应用模式是否开启了“暗”模式（win10在   个性化-颜色-选择默认应用模式  中修改）
  // if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  if (localStorage.theme === 'dark' || !('theme' in localStorage)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  localStorage.theme = 'light'

  localStorage.theme = 'dark'

  localStorage.removeItem('theme')
}
export function lightMode() {
  document.documentElement.classList.remove('dark')
}
