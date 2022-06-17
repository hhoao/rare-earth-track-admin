import request from '@/utils/request'

export function login(identifier, password) {
  return request({
    url: '/users/auth/token',
    method: 'post',
    data: {
      identifier,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/user',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/user/auth/token',
    method: 'delete'
  })
}