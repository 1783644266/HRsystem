import service from '@/utils/request'

export function getRoleList(params) {
  return service({
    url: '/sys/role',
    params
  })
}//获取角色列表

export function delRole(id) {
  return service({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}//删除角色

export function editRole(data) {
  return service({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
} // 编辑角色

export function addRole(data) {
  return service({
    url: '/sys/role',
    method: 'post',
    data
  })
} // 新增角色

export function getRoleInfo(id) {
  return service({
    url: `/sys/role/${id}`,
    method: 'get'
  })
}//获取角色信息

export function getCompanyInfo(companyId) {
  return service({
    url: `/company/${companyId}`
  })
}//获取公司信息