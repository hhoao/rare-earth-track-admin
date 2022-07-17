import request from '@/utils/request'

export function getAdministratorMenus() {
  return request({
    url: '/administrator/role/menus',
    method: 'get',
  })
}

export function getAdministratorAuths(administratorId) {
  return request({
    url: `administrators/${administratorId}/auths`,
    method: 'get'
  })
}

export function addAdministrator(newAdministrator) {
  return request({
    url: `administrators`,
    method: 'post',
    data: newAdministrator
  })
}
export function updateAdministrator(administrator) {
  return request({
    url: 'administrators',
    method: 'patch',
    data: administrator
  })
}
export function deleteAdministrator(administratorId) {
  return request({
    url: `administrators/${administratorId}`,
    method: 'delete'
  })
}
export function list(pageInfo, queryAdministrator) {
  return request({
    url: 'administrators',
    method: 'get',
    params: Object.assign(pageInfo, queryAdministrator)
  })
}
