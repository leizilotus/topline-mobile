<template>
  <div>
    <van-nav-bar title="登录"/>
    <form action="">
      <van-cell-group>
        <van-field
            v-model="user.mobile"
            required
            clearable
            label="手机号"
            placeholder="请输入手机号"
            :error-message="errors.mobile"
        />
        <van-field
            v-model="user.code"
            type="password"
            label="密码"
            placeholder="请输入密码"
            :error-message="errors.code"
            required
        />
        </van-cell-group>
        <div class="login-btn-box">
          <van-button
            type="info"
            class="login-btn"
            @click.prevent="handleLogin"
            :loading="loginLoading"
            loading-text="登录中..."
          >登录</van-button>
        </div>
    </form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '15120025791',
        code: '246810'
      },
      loginLoading: false.name,
      errors: {
        mobile: '',
        code: ''
      }
    }
  },

  created () {

  },

  methods: {
    async handleLogin () {
      this.loginLoading = true
      try {
        // 发送之前，验证表单数据，校验通过，才能进行登录
        const { mobile, code } = this.user
        const errors = this.errors
        if (mobile.length) {
          errors.mobile = ''
        } else {
          errors.mobile = '手机号不能为空'
          return
        }
        if (code.length) {
          errors.code = ''
        } else {
          errors.code = '验证码不能为空'
          return
        }
        this.loginLoading = true

        const data = await login(this.user)
        this.$store.commit('setUser', data)
        // 目前粗暴的将页面跳转到首页
        this.$router.push({
          name: 'home'
        })
      } catch (err) {
        console.log(err)
        console.log('登录失败')
      }
      this.loginLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.login-btn-box {
    padding: 20px;
    .login-btn {
        width: 100%;
    }
}
</style>
