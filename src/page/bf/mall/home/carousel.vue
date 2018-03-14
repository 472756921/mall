<template>
  <div class="block">
    <el-carousel height="10rem" arrow="never">
      <el-carousel-item v-for="item in imgdata" :key="item.id">
        <img :src="'http://118.31.38.219'+item.url" width="100%" height="100%"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
      name: 'carousel',
      props: ['imgdata'],
      data(){
        return{
         // imgdata: ['static/p1.jpg','static/p2.jpg','static/p3.jpg'],
        }
      },
    };
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
