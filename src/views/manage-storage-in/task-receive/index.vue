<template>
  <div class="dashboard-container">
    <div class="app-container">
      <SearchNav :form="form" @clearForm="clearForm" @submit="searchTask">
        <template #list>
          <SearchItem v-model.trim="form.taskCode" prop="taskCode" label="任务编号" />
          <SearchItem v-model.trim="form.owner" prop="owner" label="货主名称" />
          <SearchItem v-model.trim="form.status" prop="status" :options="options" :show-select="true" label="收获状态" />
        </template>
      </SearchNav>
      <!--      表格-->
      <TableList
        ref="TableListRef"
        :select-show="true"
        left-name="收货完成"
        :total="total"
        :data-list="list"
        :label-list="labelList"
        @handleSelectionChange="handleSelectionChange"
        @btnLeft="addTheGoods"
        @handleDel="thsGoodInfo"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      >
        <template #editBtn>
          <div />
        </template>
        <template #delBtn>
          <div />
        </template>
        <template #headright>
          <div />
        </template>
        <template #stopBtn>
          <div />
        </template>

      </TableList>
    </div>
    <!--弹出框-->
    <el-dialog
      v-if="theGoodsTaskRes.errors"
      title="生成收货任务"
      :visible.sync="theGoodsTaskIsShow"
      width="30%"
    >
      <div class="spanSubTitle"> {{ theGoodsTaskRes.errors.length }}个收货任务生成失败！</div>
      <div class="divFailureMsg">收货任务生成失败原因如下</div>
      <el-scrollbar style="height:100%">
        <div v-for="(item,index) in theGoodsTaskRes.errors" :key="index" class="el-scrollbar__view">
          <div class="divItems">{{ item }}</div>
        </div>
      </el-scrollbar>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" round @click="theGoodsTaskIsShow = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SearchNav from '@/components/Searchnav'
import SearchItem from '@/components/SearchItem'
import TableList from '@/components/TableList'
import { taskReceiveMenu } from '@/utils/componensList'
import { getTaskList, goodsSuccess } from '@/api/manage-storage-in_taskReceive'

export default {
  name: 'TackReceive',
  components: { SearchNav, SearchItem, TableList },
  data() {
    return {
      theGoodsTaskRes: {},
      theGoodsTaskIsShow: true,
      list: [],
      total: null,
      labelList: taskReceiveMenu,
      form: {
        taskCode: null,
        owner: null,
        status: null
      },
      query: {
        code: null,
        ownerName: null,
        current: 1,
        size: 10,
        status: null
      },
      options: [{
        value: 1,
        label: '待分配'
      }, {
        value: 2,
        label: '收货中'
      }, {
        value: 3,
        label: '收货完成'
      }, {
        value: 4,
        label: '已取消'
      }],
      theGoodsId: []
    }
  },
  created() {
    this.getTaskList()
  },
  methods: {
    async getTaskList() {
      const { records, total } = await getTaskList(this.query)
      this.list = records
      this.total = +total
    },
    //  点击搜索
    async searchTask(val) {
      this.query.code = val.taskCode
      this.query.ownerName = val.owner
      this.query.status = val.status
      await this.getTaskList()
    },
    // 点击重置
    clearForm() {
      this.query = {
        code: null,
        ownerName: null,
        current: 1,
        size: 10,
        status: null
      }
      this.getTaskList()
    },
    //  点击获取选择框的值
    handleSelectionChange(val) {
      this.theGoodsId = val.map(item => item.id)
    },
    // 却换页数
    handleCurrentChange(val) {
      this.query.current = val
      this.getTaskList()
    },
    // 切换条数
    handleSizeChange(val) {
      this.query.size = val
      this.getTaskList()
    },
    //  点击收货完成
    async addTheGoods() {
      if (this.theGoodsId) return this.$message.error('请选择收货单')
      this.theGoodsTaskRes = await goodsSuccess(this.theGoodsId)
      this.theGoodsTaskIsShow = true
      this.$refs.TableListRef.clearCheck()
    },
    //  点击查看详情
    thsGoodInfo(val) {
      this.$router.push({
        path: '/manage-storage-in/list-in/task-receiveDetail',
        query: {
          id: val.masterId
        }
      })
    }
  }

}
</script>

<style scoped lang="scss">
.dashboard-container {
  ::v-deep.el-dialog__body {
    background: #f9f9f9;
    border: 1px solid #eaeaea;
    border-radius: 4px;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 23px;
    margin-bottom: 20px;

    padding: 21px 20px 14px 21px;
  }

  ::v-deep.is-justify-space-between {
    text-align: center !important;
  }

  .divFailureMsg {
    color: #d9021c;
    text-align: center;
    margin-bottom: 10px;
  }

  .spanSubTitle {
    margin-bottom: 20px;
    height: 24px;
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    color: #332929;
    line-height: 24px;
  }

  .divItems {
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    color: #b5abab;
    line-height: 22px;
    padding-right: 10px;
    text-align: left;
  }
}
</style>
