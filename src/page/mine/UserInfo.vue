<template>
  <div class="hello">
    <p class="title">基本信息</p>
    <!-- <van-cell title="头像" value="内容" border /> -->
    <van-cell title="姓名" :value="username"  is-link @click="showName" />
    <!-- <van-cell title="手机号" :value="userPhone" is-link @click="showPhone"/> -->
    <van-cell title="性别" :value="checkSex"  is-link @click="showSex"/>
    <!-- <van-cell title="生日" value="1993-10-06"  is-link @click="isshowTime" /> -->
    <!-- <van-cell title="地区" value="山东省 济南市 市中区"  is-link @click="isshowArea"/> -->
    <van-cell title="收货地址" is-link to="EditOrAddReceAddress"/>
    <!--地区-->
    <van-popup v-model="showArea" position="bottom" :overlay="true">
      <van-area :area-list="areaList" @confirm="selectArea"/>
    </van-popup>
    <!--时间-->
    <van-popup v-model="showTime" position="bottom" :overlay="true">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @confirm="selectTime"
      />
    </van-popup>
    <van-dialog
      v-model="show"
      title="修改姓名"
      message-align="center"
      show-cancel-button
      :before-close="beforeClose"
    >
      <input type="text" v-model="username" style="width:200px;height:30px;display:block;text-align: center;border:1px solid #ddd;color:#666;margin: 10px;margin-left: 55px;">
    </van-dialog>

     <van-dialog
      v-model="showp"
      title="修改手机号"
      message-align="center"
      show-cancel-button
      :before-close="beforeClose1"
    >
      <input type="text" v-model="userPhone" style="width:200px;height:30px;display:block;text-align: center;border:1px solid #ddd;color:#666;margin: 10px;margin-left: 55px;">
    </van-dialog>

    <van-dialog
      v-model="showS"
      :showConfirmButton="false"
      :close-on-click-overlay = "true"
    >

    <van-radio-group 
    v-model="radio"
    @change = "setSex"
    >
      <van-cell-group>
        <van-cell title="保密" clickable @click="radio = '0'">
          <van-radio name="0" />
        </van-cell>
        <van-cell title="男" clickable @click="radio = '1'">
          <van-radio name="1" />
        </van-cell>
        <van-cell title="女" clickable @click="radio = '2'">
          <van-radio name="2" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
      <!-- <input type="text" v-model="userSex" style="width:200px;height:30px;display:block;text-align: center;border:1px solid #ddd;color:#666;margin: 10px;margin-left: 55px;"> -->
    </van-dialog>
  </div>
</template>

<script>
  import Area from '../../assets/area.js'
    export default {
        name: "UserInfo",
        inject:['reload'],
        data() {
          return {
            userdatabase:'',
            show: false,
            showp:false,
            showS:false,
            showArea:false,
            username: '',
            userPhone:'',
            areaList:Area,
            showTime:false,
            currentDate: new Date(),


            radio:'0',
            checkSex:''
          };
        },

        created(){
            this.userdatabase=JSON.parse(localStorage.getItem('userdatabase'));
            let openid = this.userdatabase.openId;

            axios.post('/User/UserInfoOpenid?openid='+openid).then((response)=>{
            console.log(response.data.data);

            let UserInfo = response.data.data;
            this.UserId =UserInfo. UserId;
            this.Province =UserInfo. Province;
            this.City =UserInfo. City;
            this.Town =UserInfo. Town;
            this.Address =UserInfo. Address;
            this.username =UserInfo. UserName;
            this.userPhone =UserInfo. UserPhone;

            console.log(UserInfo.UserSex);

              if(UserInfo.UserSex==0){
                  this.checkSex = "保密",
                  this.radio = '0'
              }else if(UserInfo.UserSex==1){
                  this.checkSex = "男",
                  this.radio = '1'
              }else if(UserInfo.UserSex==2){
                  this.checkSex = "女",
                    this.radio = '2'
              }
            // switch(UserInfo.UserSex)
            //   {
            //   case 0:
            //     this.checkSex = "保密"
                
            //     break;
            //   case 1:
            //    this.checkSex = "男"
            //     break;

            //   case 2:
            //    this.checkSex = "女"
            //    alert(1)
            //     break;
               
            //   }
          

          })
          .catch((error)=>{

          });
        },

        methods: {
          showName(){
            this.show = true;
          },
          showPhone(){
            this.showp= true;
          },
          showSex(){
             this.showS= true;
          },
          setSex(e){
            console.log(e);
            this.radio = e;
            if(e){
              axios.post('/User/UserNameSex',{
                 UserId:this.UserId,
                 UserName:this.username,
                 UserSex:e
              }).then((response)=>{
                  console.log(response);
                  this.reload();
              })
               setTimeout( this.showS = false, 450);
             
            }
          },
          isshowArea(){
            if(this.showArea){
              this.showArea = false;
            }else{
              this.showArea = true;
            }
          },
          selectArea(e){
            console.log(e);
            if(e){
              this.showArea = false;
            }
            let S = '';
            for(let i = 0;i<e.length;i++){
              S += e[i].name+' ';
            }
            console.log(S)

          },
          isshowTime(){
            if(this.showTime){
              this.showTime = false;
            }else{
              this.showTime = true;
            }
          },
          selectTime(e){
            console.log(e);
            this.timestampToTime(e);
            console.log(this.timestampToTime(e));
            if(e){
              this.showTime = false;
            }
          },
          timestampToTime(timestamp) {
            let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            let D = date.getDate();
            return Y+M+D;

          },
          beforeClose(action, done) {
            if (action === 'confirm') {
              console.log(this.username)
              setTimeout(done, 450);
          
            } else {
              done();
            }
          },
          beforeClose1(action, done) {
          if (action === 'confirm') {
            console.log(this.userPhone)

             axios.post('/User/UserNameSex',{
                 UserId:this.UserId,
                 UserName:this.username,
                 UserSex:this.radio
              }).then((response)=>{
                  console.log(response);
                  this.reload();
              })
            setTimeout(done, 450);
          } else {
            done();
          }
        }
        }
    }
</script>

<style scoped lang="less">

  .hello{
    /*width: 375px;*/
    height: auto;
    margin: 0 auto;
    .title{
      width: 100px;
      height: 30px;
      /*background: red;*/
      font-size: 14px;
      padding-left: 15px;
      color: #999;
    }
  }



</style>
