import request from '@/utils/request'

/*
 * 获取仓库列表
 * */

export const warehouseList = () => {
  return request({
    method: 'GET',
    url: '/api/warehouse/list',
    params: {
      status: 1
    }
  })
}

/*
 * 获取库区名称
 * */
export const getAreaList = (warehouseId) => {
  return request({
    method: 'GET',
    url: '/api/area/list',
    params: {
      warehouseId,
      status: 1
    }
  })
}

/*
 * /api/area/overview
 * */

export const getOverview = (id) => {
  return request({
    url: '/api/area/overview/' + id
  })
}

/*
 *
 * 根据库位id获取信息
 * */

export const getAreaById = (areaId) => {
  return request({
    url: '/api/location/listDetail',
    params: {
      areaId
    }
  })
}
