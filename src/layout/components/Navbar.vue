<template>
  <div class="navbar">
    <!--    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />-->
    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="hover">
        <div class="avatar-wrapper">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item @click.native="delLeftList">
            关闭左侧
          </el-dropdown-item>
          <el-dropdown-item @click.native="delRightList">关闭右侧</el-dropdown-item>
          <el-dropdown-item @click.native="delElse">关闭其他</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;" @click="delAllLst">全部关闭</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
// import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb
    // Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
    },
    // 删除vuex里的list
    delAllLst() {
      this.$store.commit('user/delList', '')
    },
    //  删除其他
    delElse() {
      const matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      )
      this.$store.commit('user/delListOnes', matched[matched.length - 1])
    },
    //  关闭右侧
    delRightList() {
      const matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      )
      this.$store.commit('user/delRightList', matched[matched.length - 1])
    },
    //  关闭左侧
    delLeftList(state, data) {
      const matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      )
      this.$store.commit('user/delLeftList', matched[matched.length - 1])
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 64px;
  line-height: 64px;
  overflow: hidden;
  position: relative;
  background: #f5f1f1;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .el-icon-caret-bottom {
        width: 20px;
        height: 20px;
        background: pink;
      }

      .avatar-wrapper {
        width: 40px;
        height: 40px;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          width: 36px;
          height: 36px;
          background: #fff;
          border-radius: 6px;
          position: absolute !important;
          right: 34px;
          top: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>
