<template>
  <div class="statistics">
     <div class="main">
        <div class="top">
          <div class="one">
            <div class="left">
              <div class="title">今日发布</div>
              <div class="total">{{count}}</div>       <!--如果是今日发布，显示数量-->
            </div>
            <div class="right"><i class="el-icon-check"></i></div>   <!--对应图标-->
          </div>
          <div class="two">
            <div class="left">
              <div class="title">原创文章</div>
              <div class="total">{{total}}</div>      <!--如果是原创文章，显示原创文章数量-->
            </div>
            <div class="right"><i class="el-icon-tickets"></i></div>   <!--对应图标-->
          </div>
          <div class="three">
            <div class="left">
              <div class="title">新留言</div>
              <div class="total">0</div>
            </div>
            <div class="right"><i class="el-icon-bell"></i></div>     <!--对应图标-->
          </div>
          <div class="four">
            <div class="left">
              <div class="title">新消息</div>
              <div class="total">0</div>
            </div>
            <div class="right"><i class="el-icon-phone-outline"></i></div>   <!--对应图标-->
          </div>
        </div>
       <div class="center">
         <div style="width: 500px;"><ve-pie :data="chartData1" :settings="chartSettings1"></ve-pie></div>   <!--按类目饼图-->
         <div style="width: 500px;"><ve-ring :data="chartData2" :settings="chartSettings2"></ve-ring></div>   <!--按来源显示玫瑰图-->
       </div>
       <div>
         <ve-waterfall :data="chartData3" :settings="chartSettings3"></ve-waterfall>   <!--按时间显示瀑布图-->
       </div>
     </div>
  </div>
</template>
<script>
  let _ = require('lodash');
  import VePie from 'v-charts/lib/pie'    //配置饼图插件
  import VeRing from 'v-charts/lib/ring'    //环图插件配置
  import VeWaterfall from 'v-charts/lib/waterfall'    //瀑布图插件配置
  export default {
    name: "Statistics",
    components: {
      VePie,
      VeRing,
      VeWaterfall
    },
    props: {},
    data() {
      this.chartSettings1 = {
        dimension: 'name1',
        metrics: 'data1'
      };
      this.chartSettings2 = {
        roseType: 'radius',
        dimension: 'name2',
        metrics: 'data2'
      };
      this.chartSettings3 = {
        dimension: 'name3',
        metrics: 'data3'
      };
      return {
        allArticle:[],   //用来装接受的文章
        category:{},    //用来装按类目分组已发表文章的对象
        source:{},      //用来装按来源分组已发表文章的对象
        date:{},        //用来装按时间分组已发表文章的对象
        time:'',        //用来装new出来的实时时间
        count:0,        //用来装：判断今日发布条件成立，成立则赋值
        total:0,         //用来装：判断原创发布条件成立，成立则赋值
        b1:0,            //用来定义实时时间的月份值
        c1:0,            //用来定义实时时间的天数值
        b2:0,            //用来定义已发布文章时间的月份值
        c2:0,            //用来定义已发布文章时间的天数值
        chartData1: {
          columns: ['name1','data1'],
          rows: []
        },
        chartData2: {
          columns: ['name2', 'data2'],
          rows: []
        },
        chartData3: {
          columns: ['name3', 'data3'],
          rows: []
        }
      }
    },
    methods: {
      getallArticle () {
        this.$axios.req('api/article/allArticle').then(res => {
          this.allArticle = res.data   //拿到数据
          this.time=this.$dayjs(Date.now()).format("YYYY年MM月DD日")    //定义一个实时时间并转换格式
          this.b1=this.time.substr(5, 2)          //拿到实时时间月份
          this.c1=this.time.substr(8, 2)          //拿到实时时间天数
          this.allArticle.map(item=>{
            if(item.date.indexOf('年') ===-1)      //如果时间未转换则转换
            item.date=this.$dayjs(item.date).format("YYYY年MM月DD日")
                if(item.date===this.time){
                  this.count+=1                     //判断如果时间和实时时间一致，则为今日发布
                }
            else                                  //如果时间已转换一次
              item.date=item.date.substr(0,item.date.indexOf('日')+1)      //先截取需要的时间格式
            this.b2=item.date.substr(item.date.indexOf('年')+1,item.date.indexOf('月')-item.date.indexOf('年')-1)  //拿到因编辑已转换时间的月份值
            this.c2=item.date.substr(item.date.indexOf('月')+1,item.date.indexOf('日')-item.date.indexOf('月')-1)  //拿到因编辑已转换时间的天数值
            if(this.b1==this.b2 && this.C1==this.C2){    //判断如果时间和实时时间一致，则为今日发布
              this.count+=1
            }
            if(item.source==='原创'){
              this.total+=1                 //判断如果为原创，则给total赋值
            }
          })
          this.category=_.groupBy(this.allArticle, 'category');   //通过类目分组
          this.source=_.groupBy(this.allArticle, 'source');      //通过来源分组
          this.date=_.groupBy(this.allArticle, 'date');          //通过时间分组
          for(let i in this.category){
            this.chartData1.rows.push({name1:i,data1:this.category[i].length})    //遍历类目数组创建饼图需要的数组
          }
          for(let i in this.source){
            this.chartData2.rows.push({name2:i,data2:this.source[i].length})    //遍历来源数组创建玫瑰图需要的数组
          }
          for(let i in this.date){
            this.chartData3.rows.push({name3:i,data3:this.date[i].length})    //遍历时间数组创建瀑布图需要的数组
          }
        }).catch(err => {
          console.log(err)  //报错打印
        })
      },
    },
    mounted() {
      this.getallArticle ()
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
  .statistics{
    background: #f0f2f5;
    .main{
      margin: 1%;
      background: white;
      .top{
        width: 100%;
        height: 50px;
        display: flex;
        .one{
          flex: 1;
          display: flex;
          align-items: center;
          background: #7ccadf;
          .left{
            flex: 5;
            .title{
              color: white;
              text-align: center;
            }
            .total{
              color: white;
              text-align: center;
            }
          }
          .right{
            flex: 1;
            color: white;
          }
        }
        .two{
          flex: 1;
          display: flex;
          align-items: center;
          background: #e88a87;
          .left{
            flex: 5;
            .title{
              color: white;
              text-align: center;
            }
            .total{
              color: white;
              text-align: center;
            }
          }
          .right{
            flex: 1;
            color: white;
          }
        }
        .three{
          flex: 1;
          display: flex;
          align-items: center;
          background: #8375a3;
          .left{
            flex: 5;
            .title{
              color: white;
              text-align: center;
            }
            .total{
              color: white;
              text-align: center;
            }
          }
          .right{
            flex: 1;
            color: white;
          }
        }
        .four{
          flex: 1;
          display: flex;
          align-items: center;
          background: #9fcec1;
          .left{
            flex: 5;
            .title{
              color: white;
              text-align: center;
            }
            .total{
              color: white;
              text-align: center;
            }
          }
          .right{
            flex: 1;
            color: white;
          }
        }
      }
      .center{
        display: flex;
        justify-content: space-around;
      }
    }
  }
</style>
