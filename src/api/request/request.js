
import service from '../index'

//登录请求(username + password)
export function handleLogin(username, password) {
  return service({
    url: '/Auth/Login',
    method: 'get',
    params: {
      username, password
    }
  })
}

//获取侧边栏数据
export function handleMenu() {
  return service({
    url: '/Home/GetMenu',
    method: 'get',
  })
}

//获取菜单详细信息
export function handleMenuInfo(id) {
  return service({
    url: '/Settings/GetMenuInfoById',
    method: 'get',
    params: {
      id
    }
  })
}

//修改菜单
export function handleEditMenuInfo(data) {
  return service({
    url: '/Settings/UpdateMenu',
    method: 'post',
    data
  })
}

//添加菜单
export function handleAddMenu(data){
  return service({
    url:'/Settings/AddMenu',
    method:'post',
    data
  })
}

//删除菜单
export function delMenu(id){
  return service({
    url:'Settings/DeleteMenu?menuIdList=' + id,
    method:'GET',

  })
}


//获取人员列表
export function handleManagerList(pageSize, pageIndex, keywords) {
  return service({
    url: '/Settings/GetManagerList',
    method: 'get',
    params: {
      pageSize, pageIndex, keywords
    }
  })
}

//获取角色列表
export function handleRoleList(keywords) {
  return service({
    url: '/Settings/GetRoleList?' + keywords,
    method: 'get',
   
  })
}

//添加角色
export function handleAddRole(data) {
  return service({
    url: '/Settings/AddRole',
    method: 'post',
   data
  })
}







