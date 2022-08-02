import request from '@/utils/request'

/*
 * 获取商品类型列表
 * */
export const getGoodTypeList = (params) =>
  request({
    url: '/api/goodsType/page',
    params
  })

/*
 * 获取货品类型编码
 * */

export const getGoodTypeCode = () =>
  request({
    url: '/api/codeFactory/next/HPLX'
  })

/*
 * 添加货品类型
 * */
export const addGoodType = (code, name) =>
  request({
    method: 'POST',
    url: '/api/goodsType',
    data: {
      code,
      name
    }
  })

/*
 * 编辑
 * */

export const editGoods = (id) =>
  request({
    url: '/api/goodsType/' + id
  })

/*
 * 修改货品类型
 * */
export const changGoodsInfo = (data) =>
  request({
    method: 'PUT',
    url: '/api/goodsType',
    data
  })

/*
 * 删除货品
 * */
export const delGoodsType = (id) =>
  request({
    method: 'DELETE',
    url: '/api/goodsType',
    params: { 'ids[]': id }
  })
