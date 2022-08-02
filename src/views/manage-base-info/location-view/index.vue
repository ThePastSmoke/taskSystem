<template>
  <div class="divLocationView">
    <el-card class="divLocationViewCondition">
      <div class="divAreaTop">
        <el-select
          v-model="areaHouseId"
          placeholder="请选择"
        >
          <el-option
            v-for="item in warehouseOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="divAreaContent">
        <div class="divAreaCondition">
          <el-input
            v-model="searchArea"
            placeholder="请输入库区名称"
            suffix-icon="el-icon-search"
          />
        </div>
        <div v-if="AreaList.length" class="divAreaDetails">
          <div class="divAreaList">
            <el-scrollbar>
              <div class="el-scrollbar">
                <div class="el-scrollbar__view">
                  <div
                    v-for="(item,index) in AreaList"
                    :key="index"
                    class="divAreaItem"
                    :class="{itemActive:index===areaIndex}"
                    @click="clickArea(item,index)"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </el-scrollbar>
          </div>

        </div>
        <div v-else class="divAreaDetailsNone">
          <div class="divNoArea">
            <div class="divFontDisplay">
              暂无库区
            </div>
            <el-button
              type="success"
              round
              class="importantButton"
              @click="$router.push('/manage-base-info/warehouse/details')"
            >新增仓库
            </el-button>
          </div>
        </div>
      </div>
    </el-card>
    <div class="divDivision" />
    <div class="divLocationViewDisplay">
      <div class="divTop">
        <div class="divTitle">库区阅览</div>
        <div class="divOverView">
          <div class="divItem">
            <div class="divItem">
              <span class="spanLabel">库存总计：</span>
              <span>{{ OverviewList.total }}</span>
            </div>
            <div class="divItem">
              <div class="divSquare" />
              <span class="spanLabel">停用总计：</span>
              <span>{{ OverviewList.stop }}</span>
            </div>
            <div class="divItem">
              <div
                class="divSquare"
                style="background-color: rgb(0, 190, 118); width: 12px; height: 12px; border-radius: 3px;"
              />
              <span class="spanLabel">占用总计</span>
              <span>{{ OverviewList.use }}</span>
            </div>
            <div class="divItem">
              <div
                class="divSquare"
                style="background-color: rgb(178, 220, 204); width: 12px; height: 12px; border-radius: 3px;"
              />
              <span class="spanLabel">空闲库位</span>
              <span>{{ OverviewList.free }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="AreaByIdInFo.length" class="divContent">
        <el-popover
          v-for="(item,index) in AreaByIdInFo"
          :key="index"
          placement="bottom"
          width="230"
          trigger="hover"
        >
          <el-button
            slot="reference"
            class="divSquare"
          />
          <template>
            <div class="areaCode" style="padding: 10px">
              <span style="margin-right: 10px; color: #c6abb3">库位编号:</span>
              <span>{{ item.code }}</span>
            </div>
            <div class="areaCode" style="padding: 10px">
              <span style="margin-right: 10px; color: #c6abb3">库位名称:</span>
              <span>{{ item.name }}</span>
            </div>
            <div class="areaCode" style="padding: 10px">
              <span style="margin-right: 10px; color: #c6abb3">库位位置:</span>
              <span>{{ item.locationColumn }}排{{ item.locationRow }}列{{ item.locationLayer }}层</span>
            </div>
            <div class="areaCode" style="padding: 10px">
              <span style="margin-right: 10px; color: #c6abb3">库位状态:</span>
              <span>{{ item.frozen === 1 ? '空闲' : '冻结' }}</span>
            </div>
            <div class="areaCode" style="padding: 10px">
              <span style="margin-right: 10px; color: #c6abb3">货品名称:</span>
              <span>{{ item.goodsName }}</span>
            </div>
            <div class="areaCode" style="padding: 10px">
              <span style="margin-right: 10px; color: #c6abb3">货品数量:</span>
              <span />
            </div>

          </template>
        </el-popover>
      </div>
      <div v-else class="emptyTip">
        <img class="imgIcon" src="@/assets/KQGLpic.png" alt="">
        <p>暂无库位</p>
        <el-button
          style="margin-top: 20px;"
          type="success"
          round
          @click="$router.push('/manage-base-info/locationDetails')"
        >
          新增库位
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getAreaById, getAreaList, getOverview, warehouseList } from '@/api/manage-base-info_location_view'

