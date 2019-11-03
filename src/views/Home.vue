<template>
  <div class="all">
    <div class="top"><top></top></div>         <!--共同头部组件-->
    <div class="navig"><navigator></navigator></div>     <!--共同侧边栏组件-->
    <router-view class="right"></router-view>          <!--共同区域引入路由-->
  </div>
  
</template>

<script>
  import top from "../components/Header.vue"
  import navigator from "../components/Navigator.vue"
  export default {
    name: "Home",
    components: {
      top,
      navigator
    },
    props: {},
    data() {
      return {}
    },
    methods: {

    },
    mounted() {

    },
    created() {

    },
    filters: {},
    computed: {},
    watch: {},
    directives: {}
  }
</script>

<style scoped lang="scss">
  .all{
    position: relative;
    display: flex;
    .top {
      width: 100%;
      position: fixed;
      height: 60px;
      z-index: 100;         //头部样式
    }
    .navig{
      width: 13%;
      height: 750px;
      position: fixed;
      background-color: rgb(84, 92, 100);    //侧边栏样式
      margin-top:60px;
    }
    .right{
      width: 87%;              //共同路由区域样式
      margin-top: 60px;
      margin-left: 13%;
    }

  }


</style>
