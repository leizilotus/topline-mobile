<template>
<div>
  <!-- 头部 -->
  <van-nav-bar title="首页" fixed/>

  <!-- tab栏切换 -->
  <van-tabs class="channel-tabs" v-model="activeChannelIndex">
    <van-tab title="标签 1">
      <van-pull-refresh v-model="pullReFreshLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell
            v-for="item in list"
            :key="item"
            :title="item"
          />
        </van-list>
      </van-pull-refresh>
    </van-tab>
    <van-tab title="标签 2">内容 2</van-tab>
    <van-tab title="标签 3">内容 3</van-tab>
    <van-tab title="标签 4">内容 4</van-tab>
    <van-tab title="标签 5">内容 4</van-tab>
    <van-tab title="标签 6">内容 4</van-tab>
    <van-tab title="标签 7">内容 4</van-tab>
    <van-tab title="标签 8">内容 4</van-tab>
  </van-tabs>

  <!-- 文章列表 -->

  <!-- 底部 -->
  <van-tabbar route>
    <van-tabbar-item name="home" icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item name="search" icon="search"  to="/qa">问答</van-tabbar-item>
    <van-tabbar-item name="friends" icon="friends-o"  to="/video">视频</van-tabbar-item>
    <van-tabbar-item name="setting" icon="setting-o"  to="/my">我的</van-tabbar-item>
  </van-tabbar>
</div>
</template>

<script>
export default {
  name: 'HomeIndex',
  data () {
    return {
      activeChannelIndex: 0,
      list: [],
      loading: false,
      finished: false,
      pullReFreshLoading: false
    }
  },

  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },

    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.pullReFreshLoading = false
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.channel-tabs {
  margin-bottom: 100px;
}
.channel-tabs /deep/ .van-tabs__wrap {
  position: fixed;
  top: 92px;
}

.channel-tabs /deep/ .van-tabs__content {
  margin-top: 92px;
}
</style>
