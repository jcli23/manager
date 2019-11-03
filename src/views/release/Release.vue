<template>
  <div class="all">
    <div>
      <div class="top">
        <div class="look" @click="look">查看</div>
        <div class="fabu" @click="PublishItems()">发布</div>
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
            <el-form-item label="来源" prop="origin">
              <el-select v-model="ruleForm.origin" placeholder="请选择" autocomplete="off">
                <el-option label="原创" value="原创"></el-option>
                <el-option label="转载" value="转载"></el-option>
                <el-option label="与他人合作" value="与他人合作"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="重要性" prop="importance">
              <el-select v-model="ruleForm.importance" placeholder="请选择" autocomplete="off">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="5" value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布时间" prop="date">
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
        <mavon-editor v-model="text"/>
      </div>
      <div class="bottom">
        <div class="bottom-fabu" @click="PublishItems()">发布</div>
      </div>
    </div>
  </div>
  
</template>

<script>
  export default {
    name: "Publish article",
    components: {

    },
    props: {},
    data() {
      return {
        text:'',
        ruleForm: {
          abstract: '',
          date: '',          //标题
          author:'',
          time:'',
          origin:'',
          importance:'',
          category:'',
        },
        rules: {
          abstract:[
            { required: true, message: '请输入文章摘要', trigger: 'blur' }    //验证码必填
          ],
          title:[
            { required: true, message: '请输入文章标题', trigger: 'blur' }    //验证码必填
          ],
          author:[
            { required: true, message: '请输入作者', trigger: 'blur' }    //验证码必填
          ],
          category:[
            { required: true, message: '请选择类目', trigger: 'blur' }    //验证码必填
          ],
          origin:[
            { required: true, message: '请选择来源', trigger: 'blur' }    //验证码必填
          ],
          importance:[
            { required: true, message: '请选择重要性等级', trigger: 'blur' }    //验证码必填
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
      PublishItems(){
        this.$axios.req("api/article/create",{
          title: this.ruleForm.title,
          abstract: this.ruleForm.abstract,
          author: this.ruleForm.author,                //配置post请求参数
          category: this.ruleForm.category,
          source: this.ruleForm.origin,
          star: this.ruleForm.importance,
          date: this.ruleForm.date,
          text:this.text
        })
          .then(res =>{
            if(res.code ===200){
              this.$message({
                showClose:true,
                message:"发布成功",
                type:"success",
              });
              this.ruleForm={}
              this.text=''
              this.$router.push('/published')
            }else if(res.code===1) {
              // 注册失败
              this.$message.error(res.message)
            }
          }).catch(err=>{
          console.log(err);
        })
      },
      look(){
        this.$router.push("/published")          //点击查看，跳转已发布页
      }
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
    background: #f0f2f5;
    .top{
      margin:1%;
      width: 98%;
      height: 50px;
      background: seagreen;
      display: flex;
      align-items: center;
      justify-content: flex-end;
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
      margin:1%;
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
      .bottom-fabu{
        width: 70px;
        height: 35px;
        border-radius: 5px;
        background: dodgerblue;
        line-height: 35px;
        text-align: center;
        color: white;
        margin-top: 40px;
      }
    }
  }
</style>
