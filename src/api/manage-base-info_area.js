import request from '@/utils/request'

/*
 *分页查选库
 * */

export const getAreaStock = (params) => {
  return request({
    method: 'GET',
    url: 'api/area/pageDetail',
    params
  })
}

/*
 * 停用启用
 * */

export const changStatus = (status, id) => {
  return request({
    method: 'PUT',
    url: '/api/area',
    data: {
      status,
      id
    }
  })
}

/*
 * 启用仓库
 * */
export const getStatusOne = () => {
  return request({
    method: 'GET',
    url: '/api/warehouse/list',
    params: {
      status: 1
    }
  })
}

/*
 * 库区管理 库区编号
 * */

export const getCode = () => {
  return request({
    method: 'GET',
    url: '/api/codeFactory/next/KQ'
  })
}

/*
 * 新增库区
 * */
export const addArea = (data) => {
  return request({
    method: 'POST',
    url: '/api/area',
    data
  })
}

/*
 * 根据id获取仓库信息
 * */

export const getAreaInfoById = (id) => {
  return request({
    method: 'GET',
    url: '/api/area/' + id
  })
}

/*
 * 修改库区
 * */
export const changeArea = (data) => {
  return request({
    method: 'PUT',
    url: '/api/area',
    data
  })
}
