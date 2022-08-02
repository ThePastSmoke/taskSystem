<template>
  <el-card class="divContent">
    <el-button round class="btnAdd" @click="addTackWareHouse">新增仓库</el-button>
    <!--    仓库表格-->
    <div class="taskTable">
      <el-table
        border
        :data="list.records"
        style="width: 100%"
        stripe
      >
        <el-table-column
          type="index"
          label="序号"
          width="67"
        />
        <el-table-column
          prop="code"
          label="仓库编码"
          width="150"
        />
        <el-table-column
          prop="name"
          label="仓库名称"
          width="150"
        />
        <el-table-column
          prop="type"
          label="仓库类型"
          width="150"
        />
        <el-table-column
          prop="location"
          label="省/市/区"
          width="150"
        />
        <el-table-column
          prop="address"
          label="详细地址"
          width="150"
        />
        <el-table-column
          label="仓库状态"
          width="150"
        >
          <template slot-scope="scope">
            {{ scope.row.status === 1 ? '启用' : '停用' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="surface"
          label="仓库面积m²"
          width="150"
        />
        <el-table-column
          prop="includedNum"
          label="库区数量"
          width="150"
        />
        <el-table-column
          prop="personName"
          label="负责人"
          width="150"
        />
        <el-table-column
          prop="phone"
          label="联系电话"
          width="150"
        />
        <el-table-column
          prop="updateTime"
          label="跟新时间"
          width="150"
        />

        <el-table-column
          fixed="right"
          label="操作"
          width="180"
          class="editBtn"
        >
          <template slot-scope="{row}">
            <el-button style="margin-left: 15px" type="text" size="medium" @click="editWareHouse(row)">编辑
            </el-button>
            <el-button style="margin-left: 15px" type="text" size="medium" @click="changeWareHouseStatus(row)"> {{
              row.status === 1 ? '启用' : '停用'
            }}
            </el-button>
            <el-button style="margin-left: 15px" type="text" size="medium" @click="deleteWareHouse(row)">删除
            </el-button>
          </template>
        </el-table-column>

      </el-table>
      <!--      分页功能-->
      <div class="divBasePagination">
        <el-pagination
          :page-sizes="[10,20,30,40]"
          :page-size="questInfo.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </el-card>
</template>
<script>
import { changeWareHouseStatus, getWareHouse } from '@/api/manage-base-info'

export default {
  name: 'AddWareHouse',

  data() {
    return {
      list: [],
      total: 0, // 总条数
      questInfo: {
        current: 1, // 当前页
        size: 10, // 每页显示几条
        like_code: '', // 仓库的id
        like_name: '', // 仓库名称
        status: ''// 是否停用
      }
    }
  },
  created() {
    this.getWareHouse()
  },
  methods: {
    async getWareHouse() {
      const res = await getWareHouse(this.questInfo)
      this.list = res
      this.total = Number(res.total)
    },
    //  监听pageSize改变的事件
    handleSizeChange(newSize) {
      this.questInfo.size = newSize
      this.getWareHouse()
    },
    // 监听页码值改变
    handleCurrentChange(newPage) {
      this.questInfo.current = newPage
      this.getWareHouse()
    },
    changeList(item) {
      this.list = item
    },
    //  新增仓库并跳转
    addTackWareHouse() {
      this.$router.push('/manage-base-info/warehouse/details')
    },
    // 点击编辑跳转 路由传参id
    editWareHouse(item) {
      this.$router.push({
        path: '/manage-base-info/warehouse/details',
        query: {
          id: item.id
        }
      })
    },
    //  点击删除
    deleteWareHouse(row) {
      console.log(row)
      this.$message.warning('系统消息不可删除哦')
    },
    //  点击修改仓库状态
    async changeWareHouseStatus(row) {
      try {
        const msgStr = row.status === 0 ? '启用' : '停用'
        await this.$confirm(`你确定要${msgStr}:${row.name}嘛`, `确定${msgStr}`)
        if (row.status === 1) {
          // 停用
          await changeWareHouseStatus({ status: 0, id: row.id })
          console.log('停用')
        } else if (row.status === 0) {
          // 启动
          await changeWareHouseStatus({ status: 1, id: row.id })
          console.log('启动')
        }
        await this.getWareHouse()
        this.$message.success('修改状态成功')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style lang="scss">
.divContent {
  .el-card__body {
    padding: 0;
  }

  .taskTable {
    .el-table__fixed-right {
      .el-table__fixed-header-wrapper {
        tr {
          background: #f9f6ee;
          height: 45px;
        }

        .cell {
          font-size: 13px;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
          color: #887e7e;
        }
      }

    }

    .el-table__header-wrapper, {
      .has-gutter {
        tr {
          background: #f9f6ee;

          th {
            padding: 10px 0;
            border: 1px solid #f5efee;

            .cell {
              font-size: 13px;
              font-family: PingFangSC, PingFangSC-Medium;
              font-weight: 500;
              color: #887e7e;
            }
          }
        }
      }
    }

    .el-table__row--striped {
      background-color: #fdfcf9;
    }

    .el-table__body-wrapper {

      tbody {
        &:nth-of-type(even) {
          background-color: pink;
        }
      }

      .el-table__body {
        text-align: center;

        .el-table__row {

          &:hover {
            background: #fff6e2;
          }

          td {
            height: 45px;
            line-height: 45px;
            border: 0.5px solid #f5efee;

            .cell {
              font-size: 13px;
            }
          }
        }
      }
    }
  }
}
</style>

<style scoped lang="scss">

.divContent {

  .btnAdd {
    margin-left: 30px;
    margin-top: 20px;
    margin-bottom: 20px;
    background: #00be76;
    color: #fff;
  }

  //  分页css
  .divBasePagination {
    margin: 0 auto;
    text-align: center;
    padding-top: 25px;
    padding-bottom: 34px;
  }
}
</style>
