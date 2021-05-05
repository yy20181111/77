//保存用户token至浏览器
const token = 'admin-token'
export function setToken(value){
  sessionStorage.setItem(token, value)
}

export function getToken(){
  return sessionStorage.getItem(token)
}

