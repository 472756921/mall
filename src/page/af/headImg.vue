<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="img" label="图片">
        <template slot-scope="scope">
          <img :src="'http://118.31.38.219'+scope.row.url" width="100" style="padding: .4rem 0 0 0"/>
        </template>
      </el-table-column>
      <el-table-column prop="tag" label="操作">
        <template slot-scope="scope">
          <el-button type="warning" size="small" @click="del(scope.$index,scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="bo">
      <h4>上传轮播图片</h4>
      <el-upload
        class="avatar-uploader"
        :action="uploadImgs()"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="newImg" :src="newImg" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {findAll, uploadImg, fimgadd, fimgdelete} from "../../interface";
  export default {
    name: 'headImg',
    data(){
      return {
        newImg: '',
        imageId: '',
        tableData: [],
      }
    },
    created() {
      this.getList();
    },
    methods:{
      uploadImgs() {
        return uploadImg();
      },
      getList() {
        this.$ajax({
          method: 'GET',
          url: findAll(),
        }).then((res) => {
          this.tableData =  res.data.data;
        }).catch((error) => {
          this.$message.error(error.message);
        });
      },
      del(index, id) {
        let info = confirm('您确认要删除该图片？');
        if(info) {
          this.$ajax({
            method: 'get',
            url: fimgdelete()+id,
          }).then((res) => {
            this.$message.success('成功');
            this.tableData.splice(index, 1);
          }).catch((error) => {
            this.$message.error(error.message);
          });
        }
      },
      handleAvatarSuccess(res, file) {
        this.imageId = res.data.id;
        this.$ajax({
          method: 'post',
          data: {imageId: res.data.id},
          url: fimgadd(),
        }).then((res) => {
          this.$message.success('上传成功');
          this.tableData.push({img: res.data.data.url});
          window.location.reload();
        }).catch((error) => {
          this.$message.error(error.message);
        });
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
      }
    },
  };
</script>

<style scoped>
  .bo{
    margin: .4rem;
  }
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
    border: 1px dashed #d9d9d9;
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
