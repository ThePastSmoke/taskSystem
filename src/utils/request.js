import axios from 'axios'

// create an axios instance
const request = axios.create({
  baseURL: process.env['VUE_APP_BASE_API '],
  timeout: 5000
})

// request interceptor
request.interceptors.request.use()

// response interceptor
request.interceptors.response.use()

export default request
