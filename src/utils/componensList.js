export const areaList = [
  {
    label: '所属仓库',
    prop: 'warehouseName',
    width: '160'
  },
  {
    label: '库区编号',
    prop: 'code',
    width: '160'
  },
  {
    label: '库区名称',
    prop: 'name',
    width: '160'
  },
  {
    label: '温度类型',
    prop: 'temperatureType',
    width: '160'
  },
  {
    label: '承重类型',
    prop: 'bearingType',
    width: '160'
  },
  {
    label: '用途属性',
    prop: 'useType',
    width: '160'
  },
  {
    label: '库区状态',
    prop: 'status',
    width: '160'
  },
  {
    label: '负责人',
    prop: 'personName',
    width: '160'
  },
  {
    label: '联系电话',
    prop: 'phone',
    width: '160'
  },
  {
    label: '库位数量',
    prop: 'includedNum',
    width: '160'
  },
  {
    label: '跟新时间',
    prop: 'updateTime',
    width: '160'
  }
]

export const locationList = [
  {
    label: '所属仓库',
    prop: 'warehouseName',
    width: '160'
  },
  {
    label: '库区编号',
    prop: 'areaCode',
    width: '160'
  },
  {
    label: '库区名称',
    prop: 'areaName',
    width: '160'
  },
  {
    label: '库位编号',
    prop: 'code',
    width: '160'
  },
  {
    label: '库位名称',
    prop: 'name',
    width: '160'
  },
  {
    label: '温度类型',
    prop: 'temperatureType',
    width: '160'
  },
  {
    label: '承重类型',
    prop: 'bearingType',
    width: '160'
  },
  {
    label: '用途类型',
    prop: 'useType',
    width: '160'
  },
  {
    label: '停用状态',
    prop: 'status',
    width: '160'
  },
  {
    label: '承载上限',
    prop: 'maxNum',
    width: '160'
  },
  {
    label: '跟新时间',
    prop: 'updateTime',
    width: '160'
  }
]
// 货品管理 goods
export const goodsList = [
  {
    label: '货品类型名称',
    prop: 'goodsTypeName',
    width: '180'
  },
  {
    label: '货品编号',
    prop: 'code',
    width: '180'
  },
  {
    label: '货品条码',
    prop: 'barCode',
    width: '180'
  },
  {
    label: '货品名称',
    prop: 'name',
    width: '180'
  },
  {
    label: '货主名称',
    prop: 'ownerName',
    width: '180'
  },
  {
    label: '质检方式',
    prop: 'inspectionType', // 质检方式 不处理:BCL、全检:QJ、抽检:CJ
    width: '180'
  },
  {
    label: '温度要求',
    prop: 'temperatureType', // 温度要求 常温:CW、冷藏:LC、恒温:HW
    width: '180'
  },
  {
    label: '承重要求',
    prop: 'bearingType', // 承重要求 重型:ZX、轻型:QX、中型:BX
    width: '180'
  },
  {
    label: '库区指定',
    prop: 'areaName',
    width: '180'
  },
  {
    label: '体积',
    prop: 'volume',
    width: '180'
  },
  {
    label: '单位（元）',
    prop: 'unit',
    width: '180'
  },
  {
    label: '单位',
    prop: 'unit',
    width: '180'
  },
  {
    label: '保质天数（天）',
    prop: 'guaranteeDay',
    width: '180'
  },
  {
    label: '跟新时间',
    prop: 'updateTime',
    width: '180'
  }
]

