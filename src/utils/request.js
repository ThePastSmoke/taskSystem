import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const request = axios.create({
  baseURL: ' /apitrue',
  timeout: 5000
})

// request interceptor
request.interceptors.request.use()

// 响应拦截器
request.interceptors.response.use((response) => {
  const {
    data: { data, isSuccess, msg }
  } = response
  if (isSuccess) {
    return data
  }
  // 走到这里发生了请求错误
  Message.error(msg || '系统错误')
  return Promise.reject(msg || '系统错误')
})

export default request
