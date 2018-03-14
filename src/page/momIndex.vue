<template>
  <div class="messageContent" ref="meContent" v-loading="loading">
    <div style="height: 50px;" ref="meTop">
      <el-row >
        <el-col :span="8">
          <img :src="baby.icon" width="50" height="50" style="padding: 0 .4rem 0 0;float: left"/>
          <span style="font-size: 1rem;">{{baby.childrenName}}</span>
          <br/>
          <span style="font-size: .6rem">{{baby.age}}</span>
        </el-col>
        <el-col :span="8">
          <div style="text-align: center">{{baby.name}}</div>
          <div style="font-size: .8rem;text-align: center">{{baby.position}}</div>
        </el-col>
        <el-col :span="8">
          <el-tag type="warning" style="float: right" v-if="baby.status == 2">已完成</el-tag>
          <el-tag type="success" style="float: right" v-if="baby.status == 1">进行中</el-tag>
        </el-col>
      </el-row>
    </div>

    <div class="box" id="boxc" ref="meBox">
      <div :class='it.userType!=userType?"user tolk":"doc tolk"' v-for="(it, i) in tolk">
        <div v-if="it.userType==1" style="font-size: .8rem;color:red">助手：</div>
        <div v-if="it.userType==2" style="font-size: .8rem;color:red">医生：</div>
        <div v-if="it.userType==null" style="font-size: .8rem;color:red">患者：</div>
        <div class='content'>{{it.content}}</div>
        <img :src="it.pic" @click="picBig(it.pic)" width="100%"/>
        <div class='date'>{{it.addTime}}</div>
      </div>

    </div>
    <div class="message" ref="meFooter" style="height:140px;">
      <el-row>
        <el-col :span="19">
          <textarea placeholder="输入回复内容" v-model="smag" :rows="6"></textarea>
        </el-col>
        <el-col :span="5">
          <el-button @click="send" class="send" size="medium">发送</el-button>
          <br/>
          <br/>
          <el-button class="sendpic" style="position: absolute;" >图片</el-button>
          <input type="file" name="file" value="图片" @change="imgChange" id="fileElem"/>
        </el-col>
      </el-row>
      <el-button @click="over" class="end" style="width: 100%">结束问答</el-button>
    </div>
    <div class="picBig" @click="picSmall" v-show="isShow">
      <div class="picBor">
        <img class="pic" :src="picture"  alt="">
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        userType: '',
        smag: '',
        doctorConsultId: '',
        doctorId: '',
        pagenow: '',
        pageTotal: '',
        tolk: '',
        type: 1,
        loading: true,
        obj: {
          data: "",
          fileType: "",
          id: '',
          norImageUrl: "",
          originalName: ""
        },
        baby: '',
        isShow:false,
        picture:''
      }
    },
    mounted () {
      this.doctorConsultId = this.$route.query.doctorConsultId;
      this.id = this.$route.query.id;
      this.userType = this.$route.query.userType;
      if(this.doctorConsultId == undefined || this.id == undefined || this.userType == undefined) {
        alert('有错误，请联系管理员')
        return false;
      }
      this.getData();
      this.getuserData();
      this.setHeight();
    },
    methods: {
      getuserData() {
        this.$ajax({
          method: 'get',
          url: 'http://118.31.38.219:8080/app/api/childrenHealthRecord/getChildrenHealthRecordById?id='+this.doctorConsultId,
        }).then((res) => {
          this.baby = res.data;
        }).catch((error) => {
        });
      },
      getData() {
        this.$ajax({
          method: 'get',
          url: 'http://118.31.38.219:8080/app/api/doctorChatCustomer/getAllDoctorChatCustomer?doctorConsultId='+this.doctorConsultId+'&page=1&size=100',
        }).then((res) => {
          this.pagenow = res.pages;
          this.tolk = res.data.results;
          this.pageTotal = res.total;
          this.init()
        }).catch((error) => {
        });
      },
      init() {
        var div = document.getElementById('boxc');
        setTimeout(()=>{div.scrollTop = div.scrollHeight;this.loading=false}, 1000)
      },
      over() {
        this.$ajax({
          method: 'get',
          url: 'http://118.31.38.219:8080/app/api/doctorConsult/overDoctorConsult?id='+this.doctorConsultId,
        }).then((res) => {
          this.$message.success('已结束会话');
        }).catch((error) => {
          this.$message.error('已结束会话');
        });
      },
      imgChange() {
        this.loading = true;
        let file = document.getElementById('fileElem');
        let reader = new FileReader();
        reader.readAsDataURL(file.files[0]);
        reader.onloadend = (res) => {
          var base64 = res.target.result.split(',')[1];
          this.obj = {
            data: base64,
            fileName: file.files[0].name,
            fileType: '.' + file.files[0].name.split('.')[1],
            norImageUrl: null,
            originalName: null
          };
          this.send();
        }

      },
      send() {
        if(this.smag== '' && this.obj.data =='' ) {
          this.$message.warning('请输入回复内容');
          return false;''
        }
        this.loading = true;
        this.$ajax({
          method: 'post',
          data: {
            adminId: this.userType==1?this.id:'',
            content: this.smag,
            customerId: '',
            doctorConsultId: this.doctorConsultId,
            doctorId: this.userType==2?this.id:'',
            imageJsonList:this.obj,
            type: this.type,
            userType: this.userType,
          },
          url: 'http://118.31.38.219:8080/app/api/doctorChatCustomer/save',
        }).then((res) => {
          this.getData();
          this.smag='';
          this.obj =  {
            data: "",
            fileType: "",
            id: '',
            norImageUrl: "",
            originalName: ""
          };
        }).catch((error) => {
        });
      },
      setHeight(){
        let Height = document.documentElement.clientHeight;
        this.$refs.meContent.style.height=Height+'px';
        this.$refs.meBox.style.height = (Height - this.$refs.meTop.clientHeight - this.$refs.meFooter.clientHeight-10)+'px';
      },
      picBig(src){
        this.picture = src;
        this.isShow = true;
      },
      picSmall(){
        this.isShow = false;
        this.picture = '';
      }
    }
  }
