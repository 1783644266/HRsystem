
export default {
  install(Vue) {
    const requireAll = require.context(".", true, /index\.vue$/)
    requireAll.keys().forEach(e => {
      Vue.component(e.replace(/\.\//,'').replace(/\.vue$/,'').replace(/\/index$/,''), requireAll(e).default)
    }) // require.context 自动引入
  }
}