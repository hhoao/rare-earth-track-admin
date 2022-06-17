export function getRoleNameByRoleId(roleId) {
    switch (roleId) {
        case 1: return "超级管理员";
        case 2: return "产品管理员"
        case 3: return "工厂管理员";
        case 4: return "运营人员";
    }
}