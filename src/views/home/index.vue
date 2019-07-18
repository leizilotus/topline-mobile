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
      <van-pull-refresh v-model="channelItem.downPullLoading" @refresh="onRefresh">
        <van-list
          v-model="upPullLoading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell
            v-for="item in channelItem.articles"
            :key="item.art_id"
            :title="item.title"
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
import { getArticles } from '@/api/article'
export default {
  name: 'HomeIndex',
  data () {
    return {
      activeChannelIndex: 0,
      // articles: [],
      upPullLoading: false,
      finished: false,
      downPullLoading: false,
      channels: []
    }
  },

  computed: {
    /**
     * 当前激活的频道
     */
    activeChannels () {
      return this.channels[this.activeChannelIndex]
    }
  },

  async created () {
    // 加载频道列表
    await this.loadChannels()
    // 加载频道里的文字列表
    this.loadArticles()
  },

  methods: {
    /**
     * 上拉加载更多，往底部频道 push 数据
     * onLoad 一上来就会调用，如果请求数据不满足一屏的的时候，会多次调用
    */
    async onLoad () {
      await this.$sleep(800)
      const articles = await this.loadArticles()
      // 将请求得到的数据，push 到频道文章的列表中
      this.activeChannels.articles.push(...articles.results)

      this.upPullLoading = false
      // // 异步更新数据
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }
      //   // 加载状态结束
      //   this.loading = false

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 500)
    },

    // 下拉刷新，应该往频道的 articles 中顶部 unshift 添加数据，或者重置数据
    async  onRefresh () {
      this.activeChannels.timestamp = Date.now()
      const data = await this.loadArticles()
      console.log(data)
      // 如果有最新数据， 直接替换频道的文章列表
      if (data.results.length) {
        this.activeChannels.articles = data.results
        this.activeChannels.timestamp = data.pre_timestamp

        // 当下拉刷新有数据并重置以后数据无法满足一屏，所以 onLoad 一下
        this.onLoad()
      }
      // 如果没有最新数据，则什么都不做
      this.$toast('刷新成功')
      this.activeChannels.downPullLoading = false
      // setTimeout(() => {
      //   this.$toast('刷新成功')
      //   this.pullReFreshLoading = false
      // }, 1000)
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
        item.timestamp = Date.now()
      })
      this.channels = channels
    },

    async loadArticles () {
      const { id, timestamp } = this.activeChannels
      const data = await getArticles({
        channelId: id, // 当前激活的频道数据id
        timestamp,
        withTop: 1
      })
      // console.log(data)
      // 如果请求的这个时间戳里，没有最新数据，则请求上一次的数据
      if (data.pre_timestamp && data.results.length === 0) {
        this.activeChannels.timestamp = data.pre_timestamp
        return this.loadArticles()
      }

      // 如果这次请求的时间戳里有最新数据
      if (data.results.length) {
        this.activeChannels.timestamp = data.pre_timestamp
        return data
      }
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
