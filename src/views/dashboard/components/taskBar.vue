<template>
  <el-card class="tasks">
    <div class="subject">任务导航</div>
    <div class="item-list">
      <el-row type="flex" :gutter="30">
        <el-col :span="5">
          <a href="#" class="tackbar">
            <div class="tasks-item">
              <div class="icon">
                <i class="change iconfont icon-shouhuo" />
              </div>
              <div class="title">收货任务</div>
            </div>
          </a>
        </el-col>
        <el-col :span="5">
          <a href="#" class="tackbar">
            <div class="tasks-item">
              <div class="icon" style="background: rgb(82, 212, 243);">
                <i class="change iconfont icon-shangjia" />
              </div>
              <div class="title">任务上架</div>
            </div>
          </a>
        </el-col>
        <el-col :span="5">
          <a href="#" class="tackbar">
            <div class="tasks-item">
              <div class="icon" style="background: rgb(255, 113, 0);">
                <i class="change iconfont icon-pandian" />
              </div>
              <div class="title">任务盘点</div>
            </div>
          </a>
        </el-col>
        <el-col :span="5">
          <a href="#" class="tackbar">
            <div class="tasks-item">
              <div class="icon" style="background: rgb(255, 96, 158);">
                <i
                  class="change iconfont icon-lianhuo"
                />
              </div>
              <div class="title">拣货任务</div>
            </div>
          </a>
        </el-col>
        <el-col :span="5">
          <a href="#" class="tackbar">
            <div class="tasks-item">
              <div class="icon" style="background: rgb(255, 178, 0);">
                <i class="change iconfont icon-jiaojie" />
              </div>
              <div class="title">交接任务</div>
            </div>
          </a>
        </el-col>

      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'TaskBar',
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
.tasks {
  margin-top: 20px;

  .subject {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #332929;
    line-height: 22px;
  }

  .item-list {
    margin-top: 19px;

    .tasks-item {
      position: relative;
      width: 100%;
      height: 93px;
      background: #fbf7f7;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-evenly;

      &:hover {
        background: #fff;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
      }

      .icon {
        width: 50px;
        height: 50px;
        background: #0076ff;
        border-radius: 25px;
        display: flex;
        align-items: center;
        justify-content: space-around;

        .change {
          font-size: 28px;
          color: #f8f5f5;
        }
      }

      .title {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #332929;
        line-height: 22px;
      }
    }
  }
}
</style>
