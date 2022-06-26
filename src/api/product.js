import request from '@/utils/request'

export function listProducts(pageInfo, product) {
  return request({
    url: '/products',
    method: 'get',
    params: Object.assign(pageInfo, product)
  })
}
export function addProduct(product) {
  return request({
    url: `roles`,
    method: 'post',
    data: product
  })
}
export function updateProduct(product) {
  return request({
    url: '/products',
    method: 'patch',
    data: product
  })
}
export function deleteProduct(productName) {
  return request({
    url: `users/${productName}`,
    method: 'delete'
  })
}
