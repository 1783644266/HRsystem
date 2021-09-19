import service from '@/utils/request';

export function login(data) {
  return service({
    url: `/sys/login`,
    method: 'post',
    data
  })
}//登录接口