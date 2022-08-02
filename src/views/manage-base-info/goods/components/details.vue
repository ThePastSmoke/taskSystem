<template>
  <el-card class="contenBox">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top" class="divForm">
      <el-row :gutter="30">
        <el-col :span="6">
          <el-form-item label="货品编号" prop="code">
            <el-input v-model="form.code" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="货品类型" prop="goodsTypeName">
            <el-autocomplete
              v-model="form.goodsTypeName"
              clearable
              class="inline-input"
              :fetch-suggestions="querySearchType"
              placeholder="请输入内容"
              :trigger-on-focus="false"
              @select="handleSelectType"
            >
              <i
                slot="suffix"
                class="el-icon-search el-input__icon"
              />
            </el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="货品名称" prop="name">
            <el-input v-model="form.name" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="货品条码" prop="barCode">
            <el-input v-model="form.barCode" clearable placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="6">
          <el-form-item label="货主" prop="ownerName">
            <el-autocomplete
              v-model="form.ownerName"
              clearable
              class="inline-input"
              :fetch-suggestions="querySearchOwnerName"
              placeholder="请输入内容"
              :trigger-on-focus="false"
              @select="handleSelectOwnerName"
            >
              <i
                slot="suffix"
                class="el-icon-search el-input__icon"
              />
            </el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="质检方式" prop="inspectionType">
            <el-select v-model="form.inspectionType" clearable placeholder="请选择">
              <el-option
                v-for="item in inspectionTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="温度要求" prop="temperatureType">
            <!--            <el-input v-model="form.temperatureType" />-->
            <el-select v-model="form.temperatureType" clearable placeholder="请选择">
              <el-option
                v-for="item in temperatureTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="承重要求" prop="bearingType">
            <el-select v-model="form.bearingType" clearable placeholder="请选择">
              <el-option
                v-for="item in bearingTypeOptions"
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
          <el-form-item label="体积" prop="volume">
            <el-input v-model="form.volume" clearable placeholder="请选择">
              <template slot="suffix">m ³</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="指定库区">
            <el-select v-model="form.areaId" clearable placeholder="请选择">
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
          <el-form-item label="单价">
            <el-input v-model="form.price" clearable>
              <template slot="suffix">元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="单位">
            <el-input v-model="form.unit" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="保质天数">
            <el-input v-model="form.guaranteeDay" clearable />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--    下方按钮-->
    <div class="buttonBox">
      <el-button class="unimportanceButton" round size="medium" @click="$router.back()">
        返回
      </el-button>
      <el-button class="minorImportantButton" round size="medium" type="warning" @click="addArea">提交
      </el-button>
    </div>
  </el-card>
</template>
<script>
import {
  addGoods, changeGoodsInfo,
  getAreaList,
  getGoodInfoById,
  getGoodsCode,
  getGoodsType,
  getOwnerNameId
} from '@/api/manage-base-info_goods'

