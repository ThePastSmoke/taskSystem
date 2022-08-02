import request from '@/utils/request'

/*
 *分页查询上架任务明细
 * */

export const getTaskAddList = (params) =>
  request({
    url: '/ips/grounding/pageDetail',
    params
  })
/*
 * 获取进度
 * */
export const getReceiptListSum = (id) =>
  request({
    url: '/ips/receiptList/sum/' + id
  })

/*
 *获取货物详情
 * */
export const getReceiptListInfo = (params) =>
  request({
    url: '/ips/receiptList/pageDetail',
    params
  })

/*
 * 请求仓库
 * */
export const getWarehouse = (ownerId) =>
  request({
    url: '/api/warehouse/list/',
    params: {
      ownerId,
      status: 1
    }
  })

/*
 * 请求库区
 * */
export const getAreaListIn = (warehouseId) =>
  request({
    url: '/api/area/list',
    params: {
      warehouseId,
      status: 1
    }
  })
