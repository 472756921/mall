<template>
    <div>
      <carousel :imgdata="imgdata"></carousel>
      <m_index_item v-for="(it,i) in goodsItemData" :goodsItemData="it" :key="i"></m_index_item>
    </div>
</template>

<script type="text/ecmascript-6">
  import carousel from './carousel';
  import m_index_item from './m_index_item';
  import {findAll, indePr} from "../../../../interface";

    export default {
      name: 'm_home',
      components:{ carousel, m_index_item },
      data() {
        return {
          imgdata: ['static/p1.jpg','static/p2.jpg','static/p3.jpg'],
          goodsItemData: [],
        }
      },
      created() {
        this.$ajax({
          method: 'GET',
          url: findAll(),
        }).then((res) => {
          this.imgdata =  res.data.data;
        }).catch((error) => {
          this.$message.error(error.message);
        });
        this.$ajax({
          method: 'GET',
          url: indePr() ,
        }).then((res) => {
          this.goodsItemData =  res.data.data;
        }).catch((error) => {
          this.$message.error(error.message);
        });
      },
    };
</script>

<style scoped>

</style>
