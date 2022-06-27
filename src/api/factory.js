import request from '@/utils/request'

export function listFactories(pageInfo, factory) {
  return request({
    url: '/factories',
    method: 'get',
    params: Object.assign(pageInfo, factory)
  })
}
export function addFactory(factory) {
  return request({
    url: `factories`,
    method: 'post',
    data: factory
  })
}
export function updateFactory(factory) {
  return request({
    url: '/factories',
    method: 'patch',
    data: factory
  })
}
export function deleteFactory(factoryName) {
  return request({
    url: `factories/${factoryName}`,
    method: 'delete'
  })
}
