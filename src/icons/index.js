import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
// require.context（）函数 参数一 读取文件路径、 参数二 是否读取路径下子文件、 参数三 正则表达式 读取符合正则的文件
// 返回值 函数（特殊的object）
// 对象属性：key 函数 调用返回 读取文件的路径 组成的数组。
// 函数特性：接收一个参数（路径） 调用函数会引入路径对应的文件。
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
