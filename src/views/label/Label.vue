<template>
  <div class="label">
    <div class="form">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="first">
          <span slot="label">未读消息（{{data.length}}）</span>
          <div class="main">
            <div v-for="(item,index) in data" :key="index" class="article">
              <div class="left">{{item.article}}</div>
              <div class="right">
                <div>{{item.date}}</div>
                <div class="right_yidu" @click="readover(item,index)">标为已读</div>         <!--已读按钮-->
              </div>
            </div>
            <div class="foot" v-if="data.length!==0">
              <div class="yiduall" @click="readall()">全部标为已读</div>               <!--全部已读按钮-->
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label">已读消息（{{read.length}}）</span>
          <div>
            <div class="main">
              <div v-for="(item,index) in read" :key="index" class="article">
                <div class="left">{{item.article}}</div>
                <div class="right">
                  <div>{{item.date}}</div>
                  <div class="right_del" @click="del(item,index)">删除</div>               <!--删除按钮-->
                </div>
              </div>
              <div class="foot" v-if="read.length!==0">
                <div class="delall" @click="delall()">全部删除</div>                     <!--全部删除按钮-->
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="third">
          <span slot="label">回收站（{{rec.length}}）</span>
          <div>
            <div class="main">
              <div v-for="(item,index) in rec" :key="index" class="article">
                <div class="left">{{item.article}}</div>
                <div class="right">
                  <div>{{item.date}}</div>
                  <div class="right_return" @click="back(item,index)">还原</div>            <!--回收站还原按钮-->
                </div>
              </div>
              <div class="foot" v-if="rec.length!==0">
                <div class="null" @click="backall()">清空回收站</div>                   <!--清空回收站按钮-->
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  
</template>

<script>
  export default {
    name: "Label",
    components: {},
    props: {},
    data() {
      return {
        activeName: 'first',
        data:[                                                              //消息表
          {
            article:'【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
            date:'2018-04-19 21:00:00'
          },
          {
            article:'今晚12点整发大红包，先到先得',
            date:'2018-04-19 21:00:00'
          },
          {
            article:'聂雨轩经常开到电脑就睡着了，电脑就在床边上',
            date:'2018-04-19 21:00:00'
          },
          {
            article:'向浮刚每天都起来的最晚，我们一般都是等刚哥一起再到公司',
            date:'2018-04-19 21:00:00'
          },
        ],
        read:[],
        rec:[]
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      readover(item,index){
        this.read.push(item)              //点击已读，将信息添加到已读页
        this.data.splice(index,1)            //点击已读，将点击的未读信息删除
      },
      readall(){
        this.read=this.read.concat(this.data)       //点击全部已读，将未读的消息全部拿到已读
        this.data=[]                                      //同理，未读页变为空数组，没有信息
      },
      del(item,index){
        this.rec.push(item)                 //点击删除，将信息添加到回收站页
        this.read.splice(index,1)          //点击删除，将点击的已读信息删除
      },
      delall(){
        this.rec=this.rec.concat(this.read)       //点击全部删除，将信息全部添加到回收站页
        this.read=[]                        //同理，已读页变为空数组，没有信息
      },
      back(item,index){
        this.read.push(item)                  //点击还原，点击的回收站信息，添加到已读页
        this.rec.splice(index,1)                //点击的消息在当页删除
      },
      backall(){                              //点击清空回收站，回收站数组变为空
        this.rec=[]
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
  .label{
    background: #f0f2f5;
    .form{
      margin: 0 2%;
      .main{
        background: white;
        .article{
          margin: 0 2%;
          display: flex;
          height: 80px;
          line-height: 80px;
          border-bottom: 1px solid lightgray;
          justify-content: space-between;
          .left{
            font-size: 16px;
            color: #444444;
          }
          .right{
            width: 25%;
            display: flex;
            color: #444444;
            align-items: center;
            justify-content: space-around;
            .right_yidu{
              color: #444444;
              width: 100px;
              height: 40px;
              border: 1px solid lightgray;
              border-radius: 5px;
              line-height: 40px;
              text-align: center;
              &:hover{
                background: #00B7FF;
              }
            }
            .right_del{
              color: white;
              width: 100px;
              height: 40px;
              background: red;
              border: 1px solid lightgray;
              border-radius: 5px;
              line-height: 40px;
              text-align: center;
            }
            .right_return{
              color: white;
              width: 100px;
              background: khaki;
              height: 40px;
              border: 1px solid lightgray;
              border-radius: 5px;
              line-height: 40px;
              text-align: center;
            }
          }
        }
        .foot{
          margin: 0 2%;
          display: flex;
          height: 80px;
          line-height: 80px;
          border-bottom: 1px solid lightgray;
          justify-content: space-between;
          align-items: center;
          .yiduall{
            width: 120px;
            height: 40px;
            background: #00B7FF;
            color: white;
            border-radius: 5px;
            font-size: 14px;
            line-height: 40px;
            text-align: center;
          }
          .delall{
            width: 120px;
            height: 40px;
            background: red;
            color: white;
            border-radius: 5px;
            font-size: 14px;
            line-height: 40px;
            text-align: center;
          }
          .null{
            width: 120px;
            height: 40px;
            background: gray;
            color: white;
            border-radius: 5px;
            font-size: 14px;
            line-height: 40px;
            text-align: center;
          }
        }
      }
    }
  }

</style>
