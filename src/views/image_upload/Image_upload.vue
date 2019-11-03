<template>
  <div class="upload">
    <div class="main">
      <div class="main-text">
        <div class="tuozhuai">支持拖拽</div>
        <div class="Element_UI">Element UI自带上传组件</div>
        <el-upload
            class="upload-demo"
            drag
            action="api/upload"
            multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <div class="tuozhuai">支持裁剪</div>
        <div class="Element_UI">vue-image-crop-upload</div>
        <div><el-button type="primary" @click="toggleShow">上传图片</el-button></div>
        <my-upload field="file"
                   @crop-success="cropSuccess"
                   @crop-upload-success="cropUploadSuccess"
                   @crop-upload-fail="cropUploadFail"
                   v-model="show"
                   :width="300"
                   :height="300"
                   url="api/upload"
                   :params="params"
                   :headers="headers"
                   img-format="png"></my-upload>
        <img :src="imgDataUrl">
      </div>
    </div>
  </div>
  
</template>

<script>
  // import 'babel-polyfill'; // es6 shim
  import myUpload from 'vue-image-crop-upload';
  export default {
    name: "Image upload",
    components: {
      'my-upload': myUpload
    },
    props: {},
    data() {
      return {
        show: false,
        params: {
          token: '123456798',
          name: 'avatar'
        },
        headers: {
          smail: '*_~'
        },
        imgDataUrl: '' // the datebase64 url of created image
      }
    },
    methods: {
      toggleShow() {
        this.show = !this.show;
      },
      /**
       * crop success
       *
       * [param] imgDataUrl
       * [param] field
       */
      cropSuccess(imgDataUrl){
        console.log('-------- crop success --------');
        this.imgDataUrl = imgDataUrl;
      },
      /**
       * upload success
       *
       * [param] jsonData  server api return data, already json encode
       * [param] field
       */
      cropUploadSuccess(jsonData, field){
        console.log('-------- upload success --------');
        console.log(jsonData);
        console.log('field: ' + field);
      },
      /**
       * upload fail
       *
       * [param] status    server api return error status, like 500
       * [param] field
       */
      cropUploadFail(status, field){
        console.log('-------- upload fail --------');
        console.log(status);
        console.log('field: ' + field);
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
  .upload{
    background: #f0f2f5;
    .main{
      margin: 1%;
      background: white;
      .main-text{
        margin: 1%;
        .tuozhuai{
          height: 70px;
          line-height: 70px;
          font-size: 30px;
        }
        .Element_UI{
          width: 98%;
          padding: 20px 0 20px 20px;
          background: lightgray;
          margin-bottom: 20px;
        }
      }
    }
  }
</style>
