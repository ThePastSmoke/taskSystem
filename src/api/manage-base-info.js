// 基础信息管理模块请求
import request from '@/utils/request'

/*
 * 分页查选仓库
 * */
export const getWareHouse = (params) => {
  return request({
    method: 'GET',
    url: '/api/warehouse/page',
    params
    // params: {
    //   current, // 当前页
    //   size, // 每页显示几条
    //   like_code, // 仓库的id
    //   like_name: '', // 仓库名称
    //   status: '' // 是否停用
    // }
  })
}

/*
 *   请求仓库编码
 * */

export const getWareHouseCode = () => {
  return request({
    method: 'GET',
    url: '/api/codeFactory/next/CK'
  })
}

/*
 * 新增仓库
 * */
export const addWareHouse = (data) => {
  return request({
    method: 'POST',
    url: '/api/warehouse',
    data
  })
}

/*
 * 根据id查选当前项
 * */
export const getWareHouseById = (id) => {
  return request({
    method: 'GET',
    url: '/api/warehouse/' + id
  })
}

/*
 *修改仓库
 **/

export const changeWareHouse = (data) => {
  return request({
    method: 'PUT',
    url: '/api/warehouse',
    data
  })
}

/*
 * 是否停用启动仓库
 * */
export const changeWareHouseStatus = (data) => {
  return request({
    method: 'PUT',
    url: '/api/warehouse',
    data
  })
}
