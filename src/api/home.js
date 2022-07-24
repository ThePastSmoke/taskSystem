import request from '@/utils/request'

export const getsStockUseStatus = () => {
  return request({
    method: 'GET',
    url: '/ips/home/todo'
  })
}
