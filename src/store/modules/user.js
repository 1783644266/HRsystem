import { getToken, setToken, removeToken, setTimeKey, removeTimeKey } from "@/utils/auth"
import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  userInfo: {}
}

const mutations = {
  setToken(state, token) {
    state.token = token;
    setToken(token);
  },
  removeToken(state) {
    state.token = null;
    removeToken();
  },
  setUserInfo(state, userInfo) {
    state.userInfo = {...userInfo} //触发更新
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
  
}

const actions = {
  async login(context, info) {
    const data = await login(info)
    context.commit('setToken', data)
    setTimeKey(Date.now())//记录token获取时间
  },
  async getUserInfo(context) {
    const res = await getUserInfo()
    const imgUrl = await getUserDetailById(res.userId) 
    const baseData = {...res, ...imgUrl}
    context.commit('setUserInfo', baseData)
    return baseData // 获取用户基本信息，并将信息中的权限返回，用来设置菜单显示与增加动态路由
  },
  logout(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
    resetRouter() // 重置路由内容为静态的
    context.commit('permission/setRoleRoutes', [], { root: true}) // 重置vuex中的路由
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

