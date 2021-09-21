import service from '@/utils/request'

export function getAllEmployees() {
  return service({
    url: '/sys/user/simple',
  })
}