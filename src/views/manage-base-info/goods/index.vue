<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!--        搜索栏-->
      <SearchNav :form="formGood" @submit="searchGoods" @clearForm="clearForm">
        <template #list>
          <SearchItem v-model="formGood.code" prop="code" label="货品编号" />
          <SearchItem v-model="formGood.goodsName" prop="goodsName" label="货品名称" />
          <SearchItem v-model="formGood.userName" prop="userName" label="货主名称" />
        </template>
      </SearchNav>
      <!--        新增货品-->
      <TableList
        :total="total"
        :label-list="goodsList"
        :data-list="list"
        @btnLeft="addGoods"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
        @handleEdit="editGoodInfo"
        @handleDel="handleDel"
      >
        <template #diyBtnfirst>
          <div />
        </template>
        <template #stopBtn>
          <div />
        </template>
      </TableList>
    </div>
  </div>
</template>

<script>
import SearchNav from '@/components/Searchnav'
import SearchItem from '@/components/SearchItem'
import TableList from '@/components/TableList'
import { goodsList } from '@/utils/componensList'
import { delGoodsList, getGoodList } from '@/api/manage-base-info_goods'
// /manage-base-info/goodsDetails跳转
export default {
  name: 'Goods',
  components: { SearchNav, SearchItem, TableList },
  data() {
    return {
      list: [],
      goodsList: goodsList,
      formGood: {
        code: null,
        goodsName: null,
        userName: null
      },
      query: {
        id: null,
        code: null,
        name: null,
        ownerName: null, // 货主名称
        size: 10,
        current: 1
      },
      total: null
    }
  },
  created() {
    this.getGoodList()
  },
  methods: {
    async getGoodList() {
      const res = await getGoodList(this.query)
      this.list = res.records
      this.total = +res.total
    },
    // 点击搜索
    async searchGoods(val) {
      console.log(val)
      this.query.code = val.code
      this.query.name = val.goodsName
      this.query.ownerName = val.userName
      await this.getGoodList()
    },
    // 点击重置
    clearForm() {
      this.query = {
        id: null,
        code: null,
        name: null,
        ownerName: null, // 货主名称
        size: 10,
        current: 1
      }
      this.getGoodList()
    },
    // 修改页数
    handleCurrentChange(val) {
      this.query.current = val
      this.getGoodList()
    },
    // 修改每页数据
    handleSizeChange(val) {
      this.query.size = val
      this.getGoodList()
    },
    // 点击新增按钮
    addGoods() {
      this.$router.push('/manage-base-info/goodsDetails')
    },
    //  点击编辑
    editGoodInfo(val) {
      this.$router.push({
        path: '/manage-base-info/goodsDetails',
        query: {
          id: val.id
        }
      })
    },
    //  点击删除
    async handleDel(val) {
      try {
        await delGoodsList(val.id)
        this.$message.success('删除成功')
        await this.getGoodList()
      } catch (e) {
        console.log(e)
        this.$message.error('系统错误')
      }
    }
  }

}
</script>

<style scoped lang="scss">

</style>
