import request from '@/utils/request'

export function listResources(pageInfo, resource) {
  return request({
    url: '/resources',
    method: 'get',
    params: Object.assign(pageInfo, resource)
  })
}

export function updateResource(resource) {
  return request({
    url: '/resources',
    method: 'patch',
    data: resource
  })
}
export function deleteResource(resourceName) {
  return request({
    url: `users/${resourceName}`,
    method: 'delete'
  })
}
