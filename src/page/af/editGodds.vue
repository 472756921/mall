<template>
  <div style="padding: 1em;overflow: auto;line-height: 4rem">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="">
          <el-input v-model="good.productName" placeholder="请输入商品名" size="small"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="">
          <el-input v-model="good.priceOr" placeholder="请输入价格" size="small"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="">
          <el-input v-model="good.price" placeholder="优惠价格（不填写则无优惠）" size="small"></el-input>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="">
          <el-checkbox v-model="good.isNew == 0">新品</el-checkbox>
          <el-checkbox v-model="good.hot == 0">热卖</el-checkbox>
          <el-checkbox v-model="good.promotion == 0" @change="checkOr">促销</el-checkbox>
        </div>
      </el-col>

      <el-col :span="4">
        <el-select v-model="good.categoryType" placeholder="请选择" size="small">
          <el-option :value="it.id" :key="i" v-for="(it, i) in itemsList" :label="it.categoryName">{{it.categoryName}}</el-option>
        </el-select>
      </el-col>

      <el-col :span="6">
        <div class="">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入商品介绍内容" v-model="good.productDescription"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-button type="success" @click="save">保存</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  import {productsave, productlistType, uploadImg, detail} from '../../interface';

    export default {
      name: 'addGodds',
      data(){
        return {
          itemsList: '',
          good: {
            categoryType: '',
            brand: '',
            priceOr: '',
            price: '',
            productName: '',
            productDescription: '',
            isNew: '',
            hot: '',
            promotion: '',
          },
        }
      },
      created() {
        this.$ajax({
          method: 'GET',
          url: productlistType(),
        }).then((res) => {
          this.itemsList =  res.data.data;
        }).catch((error) => {
          this.$message.error(error.message);
        });
        console.log(this.$route);
        let data = this.$route.params.data;
        if(data == undefined) {
          this.$router.go(-1);
          return false;
        }
        this.good = data;
        this.getdata();
      },
      methods: {
        getdata() {
          this.$ajax({
            method: 'get',
            url: detail() + this.good.id,
          }).then((res) => {
            this.good = res.data.data;
          }).catch((error) => {
            this.$message.error(error.message);
          });
        },
        checkOr() {
          if (this.good.promotion == true) {
            if (this.good.price == '') {
              this.$message.error('设置优惠价格后才能选择促销');
              this.good.promotion = false;
            }
          };
        },
        handleAvatarSuccess(res, file) {
          this.img =  'http://118.31.38.219' + res.data.url;
          this.good.img = res.data.id;
        },
        handleAvatarSuccess2(res, file) {
          this.good.imgs.push(res.data.id);
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },
        save() {
          this.$ajax({
            method: 'post',
            data: this.good,
            url: productsave(),
          }).then((res) => {
            if(res.data.data == 1) {
              this.$message.success('保存成功');
            }
          }).catch((error) => {
            this.$message.error(error.message);
          });
        },
        uploadImgs() {
          return uploadImg();
        },
      }
    };
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
