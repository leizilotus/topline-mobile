<template>
<div>
  <!-- 头部 -->
  <van-nav-bar title="首页" fixed/>

  <!-- tab栏切换 -->
  <van-tabs class="channel-tabs" v-model="activeChannelIndex">
    <van-tab
      v-for="channelItem in channels"
      :key="channelItem.id"
      :title="channelItem.name"
    >
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
import { getUserChannels } from '@/api/channel'
export default {
  name: 'HomeIndex',
  data () {
    return {
      activeChannelIndex: 0,
      list: [],
      loading: false,
      finished: false,
      pullReFreshLoading: false,
      channels: []
    }
  },

  created () {
    this.loadChannels()
  },

  methods: {
    // 上拉加载更多
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

    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.pullReFreshLoading = false
      }, 1000)
    },

    async loadChannels () {
      const { user } = this.$store.state
      let channels = []
      // 如果用户已登录
      if (user) {
        const data = await getUserChannels()
        console.log(data)
        channels = data.channels
        // 将数据展示到页面中
      } else {
        // 如果用户没有登录
        // 如果有本地存储数据则使用本地存储中的数据频道
        const localChannels = JSON.parse(window.localStorage.getItem('channels'))
        if (localChannels) {
          channels = localChannels
        } else {
          // 如果没有本地存储频道数据 则请求默认推荐频道列表
          const data = await getUserChannels()
          channels = data.channels
        }
      }

      // 修改channels， 将这个数据结构修改为满足我们使用的需求
      channels.forEach(item => {
        item.articles = [] // 用来存储当前文章列表
        item.upPullFinished = false // 控制当前数据是否加载完毕
        item.downPullLoading = false // 控制当前频道下拉刷新 loding 状态
        item.upPullLoading = false // 控制当前频道上拉刷新 loding 状态
      })
      this.channels = channels
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
