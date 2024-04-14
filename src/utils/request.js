import axios from 'axios'
import { Toast } from 'vant'

const request = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 50000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  Toast.loading({
    message: '加载中...',
    forbidClick: true
  })
  return config
}, function (error) {
  // 对请求错误做些什么
  console.log('请求失败')
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  const res = response.data
  // console.log('响应拦截器-------->')
  // console.log(res)
  if (res.status !== 200) {
    Toast(res.message)
    return Promise.reject(res.message)
  } else {
    // 清除 loading 中的效果
    Toast.clear()
  }
  return res
}, function (error) {
  // 对响应错误做点什么
  console.log('响应错误')
  return Promise.reject(error)
})

export default request