export const goodsTypeMenu = [
  { label: '货品类型编号', prop: 'code', width: '350' },
  { label: '货品类型名称', prop: 'name', width: '350' },
  { label: '更新时间', prop: 'updateTime', width: '400' }
]
// 收货任务
export const taskReceiveMenu = [
  { label: '收货任务编号', prop: 'code', width: '150' },
  { label: '入库单号', prop: 'receiptCode', width: '150' },
  { label: '创建人', prop: 'updateName', width: '150' },
  { label: '创建时间', prop: 'createTime', width: '150', sortable: true },
  { label: '货主名称', prop: 'ownerName', width: '150' },
  { label: '仓库名称', prop: 'warehouseName', width: '150' },
  { label: '库区名称', prop: 'carrierId', width: '150' },
  { label: '预计到货数', prop: 'planNum', width: '150' },
  {
    label: '收货状态',
    prop: 'status',
    width: '150',
    filters: [
      { text: '待分配', value: '待分配' },
      { text: '收货中', value: '收货中' },
      { text: '收货完成', value: '收货完成' },
      { text: '已取消', value: '已取消' }
    ]
  },
  { label: '收货人', prop: 'receiverName', width: '150' },
  { label: '实收总数', prop: 'realNum', width: '150' },
  { label: '收货差异', prop: 'differenceNum', width: '150' },
  {
    label: '收货完成时间',
    prop: 'completionTime',
    width: '150',
    sortable: true
  }
]
// 收货详情
export const TheGoodsInfo = [
  {
    label: '货主名称',
    prop: 'ownerName',
    width: '160'
  },
  {
    label: '货品编号',
    prop: 'goodsCode',
    width: '160'
  },
  {
    label: '货品名称',
    prop: 'goodsName',
    width: '160'
  },
  {
    label: '货品类型',
    prop: 'goodsTypeName',
    width: '160'
  },
  {
    label: '货品单价（元）',
    prop: 'goodsPrice',
    width: '160'
  },
  {
    label: '保质天数（天）',
    prop: 'goodsGuaranteeDay',
    width: '160'
  },
  {
    label: '单位',
    prop: 'goodsUnit',
    width: '160'
  },
  {
    label: '体积（m³）',
    prop: 'goodsVolume',
    width: '160'
  },
  {
    label: '到货数量',
    prop: 'planNum',
    width: '160'
  },
  {
    label: '实收数量',
    prop: 'realNum',
    width: '160'
  },
  {
    label: '收货差异',
    prop: 'realDifferenceNum',
    width: '160'
  }
]

// 上架任务
export const taskAddMenu = [
  { label: '上架任务编号', prop: 'code', width: '150' },
  { label: '入库单号', prop: 'receiptCode', width: '150' },
  { label: '创建时间', prop: 'createTime', width: '150', sortable: true },
  { label: '货主名称', prop: 'ownerName', width: '150', sortable: true },
  { label: '仓库名称', prop: 'warehouseName', width: '150' },
  { label: '库区名称', prop: 'carrierId', width: '220' },
  { label: '负责人', prop: 'personName', width: '150' },
  {
    label: '上架状态',
    prop: 'status',
    width: '250',
    filters: [
      { text: '待分配', value: '待分配' },
      { text: '收货中', value: '收货中' },
      { text: '收货完成', value: '收货完成' },
      { text: '已取消', value: '已取消' }
    ]
  },
  { label: '货品数量', prop: 'planNum', width: '200' },
  { label: '实收总数', prop: 'realNum', width: '200' },
  { label: '上架数量', prop: 'groundingNum', width: '200' },
  { label: '差异总数', prop: 'differenceNum', width: '200' },
  { label: '收货完成时间', prop: 'createTime', width: '200', sortable: true }
]
// 上架任务详情
export const taskAddMenuInfo = [
  { label: '货品编号', prop: 'goodsCode', width: '160' },
  { label: '货品名称', prop: 'goodsName', width: '160' },
  { label: '货品类型', prop: 'goodsTypeName', width: '160' },
  { label: '货主名称', prop: 'ownerName', width: '160' },
  { label: '仓库', prop: 'warehouseName', width: '160' },
  { label: '货品数量', prop: 'realNum', width: '160' },
  { label: '实上数量', prop: 'planNum', width: '160' },
  { label: '差异数', prop: 'groundingDifferenceNum', width: '160' }
]
