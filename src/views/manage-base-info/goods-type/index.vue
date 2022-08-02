<template>
  <div class="dashboard-container">
    <div class="app-containerGoodType">
      <SearchNav :form="form" @submit="searchGoods" @clearForm="clearForm">
        <template #list>
          <SearchItem v-model="form.code" label="类型编码" prop="code" />
          <SearchItem v-model="form.typeName" label="类型名称" prop="typeName" />
        </template>
      </SearchNav>
      <TableList
        :total="total"
        left-name="新增货品类型"
        :label-list="goodsTypeMenu"
        :data-list="list"
        :flex="false"
        operate-width
        @btnLeft="addGoodsType"
        @handleEdit="editGoods"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
        @handleDel="handleDel"
      >
        <template #stopBtn>
          <div />
        </template>
        <template #diyBtnfirst>
          <div />
        </template>
        <template #headright>
          <div />
        </template>
      </TableList>
    </div>
    <AddGoodsType ref="addGoodsRef" :add-list="addList" :dialog-visible.sync="dialogVisible" />
  </div>
</template>

<script>
import SearchNav from '@/components/Searchnav'
import SearchItem from '@/components/SearchItem'
import TableList from '@/components/TableList'
import { goodsTypeMenu } from '@/utils/componensList'
import { delGoodsType, editGoods, getGoodTypeList } from '@/api/manage-base-info_goods-type'
import AddGoodsType from './components/addGoodsType'

export default {
  name: 'GoodsType',
  components: { SearchNav, SearchItem, TableList, AddGoodsType },
  data() {
    return {
      addList: {},
      dialogVisible: false,
      list: [],
      goodsTypeMenu: goodsTypeMenu,
      form: {
        code: '',
        typeName: ''
      },
      query: {
        id: null,
        like_code: null,
        like_name: null,
        size: 10,
        current: 1,
        descs: 'createTime'
      },
      total: null
    }
  },
  created() {
    this.getGoodTypeList()
  },
  methods: {
    // 获取list
    async getGoodTypeList() {
      const { records, total } = await getGoodTypeList(this.query)
      this.list = records
      this.total = +total
    },
    // 点击搜索
    searchGoods(val) {
      this.query.like_code = val.code
      this.query.like_name = val.typeName
      this.getGoodTypeList()
    },
    // 点击重置
    clearForm() {
      this.query = {
        id: null,
        like_code: null,
        like_name: null,
        size: 10,
        current: 1,
        descs: 'createTime'
      }
      this.getGoodTypeList()
    },
    // 点击新增
    addGoodsType() {
      this.$refs.addGoodsRef.getGoodTypeCode()
      this.dialogVisible = true
    },
    //  点击编辑
    async editGoods(val) {
      this.addList = await editGoods(val.id)
      this.$refs.addGoodsRef.changeForm(this.addList)
      this.dialogVisible = true
    },
    handleCurrentChange(val) {
      this.query.current = val
      this.getGoodTypeList()
    },
    handleSizeChange(val) {
      this.query.size = val
      this.getGoodTypeList()
    },
    async handleDel(val) {
      try {
        await this.$confirm('确定删除嘛？', '提示')
        const res = await delGoodsType(val.id)
        this.$message.success('删除成功')
        await this.getGoodTypeList()
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    }
  }

}
</script>

<style lang="scss">
.app-containerGoodType {

  .el-row--flex.is-justify-space-between {
    justify-content: center;

    .el-col-24 {
      width: 50px;
    }
  }
}
</style>
