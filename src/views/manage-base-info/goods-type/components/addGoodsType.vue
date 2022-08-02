<template>
  <el-dialog
    class="addGoods"
    title="添加货品类型"
    :visible="dialogVisible"
    width="30%"
    @close="close"
  >
    <el-form ref="formRef" :rules="rules" :model="form">
      <el-form-item label="货品类型编辑" prop="code">
        <el-input v-model="form.code" disabled />
      </el-form-item>
      <el-form-item label="货品类型名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button round @click="close">取 消</el-button>
      <el-button type="primary" round @click="addGoodType">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addGoodType, changGoodsInfo, getGoodTypeCode } from '@/api/manage-base-info_goods-type'

export default {
  name: 'AddGoodsType',
  props: {
    dialogVisible: {
      type: [Boolean]
    },
    addList: {
      type: [Object],
      default: () => {
      }
    }
  },
  data() {
    return {
      form: {
        code: '',
        name: ''
      },
      rules: {
        code: [{ required: true, message: '请输入货品类编码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入货品类型名称', trigger: 'blur' }]
      }
    }
  },
  created() {
  },
  methods: {
    close() {
      this.$emit('update:dialogVisible', false)
      this.$refs.formRef.resetFields()
      this.form = {
        code: '',
        name: ''
      }
    },
    // 请求获取code值
    async getGoodTypeCode() {
      this.form.code = await getGoodTypeCode()
    },
    // 点击新增
    async addGoodType() {
      try {
        await this.$refs.formRef.validate()
        if (this.form.id) {
          await changGoodsInfo(this.form)
          this.$message.success('修改货品成功')
        } else {
          await addGoodType(this.form)
          this.$message.success('新增货品成功')
        }
        this.close()
        this.$parent.getGoodTypeList()
      } catch (e) {
        console.log(e)
      }
    },
    changeForm(val) {
      this.form = val
    }
  }
}
</script>

<style lang="scss">
.addGoods {
  .el-form-item {
    .el-form-item__label {
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      color: #887e7e;
    }

    .el-input__inner {
      height: 40px;
      line-height: 40px;
      border: 1px solid #f8f5f5;
      background: #f8f5f5;
      border-radius: 6px;
    }
  }
}
</style>
