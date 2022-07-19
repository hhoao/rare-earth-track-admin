import request from '@/utils/request'

export function listResources(pageInfo, queryParams) {
  return request({
    url: '/resources',
    method: 'get',
    params: (queryParams && pageInfo) ? Object.assign(queryParams, pageInfo) : (queryParams ? queryParams : pageInfo)
  })
}
export function addResource(resource) {
  return request({
    url: `/resources`,
    method: 'post',
    data: resource
  })
}
export function updateResource(resource) {
  return request({
    url: `/resources/${resource.name}`,
    method: 'patch',
    data: resource
  })
}
export function deleteResource(resourceName) {
  return request({
    url: `/resources/${resourceName}`,
    method: 'delete'
  })
}
