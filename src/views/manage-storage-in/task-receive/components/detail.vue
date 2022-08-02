<template>
  <div>
    <TableList
      :total="total"
      :data-list="list"
      :label-list="labelList"
      :head-is-show="false"
      :operate="false"
      :go-back-is-shou="true"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
      @goBack="goBack"
    />
  </div>
</template>
<script>
import TableList from '@/components/TableList'
import { TheGoodsInfo } from '@/utils/componensList'
import { getReceiptList } from '@/api/manage-storage-in_taskReceive'

export default {
  name: 'Detail',
  components: { TableList },
  data() {
    return {
      list: [],
      total: null,
      labelList: TheGoodsInfo,
      query: {
        masterId: this.$route.query.id,
        current: 1,
        size: 10
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      this.getReceiptList()
    }
  },
  methods: {
    async getReceiptList() {
      const { records, total } = await getReceiptList(this.query)
      this.list = records
      this.total = +total
    },
    //  改变页数
    handleCurrentChange(val) {
      this.query.current = val
      this.getReceiptList()
    },
    //  改变数量
    handleSizeChange(val) {
      this.query.size = val
      this.getReceiptList()
    },
    //  点击返回
    goBack() {
      this.$router.back()
    }
  }

}
</script>
