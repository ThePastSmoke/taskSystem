import request from '@/utils/request'

export const getsStockUseStatus = () => {
  return request({
    method: 'GET',
    url: '/ips/home/todo'
  })
}

/*
 * 出入库信息
 * */

export const getSunInfo = (type) => {
  return request({
    method: 'GET',
    url: '/ips/home/sumList',
    params: {
      dimension: type
    }
  })
}

/*
 * 库存使用说明
 * */
export const getStoreInfo = () => {
  return request({
    method: 'GET',
    url: '/ips/home/stockUseStatus'
  })
}

/*
 * 库区使用情况
 * */

export const getAreaUseStatus = () => {
  return request({
    method: 'GET',
    url: '/ips/home/areaUseStatus'
  })
}
