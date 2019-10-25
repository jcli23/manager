<template>
  <div style="background: #f0f2f5">
    <div class="input">
      <input type="text" placeholder="请输入你想搜索的商品信息">
    </div>
    <div class="table-header">
      <div>名称</div>
      <div>商品编号</div>
      <div>原价</div>
      <div>现价</div>
      <div>操作</div>
    </div>
    <div v-for="(item,index) in tableData.slice(pages*(pagesNum-1),pages*pagesNum)" :key="index" class="table-label">
      <div>{{item.NAME}}</div>
      <div>{{item.GOODS_SERIAL_NUMBER}}</div>
      <div>{{item.ORI_PRICE}}</div>
      <div>{{item.PRESENT_PRICE}}</div>
      <div class="button">
        <el-button type="primary" @click="open"><i class="el-icon-edit"></i>修改</el-button>
        <el-button type="danger"><i class="el-icon-delete"></i>删除</el-button>
      </div>
    </div>
    <div class="page">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.tableData.length ">
      </el-pagination>     <!--分页效果-->
    </div>
  </div>
  
</template>

<script>
  export default {
    name: "Form",
    components: {},
    props: {},
    data() {
      return {
        tableData:[],
        currentPage:1,
        pages:10,
        pagesNum:1,
      }
    },
    methods: {
      gettableData () {
        this.$axios.req('api/tableData').then(res => {
          console.log(res)
          this.tableData = res.data//拿到数据
        }).catch(err => {
          console.log(err)  //报错打印
        })
      },
      // 翻页事件
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pages=val;
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.pagesNum=val
      },
      open() {
        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }
    },
    mounted() {
      this.gettableData ()
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
  .input{
    margin: 1%;
    input{
      font-size: 12px;
      height: 25px;
      width: 250px;
      background: white;
    }
  }
  .table-header{
    border: 1px solid lightgrey;
    height: 40px;
    background: white;
    display: flex;
    margin: 0 1%;
    div{
      flex: 1;
      line-height: 40px;
      color: #444444;
      font-size: 14px;
      text-align: center;
    }
  }
  .table-label {
    border: 1px solid lightgrey;
    border-top:none;
    height: 55px;
    background: white;
    display: flex;
    margin: 0 1%;
    align-items: center;
    div {
      flex: 1;
      color: #444444;
      font-size: 14px;
      text-align: center;
    }
    .button{
      flex: 1;
      height: 40px;
      line-height: 55px;
      display: flex;
      justify-content: center;
    }
    &:hover{
      background: #f0f2f5;
    }
  }
  .page{
    margin: 10px 1%;
    background: white;
  }
</style>
