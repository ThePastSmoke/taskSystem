<template>
  <div>
    <el-button plain round type="info" @click="$emit('firstBtn')">{{ firstBtn }}</el-button>
    <el-button plain round type="info" @click="$emit('secBtn')">{{ secBtn }}</el-button>
  </div>
</template>

<script>
export default {
  name: 'HeadBtnRight',
  props: {
    firstBtn: {
      type: String,
      default: '下载库区模板'
    },
    secBtn: {
      type: String,
      default: '导入库区信息'
    }
  }

}
</script>

<style lang="scss" scoped>
.el-button {
  color: black;
  border: none;
  margin-left: 20px
}

.el-button:hover {
  background-color: #ffb200;
  color: black;
}

</style>
