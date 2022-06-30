import request from '@/utils/request';
export const listMenus = (queryParams, pageInfo) =>{
  return request({
    url: "/menus",
    method: "get",
    params: (queryParams && pageInfo) ? Object.assign(queryParams, pageInfo) : (queryParams ? queryParams : pageInfo)
  })
}
export const addMenu = (newMenu) => {
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