export default {
  name: 'LocationView',
  data() {
    return {
      AreaByIdInFo: [], // 根据库区id获取库位详情
      OverviewList: [], // 库区预览详细数据
      AreaList: [], // 库区列表
      areaIndex: 0, // 显示高亮字段
      tabPosition: 'left',
      warehouseOptions: [],
      areaHouseId: '',
      searchArea: ''// 搜索库区名称
    }
  },
  watch: {
    async areaHouseId() {
      this.AreaList = await getAreaList(this.areaHouseId)
    }
  },
  created() {
    this.warehouseList()
    this.$nextTick(async() => {
      this.AreaList = await getAreaList(this.areaHouseId)
      this.OverviewList = await getOverview(this.AreaList[0].id)
      this.AreaByIdInFo = await getAreaById(this.AreaList[0].id)
    })
  },
  methods: {
    async warehouseList() {
      const res = await warehouseList(1)
      this.areaHouseId = res[0].id
      res.forEach(item => {
        this.warehouseOptions.push({
          label: item.name,
          value: item.id
        })
      })
    },
    async clickArea(item, index) {
      this.areaIndex = index
      this.OverviewList = await getOverview(item.id)
      this.AreaByIdInFo = await getAreaById(item.id)
    }

  }
}
</script>
<style lang="scss">

.divLocationView {
  .el-input__inner {
    height: 40px;
    line-height: 40px;
    border: 1px solid #f8f5f5;
    background: #f8f5f5;
    border-radius: 6px;
  }

  .el-scrollbar__view {
    display: inline-block !important;
    width: 100%
  }

  .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }

  .divAreaCondition {
    .el-input__inner {
      &:hover {
        border-color: #887e7e;
      }

      &:focus {
        border-color: #ffb200;
      }
    }
  }

}
</style>

<style lang="scss" scoped>
.divLocationView {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
  margin: 0 15px 15px;
  height: calc(100vh - 114px);

  .divAreaTop {
    margin-bottom: 20px;
  }

  .divLocationViewCondition {
    width: 263px;
    float: left;
  }

  .divTitle {
    width: 64px;
    height: 22px;
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: left;
    color: #332929;
    line-height: 22px;
    margin-bottom: 22px;
    margin-left: 10px;
  }

  .divAreaContent {
    width: 224px;
    background: #fdfcf9;
    border: 1px solid #f7f2f1;
    border-radius: 6px;
    padding: 30px 29px 0 26px;
  }

  .el-scrollbar__wrap {
    position: relative;
  }

  .divAreaDetails {
    height: calc(100vh - 360px);
    position: relative;

    .divAreaList {
      height: 100%;

      .el-scrollbar {
        height: 100%;

        .el-scrollbar__view {
          height: calc(100% - 500px);

          .divAreaItem {
            width: 140px;
            height: 40px;
            background: #fff;
            border-radius: 4px;
            box-shadow: 0 0 6px 0 rgb(255 178 0 / 40%);
            margin: 0 auto;
            margin-top: 20px;
            font-size: 13px;
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 500;
            text-align: center;
            color: #ffb200;
            line-height: 40px;
            cursor: pointer;

          }

          .itemActive {
            background: #ffb200;
            color: #332929;
          }

        }
      }
    }
  }

  .divAreaDetailsNone {
    height: calc(100vh - 360px);
    position: relative;

    .divNoArea {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      .divFontDisplay {
        width: 56px;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Semibold;
        font-weight: 600;
        text-align: left;
        color: #b5abab;
        line-height: 20px;
        margin: 0 auto;
        margin-bottom: 19px;
      }

      .importantButton {
        height: 40px;
        border: 0;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        padding-left: 26px;
        padding-right: 26px;
        cursor: pointer;
        outline: 0;
      }
    }
  }

  .divDivision {
    float: left;
    width: 10px;
    height: 100%;
    background: linear-gradient(270deg, hsla(0, 0%, 100%, 0), rgba(99, 97, 96, .1));
  }

  .divLocationViewDisplay {
    padding: 27px 19px 27px 20px;
    float: left;
    height: 100%;
    width: calc(100% - 273px);

    .divTop {
      margin-bottom: 21px;
      height: 22px;

      .divTitle {
        width: 64px;
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #332929;
        line-height: 22px;
        float: left;
        margin-right: 103px;
      }

      .divOverView {
        float: left;

        .divItem {
          float: left;
          margin-right: 43px;

          .divSquare {
            background-color: rgb(195, 195, 195);
            width: 12px;
            height: 12px;
            border-radius: 3px;
            float: left;
            margin-top: 3px;
            margin-right: 7px;
          }
        }

        .spanLabel {
          float: left;
          margin-right: 4px;
          width: 70px;
          font-size: 14px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #424250;
        }

      }
    }

    .emptyTip {
      border-top: 1px solid #f5efee;
      padding: 100px 0;
      margin: 0 auto;
      color: #b5abab;
      font-size: 14px;
      text-align: center;

      .imgIcon {
        width: 160px;
        height: 160px;
        display: inline-block;
        //background: url(`/assets/KQGLpic.png`) no-repeat;
        background-size: contain;

      }
    }
  }

  .divContent {
    width: 100%;
    height: calc(100% - 43px);
    overflow-y: auto;

    .divSquare {
      width: 36px;
      height: 36px;
      border-radius: 7px;
      margin-right: 12px;
      background-color: #b2dccc !important;

      &:hover {
        border: 2px solid #00be76;
        //border-color: #00be76;
      }
    }

  }

}

</style>
