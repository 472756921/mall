<template>
  <el-row>
    <el-col :span="3">
      <div class="side">
        <div class="sideHead">和润康管理系统</div>
        <el-row class="tac">
          <el-col :span="24">
            <el-menu default-active="2" class="el-menu-vertical-demo">
              <el-submenu index="9" v-if="type==1">
                <template slot="title"><i class="iconfont icon-shangcheng"></i> 商城管理</template>
                <el-menu-item index="9-1"><router-link :to="{ name: 'addGodds' }">添加商品</router-link></el-menu-item>
                <el-menu-item index="9-1"><router-link :to="{ name: 'mallIndex' }">商品列表</router-link></el-menu-item>
                <el-menu-item index="9-1"><router-link :to="{ name: 'headImg' }">商城轮播图片设置</router-link></el-menu-item>
              </el-submenu>
              <el-menu-item index="6" v-if="type==1"><i class="iconfont icon-dingdan-copy"></i> <router-link :to="{ name: 'oderList' }">订单查询</router-link></el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col :span="21">
      <div class="main">
        <div class="mainHead">用户，您好</div>
        <router-view></router-view>
      </div>
    </el-col>
  </el-row>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'docIndex',
    created() {
    },
    data() {
      return {
        type: 1,
        adminType: 1,
      };
    },
    methods: {
    }
  };
</script>

<style scoped>
  .mainHead{
    background: #5a6378;
    width: 100%;
    float: left;
    padding: 20px 10px;
    font-size: 20px;
    color: #ffffff;
    box-sizing:border-box;
  }
  .side{
    width: 100%;
    float: left;
  }
  .sideHead{
    background: #ff6b6b;
    color: #ffffff;
    padding: 20px 10px;
    font-size: 20px;
  }
  a{
    color: #777;
    text-decoration: none;
  }
</style>
<style>
  .side .el-submenu .el-menu {
    overflow: hidden;
  }
  .side .el-submenu .el-menu-item {
    padding:  0!important;
    padding-left: 30px!important;
    width: 100%!important;
  }
</style>
