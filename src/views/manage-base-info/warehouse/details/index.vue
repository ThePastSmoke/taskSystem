<template>
  <el-card class="divWarehouseAdd">
    <div class="divForm">
      <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="仓库编码 ">
              <el-input v-model="form.code" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="仓库名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="仓库类型" prop="type">
              <el-select
                v-model="form.type"
                clearable
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in depotTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="省/市/区 ">
              <el-cascader
                :key="modalKey"
                v-model="selectedOptions"
                :options="cityOptions"
                clearable
                size="large"
                style="width: 66%"
                @change="handleChange"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="16">
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="form.address" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="仓库状态" prop="radio">
              <el-radio v-model="form.radio" label="1">启用</el-radio>
              <el-radio v-model="form.radio" label="0">停用</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="面积">
              <el-input v-model="form.surface" placeholder="请输入">
                <template slot="append">m ³</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="负责人" prop="personName">
              <el-input v-model="form.personName" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!--    返回提交-->
    <div class="buttonBox">
      <el-button class="unimportanceButton" round size="medium" @click="$router.back()">
        返回
      </el-button>
      <el-button class="minorImportantButton" round size="medium" type="warning" @click="addWareHouse">提交</el-button>
    </div>

  </el-card>
</template>

<script>
import { addWareHouse, changeWareHouse, getWareHouseById, getWareHouseCode } from '@/api/manage-base-info'
import { TextToCode, CodeToText, regionData } from 'element-china-area-data'

export default {
  name: 'Details',
  data() {
    return {
      modalKey: 0,
      form: {
        province: '', // 省
        city: '', // 市
        area: '', // 区
        location: '', // 选中城市名称
        code: '', // 仓库编码
        name: '', // 仓库名称
        type: '', // 仓库类型
        address: '', // 详细地址
        radio: '1', // 仓库状态
        surface: '', // 仓库面积
        personName: '', // 负责人
        phone: '' // 电话
      },
      rules: {
        name: [{ required: true, message: '请输入仓库名称', trigger: 'blur' }],
        type: [{ required: true, message: '请输入仓库类型', trigger: 'blur' }],
        address: [{ required: true, message: '请输入地区省市', trigger: 'blur' }],
        radio: [{ required: true, message: '请输入仓库状态', trigger: 'blur' }],
        personName: [{ required: true, message: '请输入仓库状态', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: '请输入正确的手机号', trigger: 'blur'
          }]
      },
      cityOptions: regionData,
      selectedOptions: [],
      // 仓库状态配置项
      depotTypeOptions: [{
        value: 'ZZ',
        label: '中转站'
      }, {
        value: 'JG',
        label: '加工仓'
      }, {
        value: 'CB',
        label: '储备仓'
      }, {
        value: 'LC',
        label: '冷藏仓'
      }]
    }
  },
  created() {
    if (this.$route.query.id) {
      this.getWareHouseById()
    } else {
      this.getWareHouseCode()
    }
  },
  methods: {
    // 根据id获取数据
    async getWareHouseById() {
      const id = this.$route.query.id
      const res = await getWareHouseById(id)
      this.form = res
      const cities = res.location.split('/')
      this.selectedOptions.push(TextToCode[cities[0]].code)
      this.selectedOptions.push(TextToCode[cities[0]][cities[1]].code)
      this.selectedOptions.push(TextToCode[cities[0]][cities[1]][cities[2]].code)
      this.modalKey++
    },
    // 获取仓库编码
    async getWareHouseCode() {
      this.form.code = await getWareHouseCode()
    },
    handleChange(value) {
      console.log(1)
      this.form.location =
        CodeToText[value[0]] +
        '/' +
        CodeToText[value[1]] +
        '/' +
        CodeToText[value[2]]
      this.form.province = value[0]
      this.form.city = value[1]
      this.form.area = value[2]
    },
    //  新增仓库
    async addWareHouse() {
      try {
        await this.$refs.formRef.validate()
        if (this.$route.query.id) {
          console.log(1)
          const res = await changeWareHouse(this.form)
          this.$message.success('恭喜你，修改信息成功')
          console.log(res)
        } else {
          await addWareHouse(this.form)
          this.$message.success('恭喜你，添加仓库成功')
        }
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
.divForm {
  .el-input__inner {
    background-color: #f8f5f5;
    border-radius: 6px;

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

.divWarehouseAdd {
  //height: 509px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
  margin-top: 20px;
  margin-left: 50px;
  margin-right: 29px;
  padding-top: 31px;
  padding-bottom: 30px;

}

.buttonBox {
  .el-button--default {
    background: #f8f5f5;
    color: #332929;
  }

}

</style>
<style lang="scss" scoped>
.divForm {
  padding-left: 30px;
  padding-right: 30px;

}

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
