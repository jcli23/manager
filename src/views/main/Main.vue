<template>
  <div class="home_page">
    <div class="data">
      <el-col>
        <el-card shadow="always" style="flex: 1;margin: 10px;border-radius: 10px">
          <div class="right">
            <img src="../../../public/images/img1.png" alt="">
            <div class="total">
              <div class="title">New Visits</div>                                 <!--New Visits 参数-->
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
              <div class="title">Messages</div>                                   <!--Messages 参数-->
              <countTo :startVal='startVal' :endVal='messages' :duration='3000'></countTo>
            </div></div>
        </el-card>
      </el-col>
      <el-col>
        <el-card shadow="always" style="flex: 1;margin: 10px;border-radius: 10px">
          <div class="right">
            <img src="../../../public/images/img3.png" alt="">
            <div class="total">
              <div class="title">Purchases</div>                                    <!--Purchases 参数-->
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
              <div class="title">Shoppings</div>                                         <!--Shoppings 参数-->
              <countTo :startVal='startVal' :endVal='shopping' :duration='3000'></countTo>
            </div>
          </div>
        </el-card>
      </el-col>
    </div>
    <div class="zhexian"><ve-line :data="chartData" :settings="chartSettings"></ve-line></div>      <!--折线图-->
    <div class="threeimages">
      <div class="image">
        <ve-radar :data="radarChat" :settings="chartSettings2"></ve-radar>            <!--雷达图-->
      </div>
      <div class="image">
        <ve-pie :data="ringChat" :settings="chartSettings3"></ve-pie>                 <!--玫瑰图-->
      </div>
      <div class="image">
        <ve-histogram :data="histogramChat" :settings="chartSettings4"></ve-histogram>        <!--柱状图-->
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-left">                               <!--表格-->
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
      <div class="box list">                                 <!--Todo List  任务栏-->
        <div class="title">
          <div @click="checkAll">
            <img src="../../../public/images/xiajiantou.png" alt="箭头" class="arrow" />
          </div>
          <div>Todo List</div>
        </div>
        <!--    所有选项-->
        <div class="content" v-if="num === 0">                       <!--给All绑参数，为0再显示相应类容-->
          <div v-if="this.todoList.length === 0">0 item</div>
          <div v-for="(item, index) in todoList" :key="index" class="term">
            <div class="check" @click="check(index)">
              <img
                  src="../../../public/images/dui.png"
                  alt="对号"
                  v-if="item.checked"
                  class="yes"
              />
            </div>
            <div>{{ item.name }}</div>
            <img
                src="../../../public/images/del.png"
                alt="删除"
                class="del"
                @click="del(index)"
            />
          </div>
        </div>
        <!--    正在进行的选项-->
        <div v-if="num === 1" class="content">                      <!--给Active绑参数，为0再显示相应类容-->
          <div v-if="this.activeList.length === 0">0 item</div>
          <div v-for="(item, index) in activeList" :key="index" class="term">
            <div class="check" @click="checkActive(index)">
              <img
                  src="../../../public/images/dui.png"
                  alt="对号"
                  v-if="item.checked"
                  class="yes"
              />
            </div>
            <div>{{ item.name }}</div>
            <img
                src="../../../public/images/del.png"
                alt="删除"
                class="del"
                @click="delActive(index, item)"
            />
          </div>
        </div>
        <!--    已完成的选项-->
        <div v-if="num === 2" class="content">                 <!--给completed绑参数，为0再显示相应类容-->
          <div v-if="this.completedList.length === 0">0 item</div>
          <div v-for="(item, index) in completedList" :key="index" class="term">
            <div class="check" @click="checkCompleted(index)">
              <img
                  src="../../../public/images/dui.png"
                  alt="对号"
                  v-if="item.checked"
                  class="yes"
              />
            </div>
            <div>{{ item.name }}</div>
            <img
                src="../../../public/images/del.png"
                alt="删除"
                class="del"
                @click="delCompleted(index, item)"
            />
          </div>
        </div>
        <div class="footer">
          <div>{{ sum }} items left</div>
          <div class="all" :class="{ num: this.num === 0 }" @click="set(0)">    <!--传相应参数，同是添加set点击事件-->
            All
          </div>
          <div :class="{ num: this.num === 1 }" @click="setActive(1)">Active</div>         <!--传相应参数，同是添加setActive点击事件-->
          <div :class="{ num: this.num === 2 }" @click="setCompleted(2)">            <!--传相应参数，同是添加setCompleted点击事件-->
            Completed
          </div>
        </div>
      </div>
      <div class="bottom-right">
        <div class="bottom-right-main">
          <img src="../../../public/images/img5.png" alt="" class="img">
          <div class="slip">
            <div v-for="(item,index) in slip" :key="index">
              <div v-if="item.progress<1">          <!--elment进条度图-->
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
        activeList: [],        //用来装todo list任务栏active数组内容
        completedList: [],          //用来装todo list任务栏completed数组内容
        checkAlled: false,
        num: 0,                  //定义参数，实现点击转换内容的目的
        todoList:[],              //用来装todo list任务栏all数组内容
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
        pie:[],         //装饼图数据
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
      check(index) {
        this.todoList[index].checked = !this.todoList[index].checked;      //点击后，将每项数据checkAlled属性改为true
        this.checkAlled = this.todoList.every(item => {                    //全选，将全部checkAlled改为true
          return item.checked === true;
        });
      },
      checkActive(index) {
        this.activeList[index].checked = !this.activeList[index].checked;       //Active栏里，点击，将每项数据checkAlled属性改为true
        this.checkAlled = this.todoList.every(item => {                                //全选，将Active栏里全部checkAlled改为true
          return item.checked === true;
        });
      },
      checkCompleted(index) {
        this.completedList[index].checked = !this.completedList[index].checked;      //Completed栏里，点击，将每项数据checkAlled属性改为true
        this.checkAlled = this.todoList.every(item => {                              //全选，将Completed栏里全部checkAlled改为true
          return item.checked === true;
        });
      },
      checkAll() {
        this.checkAlled = !this.checkAlled;           //全选点击，将值改为相反值
        this.todoList.map(item => {
          item.checked = this.checkAlled;              //让内容的checkAlled值与全选值相等
        });
      },
      del(index) {
        this.todoList.splice(index, 1);             //点击删除，当项数据从数据删除
      },
      delActive(index, item) {
        this.activeList.splice(index, 1);           //Active里点击删除，Active当项数据从数据删除
        this.todoList.splice(this.todoList.indexOf(item), 1);     //Active里点击删除，all栏里相应内容删除
      },
      delCompleted(index, item) {
        this.completedList.splice(index, 1);                         //Completed里点击删除，Active当项数据从数据删除
        this.todoList.splice(this.todoList.indexOf(item), 1);          //Completed里点击删除，all栏里相应内容删除
      },
      set(data) {
        this.num = data;
      },
      setActive(data) {
        this.num = data;
        this.activeList = this.todoList.filter(item => {
          return item.checked !== true;
        });
      },
      setCompleted(data) {
        this.num = data;
        this.completedList = this.todoList.filter(item => {
          return item.checked === true;
        });
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
    computed: {
      sum() {
        let sum = this.todoList.length;
        this.todoList.map(item => {
          if (item.checked) {
            sum -= 1;
          }
        });
        return sum;
      }
    },
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
      .box, .list {
        margin-left: 1%;
        width: 24%;
        background: white;
        .title {
          display: flex;
          justify-content: space-between;
          padding: 12px;
          border-bottom: 1px solid gainsboro;
          .arrow {
            width: 15px;
          }
        }
        .content {
          padding: 12px;
          height: 328px;
          .term {
            display: flex;
            align-items: center;
            padding: 12px 0;
            font-size: 16px;
            position: relative;
            &:hover {
              background: floralwhite;
            }
            &:hover .del {
              display: block;
            }
            .check {
              width: 15px;
              height: 15px;
              border-radius: 50%;
              border: 1px solid lightgrey;
              margin-right: 10px;
              position: relative;
              .yes {
                width: 14px;
                position: absolute;
                top: 50%;
                margin-top: -7px;
              }
            }
            .del {
              width: 15px;
              position: absolute;
              top: 11px;
              right: 0;
              display: none;
            }
          }
        }
        .footer {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid gainsboro;
          margin: 10px;
          padding: 30px 0 0 20px;
          font-size: 12px;
          div {
            height: 36px;
            line-height: 36px;
            text-align: center;
          }
          .num {
            border: 1px solid lightcoral;
          }
          .all {
            width: 18%;
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
