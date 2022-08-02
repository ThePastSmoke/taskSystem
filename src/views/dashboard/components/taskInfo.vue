<template>
  <el-card class="inout-charts">
    <el-row>
      <el-col :span="20">
        <div class="grid-content bg-purple-dark">
          <div class="subject">入库出库信息</div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-dark">
          <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;" @change="changeInfoList">
            <el-radio-button label="本周">本周</el-radio-button>
            <el-radio-button label="本月">本月</el-radio-button>
            <el-radio-button label="全年">全年</el-radio-button>
          </el-radio-group>
        </div>
      </el-col>
    </el-row>
    <!--    图表-->
    <div class="chart" />
  </el-card>
</template>
<script>
import * as echarts from 'echarts'
import { getSunInfo } from '@/api/home'

export default {
  name: 'TaskInfo',
  data() {
    return {
      tabPosition: '本周',
      weekInfo: {} // 本周的数据
    }
  },
  mounted() {
  },
  created() {
    this.changeInfoList()
  },
  methods: {
    // 请求数据
    // getSunList: {},
    // 点击tab标签切换数据
    async changeInfoList() {
      if (this.tabPosition === '本周') {
        this.weekInfo = await getSunInfo('w')
        this.echartsInit()
      } else if (this.tabPosition === '本月') {
        this.weekInfo = await getSunInfo('c')
        this.echartsInit()
      } else if (this.tabPosition === '全年') {
        this.weekInfo = await getSunInfo('e')
        this.echartsInit()
      }
    },
    echartsInit() {
      // const myChar = echarts.init(document.querySelector('.chart'))
      echarts.init(document.querySelector('.chart')).setOption(
        {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          legend: {
            show: true,
            bottom: '-2%'
          },
          xAxis: [
            {
              type: 'category',
              data: this.weekInfo.x,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: this.weekInfo.data[0].name,
              type: 'bar',
              barWidth: '30%',
              color: '#ff7100',
              data: this.weekInfo.data[0].data
            },
            {
              name: this.weekInfo.data[1].name,
              type: 'bar',
              barWidth: '30%',
              color: '#ffb200',
              data: this.weekInfo.data[1].data
            }
          ]
        }
      )
    }
  }
}
</script>

<style scoped lang="scss">
.inout-charts {
  margin-top: 20px;
  height: 500px;
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

  .grid-content {
    width: 210px;
    height: 40px;
  }

  .chart {
    margin-top: 20px;
    width: 100%;
    height: 400px;
  }

}
</style>
