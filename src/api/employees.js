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
} //获取员工信息,带分页

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
} // 导入员工

export function saveUserDetailById(data) {
  return service({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
} // 保存更新员工数据

export function getPersonalDetail(id) {
  return service({
    url: `/employees/${id}/personalInfo`
  })
} // 获取员工基本信息

export function updatePersonal(data) {
  return service({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
} // 保存员工基本信息

export function getJobDetail(id) {
  return service({
    url: `/employees/${id}/jobs`
  })
} // 获取员工岗位信息

export function updateJob(data) {
  return service({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
} // 保存员工岗位信息

export function assignRoles(data) {
  return service({
    url: '/sys/user/assignRoles',
    method: 'put',
    data
  })
} // 分配权限