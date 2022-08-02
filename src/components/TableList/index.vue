<template>
  <el-card :body-style="{ padding: '0px' }">
    <!--    进度条-->
    <div v-if="isShowProcessBar" class="divProgress">
      <div class="divLabel">上架任务</div>
      <div class="divContainer">
        <el-progress
          :percentage="num"
          :show-text="false"
          :color="customColorMethod"
        />
      </div>
      <div> {{ processBarList.goodsGroundingTotal }}/{{ processBarList.goodsRealTotal }}</div>
    </div>
    <div v-if="headIsShow" class="btnHead">
      <el-row>
        <el-col :span="16">
          <slot name="headleft">
            <headBtnLeft :btn-name="leftName" @btnLeft="$emit('btnLeft')" />
          </slot>
        </el-col>
        <el-col :span="8">
          <slot name="headright">
            <headBtnRight
              :first-btn="firstBtn"
              :sec-btn="secBtn"
              style="margin-left:60px"
              @firstBtn="$emit('firstBtn')"
              @secBtn="$emit('secBtn')"
            />
          </slot>
        </el-col>

      </el-row>

    </div>
    <div class="listBody">
      <el-table
        ref="multipleTable"
        :cell-style="{padding: '0'}"
        :data="dataList"
        :row-style="{height: '45px'}"
        border
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          v-if="selectShow"
          align="center"
          type="selection"
          width="55"
        />
        <el-table-column
          align="center"
          label="序号"
          type="index"
          width="100"
        />
        <el-table-column
          v-for="(item,index) in labelList"
          :key="index"
          :filter-method="item.filters?filterHandler:null"
          :filters="item.filters"
          :label="item.label"
          :prop="item.prop"
          :sortable="item.sortable"
          :width="item.width"
          align="center"
        />
        <el-table-column
          v-if="operate"
          :width="operateWidth"
          align="center"
          :fixed="flex"
          label="操作"
        >
          <template slot-scope="scope">
            <slot name="operateBtn">
              <el-row justify="space-between" style="padding: 0 5px" type="flex">
                <slot name="diyBtnfirst">
                  <el-col>
                    <el-button size="small" style="padding-right: 3px" type="text" @click="handledelClick(scope.row)">
                      {{ diyBtnName }}
                    </el-button>
                  </el-col>
                </slot>
                <slot name="editBtn">
                  <el-col>
                    <el-button size="small" type="text" @click="handleeditList(scope.row)">编辑</el-button>
                  </el-col>
                </slot>
                <slot name="stopBtn">
                  <el-col>
                    <el-button size="small" type="text" @click="handlestopList(scope.row)">
                      {{ scope.row.status|statusFilters }}
                    </el-button>
                  </el-col>
                </slot>
                <slot name="delBtn">
                  <el-col>
                    <el-button size="small" type="text" @click="handledelClick(scope.row)">删除</el-button>
                  </el-col>
                </slot>
              </el-row>
            </slot>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="paginationShow" class="block">
      <el-pagination
        :current-page="currentPage4"
        :page-size="100"
        :page-sizes="[10, 20, 30, 40]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div v-if="goBackIsShou" class="buttonBox">
      <el-button class="unimportanceButton" @click="goBackBtn">返回</el-button>
    </div>

  </el-card>
</template>

<script>
import headBtnLeft from '@/components/TableList/headBtnLeft'
import headBtnRight from '@/components/TableList/headBtnRight'

export default {
  name: 'Table',
  components: { headBtnLeft, headBtnRight },
  filters: {
    statusFilters(val) {
      if (val === '启用' || val === 1) {
        return '停用'
      } else if (val === '停用' || val === 0) {
        return '启用'
      }
    }
  },
  props: {
    labelList: {
      type: Array
    },
    dataList: {
      type: Array
    },
    total: {
      type: Number
    },
    selectShow: {
      type: Boolean,
      default: false
    },
    operate: {
      type: Boolean,
      default: true
    },
    paginationShow: {
      type: Boolean,
      default: true
    },
    headIsShow: {
      type: Boolean,
      default: true
    },
    firstBtn: {
      type: String,
      default: '下载库区模板'
    },
    diyBtnName: {
      type: String,
      default: '查看详情'
    },
    secBtn: {
      type: String,
      default: '导入库区信息'
    },
    leftName: {
      type: String,
      default: '新增仓库'
    },
    // 进度条
    isShowProcessBar: {
      type: Boolean,
      default: false
    },
    processBarList: {
      type: Object,
      default: () => {
      }
    },
    num: {
      type: [String, Number],
      default: 100
    },
    operateWidth: {
      type: [String, Number],
      default: 200
    },
    currentPage: {
      type: [String, Number],
      default: 1
    },
    flex: {
      type: [String, Boolean],
      default: () => 'right'
    },
    goBackIsShou: {
      type: [Boolean],
      default: false
    }
  },
  data() {
    return {
      currentPage4: this.currentPage,
      customColorMethod: [
        { color: '#00be76', percentage: 20 },
        { color: '#6ee696', percentage: 40 }
      ]
    }
  },

  methods: {
    // 清除选中框
    clearCheck() {
      this.$refs.multipleTable.clearSelection()
    },
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val)
    },
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val)
    },
    handleSizeChange(val) {
      this.$emit('handleSizeChange', val)
    },
    handledelClick(val) {
      // console.log(val)
      this.$emit('handleDel', val)
    },
    handleeditList(val) {
      // console.log(val)
      this.$emit('handleEdit', val)
    },
    handlestopList(val) {
      // console.log(val)
      this.$emit('handleStop', val)
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    aa() {
    },
    //  返回按钮
    goBackBtn() {
      this.$emit('goBack')
    }

  }
}
</script>

