<template>
  <div style="margin-bottom: 8rem">
    <el-carousel height="20rem" arrow="never">
      <el-carousel-item v-for="item in goodDatile.imgs" :key="item.id">
        <img :src="'http://118.31.38.219'+item.url" width="100%"/>
      </el-carousel-item>
    </el-carousel>
    <div class="datile">
      <h3 style="margin: .2rem 0;border-bottom: 1px solid #eee;padding-bottom: .6rem">{{goodDatile.productName}}</h3>
      <div style="padding-top: .4rem">
        <span class="price">¥{{goodDatile.price}} </span>
        <span class="priceOr"  v-if="goodDatile.priceOr!=null"> ¥{{goodDatile.priceOr}}</span>
      </div>
      <el-tag type="primary" v-show="goodDatile.isNew == 0">新品</el-tag>
      <el-tag type="danger" v-show="goodDatile.hot == 0">热卖</el-tag>
      <el-tag type="warning" v-show="goodDatile.promotion == 0">促销</el-tag>
    </div>

    <el-tabs v-model="activeName" style="padding: .4rem">
      <el-tab-pane label="商品详情" name="first">
        <span style="font-size: .8rem; color: #999">
          {{goodDatile.productDescription}}
        </span>
      </el-tab-pane>
      <el-tab-pane label="用户评价" name="second">
        <div v-for="(it, i) in cp" :key="i" style="background: #f2f2f2;padding: .4rem;margin-bottom: .4rem">
          <div>{{it.content}}</div>
          <div style="font-size: .8rem; color: #999">{{it.createDate}}</div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <div class="option">
      <el-row>
        <el-col :span="12" style="background: #bdd576;text-align: center;"><div @click="buyNow">立即购买</div></el-col>
        <el-col :span="12" style="background: #FF4949;text-align: center;"><div @click="joinCar">加入购物车</div></el-col>
      </el-row>
    </div>

    <div class="pridInfo" v-if="pridInfo">
      <i class="el-icon-close" style="float: right;" @click="close"></i>
      <h4>请选择购买数量</h4>
      <el-input-number size="small" v-model="num6" :min="1" :max="10"></el-input-number>
      <div class="btn" @click="pay">确认</div>
    </div>
    <div class="over" v-if="pridInfo"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import carousel from '../home/carousel';
  import {detail, findProductFrom, shopping} from '../../../../interface';
  export default {
    name: 'm_good',
    data() {
      return {
        way: '',   //0购买  1加入购物车
        pridInfo: false,
        activeName: 'first',
        goodID: '',
        num6: 1,
        goodDatile: {},
        cp: [],
      };
    },
    created() {
      this.goodID = this.$route.params.id;
      this.getdata();
      this.getList();
    },
    methods: {
      addcar() {
        this.$ajax({
          method: 'get',
          url: shopping()+"?proId="+this.goodDatile.id+"&amount="+this.num6,
        }).then((res) => {
          this.$message.success('添加成功');
          this.pridInfo = false;
        }).catch((error) => {
          this.$message.error(error.message);
        });
      },
      getList() {
        this.$ajax({
          method: 'get',
          url: findProductFrom() +  this.goodID,
        }).then((res) => {
          this.cp = res.data.data.data;
        }).catch((error) => {
          this.$message.error(error.message);
        });
      },
      getdata() {
        this.$ajax({
          method: 'get',
          url: detail() + this.goodID,
        }).then((res) => {
          this.goodDatile = res.data.data;
        }).catch((error) => {
          this.$message.error(error.message);
        });
      },
      kefu() {
        this.$message.warning('请在微信聊天框中直接输入您的问题！');
      },
      buyNow() {
        this.pridInfo = true;
        this.way = 0;
      },
      pay() {
        if(this.way == 0) {
          const data = [{img: this.goodDatile.productIcon.url, name: this.goodDatile.productName, price: this.goodDatile.price, productQuantity: this.num6, id: this.goodDatile.id}];
          this.$router.push({name:'m_pay', params:{prs:data, total: this.num6 * this.goodDatile.price}});
        } else if( this.way == 1) {
          this.addcar();
        }
      },
      joinCar() {
        this.pridInfo = true;
        this.way = 1;
      },
      close() {
        this.pridInfo = false;
      },
    },
  };
</script>

<style scoped>
  .datile{
    padding: .4rem;
    text-align: left;
  }
  .price{
    color: red;
    font-size: 1.2rem;
  }
  .priceOr{
    color: #999;
    text-decoration: line-through;
    font-size: .8rem;
  }
  .option{
    position: fixed;
    bottom: 0rem;
    width: 100%;
    color: #ffffff;
    height: 3.4rem;
    line-height: 3.4rem;
    z-index: 10;
  }
  .pridInfo{
    width: calc(100% - .8rem);
    background: #fff;
    position: fixed;
    padding: .4rem .4rem 1rem .4rem;
    bottom: 3rem;
    z-index: 3;
  }
  .btn{
    width:100%;
    margin-top: 3rem;
    background: red;
    color: #ffffff;
    text-align: center;
    font-size: 1.1rem;
    padding: .6rem 0;
  }
  .over{
    position: fixed;
    z-index: 2;
    background: #666;
    opacity: .7;
    width: 100%;
    height: 100%;
    top: 0;
  }
</style>
