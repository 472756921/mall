<template>
  <div style="padding: .4rem">
    <div class="item">
      <div class="name">{{data.userName}} 收</div>
      <div class="phone">{{data.userPhone}}</div>
      <br/>
      <div style="font-size: .8rem;">{{data.address}}</div>
      <el-button type="primary" size="mini" style="float: right" @click="changeAddress">切换</el-button>
    </div>
    <el-row :gutter="10" v-for="(it, i) in listData" :key="i" style="border-bottom: 1px solid #e0e0e0; margin-top: 1rem;">
      <el-col :span="6"><img :src="'http://118.31.38.219'+it.img" width="100%"/></el-col>
      <el-col :span="18">
        <div class="pname">{{it.name}}</div>
        <div class="danger" style="text-align: left;float: left">¥{{it.price}}</div>
        <div class="danger" style="float: right;margin-top: .8rem;font-size: .8rem; color: #999">数量：{{it.productQuantity}}</div>
      </el-col>
    </el-row>

    <el-row class="con">
      <el-col :span="10"><div class="contol">¥{{total}}</div></el-col>
      <el-col :span="14">
        <div class="payBtn" @click="pay">支付</div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import {addressfindAll, createorder} from '../../../../interface';

  export default {
    name: 'm_pay',
    data(){
      return {
        listData: [],
        total: '',
        data: '',
      };
    },
    created() {
      this.getdata();
      if(this.$route.params.prs == undefined) {
        this.$router.push({path:'home'});
      }
      this.listData = this.$route.params.prs;
      this.total = this.$route.params.total;
    },
    methods: {
      del(){
        const va = confirm('确认删除该商品？');
        if (va) {
        }
      },
      changeAddress() {
        this.$router.push({name:'addresses', params:{d:this.$route.params}});
      },
      pay() {
        let data = this.listData.map( it => {
          return {id: it.id, productQuantity: it.productQuantity};
        })
        if(this.data.address=='未添加'){
          this.$message.warning('请选择收货地址');
          return false;
        }
        this.$ajax({
          method: 'POST',
          data:{ "address": this.data.address, "name": this.data.userName, "phone": this.data.userPhone, "items":data },
          url: createorder(),
        }).then((res) => {
          if (typeof window.WeixinJSBridge === 'undefined') {
            if (document.addEventListener) {
              document.addEventListener('window.WeixinJSBridgeReady',this.onBridgeReady, false);
            } else if (document.attachEvent) {
              document.attachEvent('window.WeixinJSBridgeReady', this.onBridgeReady);
              document.attachEvent('window.onWeixinJSBridgeReady', this.onBridgeReady);
            }
          } else {
            this.onBridgeReady(res.data.data.appId, res.data.data.nonceStr,res.data.data.packAge, res.data.data.paySign, res.data.data.timeStamp);
          }
        }).catch((error) => {
          this.$message.error(error.message);
        });
      },
      getdata() {
        this.$ajax({
          method: 'GET',
          url: addressfindAll(),
        }).then((res) => {
          this.data = {userName: '未添加',userPhone: '未添加',address: '未添加'};
          res.data.data.map(it => {
            if (it.status == 1) {
              this.data = it;
            }
          })
        }).catch((error) => {
          this.$message.error(error.message);
        });
      },
      onBridgeReady(appIdV, nonceStrV, prepayIdV, paySignV, timeStampV) {
        window.WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            'appId': appIdV,
            'timeStamp': timeStampV.toString(),
            'nonceStr': nonceStrV,
            'package':  prepayIdV,
            'signType': 'MD5',
            'paySign': paySignV,
          },
          (res) => {
            if (res.err_msg == 'get_brand_wcpay_request:ok') {
              this.$Message.success('充值成功');
              setTimeout(()=>{this.$router.push({name: 'home'});}, 1000)
            }
          }
        );
      },
    },
  };
</script>

<style scoped>
  .a{
    color: #1D8CE0;
  }
  .title{
    text-align: center;
    color: #cccccc;
    padding: .4rem;
  }
  .contol{
    line-height: 3rem;
    font-size: 1.2rem;
    color: red;
    text-align: center;
    width: calc(100% - 1rem);
  }
  .con{
    position: fixed;
    width: 100%;
    border-top: 1px solid #ccc;
    left: 0;
    bottom: 0;
  }
  .payBtn{
    background: #FF4949;
    width: calc(100% - 2rem);
    color: #ffffff;
    padding: 1rem;
    text-align: center;
  }
  .name{
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-weight: 600;
    font-size: .8rem;
    float: left;
  }
  .phone{
    font-size: .8rem;
    color: #aaaaaa;
    float: right;
  }
  .item{
    padding: .6rem;
    border-radius: 8px;
    overflow: auto;
    border: 1px solid #eee;
    box-shadow: 0 0 10px #ccc;
    margin: .2rem 0;
  }
  .pname{
    font-size: .8rem;
    margin-bottom: .6rem;
  }
  .danger{
    color: red;
  }
</style>
