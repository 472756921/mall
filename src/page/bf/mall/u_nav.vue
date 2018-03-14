<template>
    <div class="transition-box">
      <span v-for="i in itemData" :key='i.id' class="item" @click="list(i.id, i.categoryName)">{{i.categoryName}}</span>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: 'u_nav',
      props: ['itemData'],
      data(){
        return {
          show3: false,
        }
      },
      methods: {
        list(item, name) {
          if (item == 0){
            this.$router.push({ name: 'm_home' });
          } else {
            if(this.$route.name=='m_home') {
              this.$router.push({ path: 'm_goodsList/'+item, query: {name: name} });
            } else {
              this.$router.push({ path: '/m_index/m_goodsList/'+item, query: {name: name}  });
              window.location.reload();
            }
          }
        }
      },
    };
</script>

<style scoped>
  .transition-box {
    background-color: #d8f387;
    color: #666;
    padding: .6rem;
    position: relative;
    z-index:120;
    font-size: .8rem;
  }
  .item{
    padding: 0 .2rem;
  }
</style>
