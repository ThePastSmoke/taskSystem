<template>
  <div class="login-container">
    <!--    卡片试图-->
    <el-card class="divContent">
      <div class="divLeft">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          auto-complete="on"
          label-position="left"
        >

          <div class="divTitle">
            <img
              src="http://www-wms-java.itheima.net/img/title.ef005a7a.png"
              alt=""
            >
          </div>

          <el-form-item prop="username" class="loginLeftFrom">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="Username"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="Password"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
          <div class="rememb">
            <el-checkbox label="记住密码" name="type" />
          </div>
          <el-button
            class="login_btn"
            :loading="loading"
            type="primary"
            @click.native.prevent="handleLogin"
          >立即登录
          </el-button>

        </el-form>
      </div>
      <!--   右背景图区域   -->
      <div class="divRight" />
    </el-card>

  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$store.dispatch('user/login', this.loginForm)
      this.$router.push({ path: this.redirect || '/' })
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     this.loading = true
      //     this.$store.dispatch('user/login', this.loginForm).then(() => {
      //       this.$router.push({ path: this.redirect || '/' })
      //       this.loading = false
      //     }).catch(() => {
      //       this.loading = false
      //     })
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    }
  }
}
</script>

<style lang="scss">
.el-card__body {
  display: flex;
  padding: 0;
}

.el-form-item__content {
  display: flex;
  margin-left: 59px;
  width: 280px;
  height: 50px;
}

.el-input {
  font-size: 14px;

  .el-input__inner {
    width: 230px;
    height: 50px;
    background-color: #f8f5f5;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.divContent {
  width: 958px;
  height: 516px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 20px rgb(93 93 93 / 33%);
  background-color: #fff;
  border-radius: 40px;
}

.divLeft {
  width: 398px;
  height: 516px;
  background: #fff;
  border-radius: 34px 0 0 34px;

  .loginLeftFrom {
    margin-top: 50px;
  }

  .login_btn {
    margin-top: 20px;
    margin-left: 60px;
    width: 280px;
    height: 50px;
    background: #ffb200;
    border-radius: 8px;
    box-shadow: 0 2px 9px 1px rgb(255 178 0 / 47%);
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    color: #332929;
    line-height: 22px;
    border: 0;
  }

  .rememb {
    margin-left: 60px;
  }

  .divTitle {
    margin-left: 124px;
    margin-top: 72px;

    img {
      width: 150px;
      height: 64px;
    }
  }

  .show-pwd {
    position: absolute;
    top: 5px;
    left: 250px;
  }

  .svg-container {
    width: 50px;
    height: 50px;
    background: #eae7e7;
    border-radius: 8px 0 0 8px;

    .svg-icon {
      width: 25px;
      height: 24px;
      margin: 12px 13px;
    }
  }

}

.divRight {
  background-image: url("~@/assets/contentBg.1321d126.png");
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  width: 560px;
  height: 516px;
}

</style>
