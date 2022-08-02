// 仓库类型
export function StateName(val) {
  const obj = {
    JG: '加工仓',
    ZZ: '中转仓',
    LC: '冷藏仓',
    CB: '储备仓'
  }
  return obj[val]
}

// 停用启用状态
export function statusStop(val) {
  const obj = {
    1: '启用',
    0: '停用',
    3: '已取消',
    6: '上架完成'
  }
  return obj[val]
}

// 温度类型
export function temperatureTypeName(val) {
  const obj = {
    LC: '冷藏',
    HW: '恒温',
    CW: '常温'
  }
  return obj[val]
}

// 称重类型
export function bearingTypeName(val) {
  const obj = {
    ZX: '重型',
    QX: '轻型',
    BX: '中型'
  }
  return obj[val]
}

// 用途属性
export function useTypeName(val) {
  const obj = {
    CKHCQ: '出库缓存区',
    RKHCQ: '入库缓存区',
    ZJQ: '质检区',
    CCQ: '存储区'
  }
  return obj[val]
}

// 质检方式
export function inspectionTypeName(val) {
  const obj = {
    BCL: '不处理',
    QJ: '全检',
    CJ: '抽检'
  }
  return obj[val]
}

// 上架状态  上架情况 1待分配、2上架中、3上架完成、4已取消
export function taskAddStatus(val) {
  const obj = {
    1: '1待分配',
    2: '2上架中',
    3: '上架完成',
    4: '已取消'
  }
  return obj[val]
}
