<template>
  <div style="background: #f0f2f5">
    <div class="input">
      <input type="text" placeholder="请输入你想搜索的商品信息" v-model="keywords">    <!--搜索框 -->
    </div>
    <div class="table-header">
      <div>名称</div>
      <div>商品编号</div>
      <div>原价</div>                         <!--表头栏 -->
      <div>现价</div>
      <div>操作</div>
    </div>
    <div v-for="(item,index) in arr.slice(pages*(pagesNum-1),pages*pagesNum)" :key="index" class="table-label">
      <div>{{item.NAME}}</div>                  <!--商品名 -->
      <div>{{item.GOODS_SERIAL_NUMBER}}</div>      <!--商品编号 -->
      <div>{{item.ORI_PRICE}}</div>            <!--原价 -->
      <div>{{item.PRESENT_PRICE}}</div>         <!--现价 -->
      <div class="button">
        <el-button type="primary" @click="getrow(item)"><i class="el-icon-edit"></i>修改</el-button>
        <el-dialog :visible.sync="dialogFormVisible">
          <el-form :model="row_item">
            <el-form-item label="名称:" :label-width="formLabelWidth">
              <el-input v-model="row_item.NAME" autocomplete="off"></el-input>
            </el-form-item>                                                          <!--点击修改的弹窗 -->
            <el-form-item label="原价:" :label-width="formLabelWidth">
              <el-input v-model="row_item.ORI_PRICE" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="现价:" :label-width="formLabelWidth">
              <el-input v-model="row_item.PRESENT_PRICE" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>       <!--取消修改 -->
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
        <el-button type="danger" @click="delrow(index)"><i class="el-icon-delete"></i>删除</el-button>   <!--删除当前行 -->
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
    <div class="Derive">
      <download-excel class="export-excel-wrapper" :data="arr.slice(pages*(pagesNum-1),pages*pagesNum)"  name="导出xls">
        <el-button type="primary" size="medium">当前页导出xls</el-button>
      </download-excel>
      <download-excel class="export-excel-wrapper" :data="arr.slice(pages*(pagesNum-1),pages*pagesNum)"  name="导出csv" type="csv">
        <el-button type="danger" size="medium">当前页导出csv</el-button>
      </download-excel>
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
        keywords: '', // 搜索的关键字
        tableData: [],     //用来装get请求接收到的整个表的数据
        arr: [],        // 这个数组里面的数据都是过滤之后的
        currentPage: 1,     //当前页码
        row_item: '',     //装点击当前行的内容值
        row_index: '',   //记录点击当前行的序列号
        pages: 10,       //每页10个数据
        pagesNum: 1,       //默认第一页
        dialogFormVisible: false,
        form: {
          name: '',
        },
        formLabelWidth: '120px',
      }
    },
    methods: {
      gettableData () {
        this.$axios.req('api/tableData').then(res => {
          console.log(res)
          this.tableData = res.data//拿到数据
          this.arr = this.tableData   //拿到数据，直接给过滤数组赋值
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
      getrow(item){
        this.dialogFormVisible = true     //获取当前行的内容，以便拿到需要修改的当前行的值
        this.row_item=item
      },
      delrow(index){
        this.tableData.splice(index,1)    //删除点击删除的当前行的内容
      },

    },
    mounted() {
      this.gettableData ()
    },
    created() {

    },
    filters: {},
    computed: {},
    watch: {
      keywords (val) {
        // 说明输入框有值
        if (val.trim() !== '') {
          this.arr= this.tableData.filter(item => {     //让arr数组装过滤后的tableData表内容
            return JSON.stringify(item).includes(val)
            // return JSON.stringify(item).indexOf(val) > 0
            // return JSON.stringify(item).indexOf(val) !== -1
          })
        } else {
          this.arr = this.tableData     //没有搜索的时候，让arr直接赋值为tableData的内容，然后循环
        }
      }
    },
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
  .Derive{
    display: flex;
    .export-excel-wrapper{
      margin-left: 20px;
    }
  }
</style>