export default {
  name: 'AreaDetails',
  data() {
    return {
      // 质检方式
      inspectionTypeOptions: [{
        value: 'BCL',
        label: '不质检'
      }, {
        value: 'QJ',
        label: '全检'
      }, {
        value: 'CJ',
        label: '抽检'
      }],
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
        value: 'BX',
        label: '中型'
      }],
      useTypeOptions: [],
      statusList: [], // 所属仓库列表
      restaurants: [],
      OwnerNameList: [], // 货主id名称列表
      form: {
        areaId: '', // 指定库区
        barCode: '', // 货品条码
        bearingType: '', // 承重要求
        code: '', // 货品编号
        goodsTypeId: '', // 货品类型
        goodsTypeName: '', // 货品类型名称
        guaranteeDay: '', // 保质天数
        inspectionType: '', // 质检方式
        name: '', // 货品名称
        ownerId: '', // 货主id
        ownerName: '', // 货主名称
        price: '', // 单价
        temperatureType: '', // 温度要求
        unit: '', // 单位
        volume: '' // 体积
      },
      rules: {
        barCode: [{ required: true, message: '请输入货品条码', trigger: 'blur' }], // 货品条码
        bearingType: [{ required: true, message: '请输入 承重要求', trigger: 'blur' }], // 承重要求
        code: [{ required: true, message: '请输入货品编号', trigger: 'blur' }], // 货品编号
        goodsTypeName: [{ required: true, message: '请输入货品类型名称', trigger: 'blur' }], // 货品类型名称
        inspectionType: [{ required: true, message: '请输入质检方式', trigger: 'blur' }], // 质检方式
        name: [{ required: true, message: '请输入货品名称', trigger: 'blur' }], // 货品名称
        ownerName: [{ required: true, message: '请输入货主名称', trigger: 'blur' }], // 货主名称
        temperatureType: [{ required: true, message: '请输入温度要求', trigger: 'blur' }], // 温度要求
        volume: [{ required: true, message: '请输入体积', trigger: 'blur' }] // 体积
      },
      resultsType: []
    }
  },
  created() {
    if (this.$route.query.id) {
      // this.getGoodInfoById()
    } else {
      this.getGoodsCode()
    }
    this.getGoodsType()
    this.getOwnerNameId()
  },
  mounted() {
    if (this.$route.query.id) {
      this.getGoodInfoById()
    }
  },
  methods: {
    // 根据id获取具体详情
    async getGoodInfoById() {
      const res = await getGoodInfoById(this.$route.query.id)
      this.form = res
      this.restaurants.forEach(item => {
        if (item.id === res.goodsTypeId) {
          this.form.goodsTypeName = item.name
        }
      })
      this.OwnerNameList.forEach(item => {
        if (item.id === res.ownerId) {
          this.form.ownerName = item.name
        }
      })
      const res1 = await getAreaList(res.ownerId)
      res1.forEach(item => {
        if (item.id === res.areaId) {
          this.form.areaId = item.name
        }
      })
    },

    // 搜索货主建议
    handleSelectOwnerName(item) {
      this.form.ownerId = item.id
      console.log(1)
      this.getAreaList(item.id)
    },
    querySearchOwnerName(queryString, cb) {
      this.results = this.OwnerNameList.filter(item => item.name === queryString)
      if (!this.results.length) {
        this.results = this.OwnerNameList
      }
      const res = this.results.map(item => {
        return {
          value: item.name,
          id: item.id
        }
      })
      cb(res)
    },
    handleSelectType(item) {
      this.form.goodsTypeId = item.id
    },
    // 搜索货品类型建议
    querySearchType(queryString, cb) {
      this.resultsType = this.restaurants.filter(item => item.name === queryString)
      if (!this.resultsType.length) {
        this.resultsType = this.restaurants
      }
      const res = this.resultsType.map(item => {
        return {
          value: item.name,
          id: item.id
        }
      })
      cb(res)
    },
    // 获取指定库区id
    async getAreaList(id) {
      const res = await getAreaList(id)
      console.log(res)
      this.useTypeOptions = res.map(item => {
        return {
          value: item.id,
          label: item.name
        }
      })
      // console.log(res)
    },
    // 获取货主id名称
    async getOwnerNameId() {
      this.OwnerNameList = await getOwnerNameId()
    },
    // 获取货品类型
    async getGoodsType() {
      this.restaurants = await getGoodsType()
    },
    //  获取库区id
    async getGoodsCode() {
      this.form.code = await getGoodsCode()
    },

    //  添加仓库
    async addArea() {
      try {
        await this.$refs.formRef.validate()
        if (this.$route.query.id) {
          const res = await changeGoodsInfo(this.form)
          console.log(res)
        } else {
          await addGoods(this.form)
        }
        this.$message.success('新增/修改仓库货品')
        this.$refs.formRef.resetFields()
        this.$router.back()
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style lang="scss">
.contenBox {
  .el-input__inner {
    background-color: #f8f5f5;
    border-radius: 6px;
    width: 370px;

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
.contenBox {
  padding: 10px
}

.buttonBox {
  text-align: center;

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
