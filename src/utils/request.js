import axios from 'axios';
import { Message } from 'element-ui';
import store from '@/store';
import router from '@/router';
import { getTimeKey } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use( config => {
  if(store.getters.token) {
    if(checkTokenTime()) {
      store.dispatch('user/logout')
      router.replace('/login')
      return Promise.reject(new Error('令牌超时，请重新登陆！'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use( response => {
  const { success, data, message } = response.data
  if(success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  Message.error(error.message)
  return Promise.reject(error)
})

function checkTokenTime() {
  return (Date.now() - getTimeKey()) / 1000 > 28800 //1天过期
}
export default service;


