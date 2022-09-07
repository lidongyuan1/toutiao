<template>
  <div class="home-contanier">
    <!-- 头部 -->
    <van-nav-bar placeholder fixed title="小小程序员" />
    <div>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :disabled="finished">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <!-- 导入，注册，并使用Articleinfo组件 -->
          <Articleinfo v-for="item in artList" :key="item.id" :titel="item.title" :author="item.aut_name" :cmtCount="item.comm_count" :time="item.pubdate" :cover="item.cover"></Articleinfo>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { getArticleList } from '@/api/articleAPI'

import Articleinfo from '@/components/Articleinfo.vue'
export default {
  name: 'Home',
  data() {
    return {
      page: 1,
      limit: 10,
      // 文章数组
      artList: [],
      // 是否加载下一页,loading为true时 则不触发loading事件,反之
      loading: true,
      // 所有数据是否加载完成,如果数据全部加载完成 则一定要把finished改成 true
      finished: false,
      // 是否下拉刷新
      refreshing: false
    }
  },
  created() {
    this.initArticleList()
  },
  methods: {
    // 封装获取文章列表数据的方法
    async initArticleList(isRefresh) {
      // 发起get请求 获取文章的列表数据
      const { data: res } = await getArticleList(this.page, this.limit)
      // 如果isRefresh为true,那么证明是下拉刷新
      // 如果为false ,那么证明是上拉加载
      if (isRefresh) {
        this.artList = [...res, ...this.artList]
        this.refreshing = false
      } else {
        // 如果是要上托加载更多 那么
        // this.artList = [...旧数组,...新数组]
        this.artList = [...this.artList, ...res]
        this.loading = false
      }
      // 如果所有数据加载完成 ,finish 值变为true
      if (res.length === 0) {
        this.finished = true
      }
    },
    onLoad() {
      this.page++
      this.initArticleList()
    },
    onRefresh() {
      this.page++
      this.initArticleList(true)
    }
  },
  components: { Articleinfo }
}
</script>

<style lang="less" scoped></style>
