<template>
  <div class="main">
    <div class="all">
      <div><el-button type="primary" @click="back">返回</el-button></div>              <!--返回按钮-->
      <div class="top">
        <div class="title">{{ data.title }}</div>
        <div class="abstract">{{ data.abstract }}</div>
        <div class="date">发表于: {{ $dayjs(data.date).format("YYYY-MM-DD hh:mm:ss") }}</div>     <!--显示发表时间-->
      </div>
      <div>
        <mavon-editor v-model="data.text" :subfield="false" defaultOpen="preview" :toolbarsFlag="false"/>     <!--编辑框同步显示文章内容-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Look",
    components: {},
    props: {},
    data() {
      return {
        id: "",
        data: {}
      };
    },
    methods: {
      getOne() {
        this.$axios
          .req("/api/article/article", { _id: this.id })       //通过ID接收已发布的文章信息
          .then(res => {
            if (res.code === 200) {
              this.data = res.data;
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      back(){
        this.$router.push('/published')              //返回已发布页
      }
    },
    mounted() {
      this.id = this.$route.query._id;           //接收ID
      this.getOne();
    },
    created() {},
    filters: {},
    computed: {},
    watch: {},
    directives: {}
  };
</script>

<style scoped lang="scss">
  .main{
    background: #f0f2f5;
    .all {
      margin: 20px;
      .top {
        text-align: center;
        .title {
          font-weight: bold;
          font-size: 28px;
        }
        .abstract {
          font-size: 20px;
          margin-top: 10px;
        }
        .date {
          font-size: 14px;
          color: #666666;
          margin-top: 10px;
          margin-bottom: 20px;
        }
      }
    }
  }
</style>
