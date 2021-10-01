import { constantRoutes, asyncRoutes } from '@/router'

const state = {
  routes: constantRoutes
}
const mutations = {
  setRoutes(state, routes) {
    state.routes = [...constantRoutes, ...routes]
  }
}
const actions = {
  setRoleRoutes(context, menus) {
    console.log(asyncRoutes);
    console.log(menus);
    const routes = asyncRoutes.filter(e => menus.some(menu => menu == e.name))
    context.commit('setRoutes', routes)
    return routes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
