<template>
  <div class="all">
    <div>
      <div class="top">
        <div class="look" @click="back">返回</div>         <!--返回编辑按钮-->
        <div class="fabu" @click="PublishItems">发布</div>       <!--编辑之后发布按钮-->
      </div>
      <div class="main">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="文章标题" prop="title">
            <el-input type="text" v-model="ruleForm.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="文章摘要" prop="abstract">
            <el-input type="text" v-model="ruleForm.abstract" autocomplete="off"></el-input>
          </el-form-item>
          <div class="center">
            <el-form-item label="作者" prop="author">
              <el-input type="text" v-model="ruleForm.author" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="类目" prop="category">
              <el-select v-model="ruleForm.category" placeholder="请选择" autocomplete="off">
                <el-option label="Vue" value="Vue"></el-option>
                <el-option label="React" value="React"></el-option>
                <el-option label="Node.js" value="Node"></el-option>
                <el-option label="性能优化" value="性能优化"></el-option>
                <el-option label="javaScript" value="javaScript"></el-option>
                <el-option label="小程序" value="小程序"></el-option>
                <el-option label="工具类" value="工具类"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="来源" prop="source">
              <el-select v-model="ruleForm.source" placeholder="请选择" autocomplete="off">
                <el-option label="原创" value="原创"></el-option>
                <el-option label="转载" value="转载"></el-option>
                <el-option label="与他人合作" value="与他人合作"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="重要性" prop="star">
              <el-select v-model="ruleForm.star" placeholder="请选择" autocomplete="off">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="5" value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布时间">
              <el-date-picker
                  v-model="ruleForm.date"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                  :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="markdown">
        <mavon-editor v-model="ruleForm.text"/>       <!--markdown插件-->
      </div>
    </div>
  </div>
  
</template>

<script>
  export default {
    name: "Edit",
    components: {},
    props: {},
    data() {
      return {
        id:'',
        ruleForm: {
          text:'',          //文章标题
          abstract: '',     //文章摘要
          title: '',          //标题
          author:'',          //作者
          date:'',            //发布时间
          source:'',         //来源
          star:'',              //重要性
          category:'',         //类目
        },
        rules: {
          abstract:[
            { required: true, message: '请输入文章摘要', trigger: 'blur' }
          ],
          title:[
            { required: true, message: '请输入文章标题', trigger: 'blur' }
          ],
          author:[
            { required: true, message: '请输入作者', trigger: 'blur' }
          ],
          category:[
            { required: true, message: '请选择类目', trigger: 'blur' }
          ],
          source:[
            { required: true, message: '请选择来源', trigger: 'blur' }
          ],
          star:[
            { required: true, message: '请选择重要性等级', trigger: 'blur' }
          ],
        },
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value2: '',
      }
    },
    methods: {
      getData () {
        this.$axios.req('/api/article/article',{_id:this.id}).then(res => {
          // console.log(res)
          this.ruleForm = res.data  //拿到数据
          this.ruleForm.date=Date.now()
        }).catch(err => {
          console.log(err)  //报错打印
        })
      },
      PublishItems(){
        this.$axios.req("/api/article/update",{
          id: this.id,
          title: this.ruleForm.title,
          abstract: this.ruleForm.abstract,
          author: this.ruleForm.author,
          category: this.ruleForm.category,             //编辑后发post请求
          source: this.ruleForm.source,
          star: this.ruleForm.star,
          text:this.ruleForm.text,
          date: this.ruleForm.date
        })
          .then(res =>{
            if(res.success){
              this.$message({
                showClose:true,
                message:"编辑成功",
                type:"success",
              });
              this.$router.push("/published")         //编辑后跳转已发布
              this.ruleForm={}
            }else{
              this.$message.error(res.message)
            }
          }).catch(err=>{
          console.log(err);
        })
      },
      back(){
        this.$router.push("/published")              //不编辑直接返回发布页
      }
    },
    mounted() {
      this.id=this.$route.query.id;              //接收id
      // console.log(this.id);
      this.getData ()
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
    background: #f0f2f5;
    .top{
      margin:1%;
      width: 98%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .look{
        width: 60px;
        height: 35px;
        border-radius: 5px;
        background: orangered;
        line-height: 35px;
        text-align: center;
        color: white;
        margin-right: 20px;
      }
      .fabu{
        width: 60px;
        height: 35px;
        border-radius: 5px;
        background: dodgerblue;
        line-height: 35px;
        text-align: center;
        color: white;
        margin-right: 20px;

      }
    }
    .main{
      margin:50px 1%;
      width: 98%;
      .center{
        display: flex;
      }
    }
    .markdown{
      margin:1%;
      width: 98%;
    }
    .bottom{
      margin:1%;
      width: 98%;
      height:120px;
      display: flex;
      justify-content: center;
    }
  }
</style>
