export const imgError = {
  inserted(el, binding) {
    el.src = el.src || binding.value
    el.onerror = function() {
      el.src = binding.value
    }
  },  // 元素插入节点时触发
  componentUpdated(el, binding) {
    el.src = el.src || binding.value
  }
}