</script>


<style scoped>
  .messageContent{
    margin: 0;
  }
  .messageContent .el-alert__title{
    margin: .4rem 0;
    overflow: auto;
  }
  .tolk{
    width: 50%;
    border-radius: 6px;
    padding: .4rem;
    margin: 1rem 0;
  }
  .date{
    font-size: .8rem;
    /*color: #ddd;*/
    margin-top: .2rem;
    color:#5b636a;
  }
  .doc{
    /*background: #0B90AA;*/
    background:#8fd162;
    color: #000;
    float: right;
  }
  .user{
    /*background: #8fbbc4;*/
    background:#fff;
    color: #000;
    float: left;
  }
  .content{
    word-break:break-all;
  }
  .box{
    clear: both;
    overflow: auto;
    border: 1px solid #eee;
    padding: 0 .4rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background: #f5f5f5;
  }
  .message{
    overflow: auto;
    margin: .4rem 0 0 0;
    /*border: 1px solid #000;*/
  }
  .send{
    background: #f5f5f5;
  }
  .send2{
    background:#00b945;
  }
  .sendpic{
    background: #f5f5f5;
  }
  .end{
    background:#e11b0c;
    color: #fff;
  }
  textarea{
    width: 90%;
    resize: none;
    border: 1px solid #eee;
    color: #666;
  }
  #fileElem{
    opacity: 0;
    width: 5px;
    position: absolute;
  }
  .pic{
    width: 90%;
    opacity: 1;
    -webkit-animation-name: picRun2;
    -moz-animation-name: picRun2;
    -o-animation-name: picRun2;
    animation-name: picRun2;
    animation-duration: 0.5s;
  }
  @keyframes picRun2{
    from{
      width: 70%;
      opacity: 0;
      position: relative;
      top: 0;
      left: 0;
    }
    to{
      width: 90%;
      opacity: 1;
    }
  }
  .picBig{
    width: 100%;
    height: 100%;
    z-index:5;
    background:rgba(0,0,0,0.8);
    border:1px solid #fff;
    position: absolute;
    top: 0;
    left: 0;
  }
  .picBor{
    width: 100%;
    height: 60%;
    margin:35% auto 0;
    text-align: center;
    /*border: 1px solid #fff;*/
    position: relative;
    overflow-y: scroll;
  }


</style>
