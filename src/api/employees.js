import service from '@/utils/request'

export function getAllEmployees() {
  return service({
    url: '/sys/user/simple',
  })
} //获取所有员工简单信息

export function getEmployeeList(params) {
  return service({
    url: '/sys/user',
    params
  })
} //获取员工详细信息