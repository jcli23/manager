<template>
  <div>
    <div class="register">  <!--登录表单绑定样式-->
      <div class="top">欢迎来到小爱后台管理系统</div>   <!--表头及样式-->
      <div class="form">                       <!--登录表单-->
        <div>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="请输入密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <div class="code">
              <el-form-item label="验证码" prop="code">
                <el-input v-model="ruleForm.code" clearable></el-input>
              </el-form-item>
              <div v-html="code" @click="getCode" class="svg"></div>  <!--获取验证码-->
            </div>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即登录</el-button>    <!--登录点击按钮-->
              <el-button type="primary" @click="register">立即注册</el-button>   <!--点击直接跳转注册页面-->
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
  export default {
    name: "Logon",
    components: {},
    props: {},
    data() {
      let checkusername = (rule, value, callback) => {         //检验用户名格式
        if (!value) {
          return callback(new Error('请输入用户名'));   //如果不输入，显示提示信息
        }else{
          let filter  = /^[a-zA-Z0-9_]{0,}$/;     //用户名输入不能有中文，正则表达式
          if (!filter.test(value)){
            callback(new Error('用户名不能有中文'));
          }else {
            callback();         //如果符合用户名注册条件，继续
          }
        }
      };
      let validatePass = (rule, value, callback) => {     //检验注册密码
        if (value === '') {
          callback(new Error('请输入密码'));     //密码不能为空，为空提示输入密码的信息

        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');   //不为空，把值存下来
          }
          callback();
        }
      };
      return {
        code:'',
        ruleForm: {
          code:'',     //用来装验证码
          pass: '',       //用来装密码
          checkPass: '',      //用来装确认密码
          username:''    //用来装用户名
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' },
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }   //不输密码弹提示内容，标注为必填项
          ],                                                                        //密码大于6位下于12位
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },    //用户名必填
            { validator: checkusername, trigger: 'blur' }
          ],
          code:[
            { required: true, message: '请输入验证码', trigger: 'blur' }    //验证码必填
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.req("api/user/login",{
              username:this.ruleForm.username,    //发送请求，把登录信息传过去
              password:this.ruleForm.pass,
              code:this.ruleForm.code
            })
              .then(res =>{
                if(res.code ===200){
                  this.$message({
                    message:`用户${this.ruleForm.username}登录成功`,   //登录成功，提示成功登录信息
                    type:"success"
                  });
                  this.$store.state.username=this.ruleForm.username;   //把用户名存入state
                  this.$store.state.time=res.data[0].date;            //把登录时间传给state
                  localStorage.setItem('user',JSON.stringify({user:res}))   //把信息存入浏览器localStorage
                  this.$router.push("/main")    //登录成功，跳转到后台管理首页
                }else if(res.code===1) {
                  // 登录失败
                  this.$message.error(res.message)
                }
              }).catch(err=>{
              console.log(err);
            })
          }else {
            console.log("error submit!!");    //登录信息错误，报错
            return false;
          }
        });
      },
      getCode(){
        this.$axios.req("api/captcha").then(res=>{    //获取验证码
          this.code=res;
        }).catch(err=>{
          console.log(err)
        })
      },
      register(){
        this.$router.push("/register")    //点击注册，立即跳转注册页面
      },
    },
    mounted() {
      this.getCode()   //调用验证码的获取函数
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
  .register{
    border: 1px solid lightgray;
    width: 600px;
    height: 350px;
    left: 500px;
    position: absolute;
    top: 200px;
    .top{
      border-bottom: 1px solid lightgray;
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
    .form{
      width: 450px;
      height: 276px;
      margin: 20px 50px 50px 20px;
      .code{
        width: 450px;
        height: 45px;
        display: flex;
        margin-bottom: 30px;
        .svg{
          border: 1px solid lightgray;
          width: 150px;
          height: 45px;
          margin-left: 20px;
        }
      }
    }
  }
</style>
