import request from '@/utils/request'

export const allStatus = [
    {value: '0', name: 'False'},
    {value: '1', name: 'True'}
]

export function getUserMenus() {
    return request({
        url: '/user/role/menus',
        method: 'get',
    })
}

export function getUserAuths(userId) {
    return request({
        url: `users/${userId}/auths`,
        method: 'get'
    })
}
export function searchUser(){
    return request({
        url: `users/search`
    })
}
export function addUser(newUser) {
    return request({
        url: `users`,
        method: 'post',
        data: newUser
    })
}
export function updateUser(user) {
    return request({
        url: 'users',
        method: 'patch',
        data: user
    })
}
export function deleteUser(userId) {
    return request({
        url: `users/${userId}`,
        method: 'delete'
    })
}
export function list(pageInfo, queryUser) {
    return request({
        url: 'users',
        method: 'get',
        params: Object.assign(pageInfo, queryUser)
    })
}
export function requestUserList(pageNum, pageSize) {
    return request({
        url: 'users',
        method: 'get',
        data: {
            pageNum,
            pageSize,
        }
    })
}
