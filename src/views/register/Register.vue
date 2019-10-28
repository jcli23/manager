<template>
  <div>
    <div class="register">
      <div class="top">欢迎来到小爱后台管理系统</div>
      <div class="form">
        <div>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
              <el-button type="primary" @click="logon('/logon')">立即登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
  export default {
    name: "Register",
    components: {},
    props: {},
    data() {
      let checkusername = (rule, value, callback) => {         //声明同步用户名数据
        if (!value) {
          return callback(new Error('请输入用户名'));
        }else{
          let filter  = /^[a-zA-Z0-9_]{0,}$/;
          if (!filter.test(value)){
            callback(new Error('用户名不能有中文'));
          }else {
            callback();
          }
        }
      };
      let validatePass = (rule, value, callback) => {     //同步密码
        if (value === '') {
          callback(new Error('请输入密码'));

        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {   //同步确认密码
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          username:''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' },
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }   //不输密码弹提示内容，标注为必填项
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' },
            { required: true, message: '请输入密码', trigger: 'blur' },   //不输密码弹提示内容，标注为必填项
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },    //注册名必填
            { validator: checkusername, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.req("api/user/register",{
              username:this.ruleForm.username,
              password:this.ruleForm.pass
            })
              .then(res =>{
                if(res.code ===200){
                  this.$message({
                    showClose:true,
                    message:"注册成功",
                    type:"success"
                  });
                  this.$router.push("/logon")
                }else if(res.code===1) {
                  // 注册失败
                  this.$message.error(res.message)
                }
              }).catch(err=>{
                console.log(err);
            })

          }else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      logon(){
        this.$router.push("/logon")
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
  .register{
    border: 1px solid lightgray;
    width: 600px;
    height: 300px;
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
      width: 400px;
      height: 226px;
      margin: 20px 50px 50px 20px;
    }
  }
</style>
