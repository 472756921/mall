<template>
  <div>
    <el-row :gutter="8" v-for="(it, i) in itemData" class="ite" :key="i">
      <div @click="datie(it.id)">
        <el-col :xs="6" :sm="4" :md="4">
          <img :src="'http://118.31.38.219'+it.img.url" width="100%"/>
        </el-col>
        <el-col :span="18">
          <div class="prdName">{{it.name}}</div>
          <div class="pr"><span class="price">¥{{it.price}}</span></div>
        </el-col>
      </div>
    </el-row>
    <el-pagination small layout="prev, pager, next" style="text-align: center;margin-top: 10px;" :page-count="currentPages" @current-change="pageChange"></el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  import {categoryType, findProductFrom} from '../../../../interface';

    export default {
      name: 'm_goodListItem',
      data(){
        return {
          currentPages: 1,
          itemData: [],
        };
      },
      created() {
        this.getList(1);
      },
      methods: {
        datie(id) {
          this.$router.push({ path: '/m_index/m_good/'+id });
        },
        getList(page) {
          this.$ajax({
            method: 'get',
            url: categoryType() + '?page='+page+'&size=30&cateType='+this.$route.params.id,
          }).then((res) => {
            this.itemData = res.data.data.content;
            this.currentPages = res.data.data.totalPages;
          }).catch((error) => {
            this.$message.error(error.message);
          });
        },
        pageChange(page) {
          this.page = page;
          this.getList(page);
        },
      }
    };
</script>

<style scoped>
  .prdName{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .pr{
    padding: .4rem 0;
  }
  .price{
    color: red;
    font-size: 1rem;
  }
  .priceOr{
    color: #aaaaaa;
    font-size: .6rem;
    text-decoration: line-through;
  }
  .datai{
    color: #aaaaaa;
    font-size: .6rem;
  }
  .ite:nth-child(1){
    border-top: 1px solid #e4e4e4;
  }
  .ite{
    border-bottom: 1px solid #e4e4e4;
    padding: .4rem 0;
  }
</style>
