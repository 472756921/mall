<template>
    <div style="padding: 0 .4rem">
      <h4 style="margin: .6rem 0">当前分类：{{className}}</h4>
      <m_goodListItem></m_goodListItem>
    </div>
</template>

<script type="text/ecmascript-6">
  import m_goodListItem from './m_goodListItem';

  export default {
    name: 'm_goodsList',
    components: { m_goodListItem },
    data(){
      return {
        goodID: '',
        className: '',
      }
    },
    created() {
      this.className = this.$route.query.name;

      console.log(this.className);

      this.goodID = this.$route.params.id;
      if( this.goodID == '1213800' ){
        this.className = '自定义搜索';
      }
    },
  };
</script>

<style scoped>

</style>
