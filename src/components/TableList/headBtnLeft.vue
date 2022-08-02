<template>
  <div>
    <el-button round @click="$emit('btnLeft')">{{ btnName }}</el-button>
  </div>
</template>

<script>
export default {
  name: 'HeadBtnLeft',
  props: {
    btnName: {
      type: String,
      default: '新增仓库'
    }
  }
}
</script>

<style lang="scss" scoped>
.el-button {
  background-color: #00be76;
  color: #fff;
  border: none;
}

.el-button:hover {
  background-color: #007a4c
}

</style>
