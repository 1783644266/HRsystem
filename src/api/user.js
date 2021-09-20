import service from '@/utils/request';

export function login(data) {
  return service({
    url: `/sys/login`,
    method: 'post',
    data
  })
}//登录接口

export function getUserInfo() {
  return service({
    url: `/sys/profile`,
    method: 'post',
  })
}//登录接口

export function getUserDetailById(id) {
  return service({
    url: `/sys/user/${id}`,
    method: 'get'
  })
}