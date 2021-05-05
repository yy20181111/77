import axios from 'axios'
import { getToken } from '@/utils/cookie'
import router from '../router/index'

// 创建实例
const service = axios.create({
  baseURL: 'http://wmsapi.elpsh.com:12509/api',
  timeout: 5000
})

// 请求拦截
service.interceptors.request.use(
  config => {
  //  config.headers.Authorization = window.sessionStorage.getItem('admin-token')
    if(getToken()) {
      config.headers.Authorization = getToken()
    }
    return config
  }, err => {
    console.log(err)
  }
)
// 响应拦截
service.interceptors.response.use(res => {
  return res
}, err => {
  console.log(err)
  router.push('/login')
})

export default service