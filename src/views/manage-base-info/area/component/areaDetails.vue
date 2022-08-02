<template>
  <el-card class="contenBox">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top" class="divForm">
      <el-row :gutter="30">
        <el-col :span="6">
          <el-form-item label="库区编码" prop="code">
            <el-input v-model="form.code" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="所属仓库" prop="warehouseId">
            <el-select v-model="form.warehouseId" placeholder="请选择">
              <el-option
                v-for="item in areaOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="库区名称" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="温度类型" prop="temperatureType">
            <el-select v-model="form.temperatureType" placeholder="请选择">
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
            <el-select v-model="form.bearingType" placeholder="请选择">
              <el-option
                v-for="item in bearingTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用途属性" prop="useType">
            <el-select v-model="form.useType" placeholder="请选择">
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
          <el-form-item label="负责人" prop="personName">
            <el-input v-model="form.personName" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="form.phone" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="库区状态" prop="status">
            <el-radio v-model="form.status" :label="1">启用</el-radio>
            <el-radio v-model="form.status" :label="0">停用</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--    下方按钮-->
    <div class="buttonBox">
      <el-button class="unimportanceButton" round size="medium" @click="$router.push('/manage-base-info/area')">
        返回
      </el-button>
      <el-button class="minorImportantButton" round size="medium" type="warning" @click="addArea">提交</el-button>
    </div>
  </el-card>
</template>
<script>
import { addArea, changeArea, getAreaInfoById, getCode, getStatusOne } from '@/api/manage-base-info_area'

export default {
  name: 'AreaDetails',
  data() {
    return {
      areaOptions: [],
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
      useTypeOptions: [{
        value: 'RKHCQ',
        label: '入库缓存区'
      }, {
        value: 'CKHCQ',
        label: '出库缓存区'
      }, {
        value: 'CCQ',
        label: '储存区'
      }, {
        value: 'FJQ',
        label: '分拣区'
      }, {
        value: 'ZJQ',
        label: '质检区'
      }],
      statusList: [], // 所属仓库列表
      form: {
        bearingType: '', // 承重类型
        code: '', // 库区id
        name: '', // 库区名称
        personName: '', // 负责人
        phone: '', // 电话
        status: 1, // 库区状态
        temperatureType: '', // 温度类型
        useType: '', // 用途属性
        warehouseId: '' // 所属仓库id
      },
      rules: {
        bearingType: [{ required: true, message: '请选择所属仓库列表', trigger: 'blur' }],
        code: [{ required: true, message: '请选择库区id', trigger: 'blur' }],
        name: [{ required: true, message: '请选择库区名称', trigger: 'blur' }],
        personName: [{ required: true, message: '请输入负责人', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }, {
          pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
          message: '请输入正确的手机号', trigger: 'blur'
        }],
        status: [{ required: true, message: '请选择仓库状态', trigger: 'blur' }],
        temperatureType: [{ required: true, message: '请选择温度类型', trigger: 'blur' }],
        useType: [{ required: true, message: '请选择用途属性', trigger: 'blur' }],
        warehouseId: [{ required: true, message: '请选择库区', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getStatusOne()
    if (this.$route.query.id) {
      this.getAreaInfoById()
    } else {
      this.getCode()
    }
  },
  methods: {
    // 编辑跳转进来
    async getAreaInfoById() {
      const res = await getAreaInfoById(this.$route.query.id)
      this.form = res
    },
    // 获取所属仓库信息
    async getStatusOne() {
      this.statusList = await getStatusOne()
      this.statusList.forEach(item => {
        this.areaOptions.push({
          label: item.name,
          value: item.id
        })
      })
    },
    //  获取库区id
    async getCode() {
      this.form.code = await getCode()
    },
    //  添加仓库
    async addArea() {
      await this.$refs.formRef.validate()
      if (this.$route.query.id) {
        await changeArea(this.form)
        this.$message.success('仓库修改成功！')
      } else {
        await addArea(this.form)
        this.$message.success('仓库添加成功！')
      }
      this.$refs.formRef.resetFields()
      this.$router.push('/manage-base-info/area')
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
