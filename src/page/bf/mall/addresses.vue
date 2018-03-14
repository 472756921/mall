<template>
  <div class="a_content">
    <div class="item">
      <h2>默认收货地址：</h2>
      <div class="name">{{addMD.userName}} 收</div>
      <div class="phone">{{addMD.userPhone}}</div>
      <div>{{addMD.address}}</div>
    </div>
    <br/>
    <div class="a_list" v-for="(it, i) in listData" :key="i">
      <i class="el-icon-delete" style="float: right" @click="del(it, i)"></i>
      <div class="name">{{it.userName}} 收</div>
      <div class="phone">{{it.userPhone}}</div>
      <div>{{it.address}}</div>
      <br/>
      <el-button type="primary"  @click="set(it)" size="mini">设为收货地址</el-button>
    </div>
    <div class="a_add" @click="dialogVisible=true">
      <i class="el-icon-plus"></i>
    </div>



    <el-dialog title="发货信息" :visible.sync="dialogVisible" width="90%" >
      <el-input v-model="userName" placeholder="收件人名字" size="mini"></el-input>
      <br/>
      <br/>
      <el-input v-model="userPhone" placeholder="收件人电话" size="mini"></el-input>
      <br/>
      <br/>
      <el-input v-model="address" placeholder="收件人地址" size="mini"></el-input>
      <br/>
      <br/>
      <el-button type="primary"  @click="send">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import {addressfindAll, on_default, receivingAddressAdd, receivingAddressdelete} from '../../../interface';

    export default {
      name: "addresses",
      data() {
        return {
          dialogVisible: false,
          userName: '',
          userPhone: '',
          address: '',
          addMD: '',
          listData: [],
        };
      },
      created() {
        this.getdata();
      },
      methods: {
        getdata() {
          this.$ajax({
            method: 'GET',
            url: addressfindAll(),
          }).then((res) => {
            this.listData =  res.data.data;
            this.listData.map(it => {
              if (it.status == 1) {
                this.addMD = it;
              }
            })
          }).catch((error) => {
            this.$message.error(error.message);
          });
        },
        send() {
          if(this.userName == '' || this.userPhone == '' || this.address == '') {
            this.$message.error('请完整填写收货地址');
            return false
          }
          this.dialogVisible = false;

          this.$ajax({
            method: 'post',
            url: receivingAddressAdd(),
            data: {userName: this.userName, userPhone: this.userPhone, address: this.address},
          }).then((res) => {
            this.$message.success('添加成功');
            this.getdata();
          }).catch((error) => {
            this.$message.error(error.message);
          });

        },
        del(it, i) {
          if(it.status == 1) {
            this.$message.warning('您不能删除默认地址');
            return false;
          }
          let confim = confirm('您确定删除该条地址？');
          if (confim) {
            this.$ajax({
              method: 'GET',
              url: receivingAddressdelete()+"?addressId="+it.id,
            }).then((res) => {
              this.listData.splice(i, 1);
            }).catch((error) => {
              this.$message.error(error.message);
            });
          }
        },
        set(it) {
          let confim = confirm('您确定设置该条地址为收货地址？');
          if (confim) {
            this.addMD = it;
            this.$ajax({
              method: 'GET',
              url: on_default() + it.id,
            }).then((res) => {
              this.$router.push({name:'m_pay', params:{prs:this.$route.params.d.prs, total: this.$route.params.d.total}});
            }).catch((error) => {
              this.$message.error(error.message);
            });
          }
        },
      },
    }
</script>

<style scoped>
  .a_content{
    padding: .4rem;
  }
  .item{
    padding: .6rem;
    overflow: auto;
    border: 6px dashed #E6A23C;
    font-size: .6rem;
    margin: .2rem 0;
  }
  .item .name{
    font-size: 1rem;
    color: orangered;
  }
  .a_list{
    padding: .6rem;
    overflow: auto;
    border: 2px dashed #eee;
    font-size: .6rem;
    margin: .2rem 0;
    color: #aaa;
  }
  .a_add{
    padding: .6rem;
    margin: .2rem 0;
    border: 2px dashed #eee;
    overflow: auto;
    text-align: center;
  }
  .a_add i{
    font-size: 2rem;
    color: #ccc;
  }
</style>
