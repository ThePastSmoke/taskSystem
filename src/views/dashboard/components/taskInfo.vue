<template>
  <el-card class="inout-charts">
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple-dark">
          <div class="subject">入库出库信息</div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-dark" />
      </el-col>
    </el-row>
    <!--    图标-->
    <div class="chart">1</div>
  </el-card>
</template>
<script>
import * as echarts from 'echarts'

export default {
  name: 'TaskInfo',
  mounted() {
    this.echartsInit()
  },
  methods: {
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
            bottom: 0
          },
          xAxis: [
            {
              type: 'category',
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
              name: '入库',
              type: 'bar',
              barWidth: '30%',
              color: '#ff7100',
              data: [10, 52, 200, 334, 390, 330, 220]
            },
            {
              name: '出库',
              type: 'bar',
              barWidth: '30%',
              color: '#ffb200',
              data: [13, 51, 200, 300, 370, 320, 120]
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

  .chart {
    margin-top: 20px;
    width: 100%;
    height: 430px;
  }
}
</style>
