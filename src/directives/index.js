export const imgError = {
  inserted(el, binding) {
    el.onerror = function() {
      el.src = binding.value
    }
  },//元素插入节点时触发
}