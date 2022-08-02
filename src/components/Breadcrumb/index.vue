<template>
  <!--  <el-breadcrumb class="app-breadcrumb" separator="">-->
  <!--    <transition-group name="breadcrumb">-->
  <!--      <el-breadcrumb-item v-for="item in levelList" :key="item.path">-->
  <!--        {{ item.meta.title }}-->
  <!--      </el-breadcrumb-item>-->
  <!--    </transition-group>-->
  <!--  </el-breadcrumb>-->
  <div class="mynav">
    <el-scrollbar
      style="height: 100%; width: 100% !important; line-height: 60px"
    >
      <!-- 滚动条要包裹的内容 -->
      <el-menu
        :default-active="activeMenu"
        class="el-menu-demo"
        mode="horizontal"
        router
      >
        <el-menu-item
          index="/dashboard"
          style="padding: 0 15px !important; margin-left: 30px"
        >工作台
        </el-menu-item>
        <el-menu-item
          v-for="(item, index) in $store.getters.navbarList"
          :key="item.path"
          :index="item.path"
        >{{ item.meta.title }}
          <i class="el-icon-close" @click="delList(item, index, $event)" />
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  computed: {
    activeMenu() {
      return this.$route.path
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    // handleSelect(key, keyPath) {
    //   console.log(key, keyPath)
    // },
    getBreadcrumb() {
      // only show routes with meta.title
      // console.log(this.$route.matched)
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      )
      const first = matched[0]

      if (!this.isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: '工作台' }}].concat(
          matched
        )
      }
      // console.log(this.list.includes(matched[matched.length - 1]))
      if (
        !this.$store.getters.navbarList.includes(matched[matched.length - 1]) &&
        matched[matched.length - 1] !== first
      ) {
        // 存储到vuex
        this.$store.commit('user/initList', matched[matched.length - 1])
        // this.list.push(matched[matched.length - 1])
      }

      this.levelList = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      )
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return (
        name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
      )
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    },
    delList(item, index, e) {
      console.log(item)
      e.stopPropagation()
      this.$store.commit('user/delList', item)
      // this.list = this.list.filter((i) => i !== item)
      if (item.path === this.$route.path) {
        if (index !== 0) {
          this.$router.push(this.$store.getters.navbarList[index - 1].path)
        } else {
          this.$router.push('/')
        }
      }
    }
  }
}
</script>
<style lang="scss">
.mynav {
  width: calc(100% - 80px);
  height: 100%;

  .el-scrollbar__wrap {
    overflow-x: auto;
    //overflow-y: hidden;
    height: calc(100% + 20px); //多出来的20px是横向滚动条默认的样式
  }

  //.is-vertical {
  //  display: none;
  //}

  .el-scrollbar .el-scrollbar__wrap .el-scrollbar__view {
    white-space: nowrap;
    display: inline-block;
  }
}

.el-breadcrumb__item {
  height: 36px;
  padding: 0 15px 0 15px;
  text-align: center;

  .el-breadcrumb__inner {
    color: #ffb200 !important;
  }
}

.el-menu {
  background: transparent !important;
}

.el-menu.el-menu--horizontal {
  border-bottom: none !important;
}

.el-menu--horizontal > .el-menu-item {
  float: none !important;
}

.el-menu-demo {
  .el-menu-item.is-active {
    color: #ffb200 !important;
  }

  .el-menu-item {
    display: inline-block;
    font-size: 13px !important;
    height: 36px !important;
    line-height: 36px !important;
    color: #b5abab !important;
    border-radius: 6px !important;
    border-bottom: none !important;
    margin-right: 10px !important;
    background: #fff;
    padding: 0 9px 0 15px !important;

    i {
      font-size: 12px;
      width: 12px;
      padding: 0;
      color: #b5abab;
      //position: absolute;
      margin-right: -3px;
    }
  }
}
</style>
<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 12px;
  margin-left: 8px;
  line-height: 36px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
