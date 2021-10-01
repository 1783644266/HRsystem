import NProgress from 'nprogress'
import router from '@/router';
import store from '@/store';
import 'nprogress/nprogress.css';

const white = ['/login', '/404'] //白名单

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if(store.getters.token) {
    if(to.path == '/login') {
      next('/') //有token不让去登录页面
    } else {
      if(!store.getters.userInfo.userId) {
        const { roles: { menus } } = await store.dispatch('user/getUserInfo') // 登陆者的路由权限
        const routes = await store.dispatch('permission/setRoleRoutes', menus)
        router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }])
        next(to.path) // 注意重新导航
      } else {
        next()
      }
    }
  } else {
    if(white.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
  NProgress.done()
})

router.afterEach(function(to, from, next) {
  NProgress.done()
})
