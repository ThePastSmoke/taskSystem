<template>
  <el-form-item :prop="prop" class="searchitem">
    <div class="label">{{ label }}</div>
    <el-input
      v-if="!showSelect"
      v-model="newValue"
      class="input"
      placeholder="请输入"
      @input="change"
    />
    <el-select
      v-else
      v-model="newValue"
      class="select"
      clearable
      placeholder="请选择"
      @input="change"
    >
      <el-option
        v-for="(item, index) in options"
        :key="index"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </el-form-item>
</template>
<script>
export default {
  name: 'Searchitem',
  props: {
    prop: {
      type: String,
      redirect: true
    },
    label: {
      type: String,
      redirect: true
    },
    value: {
      type: String,
      redirect: true
    },
    showSelect: {
      type: [String, Boolean],
      default: () => false
    },
    options: {
      type: Array
    }
  },
  data() {
    return {
      newValue: this.value
    }
  },
  watch: {
    value(val) {
      this.newValue = val
    }
  },
  methods: {
    change(e) {
      // console.log(e)
      this.$emit('input', e)
    }
  }
}
</script>
<style lang="scss">
.searchitem {
  .el-form-item__content {
    width: 100%;
    margin-bottom: -12px;
  }

  .el-select {
    width: 100%;
  }

  .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;

    .el-input__inner:focus {
      outline: 0;
      border: 1px solid #ffb200 !important;
    }

    .el-input__inner:hover {
      border: 1px solid #887e7e;
    }

    input {
      height: 40px;
      line-height: 40px;
      border: 1px solid #f8f5f5;
      -webkit-appearance: none;
      background: #f8f5f5;
      border-radius: 6px;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px white inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
}

.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background: #fff6e2 !important;
}
</style>
<style lang="scss" scoped>
.searchitem {
  width: 28%;
  margin-right: 30px;

  .label {
    //margin-bottom: 10px;
    //height: 18px;
    font-size: 12px;
    color: #887e7e;
    font-weight: 500;
  }

  .input {
    font-size: 14px;
    display: inline-block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border: 1px solid #f8f5f5;
    background: #f8f5f5;
    border-radius: 6px;
  }
}
</style>
