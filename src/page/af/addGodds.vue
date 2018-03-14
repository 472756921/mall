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
      <el-col :span="4">
        <el-select v-model="good.categoryType" placeholder="请选择分类" size="small">
          <el-option :value="it.id" :key="i" v-for="(it, i) in itemsList" :label="it.categoryName">{{it.categoryName}}</el-option>
        </el-select>
      </el-col>
      <el-col :span="24">
        <div class="">
          <el-checkbox v-model="good.isNew">新品</el-checkbox>
          <el-checkbox v-model="good.hot">热卖</el-checkbox>
          <el-checkbox v-model="good.promotion" @change="checkOr">促销</el-checkbox>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="">
          <div>商品封面图片</div>
          <el-upload
            class="avatar-uploader"
            :action="uploadImgs()"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="good.productIcon" :src="good.productIcon" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-col>
      <el-col :span="24">
        <div>商品轮播展示图片</div>
        <el-upload
          class="upload-demo"
          :action="uploadImgs()"
          :on-success="handleAvatarSuccess2"
          :before-upload="beforeAvatarUpload"
          :file-list="good.imgs"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
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
  import {productsave, productlistType, uploadImg} from '../../interface';

    export default {
      name: 'addGodds',
      data(){
        return {
          itemsList: '',
          good: {
            brand: '',
            productIcon: '',
            priceOr: '',
            price: '',
            categoryType: '',
            productName: '',
            productDescription: '',
            isNew: '',
            hot: '',
            img: '',
            imgs: [],
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
      },
      methods: {
        checkOr() {
          if (this.good.promotion == true) {
            if (this.good.price == '') {
              this.$message.error('设置优惠价格后才能选择促销');
              this.good.promotion = false;
            }
          };
        },
        uploadImgs() {
          return uploadImg();
        },
        handleAvatarSuccess(res, file) {
          this.productIcon =  'http://118.31.38.219' + res.data.url;
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
          if(this.good.isNew == true) {
            this.good.isNew = 0;
          } else {
            this.good.isNew = 1;
          }
          if(this.good.hot == true) {
            this.good.hot = 0;
          } else {
            this.good.hot = 1;
          }
          if(this.good.promotion == true) {
            this.good.promotion = 0;
          } else {
            this.good.promotion = 1;
          }
          this.$ajax({
            method: 'post',
            url: productsave(),
            data: this.good,
          }).then((res) => {
            this.$message.success('添加成功');
          }).catch((error) => {
            this.$message.error(error.message);
          });
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
