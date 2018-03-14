<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="productName" label="名称" > </el-table-column>
      <el-table-column prop="createTime" label="上架日期" > </el-table-column>
      <el-table-column prop="categoryType" label="分类"> </el-table-column>
      <el-table-column prop="price" label="优惠价"> </el-table-column>
      <el-table-column prop="priceOr" label="原价"> </el-table-column>
      <el-table-column prop="status" label="状态" :formatter = 'formatter'> </el-table-column>
      <el-table-column prop="tag" label="标签">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.promotion==0">促销</el-tag>
          <el-tag type="warning" v-if="scope.row.isNew==0">新品</el-tag>
          <el-tag type="danger" v-if="scope.row.hot==0">热卖</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="tag" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini"  @click="edit(scope.row)">编辑</el-button>
          <el-button type="warning" size="mini" v-if="scope.row.status==0" @click="off(0, scope.row.id)">下架</el-button>
          <el-button type="success" size="mini" v-if="scope.row.status==1" @click="off(1, scope.row.id)">上架</el-button>
          <el-button type="danger" size="mini"  v-if="scope.row.status==1">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination small layout="prev, pager, next" style="text-align: center;margin-top: 10px" :page-count="currentPages" @current-change="pageChange"></el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  import {productlist, off_sale, on_sale} from '../../interface';

  export default {
    name: 'mallIndex',
    data(){
      return {
        page: '',
        currentPages: 3,
        over: false,
        tableData: [],
      }
    },
    created() {
      this.getList(1);
    },
    methods:{
      off(type, id) {
        let url = on_sale();
        if (type == 0) {
          url = off_sale();
        }
        this.$ajax({
          method: 'get',
          url: url+'?productId=' + id,
        }).then((res) => {
          this.$message.success('操作成功');
          this.getList(1);
        }).catch((error) => {
          this.$message.error(error.message);
        });
      },
      formatter(row, column) {
        if (row.status === 1) {
          return '未上架';
        } else if (row.status === 0){
          return '上架中';
        }
      },
      getList(page) {
        this.$ajax({
          method: 'GET',
          url: productlist() + '?page='+page+'&size=30&type=1',
        }).then((res) => {
          this.tableData =  res.data.data.productInfoPage.content;
          this.currentPages = res.data.data.currentPage;
        }).catch((error) => {
          this.$message.error(error.message);
        });
      },
      edit(data) {
        this.$router.push({name: 'editGodds', params:{data: data}});
      },
      pageChange(page) {
        this.page = page;
        this.getList(page);
      },
    },
  };
</script>

<style scoped>

</style>
