<template>
    <div style="padding: 0 .4rem;">
      <div v-if="goodsItemData.itemTitle=='热销'">
        <el-row style="width: 100%;margin: 0;">
          <el-col :span="12" v-for="(it, i) in goodsItemData.goods" :key="i" v-if="i<=3">
            <div class="bg-purple" @click="good_datile(it.id)" style="overflow: auto;padding: .4rem">
              <img :src="'http://118.31.38.219'+it.img.url" width="50%" style="float: right"/>
              <div style="font-size: 1rem;padding: 1rem 0">{{it.name.substring(0, 5)}}</div>
              <div style="font-size: .8rem;color: red">￥{{it.price}}</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div v-if="goodsItemData.itemTitle!='热销'">
        <h4 class="item">{{goodsItemData.itemTitle}}</h4>
        <el-row :gutter="10" style="width: 100%;margin: 0">
          <el-col :span="6" v-for="(it, i) in goodsItemData.goods" :key="i">
            <div class="bg-purple" @click="good_datile(it.id)">
              <img :src="'http://118.31.38.219'+it.img.url" width="100%"/>
              <div style="text-align: center;font-size: .8rem">{{it.name.substring(0, 6)}}</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      props: ['goodsItemData'],
      name: 'm_index_item',
      methods: {
        good_datile(id){
          this.$router.push({ path: 'm_good/'+id });
        },
      },
    };
</script>

<style scoped>
.item{
  padding: .6rem 0;
  margin: 0;
  color: #ff3232;
  font-size: .9rem;
}
  .bg-purple{
    color: #666;
  }
</style>
