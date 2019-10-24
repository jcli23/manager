<template>
  <div class="all">
    <div class="top"><top></top></div>
    <div class="navig"><navigator></navigator></div>
    <router-view class="right"></router-view>
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
      z-index: 100;
    }
    .navig{
      width: 13%;
      height: 750px;
      position: fixed;
      background-color: rgb(84, 92, 100);
      margin-top:60px;
    }
    .right{
      width: 87%;
      margin-top: 60px;
      margin-left: 13%;
    }

  }


</style>
