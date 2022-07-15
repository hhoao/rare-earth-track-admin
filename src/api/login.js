import request from '@/utils/request'

export function login(identifier, password) {
  return request({
    url: '/administrators/auth/token',
    method: 'post',
    data: {
      identifier,
      password
    }
  })
}
export function getMenus() {
  return request({
    url: '/administrator/role/menus',
    method: 'get',
  })
}

export function getInfo() {
  return request({
    url: '/administrator',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/administrator/auth/token',
    method: 'delete'
  })
}
