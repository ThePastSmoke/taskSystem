<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!--搜索框-->
      <SearchNav :form="locationForm" @submit="searchLocation" @clearForm="clearForm">
        <template #list>
          <SearchItem v-model="locationForm.wareHouseName" prop="wareHouseName" label="库区名称" />
          <SearchItem v-model="locationForm.areaName" prop="areaName" label="库位名称" />
          <SearchItem
            v-model="locationForm.wareHouseStatus"
            prop="wareHouseStatus"
            label="库位状态"
            show-select="true"
            :options="statusOptions"
          />
        </template>
      </SearchNav>
      <!--     表格-->
      <TableList
        :total="total"
        :data-list="list"
        :label-list="locationList"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @btnLeft="addLoaction"
        @handleEdit="handleEdit"
        @handleStop="handleStop"
      >
        <template #diyBtnfirst>
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
import { locationList } from '@/utils/componensList'
import { changeStatus, getLocationInfo } from '@/api/manage-base-info_location'
import { temperatureTypeName, bearingTypeName, useTypeName } from '@/utils/filter'

export default {
  name: 'Location',
  components: { SearchNav, SearchItem, TableList },
  data() {
    return {
      list: [],
      locationList: locationList,
      locationForm: {
        wareHouseName: null,
        areaName: null,
        wareHouseStatus: ''
      },
      statusOptions: [{
        value: null,
        label: '全部'
      }, {
        value: '0',
        label: '停用'
      }, {
        value: '1',
        label: '启用'
      }],
      query: {
        status: null,
        areaName: null, // 库位名称
        name: null, // 库区名称
        current: 1,
        size: 10
      },
      total: null
    }
  },
  created() {
    this.getLocationInfo()
  },
  methods: {
    async getLocationInfo() {
      const res = await getLocationInfo(this.query)
      res.records.forEach(item => {
        item.temperatureType = temperatureTypeName(item.temperatureType)
      })
      res.records.forEach(item => {
        item.bearingType = bearingTypeName(item.bearingType)
      })
      res.records.forEach(item => {
        item.useType = useTypeName(item.useType)
      })

      this.total = Number(res.total)
      this.list = res.records
    },
    async searchLocation(val) {
      this.query.name = val.areaName
      this.query.areaName = val.wareHouseName
      this.query.status = val.wareHouseStatus === '' ? null : val.wareHouseStatus
      await this.getLocationInfo()
    },
    // 改变页数
    async handleCurrentChange(val) {
      this.query.current = val
      await this.getLocationInfo()
    },
    //  改变每一页的数量
    async handleSizeChange(val) {
      this.query.size = val
      await this.getLocationInfo()
    },
    //  点击重置
    clearForm() {
      this.query = {
        status: null,
        areaName: null, // 库位名称
        name: null, // 库区名称
        current: 1,
        size: 10
      }
      this.getLocationInfo()
    },
    //  点击新增仓库
    addLoaction() {
      this.$router.push('/manage-base-info/locationDetails')
    },
    // 点击编辑
    handleEdit(val) {
      this.$router.push({
        path: '/manage-base-info/locationDetails',
        query: {
          id: val.id
        }
      })
    },
    // 启用/停用
    async handleStop(val) {
      console.log(val)
      const status = val.status === 1 ? '启用' : '停用'
      await this.$confirm(`确定要${status}：${val.name}嘛？`, `确认${status}`)
      if (status === '启用') {
        await changeStatus(val.id, 0)
        this.$message.success('停用库位成功')
      } else {
        await changeStatus(val.id, 1)
        this.$message.success('启用库位成功')
      }
      await this.getLocationInfo()
      console.log(status)
    }
  }
}
</script>

<style>

</style>
