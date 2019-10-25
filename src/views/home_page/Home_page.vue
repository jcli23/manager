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
    <div class="bottom">
      <div class="bottom-left">
        <div class="table-header">
          <div class="num">Order_No</div>
          <div class="price">Price</div>
          <div class="status">Status</div>
        </div>
        <div v-for="(item,index) in tableData" :key="index" class="table-label">
          <div class="num1">{{item.num}}</div>
          <div class="price1">￥{{item.price}}</div>
          <div class="status">
            <div v-if="item.status ===0" class="status1">pending</div>
            <div v-if="item.status ===1" class="status2">success</div>
          </div>
        </div>
      </div>
      <div class="bottom-center">
        <div class="header">
          <div style="width: 50px;height: 50px;text-align: center" @click="checkedAll">
            <i class="el-icon-arrow-down check"></i>
          </div>
          <span class="right">Todo List</span>
        </div>
        <div v-for="(item,index) in todoList" :key="index" class="todo">
          <div v-if="item.checked === !check" class="yuan" @click="itemClick"><i class="el-icon-check"></i></div>
          <div v-if="item.checked === check" class="yuan" @click="itemClick"></div>
          <div class="title">{{item.name}}</div>
        </div>
        <div>
          <div class="line"></div>
        </div>
        <div class="bottom">
          <div class="one">{{}}items left</div>
          <div class="two">All</div>
          <div class="three">Active</div>
          <div class="four">Completed</div>
        </div>
      </div>
      <div class="bottom-right">
        <div class="bottom-right-main">
          <img src="../../../public/images/img5.png" alt="" class="img">
          <div class="slip">
            <div v-for="(item,index) in slip" :key="index">
              <div v-if="item.progress<1">
                <div>{{item.name}}</div>
                <el-progress :percentage="item.progress*100">
                </el-progress>
              </div>
              <div v-if="item.progress===1">
                <div>{{item.name}}</div>
                <el-progress :percentage="100" status="success"></el-progress>
              </div>
            </div>
          </div>
        </div>
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
        check:false,
        checkAll:false,
        todoList:[],
        slip:[],
        tableData:[],
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
      getorderData () {
        this.$axios.req('api/orderData').then(res => {
          console.log(res)
          this.tableData = res.data   //拿到数据
        }).catch(err => {
          console.log(err)  //报错打印
        })
      },
      getprogress () {
        this.$axios.req('api/progress').then(res => {
          console.log(res)
          this.slip = res.data   //拿到数据
        }).catch(err => {
          console.log(err)  //报错打印
        })
      },
      gettodoList () {
        this.$axios.req('api/todoList').then(res => {
          console.log(res)
          this.todoList = res.data//拿到数据
        }).catch(err => {
          console.log(err)  //报错打印
        })
      },
      itemClick(){
        // this.check=!this.check
      },
      checkedAll(){
        this.check=!this.checkAll
      }

    },
    mounted() {
      this.gethomeData ()
      this.gethomeChat ()
      this.getradarChat ()
      this.getringChat ()
      this.getorderData()
      this.getprogress()
      this.gettodoList()
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
    .bottom{
      display: flex;
      .bottom-left{
        width: 52%;
        .table-header{
          background: white;
          display: flex;
          height: 70px;
          font-size: 16px;
          align-items: center;
          color: grey;
          border-bottom: 1px solid lightgray;
          .num{
            width: 45%;
            text-align: center;
          }
          .price{
            width: 25%;
            text-align: center;
          }
          .status{
            width: 30%;
            text-align: center;
          }
        }
        .table-label{
          background: white;
          display: flex;
          height: 55px;
          font-size: 14px;
          align-items: center;
          color: #444444;
          border-bottom: 1px solid lightgray;
          .num1{
            width: 45%;
            text-align: center;
          }
          .price1{
            width: 25%;
            text-align: center;
          }
          .status{
            width: 30%;
            .status1{
              border-radius: 4px;
              background: mistyrose;
              font-size: 12px;
              text-align: center;
              color: red;
              margin: 0 auto;
              width: 60px;
              height: 30px;
              line-height: 30px;
              justify-content: center;
            }
            .status2{
              border:1px solid palegreen;
              border-radius: 4px;
              background: paleturquoise;
              font-size: 12px;
              text-align: center;
              color: forestgreen;
              margin: 0 auto;
              width: 60px;
              height: 30px;
              line-height: 30px;
              justify-content: center;
            }
          }

        }
      }
      .bottom-center{
        background: white;
        width: 24%;
        margin-left: 1%;
        .header{
          display: flex;
          position: relative;
          width: 100%;
          height: 50px;
          border-bottom: 1px solid silver;
          .check{
            width: 15%;
            line-height: 50px;
            margin: 0 auto;
          }
          .right{
            position: absolute;
            right: 5%;
            font-size: 16px;
            line-height: 50px;
          }
        }
        .todo{
          display: flex;
          height: 35px;
          align-items: center;
          margin-top: 3%;
          margin-left: 3%;
          .yuan{
            border: 1px solid lightslategray;
            width: 19px;
            height: 19px;
            border-radius: 50%;
          }
          .title{
            margin-left: 10%;
          }
        }
        .line{
          border: 1px solid silver;
          width: 80%;
          margin: 10px 10%;
        }
        .bottom{
          display: flex;
          align-items: center;
          height: 70px;
          .one{
            width: 35%;
            font-size: 14px;
            text-align: center;
          }
          .two{
            border: 1px solid white;
            width: 20%;
            text-align: center;
            height: 25px;
            line-height: 25px;
            font-size: 14px;
            &:hover{
              border: 1px solid navajowhite;
            }
          }
          .three{
            border: 1px solid white;
            text-align: center;
            width: 20%;
            height: 25px;
            line-height: 25px;
            font-size: 14px;
            &:hover{
              border: 1px solid navajowhite;
            }
          }
          .four{
            border: 1px solid white;
            text-align: center;
            width: 25%;
            height: 25px;
            line-height: 25px;
            font-size: 14px;
            &:hover{
              border: 1px solid navajowhite;
            }
          }
        }
      }
      .bottom-right{
        background: white;
        width: 22%;
        margin-left: 1%;
        .bottom-right-main{
          margin-top: 5%;
          margin-left: 5%;
          .img{
            width: 100%;
            height: 100%;
          }
          .slip{
            margin-top: 50px;
          }
        }
      }
    }
  }
</style>
