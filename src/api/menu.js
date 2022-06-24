import request from '@/utils/request';
export const listMenus = (queryParams, pageInfo) =>{
  return request({
    url: "/menus",
    method: "get",
    params: Object.assign(queryParams, pageInfo)
  })
}
export const addMenus = (newMenu) => {
  return request({
    url: "/menus",
    method: "post",
    data: newMenu
  })
}
export const deleteMenu = (menuName) => {
  return request({
    url: `menus/${menuName}`,
    method: "delete",
  })
}
export const updateMenu = (menuName, newMenu) => {
  return request({
    url: `menus/${menuName}`,
    method: "patch",
    data: newMenu
  })
}

