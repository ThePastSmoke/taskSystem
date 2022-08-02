import request from '@/utils/request'

/*
 *分页查询明细货品
 * */

export const getGoodList = (params) => {
  return request({
    url: '/api/goods/pageDetail',
    params
  })
}

/*
 * 获取货品管理code值
 * */
export const getGoodsCode = () => {
  return request({
    url: '/api/codeFactory/next/HP'
  })
}

/*
 * 获取货品类型
 * */
export const getGoodsType = (params) => {
  return request({
    url: '/api/goodsType/vague',
    params
  })
}
/*
 * 获取货主名称
 * */
export const getOwnerNameId = () => {
  return request({
    url: '/api/owner/vague?params='
  })
}
/*
 * 获取指定库区id
 * */
export const getAreaList = (ownerId) => {
  return request({
    url: '/api/area/list',
    params: {
      ownerId
    }
  })
}

/*
 * 新增就货品
 * */

export const addGoods = (data) => {
  return request({
    method: 'POST',
    url: '/api/goods',
    data
  })
}

/*
 * 根据id请求新增货品详情
 * */
export const getGoodInfoById = (id) =>
  request({
    url: '/api/goods/' + id
  })

/*
 * 修改提交
 * */
export const changeGoodsInfo = (data) =>
  request({
    method: 'PUT',
    url: '/api/goods',
    data
  })

/*
 * 删除货品
 * */
export const delGoodsList = (id) =>
  request({
    method: 'DELETE',
    url: '/api/goods',
    params: { 'ids[]': id }
  })
