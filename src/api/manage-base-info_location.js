import request from '@/utils/request'

/*
 * 分页查选库位详细信息
 * */
export const getLocationInfo = (params) => {
  return request({
    method: 'GET',
    url: '/api/location/pageDetail',
    params
  })
}

/*
 * 新增库位获取code
 * */

export const getCode = () => {
  return request({
    method: 'GET',
    url: '/api/codeFactory/next/KW'
  })
}

/*
 * 请求仓库数据
 * */
export const getWarehouseInfo = () => {
  return request({
    method: 'GET',
    url: '/api/warehouse/list',
    params: {
      status: 1
    }
  })
}

/*
 *请求库位数据
 * */
export const getAreaList = (warehouseId, status) => {
  return request({
    method: 'GET',
    url: '/api/area/list',
    params: {
      warehouseId,
      status
    }
  })
}

/*
 * 新增库位
 * */
export const addLocation = (data) => {
  return request({
    method: 'POST',
    url: '/api/location',
    data
  })
}

/*
 * 根据id请求库位详情
 * */
export const getLocationInFoById = (id) => {
  return request({
    url: '/api/location/' + id
  })
}

/*
 * 修改库位详细信息
 * */
export const changeLocation = (data) => {
  return request({
    method: 'PUT',
    url: '/api/location',
    data
  })
}

/*
 * 启用停用
 * */
export const changeStatus = (id, status) => {
  return request({
    method: 'PUT',
    url: '/api/location',
    data: {
      id,
      status
    }
  })
}
