<template>
  <div class="lookAdded">
    <!--  弹出框-->
    <el-dialog
      title="提示"
      :visible="lookAddedVisible"
      width="60%"
      @open="open"
      @close="close"
    >
      <div>
        <el-table
          :data="listOne"
          style="width: 100%"
        >
          <el-table-column
            prop="goodsCode"
            label="货品编号"
            width="180"
          />
          <el-table-column
            prop="goodsName"
            label="货品名称"
            width="180"
          />
          <el-table-column
            prop="goodsTypeName"
            label="货品类型"
            width="180"
          />
          <el-table-column
            prop="realNum"
            label="货品数量"
            width="180"
          />
          <el-table-column
            prop="ownerName"
            label="货主名称"
          />
        </el-table>
        <!--   下面表格-->
        <el-table
          border
          :data="listOne"
          style="width: 100%;margin-top: 20px;"
        >
          <el-table-column
            prop="goodsCode"
            label="实上库位"
            width="370"
          >
            <el-form :model="form">
              <el-form-item>
                <!--                <el-input v-model="form.reality" disabled style="padding: 10px 0" />-->
                <el-cascader
                  v-model="form.reality"
                  :options="options"
                  @change="handleChange"
                />
              </el-form-item>
            </el-form>
          </el-table-column>
          <el-table-column
            prop="goodsName"
            label="实上数量"
            width="370"
          />
          <el-table-column
            prop="goodsTypeName"
            label="操作"
            width="360"
          />
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button round @click="close">返 回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getAreaListIn, getWarehouse } from '@/api/manage-storage-in_taskAdd'

export default {
  name: 'LookAddedInfo',
  props: {
    lookAddedVisible: {
      type: [Boolean],
      default: false
    },
    listOne: {
      type: [Array],
      default: () => {
        []
      }
    }
  },
  data() {
    return {
      form: {
        reality: ''
      },
      options: []

    }
  },
  created() {
  },
  methods: {
    close() {
      this.$emit('update:lookAddedVisible', false)
    },
    open() {
      this.getWarehouse()
    },
    handleChange(value) {
    },
    // 获取仓库
    async getWarehouse() {
      const res = await getWarehouse(this.listOne[0].ownerId)
      if (res.length === 0) return
      res.forEach(item => {
        this.options.push({
          value: item.id,
          label: item.name
        })
      })
      await this.getAreaListIn(res[0].id)
    },
    //  获取库区
    async getAreaListIn(id) {
      const res = await getAreaListIn(id)
      res.forEach(item => {
        this.options.children = []
        this.options.children.push({
          value: item.id,
          label: item.name
        })
      })
      console.log(res)
    }
  }
}
</script>

<style scoped lang="scss">
.lookAdded {

  ::v-deep.el-table__row {
    text-align: center;
  }

  ::v-deep.el-dialog__body {
    height: 500px;
  }

  ::v-deep.el-table__header-wrapper {
    .is-leaf {
      height: 44px;
      background: #f9f6ee;
    }
  }

  //::v-deep.el-table__body {
  //  ::v-deep.el-table__row {
  //    height: 44px;
  //  }
  //}
}
</style>
