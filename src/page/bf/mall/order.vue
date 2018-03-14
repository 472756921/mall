<template>
  <div class="order">
    <div class="items" v-for="(it, i) in datas" :key="i">
      <div class="onum">订单号：{{it.orderId}}<span class="date">{{it.createTime}}</span></div>
      <el-row style="padding-bottom: 1rem" v-for="(itt, ii) in it.orderVOs" :key="ii">
        <el-col :span="4"><img :src="itt.productIcon" width="100%"/></el-col>
        <el-col :span="20"><div class="pname">{{itt.productName}}</div></el-col>
        <el-col :span="20" :offset="4"><div class="pinfo"><span class="price">￥{{itt.productPrice}}</span><span class="pnum">{{itt.productQuantity}}件</span></div></el-col>
      </el-row>
      <div class="totle">
        <span class="send" v-if="it.status==1">已发货, {{it.commpany}}（单号：{{it.expressNo}}）</span>
        <span class="nosend" v-if="it.status==0">未发货</span>
        <span>合计：￥{{it.orderAmount}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {customerlist} from '../../../interface';

    export default {
      name: "order",
      data() {
        return {
          datas: [],
        };
      },
      created() {
        this.getData(1);
      },
      methods: {
        getData(page) {
          this.$ajax({
            method: 'GET',
            url: customerlist()+"?type=1&page=" + page + '&size=50',
          }).then((res) => {
            this.datas =  res.data.data;
          }).catch((error) => {
            this.$message.error(error.message);
          });
        },
      },
    }
</script>

<style scoped>
  .order .items{
    text-align: left;
    padding: .8rem .4rem;
    margin: .4rem;
    border: 1px solid #eee;
    border-radius: 6px;
  }
  .order .pname{
    font-size: .8rem;
    color: #999;
  }
  .order .items .onum{
    font-size: .6rem;
    color: #999;
  }
  .order .items .pinfo{
    font-size: .8rem;
    color: #aaaaaa;
  }
  .pinfo .price{
    float: left;
  }
  .pinfo .pnum{
    float: right;
  }
  .items .totle{
    font-size: .8rem;
    color: #666;
    text-align: right;
  }
  .send{
    color: #bdd576;
    float: left;
  }
  .nosend {
    color: red;
    float: left;
  }
  .items .date{
    font-size: .6rem;
    color: #aaa;
    float: right;
  }
</style>
