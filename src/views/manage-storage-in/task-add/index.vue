<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!--      搜索-->
      <SearchNav :form="form" @clearForm="clearForm" @submit="searchTaskList">
        <template #list>
          <SearchItem v-model="form.code" prop="code" label="上架编号" />
          <SearchItem v-model="form.joinCode" prop="joinCode" label="入库单号" />
          <SearchItem v-model="form.ownerName" prop="ownerName" label="货主名称" />
        </template>
      </SearchNav>
      <!-- 表格-->
      <TableList
        :head-is-show="false"
        :total="total"
        :data-list="list"
        :label-list="taskAddMenu"
        @handleDel="taskAddInfo"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      >
        <template #editBtn>
          <div />
        </template>
        <template #delBtn>
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
import { taskAddMenu } from '@/utils/componensList'
import { getTaskAddList } from '@/api/manage-storage-in_taskAdd'
import { taskAddStatus } from '@/utils/filter'

export default {
  name: 'TaskAdd',
  components: { SearchNav, SearchItem, TableList },
  data() {
    return {
      taskAddMenu: taskAddMenu,
      form: {
        code: null,
        joinCode: null,
        ownerName: null
      },
      query: {
        code: null,
        receiptCode: null,
        ownerName: null,
        current: 1,
        size: 10
      },
      list: [],
      total: null
    }
  },
  created() {
    this.getTaskAddList()
  },
  methods: {
    async getTaskAddList() {
      const { records, total } = await getTaskAddList(this.query)
      records.forEach(item => {
        item.status = taskAddStatus(item.status)
      })
      this.list = records
      this.total = +total
    },
    //  点击搜索
    searchTaskList(val) {
      this.query.code = val.code
      this.query.receiptCode = val.joinCode
      this.query.ownerName = val.ownerName
      this.getTaskAddList()
    },
    //  点击重置
    clearForm() {
      this.query = {
        code: null,
        receiptCode: null,
        ownerName: null,
        current: 1,
        size: 10
      }
      this.getTaskAddList()
    },
    //  点击查看详情
    taskAddInfo(val) {
      this.$router.push({
        path: '/manage-storage-in/list-in/task-task-addDetail',
        query: {
          id: val.masterId
        }
      })
    },
    //  点击切换页数
    handleCurrentChange(val) {
      this.query.current = val
      this.getTaskAddList()
    },
    //  点击却换数量
    handleSizeChange(val) {
      this.query.size = val
      this.getTaskAddList()
    }
  }
}
</script>

<style scoped lang="scss">
.dashboard-container {
  ::v-deep.is-justify-space-between {
    text-align: center !important;
  }
}

</style>
