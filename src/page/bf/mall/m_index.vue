<template>
    <div style="height: 100%;padding-bottom: 4rem">
      <div class="head">
        <el-row>
          <el-col :span="4">
            <div class="car" @click="car">购物车</div>
          </el-col>
          <el-col :span="16">
            <div class="title">
              <el-input placeholder="憋说话，搜我" icon="search" size="small" v-model="searchVal" :on-icon-click="handleIconClick"></el-input>
            </div>
          </el-col>
          <el-col :span="4">
            <div style="text-align: right">
              <div class="car" @click="order">订单</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <u_nav ref="u_nav" :itemData="navItems"></u_nav>
      <router-view></router-view>
      <div class="footerd">------------ 我是有底线的 ------------</div>
    </div>
</template>

<script type="text/ecmascript-6">
  import u_nav from './u_nav';
  import home from './home/m_home';
  import {productlistType} from '../../../interface';

    export default {
      name: 'm_index',
      components:{ u_nav, home},
      data() {
        return {
          searchVal: '',
          navItems: [],
        }
      },
      created() {
        this.getNavList();
      },
      methods: {
        car() {
          this.$router.push({ name: 'm_car' });
        },
        order() {
          this.$router.push({ name: 'order' });
        },
        getNavList() {
          this.$ajax({
            method: 'get',
            url: productlistType(),
          }).then((res) => {
            this.navItems = res.data.data
            this.navItems.unshift({id:0, categoryName:'首页'});
          }).catch((error) => {
            this.$message.error(error.message);
          });
        },
        navClick() {
          this.$refs.u_nav.show();
        },
        handleIconClick() {
          if(this.$route.name=='m_home') {
            this.$router.push({ path: 'm_goodsList/1213800' });
          } else {
            this.$router.push({ path: '/m_index/m_goodsList/1213800' });
          }
        },
        user() {
          this.$router.push({ name: 'userInfo'})
        }
      }
    };
</script>

<style scoped>
  .head{
    background: #bdd576;
    line-height: 2rem;
    color: #ffffff;
    padding: .4rem;
    z-index:999;
    position: relative;
  }
  .title{
    text-align: center;
    font-size: 1rem;
  }
  .footerd{
    text-align: center;
    padding: 2rem 0 .4rem 0;
    color: #e4e4e4;
  }
  .footeres{
    position: fixed;
    bottom: 0;
  }
</style>
