<template>
  <div>
    <el-card class="loaction">
      <el-form ref="formRef" :model="query" :rules="rules" label-position="top">
        <el-row :gutter="30">
          <el-col :span="6">
            <el-form-item label="库区" prop="location">
              <el-cascader
                v-model="location"
                :props="areaProps"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="库位编号">
              <el-input v-model="query.code" disabled placeholder="请选择" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="库位名称" prop="name">
              <el-input v-model="query.name" placeholder="请选择" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="温度类型" prop="temperatureType">
              <el-select v-model="query.temperatureType" placeholder="请选择">
                <el-option
                  v-for="item in temperatureTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="30">
          <el-col :span="6">
            <el-form-item label="承重类型" prop="bearingType">
              <el-select v-model="query.bearingType" placeholder="请选择">
                <el-option
                  v-for="(item,index) in bearingTypeOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用途类型" prop="useType">
              <el-select v-model="query.useType" placeholder="请选择">
                <el-option
                  v-for="item in useTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="停用状态" prop="status">
              <el-radio v-model="query.status" :label="1">启用</el-radio>
              <el-radio v-model="query.status" :label="0">停用</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="6">
            <el-form-item label="承重体积" prop="maxVolume">
              <el-input v-model="query.maxVolume" placeholder="请选择">
                <template slot="append">m³</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="承载上限">
              <el-input v-model="query.maxNum" placeholder="请选择">
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="承载重量">
              <el-input v-model="query.maxWeight" placeholder="请选择">
                <template slot="append">Kg</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item label="库位排/列/层">
              <el-row :gutter="15">
                <el-col :span="8">
                  <el-input v-model="query.locationRow" placeholder="请输入" />
                </el-col>
                <el-col :span="8">
                  <el-input v-model="query.locationColumn" placeholder="请输入" />
                </el-col>
                <el-col :span="8">
                  <el-input v-model="query.locationLayer" placeholder="请输入" />
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="库位长/宽/高">
              <el-row :gutter="15">
                <el-col :span="8">
                  <el-input v-model="query.locationLength" placeholder="请输入">
                    <template slot="append">cm</template>
                  </el-input>
                </el-col>
                <el-col :span="8">
                  <el-input v-model="query.locationWidth" placeholder="请输入">
                    <template slot="append">cm</template>
                  </el-input>
                </el-col>
                <el-col :span="8">
                  <el-input v-model="query.locationHigh" placeholder="请输入">
                    <template slot="append">cm</template>
                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!--    返回提交-->
      <div class="buttonBox">
        <el-button class="unimportanceButton" round size="medium" @click="$router.back()">
          返回
        </el-button>
        <el-button class="minorImportantButton" round size="medium" type="warning" @click="addLocation">提交
        </el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import {
  addLocation,
  changeLocation,
  getAreaList,
  getCode,
  getLocationInFoById,
  getWarehouseInfo
} from '@/api/manage-base-info_location'

export default {
  name: 'Details',
  data() {
    return {
      areaProps: {
        lazy: true,
        lazyLoad: this.lazyLoad
      },
      temperatureTypeOptions: [{
        value: 'CW',
        label: '常温'
      }, {
        value: 'LC',
        label: '冷藏'
      }, {
        value: 'HW',
        label: '恒温'
      }],
      bearingTypeOptions: [{
        value: 'ZX',
        label: '重型'
      }, {
        value: 'QX',
        label: '轻型'
      }, {
        value: 'ZX',
        label: '重型'
      }],
      useTypeOptions: [{
        value: 'RKHCQ',
        label: '入库缓存区'
      }, {
        value: 'CKHCQ',
        label: '出库缓存区'
      }, {
        value: 'CCQ',
        label: '存储区'
      }, {
        value: 'FJQ',
        label: '分拣区'
      }, {
        value: 'ZJQ',
        label: '质检区'
      }],
      // locationOptions: [],
      query: {
        areaId: '',
        bearingType: '', // 承重类型
        code: '', // 库位编号

        locationColumn: null, // 列
        locationHigh: '', // 高
        locationLayer: null, // 层
        locationLength: '', // 长
        locationRow: null, // 排
        locationWidth: '', // 宽
        maxNum: '', // 承重上线
        maxVolume: '', // 承重体积
        maxWeight: '', // 承载重量
        name: '一号', // 库区名称
        status: 1,
        temperatureType: '', // 温度类型
        useType: '', // 用途类型
        warehouseId: ''
      },
      location: [], // 库区
      rules: {
        bearingType: [{ required: true, message: '请输入活动名称', trigger: 'blur' }], // 承重类型
        location: [{ required: true, message: '请输入活动名称', trigger: 'blur' }], // 库区
        maxVolume: [{ required: true, message: '请输入活动名称', trigger: 'blur' }], // 承重体积
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }], // 库区名称
        temperatureType: [{ required: true, message: '请输入活动名称', trigger: 'blur' }], // 温度类型
        useType: [{ required: true, message: '请输入活动名称', trigger: 'blur' }], // 用途类型
        status: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      this.getLocationInFoById()
    } else {
      this.getCode()
    }
  },
  methods: {
    // 根据id请求数据
    async getLocationInFoById() {
      const res = await getLocationInFoById(this.$route.query.id)
      this.location.push(res.warehouseId)
      this.location.push(res.areaId)

      this.query = res
    },
    // 下拉框
    async lazyLoad(node, resolve) {
      const level = node.level
      if (node.level === 0) {
        const res = await getWarehouseInfo()
        const nodes = res.map(item => ({
          value: item.id,
          label: item.name,
          leaf: level >= 1
        }))
        resolve(nodes)
      }
      const res = await getAreaList(node.value, 1)
      const nodes = res.map(item => ({
        value: item.id,
        label: item.name,
        leaf: level >= 1
      }))
      resolve(nodes)
    },
    // 获取库位编号
    async getCode() {
      this.query.code = await getCode()
    },
    //  点击提交按钮
    async addLocation() {
      try {
        this.query.warehouseId = this.location[0]
        this.query.areaId = this.location[1]
        // await this.$refs.formRef.validate()
        if (this.$route.query.id) {
          await changeLocation(this.query)
          this.$message.success('修改库位成功')
        } else {
          await addLocation(this.query)
          this.$message.success('新增库位成功')
        }
        this.$router.back()
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss">
.loaction {
  .el-select,
  .el-cascader {
    width: 100%;
  }

  .el-input-group__append {
    background: #e7dfdf;
    color: black;
    background: #e7dfdf;
    border-radius: 0 6px 6px 0;
  }

  .el-input__inner {
    background-color: #f8f5f5;

    &:hover {
      border-color: #887e7e;
    }
  }

  .el-form--label-top .el-form-item__label {
    padding: 0;
  }

  .el-form-item__label {
    font-size: 13px;
    color: #887e7e;
    font-weight: 500;
  }
}
</style>

<style lang="scss" scoped>

.buttonBox {
  padding: 25px 0 0;
  margin: 0 -30px -5px;
  border-top: 1px solid #f5efee;
  text-align: center;
  height: 100px;

  .unimportanceButton {
    height: 40px;
    width: 170px;
    border-radius: 20px;
    border: 0;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    outline: 0;
    margin-right: 10px;
    background: #f8f5f5;

    &:hover {
      background-color: #ffb200;
      color: #fff;
    }
  }

  .minorImportantButton {
    height: 40px;
    width: 170px;
    border-radius: 20px;
    border: 0;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    outline: 0;
    background: #ffb200;
    color: black;

    &:hover {
      background-color: #ff8e00;
    }
  }
}
</style>
