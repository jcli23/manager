<template>
  <div class="header">
    <div class="top">
      <div class="left">欢迎XX来到小爱后台管理系统</div>
      <div class="hello">早上好</div>
      <div class="time">上次登录时间：</div>
    </div>
  </div>
  
</template>

<script>
  export default {
    name: "Header",
    components: {},
    props: {},
    data() {
      return {}
    },
    methods: {},
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
  .header{
    height: 60px;
    .top{
      display: flex;
      align-items: center;
      width: 100%;
      height: 60px;
      background: darkslategray;
      .left{
        font-size: 18px;
        color: white;
      }
      .hello{
        position: absolute;
        font-size: 18px;
        color: white;
        right: 500px;
      }
      .time{
        position: absolute;
        font-size: 18px;
        color: white;
        right: 250px;
      }

    }
  }

</style>
