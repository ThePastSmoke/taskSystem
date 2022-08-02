<template>
  <div class="dashboard-container">
    <!--最大的盒子-->
    <div class="dashboard-text">
      <!--  上半部分   -->
      <div class="divStatic">
        <!--   左侧盒子-->
        <div class="divLeft">

          <el-card class="banner">
            <img
              src="http://www-wms-java.itheima.net/img/dashboard-banner-left@2x.5afd2949.png"
              alt=""
              class="img-left"
            >
            <img
              src="http://www-wms-java.itheima.net/img/dashboard-banner-right@2x.28195570.png"
              alt=""
              class="img-right"
            >
            <img src="http://www-wms-java.itheima.net/img/avatar@2x.4f4a758f.png" alt="" class="user-header">
            <p class="user-title">仓储管理员</p>
            <p class="subject-title">我不是为了输赢，我就是认真！</p>
            <p class="subject-author">—— 罗永浩</p>
            <div class="site">
              <p class="title">北京总仓</p>
            </div>
          </el-card>
          <!--  代办事项-->
          <el-card class="backlog" shadow="hover">
            <div class="subject">代办事项</div>
            <div class="item-list">
              <el-row :gutter="30">
                <el-col v-for="(item,index) in todo" :key="index" :span="8">
                  <a href="#">
                    <div class="grid-content bg-purple">
                      <i :class="item.icon" class="iconfont  Storage" :style="{background: item.color}" />
                      <div class="title">{{ item.name }}</div>
                      <div class="bottom">
                        <span class="spanlabel">新增</span>
                        <span class="spanValue">{{ item.value1 }}</span>
                        <span class="spanlabel">待审合</span>
                        <span class="spanValue" :style="{color: item.color}">{{ item.value2 }}</span>
                      </div>
                    </div>
                  </a>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
        <!--  右侧盒子 通知公告-->
        <div class="divRight">
          <el-card class="notes">
            <div class="subject">通知公告</div>
            <div class="item">
              <div class="hr" />
              <div class="title">紧急盘点通知</div>
              <div class="time">2020.12.30 18:23:14</div>
            </div>
            <div class="item">
              <div class="hr" />
              <div class="title">运维服务跟新通知</div>
              <div class="time">2021.01.25 18:23:14</div>
            </div>
            <div class="item">
              <div class="hr" />
              <div class="title">客户入库变更通知</div>
              <div class="time">2021.01.26 18:23:14</div>
            </div>
            <div class="item">
              <div class="hr" />
              <div class="title">五一放假通知</div>
              <div class="time">2021.4.25 18:23:14</div>
            </div>
            <div class="item">
              <div class="hr" />
              <div class="title">品达物流对金额系统</div>
              <div class="time">2021.03.25 18:23:14</div>
            </div>

          </el-card>
        </div>
      </div>
      <!--  任务导航组件-->
      <TaskBar />
      <!--入库出口信息-->
      <TaskInfo />
      <div class="libs">
        <!--圆形图形-->
        <el-card class="use-charts">
          <div class="header">
            <p class="subject">库存使用情况</p>
          </div>
          <div class=" chartStoreInfo">1</div>
        </el-card>
        <!-- 饼形状 -->
        <el-card class="libs-charts">
          <div class="header">
            <div class="subject">库区使用情况</div>
          </div>
          <div class="pieChart" />
        </el-card>

      </div>
    </div>
  </div>
</template>

<script>

import { getAreaUseStatus, getsStockUseStatus, getStoreInfo } from '@/api/home'
import TaskBar from '@/views/dashboard/components/taskBar'
import TaskInfo from '@/views/dashboard/components/taskInfo'
import * as echarts from 'echarts'

