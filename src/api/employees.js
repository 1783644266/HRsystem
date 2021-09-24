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

export function delEmployee(id) {
  return service({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
} //删除员工

export function addEmployee(data) {
  return service({
    url: '/sys/user',
    method: 'post',
    data
  })
} // 新增员工

export function importEmployee(data) {
  return service({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
} // 新增员工