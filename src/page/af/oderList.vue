<template>
  <div>
    <div style="padding: .4rem;overflow: auto">
      <el-radio v-model="radio" label="1">所有订单</el-radio>
      <el-radio v-model="radio" label="3">已发货</el-radio>
      <el-radio v-model="radio" label="2">未发货</el-radio>
    </div>
    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="userName" label="用户" ></el-table-column>
      <el-table-column prop="phone" label="用户电话" ></el-table-column>
      <el-table-column prop="orderId" label="订单号" ></el-table-column>
      <el-table-column prop="status" label="状态" >
        <template slot-scope="scope">
          <span class="success" v-if="scope.row.status==1">已发货</span>
          <span class="danger" v-if="scope.row.status==0">未发货</span>
        </template>
      </el-table-column>
      <el-table-column prop="orderAmount" label="金额" ></el-table-column>
      <el-table-column prop="expressNo" label="快递单号" ></el-table-column>
      <el-table-column prop="commpany" label="快递公司" ></el-table-column>
      <el-table-column prop="createTime" label="时间" ></el-table-column>
      <el-table-column prop="address" label="地址" ></el-table-column>
      <el-table-column prop="tag" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" v-if="scope.row.status==0"  @click="getsendCon(scope.row.orderId)">发货</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="发货信息" :visible.sync="dialogVisible" width="30%" >
      <el-select v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <br/>
      <br/>
      <el-input v-model="sendNum" placeholder="请输快递单号"></el-input>
      <br/>
      <br/>
      <el-button type="primary"  @click="send">确 定</el-button>
    </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
  import {orderList, expressController} from '../../interface';

  export default {
    name: 'oderList',
    data(){
      return {
        dialogVisible: false,
        oid: '',
        radio: '1',
        value: '',
        sendNum: '',
        currentPages: 1,
        options: [
        {
          value: '圆通',
          label: '圆通'
        }, {
          value: '中通',
          label: '中通'
        }, {
          value: '申通',
          label: '申通'
        }, {
          value: '韵达',
          label: '韵达'
        }, {
          value: '顺丰',
          label: '顺丰'
        }, {
          value: '邮政',
          label: '邮政'
        }, {
          value: '其他',
          label: '其他'
        }],
        tableData: [],
      }
    },
    watch: {
      radio: function(a,d){
        this.getlist(1);
      },
    },
    created() {
      this.getlist(1);
    },
    methods: {
      getsendCon(id) {
        this.dialogVisible = true
        this.oid = id;
      },
      getlist(page) {
        this.$ajax({
          method: 'GET',
          url: orderList()+"?type=" + this.radio + "&page=" + page + '&size=30',
        }).then((res) => {
          this.tableData =  res.data.data;
        }).catch((error) => {
          this.$message.error(error.message);
        });
      },
      tableRowClassName({row, rowIndex}) {
        if(row.status == 0) {
          return 'warning-row'
        }
      },
      pageChange(page) {
        this.getlist(page);
      },
      send() {
        if (this.value == '' || this.sendNum == '') {
          this.$message.error('请完整填写快递信息');
          return false;
        }
        let con = confirm('确认发货？');
        if (con) {
          this.$ajax({
            method: 'post',
            data: {
              "company": this.value,
              "expressNo": this.sendNum,
              "orderId": this.oid,
            },
            url: expressController(),
          }).then((res) => {
            this.$message.success('设置成功');
            window.location.reload();
          }).catch((error) => {
            this.$message.error(error.message);
          });
        }
      },
    },
  };
</script>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
<style scoped>

</style>
