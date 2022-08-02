import request from '@/utils/request'

/*
 * 获取收货列表数据
 * */

export const getTaskList = (params) =>
  request({
    url: '/ips/receiving/pageDetail',
    params
  })
/*
 * 收货完成
 * */
export const goodsSuccess = (data) =>
  request({
    method: 'PUT',
    url: '/ips/receiving/complete',
    data
  })

/*
 *分页查询入库清单明细
 * */

export const getReceiptList = (params) =>
  request({
    method: 'GET',
    url: '/ips/receiptList/pageDetail',
    params
  })
