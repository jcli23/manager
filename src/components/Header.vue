<template>
  <div class="header">
    <div class="top">
      <div class="left">欢迎{{name.username}}来到小爱后台管理系统</div>
      <div class="hello" v-if="hours>=6&&hours<12">早上好,亲爱的{{name.username}}</div>
      <div class="hello" v-else-if="hours>=12&&hours<14">中午好,亲爱的{{name.username}}</div>
      <div class="hello" v-else-if="hours>=14&&hours<18">下午好,亲爱的{{name.username}}</div>         <!--根据时段显示问候语-->
      <div class="hello" v-else-if="hours>=18&&hours<=23">晚上好,亲爱的{{name.username}}</div>
      <div class="hello" v-else>该睡觉了,亲爱的{{name.username}}</div>
      <div class="time">上次登录时间：
        {{this.$dayjs(this.$store.state.time).format("YYYY年MM月DD日 hh时mm分ss秒")}}       <!--接受上次登录时间，并显示-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Header",
    components: {},
    props: {},
    data() {
      return {
        hours:''
      }
    },
    methods: {
      getTime(){
        let nowTime=new Date();
        this.hours=nowTime.getHours();       //定义实时时间，用来判断问候语
      }
    },
    mounted() {
      this.getTime()
    },
    created() {

    },
    filters: {},
    computed: {
      name(){
        return JSON.parse(localStorage.getItem("user")).user.data[0]      //接收登录时的用户名
      }
    },
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
        font-size: 14px;
        color: white;
      }
      .hello{
        position: absolute;
        font-size: 14px;
        color: white;
        left: 1100px;
      }
      .time{
        position: absolute;
        font-size: 14px;
        color: white;
        left: 1250px;
      }

    }
  }

</style>
