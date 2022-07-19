import request from '@/utils/request'

export function getUserMenus() {
    return request({
        url: '/user/role/menus',
        method: 'get',
    })
}

export function getUserAuths(userId) {
    return request({
        url: `/users/${userId}/auths`,
        method: 'get'
    })
}

export function addUser(newUser) {
    return request({
        url: `/users`,
        method: 'post',
        data: newUser
    })
}
export function updateUser(user) {
    return request({
        url: '/users',
        method: 'patch',
        data: user
    })
}
export function deleteUser(userId) {
    return request({
        url: `/users/${userId}`,
        method: 'delete'
    })
}
export function list(pageInfo, queryUser) {
    return request({
        url: '/users',
        method: 'get',
        params: Object.assign(pageInfo, queryUser)
    })
}
