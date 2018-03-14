<template>
  <div style="padding: .4rem">
    <div class="title" v-if="listData==''">购物车还是空的，赶紧去采购吧</div>
    <div class="title" v-if="listData==''"><a href="#/m_index/home" class="a">去首页</a></div>
    <el-row :gutter="10" v-for="(it, i) in listData" :key="i" style="border-bottom: 1px solid #e0e0e0;padding-top: .6rem">
      <el-col :span="6"><img :src="'http://118.31.38.219'+it.img" width="100%"/></el-col>
      <el-col :span="14">
        <div class="name">{{it.name}}</div>
        <div class="danger" style="float:left;text-align: left; color: red;margin-top: .8rem">¥{{it.price}}</div>
        <div class="danger" style="float:right;margin-top: .8rem;color: #aaa">3件</div>
      </el-col>
      <el-col :span="4" style="text-align: center;"><i class="danger el-icon-delete" style="font-size: 1.4rem;line-height: 3.6rem; color: red" @click="del(i, it.id)"></i></el-col>
    </el-row>

    <el-row class="con">
      <el-col :span="10"><div class="contol">¥{{total}}</div></el-col>
      <el-col :span="14">
        <div class="payBtn" @click="pay">去付款</div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import {cartList, cardelById, createorder} from '../../../../interface';

  export default {
    name: 'm_car',
    data(){
      return {
        listData: [],
        total: '',
      };
    },
    created() {

    },
    mounted() {
      this.getTotle();
      this.getList();
    },
    methods: {
      pay() {
        if(this.total == 0 || this.listData=='') {
          this.$message.error('客官，您的购物车是空的');
          return false;
        }
        this.$router.push({name:'m_pay', params:{prs:this.listData, total: this.total}});
      },
      getList() {
        this.$ajax({
          method: 'get',
          url: cartList(),
        }).then((res) => {
          if(res.data!='') {
            this.listData = res.data.data.list;
            this.listData.map( it => {
              it.productQuantity = 1;
            })
            this.total = res.data.data.total;
          }
        }).catch((error) => {
          this.$message.error(error.message);
        });
      },
      del(i, id){
        const va = confirm('确认将该商品移出购物车？');
        if (va) {
          this.$ajax({
            method: 'get',
            url: cardelById() + "?proId=" + id,
          }).then((res) => {
            this.$message.success('移除成功');
            this.listData.splice(i,1);
            this.getTotle();
          }).catch((error) => {
            this.$message.error(error.message);
          });
        }
      },
      getTotle() {
        let totle = 0;
        this.listData.map((it, i) => {
          totle += it.price;
        });
        this.total = totle;
      },
    },
  };
</script>

<style scoped>
  .items{
    padding: .4rem;
  }
  .a{
    color: #1D8CE0;
  }
  .title{
    text-align: center;
    color: #cccccc;
    padding: .4rem;
  }
  .contol{
    line-height: 3.6rem;
    font-size: 1.6rem;
    text-align: center;
    width: calc(100% - 1rem);
    color: #ff3232;
  }
  .con{
    position: fixed;
    width: 100%;
    border-top: 1px solid #ccc;
    left: 0;
    bottom: 0rem;
  }
  .payBtn{
    background: #ff3232;
    width: calc(100% - 2rem);
    color: #ffffff;
    padding: 1rem;
    text-align: center;
    height: 1.6rem;
  }
  .name{
    text-overflow: -o-ellipsis-lastline;
    font-size: .8rem;
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>
