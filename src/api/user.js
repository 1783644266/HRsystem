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
}// 获取登录人员基本资料

export function getUserDetailById(id) {
  return service({
    url: `/sys/user/${id}`,
    method: 'get'
  })
} // 获取详细信息