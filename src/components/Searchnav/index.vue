<template>
  <div class="search">
    <el-form
      ref="searchForm"
      :inline="true"
      :model="form"
      class="demo-form-inline"
    >
      <div class="search-left">
        <slot name="list" />
      </div>
      <div class="search-right">
        <el-form-item>
          <el-button
            class="btnsearch"
            round
            type="primary"
            @click="onSubmit"
          >搜索
          </el-button>
          <el-button
            class="clear"
            round
            type="primary"
            @click="onClear"
          >重置
          </el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'SearchNav',
  // model: {
  //   value: 'form'
  // },
  props: {
    form: {
      type: Object,
      redirect: true
    }
  },
  data() {
    return {}
  },
  methods: {
    onSubmit() {
      // console.log(this.form)
      this.$emit('submit', this.form)
    },
    onClear() {
      this.$refs.searchForm.resetFields()
      this.$emit('clearForm')
    }
  }
}
</script>
<style lang="scss" scoped>
.search {
  position: relative;
  width: 100%;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
  padding: 15px 30px;
  margin-bottom: 20px;

  .search-left {
    width: 85%;
    display: inline-block;
  }

  .search-right {
    position: absolute;
    top: 55px;
    width: 15%;
    display: inline-block;
    //display: flex;
    text-align: center;

    .btnsearch {
      color: #332929;
      border: 0;
      margin-right: 10px;

      &:hover {
        background: #ff8e00;
      }
    }

    .clear {
      background: #f8f5f5;
      color: #332929;
      border: 0;

      &:hover {
        background: #ffb200;
      }
    }
  }
}
</style>
