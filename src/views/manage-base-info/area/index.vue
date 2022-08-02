<template>
  <div class="dashboard-container">
    <div class="app-container">
      <SearchNav :form="form" @submit="searchWareHouse">
        <template #list>
          <Searchitem v-model="form.wareHouseName" prop="wareHouseName" label="仓库名称" />
          <Searchitem v-model="form.areaName" prop="areaName" label="库区名称" />
          <Searchitem
            v-model="form.wareHouseStatus"
            prop="areaName"
            label="库区名称"
            show-select="true"
            :options="statusOptions"
          />
        </template>
      </SearchNav>
      <!--  新增库区-->
      <TableList
        :total="total"
        :data-list="list"
        :label-list="areaList"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @handleDel="handleDel"
        @handleStop="handleStop"
        @btnLeft="addArea"
        @handleEdit="handleEdit"
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
import Searchitem from '@/components/SearchItem'
import TableList from '@/components/TableList'
import { areaList } from '@/utils/componensList'
import { changStatus, getAreaStock } from '@/api/manage-base-info_area'
import { temperatureTypeName, bearingTypeName, useTypeName } from '@/utils/filter'

export default {
  name: 'Area', // 库区管理
  components: {
    SearchNav, Searchitem, TableList
  },
  data() {
    return {
      list: [],
      quest: {
        id: null,
        name: null,
        warehouseName: null,
        size: 10,
        current: 1,
        status: null,
        descs: ''
      },
      total: null,
      areaList: areaList,
      form: {
        wareHouseName: null,
        areaName: null,
        wareHouseStatus: null
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
      }]
    }
  },
  created() {
    this.getAreaStock()
  },
  methods: {
    // 点击搜索触发
    async searchWareHouse(value) {
      this.quest.warehouseName = value.wareHouseName
      this.quest.name = value.areaName
      this.quest.status = value.wareHouseStatus
      this.getAreaStock()
    },
    // 请求分页list
    async getAreaStock() {
      const res = await getAreaStock(this.quest)
      this.total = Number(res.total)
      res.records.forEach(item => {
        item.temperatureType = temperatureTypeName(item.temperatureType)
      })
      res.records.forEach(item => {
        item.bearingType = bearingTypeName(item.bearingType)
      })
      res.records.forEach(item => {
        item.useType = useTypeName(item.useType)
      })
      res.records.forEach(item => {
        item.status = item.status === 0 ? '停用' : '启用'
      })
      this.list = res.records
    },
    // 页码值发生改变
    handleCurrentChange(val) {
      this.quest.current = val
      this.getAreaStock()
    },
    // 每一页的总数
    handleSizeChange(val) {
      this.quest.size = val
      this.getAreaStock()
    },
    // 删除
    handleDel(val) {
      this.$message.warning('系统警告，不允许删除')
    },
    // 点击停用/启用
    async handleStop(row) {
      try {
        if (row.status === '启用') {
          await changStatus(0, row.id)
          this.$message.success('启用成功')
        } else {
          await changStatus(1, row.id)
          this.$message.success('停用成功')
        }
        await this.getAreaStock()
      } catch (e) {
        this.$message.warning('系统错误')
        console.log(e)
      }
    },
    // 新增仓库
    addArea() {
      this.$router.push('/manage-base-info/areaDetails')
    },
    //  编辑
    handleEdit(val) {
      this.$router.push({
        path: '/manage-base-info/areaDetails',
        query: {
          id: val.id
        }
      })
    }
  }
}
</script>

<style>

</style>