<style lang="scss" scoped>

.el-card {
  background: #fff;
  border-radius: 12px;
  border: none;
  box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
  //进度条样式
  .divProgress {
    padding: 32px 0 20px 20px;
    display: flex;
    align-items: center;

    .divLabel {
      height: 18px;
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #332929;
      line-height: 18px;
    }

    .divContainer {
      margin: 6px 18px 10px 14px;
      height: 7px;
      width: 200px;
    }

  }

  ::v-deep.el-table__body-wrapper.is-scrolling-right ~ .el-table__fixed-right {
    box-shadow: none !important;
  }

  ::v-deep.el-table__fixed-right {
    box-shadow: 0 -5px 10px rgb(0 0 0 / 12%);
  }

  //悬浮变色
  ::v-deep.el-table__body .el-table__row.hover-row td {
    background-color: #fff6e2 !important;
  }

  .el-checkbox {
    margin: 0 auto;
  }

  ::v-deep.el-table th, .el-table tr {
    background-color: #f9f6ee !important;
  }

  ::v-deep.el-input__inner {
    background-color: #f8f5f5;
    border-color: #f8f5f5;
  }

  ::v-deep.el-table__body .el-table__row.hover-row td {
    background-color: #fff6e2 !important;
  }

  ::v-deep.el-table__body .el-table__row:hover td {
    background-color: #fff6e2 !important;
  }

  ::v-deep.el-table__header {
    height: 50px;
  }

  ::v-deep.el-table .el-table__header-wrapper .el-table__header thead tr th > .cell {
    font-size: 13px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    color: #887e7e;
  }

  ::v-deep.el-table .el-table__body-wrapper .el-table__row .cell {
    font-size: 13px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    color: #332929;
  }

  .btnHead {
    margin: 20px 30px;
    height: 40px;
  }

  ::v-deep.el-table--striped .el-table__body tr.el-table__row--striped td {
    background: #fdfcf9;
  }

  ::v-deep.el-table__body-wrapper::-webkit-scrollbar {
    width: 10px; /*滚动条宽度*/
    height: 8px; /*滚动条高度*/
  }

  ::v-deep.el-table--scrollable-x .el-table__body-wrapper {
    padding-bottom: 5px;
    margin-bottom: 5px;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::v-deep.el-table__body-wrapper::-webkit-scrollbar-track {
    border-radius: 10px; /*滚动条的背景区域的圆角*/
  }

  /*定义滑块 内阴影+圆角*/
  ::v-deep.el-table__body-wrapper::-webkit-scrollbar-thumb {
    border-radius: 10px; /*滚动条的圆角*/
    background-color: #efebea; /*滚动条的背景颜色*/
  }

  .block {
    margin: 0 auto;
    text-align: center;
    padding-top: 18px;
    padding-bottom: 34px;
  }

  .buttonBox {
    padding: 25px 0 40px;
    border-top: 1px solid #f5efee;
    text-align: center;

    .unimportanceButton {
      height: 40px;
      width: 170px;
      background: #f8f5f5;
      border-radius: 20px;
      border: 0;
      font-size: 14px;
      font-weight: 500;
      text-align: center;
      padding-left: 26px;
      padding-right: 26px;
      cursor: pointer;
      outline: 0;

      &:hover {
        background: #ffb200;
        color: black;
      }
    }
  }

  //::v-deep .el-table__row.hover-row {
  //  background:  !important;
  //}
}
</style>
