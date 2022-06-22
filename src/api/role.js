export const roles = [
  {id: 1, name:"超级管理员"},
    {id: 2, name:"产品管理员"},
    {id:3, name: "工厂管理员"},
    {id:4, name: "运营人员"}
]
export function getRoleNameByRoleId(roleId) {
    switch (roleId) {
        case 1: return "超级管理员";
        case 2: return "产品管理员"
        case 3: return "工厂管理员";
        case 4: return "运营人员";
    }
}
export function getRoleIdByRoleName(roleName) {
    switch (roleName) {
        case "超级管理员": return 1;
        case "产品管理员": return 2;
        case "工厂管理员": return 3;
        case "运营人员": return 4;
    }
}
