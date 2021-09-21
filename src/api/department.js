import service from '@/utils/request'

export function getDepartments() {
  return service({
    url: '/company/department',
    method: 'get'
  })
}//获取所有部门

export function getDepartmentInfo(id) {
  return service({
    url: `/company/department/${id}`,
    method: 'get'
  })
}//获取部门id详情

export function delDepartment(id) {
  return service({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}//删除部门

export function addNewDepartment(data) {
  return service({
    url: `/company/department`,
    method: 'post',
    data
  })
}//新增部门

export function editDepartment(data) {
  return service({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}//编辑部门