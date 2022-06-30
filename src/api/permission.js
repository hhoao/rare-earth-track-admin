import request from '@/utils/request'

export function listPermissions(pageInfo, queryParams) {
  return request({
    url: '/permissions',
    method: 'get',
    params: (queryParams && pageInfo) ? Object.assign(queryParams, pageInfo) : (queryParams ? queryParams : pageInfo)
  })
}
export function addPermission(permission) {
  return request({
    url: `/permissions`,
    method: 'post',
    data: permission
  })
}
export function updatePermission(permission) {
  return request({
    url: `/permissions/${permission.name}`,
    method: 'patch',
    data: permission
  })
}
export function deletePermission(permissionName) {
  return request({
    url: `permissions/${permissionName}`,
    method: 'delete'
  })
}
