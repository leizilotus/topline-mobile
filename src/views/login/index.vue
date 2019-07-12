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
        />
        <van-field
            v-model="user.code"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
        />
        </van-cell-group>
        <div class="login-btn-box">
          <van-button
            type="info"
            class="login-btn"
            @click.prevent="handleLogin"
            :loading="loginLoading"
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
      loginLoading: false
    }
  },

  created () {

  },

  methods: {
    async handleLogin () {
      this.loginLoading = true
      try {
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
