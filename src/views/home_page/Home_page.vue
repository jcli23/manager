<template>
  <div class="home_page">
    <div class="data">
      <el-col>
        <el-card shadow="always" style="flex: 1;margin: 10px;border-radius: 10px">
          <div class="right">
            <img src="../../../public/images/img1.png" alt="">
            <div class="total">
              <div class="title">New Visits</div>
              <countTo :startVal='startVal' :endVal='visits' :duration='3000' ></countTo>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col>
        <el-card shadow="always" style="flex: 1;margin: 10px;border-radius: 10px">
          <div class="right">
            <img src="../../../public/images/img2.png" alt="">
            <div class="total">
              <div class="title">Messages</div>
              <countTo :startVal='startVal' :endVal='messages' :duration='3000'></countTo>
            </div></div>
        </el-card>
      </el-col>
      <el-col>
        <el-card shadow="always" style="flex: 1;margin: 10px;border-radius: 10px">
          <div class="right">
            <img src="../../../public/images/img3.png" alt="">
            <div class="total">
              <div class="title">Purchases</div>
              <countTo :startVal='startVal' :endVal='purchases' :duration='3000'></countTo>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col >
        <el-card shadow="always" style="flex: 1;margin: 10px;border-radius: 10px">
          <div class="right">
            <img src="../../../public/images/img4.png" alt="">
            <div class="total">
              <div class="title">Shoppings</div>
              <countTo :startVal='startVal' :endVal='shopping' :duration='3000'></countTo>
            </div>
          </div>
        </el-card>
      </el-col>
    </div>
    <div class="zhexian"><ve-line :data="chartData" :settings="chartSettings"></ve-line></div>
    <div class="threeimages">
      <div class="image">
        <ve-radar :data="radarChat" :settings="chartSettings2"></ve-radar>
      </div>
      <div class="image">
        <ve-pie :data="ringChat" :settings="chartSettings3"></ve-pie>
      </div>
      <div class="image">
        <ve-histogram :data="histogramChat" :settings="chartSettings4"></ve-histogram>
      </div>
    </div>
  </div>
  
</template>

<script>
  import countTo from 'vue-count-to';
  import VeLine from 'v-charts/lib/line'
  import VeRadar from 'v-charts/lib/radar'
  import VePie from 'v-charts/lib/pie'
  import VeHistogram from 'v-charts/lib/histogram'
  export default {
    name: "Home page",
    components: {
      countTo,
      VeLine,
      VeRadar,
      VePie,
      VeHistogram
    },
    props: {},
    data() {
      this.chartSettings = {
        metrics: ['expected', 'actual'],
        dimension: ['date']
      }
      this.chartSettings2 = {
        dimension: ["name"],
        metrics: ["sales", "ministration", "techology","delelopmer","marketing"],
      }
      this.chartSettings3 = {
        roseType: 'radius',
      }
      this.chartSettings4 = {
        metrics: ['expected', 'actual'],
        dimension: ['date']
      }
      return {
        chartData: {
          columns: ["date",'expected' , 'actual'],
          rows: [
          ]
        },
        radarChat: {
          columns: ["name","sales", "ministration", "techology","delelopmer","marketing"],
          rows: [
          ]
        },
        ringChat: {
          columns: ["name", "data"],
          rows: [
          ]
        },
        histogramChat: {
          columns: ["date",'expected' , 'actual'],
          rows: [
          ]
        },
        homeData:{},
        homeChat:{},
        pie:[],
        startVal: 0,
        visits:0,
        messages:0,
        purchases:0,
        shopping:0
      }
    },
    methods: {
      gethomeData () {
        this.$axios.req('api/homeData').then(res => {
          console.log(res)
          this.homeData = res.data   //拿到数据
          this.visits=res.data.visits
          this.messages=res.data.messages
          this.purchases=res.data.purchases
          this.shopping=res.data.shopping
        }).catch(err => {
          console.log(err)  //报错打印
        })
      },
      gethomeChat () {
        this.$axios.req('api/homeChat').then(res => {
          console.log(res)
          this.homeChat = res.data   //拿到数据
          this.chartData.rows=this.homeChat
          this.histogramChat.rows=this.homeChat
        }).catch(err => {
          console.log(err)  //报错打印
        })
      },
      getradarChat () {
        this.$axios.req('api/radarChat').then(res => {
          console.log(res)
          this.radarChat = res.data   //拿到数据
          this.radarChat.rows=this.radarChat
        }).catch(err => {
          console.log(err)  //报错打印
        })
      },
      getringChat () {
        this.$axios.req('api/ringChat').then(res => {
          console.log(res)
          this.pie = res.data   //拿到数据
          this.ringChat.rows=this.pie
        }).catch(err => {
          console.log(err)  //报错打印
        })
      },
    },
    mounted() {
      this.gethomeData ()
      this.gethomeChat ()
      this.getradarChat ()
      this.getringChat ()
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
  .home_page{
    background: #f0f2f5;
    .data{
      width: 100%;
      display: flex;
      height: 200px;
      align-items: center;
      .right{
        display: flex;
        .total{
          margin-left: 50%;
          .title{
            height: 32px;
            line-height: 32px;
            font-size: 12px;
            color: grey;
          }
        }
      }
    }
    .zhexian{
      background: white;
    }
    .threeimages{
      display: flex;
      .image{
        background: white;
        flex: 1;
        margin: 20px;
      }
    }
  }
</style>
