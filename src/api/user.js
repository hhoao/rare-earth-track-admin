import request from '@/utils/request'

export function getUserMenus() {
    return request({
        url: '/user/role/menus',
        method: 'get',
    })
}