export default {
  name: 'Dashboard',
  components: {
    TaskBar,
    TaskInfo
  },
  data() {
    return {
      todo: '',
      storeInfo: [] // 库存使用情况数据
    }
  },
  created() {
    this.getsStockUseStatus()
    this.getStoreInfo()
    this.getAreaUseStatus() // 库区使用情况
  },
  mounted() {
    this.charPie()
  },
  methods: {
    // 代办事项请求
    async getsStockUseStatus() {
      const res = await getsStockUseStatus()
      res[0].color = 'rgb(0, 118, 255)'
      res[1].color = 'rgb(255, 178, 0)'
      res[2].color = 'rgb(255, 113, 0)'
      res[0].icon = 'icon-rukudan'
      res[1].icon = 'icon-chukudan'
      res[2].icon = 'icon-pandiandan'
      this.todo = res
    },
    async getStoreInfo() {
      this.storeInfo = await getStoreInfo()
      this.chartStoreInfo()
    },
    // 原型图图标
    chartStoreInfo() {
      const myCEchar = document.querySelector('.chartStoreInfo')
      echarts.init(myCEchar).setOption(
        {
          tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0,0,0,0)' // 设置背景图片 rgba格式
          },
          color: ['#ffaa00', '#e4dbda'],
          series: [
            {
              type: 'pie',
              radius: ['35%', '50%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '12',
                  fontWeight: 'bold',
                  textStyle: {
                    color: '#ffaa00'// 文字颜色
                  }
                }
              },
              labelLine: {
                show: true
              },
              data: [
                this.storeInfo[1],
                this.storeInfo[0]
              ]
            }
          ]
        }
      )
    },
    // 饼形请求数据 库区使用情况
    async getAreaUseStatus() {
      // 数据是空的
      await getAreaUseStatus()
      // console.log(res)
    },
    //  饼状
    charPie() {
      const mychar = document.querySelector('.pieChart')
      const mychart = echarts.init(mychar)

      const option = {
        color: ['#0076FF', '#52D4F3', '#5D7092', '#FFB200', '#FF7C00'],
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {d}%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderWidth: '0',
          textStyle: {
            color: '#fff'
          }
        },
        legend: [
          {
            icon: 'circle',
            itemWidth: 10, // 设置宽度
            itemHeight: 10,
            top: 'center',
            right: '40%',
            orient: 'vertical',
            formatter: '{name}',
            itemGap: 20
          },
          {
            itemWidth: '0',
            top: 'center',
            right: '30%',
            orient: 'vertical',
            itemGap: 20,
            formatter: function(name) {
              const data = option.series[0].data
              // console.log(data, 'data')
              let total = 0
              let tarValue
              for (let i = 0; i < data.length; i++) {
                total += data[i].value
                if (data[i].name === name) {
                  tarValue = data[i].value
                }
              }
              // const v = tarValue
              // 计算出百分比
              const p = Math.round((tarValue / total) * 100) + '%'
              return `${p}`
              // name是名称，v是数值
            }
          },
          {
            itemWidth: '0',
            top: 'center',
            right: '20%',
            orient: 'vertical',
            itemGap: 20,
            formatter: function(name) {
              const data = option.series[0].data
              // console.log(data, 'data')
              // eslint-disable-next-line no-unused-vars
              let total = 0
              let tarValue
              for (let i = 0; i < data.length; i++) {
                total += data[i].value
                if (data[i].name === name) {
                  tarValue = data[i].value
                }
              }
              const v = tarValue
              // 计算出百分比
              // const p = Math.round((tarValue / total) * 100) + '%'
              return `${v}`
              // name是名称，v是数值
            }
          }
        ],
        series: [
          {
            name: 'Access From',
            type: 'pie',
            avoidLabelOverlap: false,
            itemStyle: {
              // borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            center: ['30%', '50%'],
            radius: '70%',
            label: {
              show: false,

              normal: {
                show: true,
                position: 'inner', // 数值显示在内部
                formatter: '{c}',
                color: '#fff'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 348, name: '拣货区' },
              { value: 487, name: '出库区' },
              { value: 677, name: '暂存库区' },
              { value: 126, name: '进货暂存区' },
              { value: 298, name: '出货暂存区' }
            ]
          }
        ]
      }
      mychart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    padding: 20px 50px 30px;
    background: #fdfafa;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.divStatic {
  display: flex;
  width: 100%;
  height: 451px;
  background: #fdfafa;

  .banner {
    position: relative;
    width: 1326px;
    height: 148px;
    background: linear-gradient(270deg, #ffc771, #ffa634);
    box-shadow: 0 0 6px 0 rgb(188 151 69 / 12%);
    border-radius: 12px;

    .img-left {
      position: absolute;
      top: 0;
      left: 0;
      height: 148px;
    }

    .img-right {
      position: absolute;
      top: 0;
      right: 0;
      height: 148px;
    }

    .user-header {
      position: absolute;
      top: 31px;
      left: 43px;
      height: 62px;
    }

    .user-title {
      position: absolute;
      left: 36px;
      bottom: 10px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #332929;
      line-height: 22px;
    }

    .subject-title {
      position: absolute;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #fff;
      line-height: 25px;
      top: 20px;
      left: 200px;
      font-size: 18px;
    }

    .subject-author {
      top: 60px;
      left: 400px;
      font-size: 16px;
      position: absolute;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #fff;
      line-height: 25px;
    }

    .site {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 147px;
      height: 40px;
      background: #f8f5f5;
      border-radius: 6px;
      opacity: .79;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;

      .title {
        font-size: 14px;
        font-weight: 500;
        color: #332929;
      }
    }
  }

  .backlog {
    margin-top: 20px;
    width: 1326px;
    height: 282px;
    background: #fff;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
    border-radius: 12px;

    .subject {
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #332929;
      line-height: 22px;
    }

    .item-list {
      margin-top: 19px;

      .grid-content {
        position: relative;
        height: 186px;
        width: 406px;
        background: #fbf7f7;
        border-radius: 8px;
        padding: 20px;
        cursor: pointer;

        &:hover {
          background: #fff;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        }

        .Storage {
          width: 49px;
          height: 49px;
          font-size: 32px;
          color: #fff;
          background: #0076ff;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }

        .title {
          position: absolute;
          top: 34px;
          left: 85px;
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #332929;
          line-height: 22px;
        }

        .bottom {
          position: absolute;
          bottom: 20px;

          .spanlabel {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #887e7e;
            margin-right: 10px;
            vertical-align: super;
          }

          .spanValue {
            font-size: 36px;
            font-family: DIN-Medium, DIN;
            font-weight: 500;
            color: #332929;
            margin-right: 20px;
          }
        }
      }
    }
  }

  .divLeft {
    margin-right: 30px;
  }

  .divRight {
    width: 261px;
    height: 451px;
    background: #fff;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
    border-radius: 12px;

    .notes {
      width: 261px;
      height: 451px;
      background: #fff;
      box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
      border-radius: 12px;

      .subject {
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #332929;
        line-height: 22px;
      }

      .item {
        margin-top: 15px;

        .hr {
          width: 201px;
          height: 1px;
          background-color: #f5efee;
        }

        .title {
          width: 195px;
          height: 18px;
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #332929;
          line-height: 18px;
          margin-top: 15px;
        }

        .time {
          width: 115px;
          height: 17px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #887e7e;
          line-height: 17px;
          margin-top: 10px;
        }
      }
    }
  }
}

.libs {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;

  .use-charts {
    width: 30%;
    height: 354px;
    background: #fff;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
    border-radius: 12px;
    //padding: 25px;
    margin-right: 30px;

    .chartStoreInfo {
      width: 100%;
      height: 330px;
    }
  }

  .header {
    .subject {
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #332929;
      margin: 0;
    }
  }

  .libs-charts {
    width: 70%;
    height: 354px;
    background: #fff;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
    border-radius: 12px;

    .pieChart {
      width: 1060px;
      height: 280px;
      //background: pink;
    }
  }
}

</style>
