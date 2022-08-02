<template>
  <div class="divWarehouse">
    <!--   仓库搜索框-->
    <el-card class="divHead">
      <el-row :gutter="30">
        <el-col :span="6">
          <div class="divLable">仓库编号</div>
          <el-input v-model="quest.like_code" placeholder="请输入" />
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-dark">
            <div class="divLable">仓库名称</div>
            <el-input v-model="quest.like_name" placeholder="请输入" />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-dark">
            <div class="divLable">仓库状态</div>
            <el-select slot="prepend" v-model="quest.status" style="width: 365px" placeholder="请选择">
              <el-option label="全部" value="" />
              <el-option label="停用" value="0" />
              <el-option label="启用" value="1" />
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="divLable" />
          <div class="divButton">
            <el-button class="minorImportantButton" round @click="searchFilter">搜索</el-button>
            <el-button round class="unimportanceButton" @click="resetList">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <AddWareHouse ref="AddWareHouse" />
    <router-view />
  </div>
</template>

<script>
import AddWareHouse from './components/addWareHouse'
import { getWareHouse } from '@/api/manage-base-info'

export default {
  name: 'WarHouse',
  components: {
    AddWareHouse
  },
  data() {
    return {
      quest: {
        current: 1, // 当前页
        size: 10, // 每页显示几条
        like_code: '', // 仓库编号
        like_name: '', // 仓库名称
        status: '' // 仓库状态
      }
    }
  },
  methods: {
    async searchFilter() {
      const res = await getWareHouse(this.quest)
      // 触发子组件的方法修改list
      this.$refs.AddWareHouse.changeList(res)
    },
    // 重置料单和list
    resetList() {
      this.$refs.AddWareHouse.getWareHouse()
      this.quest.like_code = ''
      this.quest.like_name = ''
      this.quest.status = ''
    }

  }
}
</script>

<style lang="scss">
.divHead {
  .el-input__inner {
    height: 40px;
    line-height: 40px;
    border: 1px solid #f8f5f5;
    background: #f8f5f5;
    border-radius: 6px;
  }

  .el-card__body {
    padding: 30px;
  }

  .divButton {
    .minorImportantButton {
      background: #ffb200;
      color: #332929;

      &:hover {
        background: #ff8e00;
      }
    }

    .unimportanceButton {
      background: #f8f5f5;
      color: #332929;

      &:hover {
        background: #ffb200;
      }
    }
  }
}
</style>

<style scoped lang="scss">
.divWarehouse {

  .divHead {
    height: 127px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
    margin-bottom: 20px;
    font-size: 12px;

    .divLable {
      color: #887e7e;
      margin-bottom: 10px;
      height: 18px;

    }

    .divButton {
      float: right;
    }
  }
}

</style>
