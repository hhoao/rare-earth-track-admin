import request from '@/utils/request'
export function getRoleNameByRoleId(roleId) {
    switch (roleId) {
        case 1: return "超级管理员";
        case 2: return "产品管理员"
        case 3: return "工厂管理员";
        case 4: return "运营人员";
    }
}


export function listRoles(pageInfo, role) {
  return request({
    url: '/roles',
    method: 'get',
    params: Object.assign(pageInfo, role)
  })
}

export function updateRole(role) {
  return request({
    url: '/roles',
    method: 'patch',
    data: role
  })
}
export function deleteRole(roleName) {
  return request({
    url: `users/${roleName}`,
    method: 'delete'
  })
}

