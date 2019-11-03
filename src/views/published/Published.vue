<template>
  <div class="Published">
    <div class="all">
      <el-table
          ref="singleTable"
          :data="tableData"
          border
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%">
        <el-table-column
            align="center"
            type="index"
            width="40">
        </el-table-column>
        <el-table-column
            align="center"
            prop="title"
            label="标题"
            width="300">
        </el-table-column>
        <el-table-column
            align="center"
            property="author"
            label="作者"
            width="90">
        </el-table-column>
        <el-table-column
            align="center"
            property="category"
            label="类目"
            width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.category==='Vue'"><el-tag type="success">{{scope.row.category}}</el-tag></span>
            <span v-else-if="scope.row.category==='React'"><el-tag type="info">{{scope.row.category}}</el-tag></span>
            <span v-else-if="scope.row.category==='Node.js'"><el-tag type="warning">{{scope.row.category}}</el-tag></span>
            <span v-else-if="scope.row.category==='性能优化'"><el-tag type="danger">{{scope.row.category}}</el-tag></span>
            <span v-else-if="scope.row.category==='小程序'"><el-tag>{{scope.row.category}}</el-tag></span>
            <span v-else-if="scope.row.category==='工具类'"><el-tag type="danger">{{scope.row.category}}</el-tag></span>
            <span v-else><el-tag type="warning">{{scope.row.category}}</el-tag></span>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            property="source"
            label="来源"
            width="90">
        </el-table-column>
        <el-table-column
            align="center"
            prop="star"
            label="重要性"
            width="200">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.star"></el-rate>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            property="date"
            label="发布时间"
            width="200">
        </el-table-column>
        <el-table-column
            align="center"
            property="name"
            label="操作"
            width="300">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>    <!--编辑的点击事件，传当前行数据-->
            <el-button type="danger" @click="handleDel(scope.$index, scope.row)">删除</el-button>       <!--删除的点击事件，传当前行数据-->
            <el-button type="success" @click="handLook(scope.$index, scope.row)">查看</el-button>       <!--查看的点击事件，传当前行数据-->
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  
</template>

<script>
  export default {
    name: "Published;",
    components: {},
    props: {},
    data() {
      return {
        allArticle:[],
        currentRow: null,
        tableData:[]
      }
    },
    methods: {
      getallArticle () {
        this.$axios.req('api/article/allArticle').then(res => {
          console.log(res)
          this.allArticle = res.data      //拿到数据
          this.tableData=this.allArticle
          this.tableData.map(item =>{
            if(item.date.indexOf('年') ===-1){              //如果未编辑过，即为还没转换过时间，所以转换时间
              item.date=this.$dayjs(item.date).format("YYYY年MM月DD日 hh时mm分ss秒")
            }
            item.star=Number(item.star)     //重要性数据转为数字
          })
        }).catch(err => {
          console.log(err)  //报错打印
        })
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push({name:"edit",query:{id:row._id}})     //点击编辑，传id给编辑页
      },
      handLook(index, row) {
        console.log(index);
        this.$router.push({ name: "look", query: { _id: row._id } });      //点击编辑，传id给查看页
      },
      handleDel(index, row) {
        console.log(index, row);
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$axios
              .req("api/article/delete", { _id: row._id })       //给删除请求权id
              .then(res => {
                if (res.code === 200) {
                  this.getallArticle();
                  console.log(res);
                }
              })
              .catch(err => {
                console.log(err);
              });
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
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
  .Published{
    background: #f0f2f5;
    .all{
      margin: 1%;
      background: white;
    }
  }
</style>
