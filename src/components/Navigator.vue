<template>
  <div class="main">
    <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <el-menu-item index="1" @click="go('/home_page')">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>首页</span>
        </template>
      </el-menu-item>
      <el-menu-item index="2" @click="go('/form')">
        <i class="el-icon-menu"></i>
        <span slot="title">分页表格</span>
      </el-menu-item>
      <el-menu-item index="3" @click="go('/label')">
        <i class="el-icon-document"></i>
        <span slot="title">标签页</span>
      </el-menu-item>
      <el-menu-item index="4" @click="go('/image_upload')">
        <i class="el-icon-check"></i>
        <span slot="title">图片上传</span>
      </el-menu-item>
      <el-menu-item index="5" @click="go('/published')">
        <i class="el-icon-s-claim"></i>
        <span slot="title">已发表</span>
      </el-menu-item>
      <el-menu-item index="6" @click="go('/publish_article')">
        <i class="el-icon-document-copy"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="7" @click="go('/register')">
        <i class="el-icon-finished"></i>
        <span slot="title">统计</span>
      </el-menu-item>
      <el-menu-item index="8" @click="go('/out')">
        <i class="el-icon-setting"></i>
        <span slot="title">导出Excel</span>
      </el-menu-item>
      <el-menu-item index="9" @click="go('/edit')">
        <i class="el-icon-circle-close"></i>
        <span slot="title">退出系统</span>
      </el-menu-item>
    </el-menu>
  </div>
  
</template>

<script>
  export default {
    name: "Navigator",
    components: {},
    props: {},
    data() {
      return {}
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      go(path){
        this.$router.push(path)
      },
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

</style>
