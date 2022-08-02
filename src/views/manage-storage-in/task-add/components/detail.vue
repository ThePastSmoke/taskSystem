<template>
  <div class="taskAddDetail">
    <TableList
      :label-list="taskAddMenuInfo"
      :process-bar-list="processBarList"
      :is-show-process-bar="true"
      :head-is-show="false"
      :num="num"
      :data-list="list"
      :total="total"
      :flex="false"
      :go-back-is-shou="true"
      diy-btn-name="查看上架信息"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
      @goBack="goBack"
      @handleDel="lookAdded"
    >
      <template #editBtn>
        <div />
      </template>
      <template #stopBtn>
        <div />
      </template>
      <template #delBtn>
        <div />
      </template>
    </TableList>
    <!--    弹出框-->
    <lookAddedInfo :list-one="listOne" :look-added-visible.sync="lookAddedVisible" />
  </div>
</template>
<script>
import TableList from '@/components/TableList'
import lookAddedInfo from '@/views/manage-storage-in/task-add/components/lookAddedInfo.vue'
import { getReceiptListInfo, getReceiptListSum } from '@/api/manage-storage-in_taskAdd'
import { taskAddMenuInfo } from '@/utils/componensList'

export default {
  name: 'Detail',
  components: { TableList, lookAddedInfo },
  data() {
    return {
      lookAddedVisible: false, // 弹出层字段
      listOne: [],
      list: [],
      total: null,
      taskAddMenuInfo: taskAddMenuInfo,
      processBarList: {}, // 进度条列表
      num: 1,
      query: {
        masterId: this.$route.query.id,
        current: 1,
        size: 10
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      this.getReceiptListSum()
      this.getReceiptListInfo()
    }
  },
  methods: {
    // 获取进度条数据
    async getReceiptListSum() {
      const res = await getReceiptListSum(this.$route.query.id)
      this.processBarList = res
      this.num = Math.floor((res.goodsGroundingTotal / res.goodsRealTotal) * 100)
    },
    // 获取上架详情
    async getReceiptListInfo() {
      const { records, total } = await getReceiptListInfo(this.query)
      this.list = records
      this.total = +total
    },
    //  修改页数
    handleCurrentChange(val) {
      this.query.current = val
      this.getReceiptListInfo()
    },
    // 修改数量
    handleSizeChange(val) {
      this.query.size = val
      this.getReceiptListInfo()
    },
    //  点击返回
    goBack() {
      this.$router.back()
    },
    // 点击编辑
    lookAdded(val) {
      this.listOne = []
      this.lookAddedVisible = true
      this.listOne.push(val)
    }
  }
}
</script>
<style scoped lang="scss">

</style>
