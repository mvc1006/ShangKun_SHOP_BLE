<template>
  <div class="box">
      <p class="title">编辑基本信息</p>
      <van-cell-group>
        <van-field
          v-model="username"
          clearable
          label="姓名"
         :required = "true"
          placeholder="收货人姓名"
    
          @click-right-icon="$toast('question')"
        />

         <van-field
          v-model="checkSex"
          clearable
          label="性别"
          placeholder="选择性别"
          :readonly="true"
          @click="showSex"
        />
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


        <van-field
          v-model="phone"
          label="电话"
          placeholder="收货人手机号"
          type="number"
          @blur="phoneErr"
          :required = "true"
          :error-message="phoneErrMsg"
          clearable
        />
        <div>
          <van-field
            v-model="area"
            label="地址"
            placeholder="省/市/县（区）"
            clearable
            :required = "true"
            @focus="areaShow"
            @blur="areaNone"
          />
          <van-actionsheet v-model="isAreaShow">
            <van-area :area-list="areaList" @confirm="getArea"/>
          </van-actionsheet>
        </div>
        <van-field
          v-model="address"
          type="textarea"
          label="详细地址"
          :required = "true"
          placeholder="街道门牌、楼层房间号等信息"
          clearable
        />
      </van-cell-group>
      <van-button  type="danger" style=" display: block; width: 90%;margin: 0 auto;margin-top: 15px;" @click="onSave">保存后使用</van-button>
  </div>
</template>

<script>
  import Area from '../../assets/area.js'
  export default {
    name: "EditOrAddReceAddress",
    inject:['reload'],
    data() {
      return {
        isAreaShow:false,
        areaList:Area,
        username:'',
        phone:'',
        area:'',
        address:'',
        UserId:'',
        phoneErrMsg:'',
        PCT1:[],
        Province:'',
        City:'',
        Town:'',


        radio:'0',
        showS:false,
        userdatabase:'',
        checkSex:'保密'
      }
    },
    mounted(){

    },
    created(){

            this.userdatabase=JSON.parse(localStorage.getItem('userdatabase'));
              console.log(this.userdatabase);
              //  alert(JSON.stringify(this.userdatabase))
              if(this.userdatabase){
                  let openid = this.userdatabase.openId;
                 
                  axios.post('/User/UserInfoOpenid?openid='+openid).then((response)=>{
                    console.log(response.data.data);

                    let UserInfo = response.data.data;
                
                    this.UserId = UserInfo.UserId;
                  
                    this.Province =  UserInfo. Province;
                    this.City = UserInfo. City;
                    this.Town = UserInfo. Town;
                    this.area  =JSON.parse( UserInfo. Province)+' '+JSON.parse(UserInfo. City)+' '+JSON.parse(UserInfo.Town);
                    //未选择地址时追加一个默认的数组
                    // let originPCT =[];
                    // originPCT = push(UserInfo.Province,UserInfo.City,UserInfo.Town);
                    // this.PCT1 = originPCT;
                    // console.log(originPCT);


                    this.address =UserInfo. Address;
                    this.username =UserInfo.UserName;
                    this.phone =UserInfo. UserPhone;
                   

                    if(UserInfo.UserSex==='0'){
                      this.checkSex = "保密",
                      this.radio = '0'
                        }else if(UserInfo.UserSex==='1'){
                        this.checkSex = "男",
                        this.radio = '1'
                      }else if(UserInfo.UserSex==='2'){
                        this.checkSex = "女",
                          this.radio = '2'
                      }
                  })
                  .catch((error)=>{

                  });
              }
            

      // let UserInfo =JSON.parse(localStorage.getItem('UserInfo'));
      // console.log(UserInfo);
      // this.UserId =UserInfo. UserId;
    
      
    },
    methods: {
      showSex(){
            this.showS= true;
        },
      phoneErr(e){
        console.log(this.phone.length)
        if(this.phone.length!==11){
          this.phoneErrMsg = '手机号格式错误'
        }else{
          this.phoneErrMsg = ''
        }
      },
      areaShow(){
        document.activeElement.blur();//屏蔽默认键盘弹出；
        this.isAreaShow=true;
      },
      areaNone(){
        this.isAreaShow=false;
      },
      getArea(e){
        console.log(e);
        let PCT = '';
        let PCT1=[];
        e.forEach((item)=>{
          PCT+=item.name+' ';
          PCT1.push(item.name);
        });
        this.area = PCT;
        this.PCT1 = PCT1;
        console.log(PCT1);
        this.isAreaShow = false;
      },
      setSex(e){
          this.radio = e;
          if(e==='0'){
            this.checkSex = '保密'
          }else if(e==='1'){
            this.checkSex = '男'
          }else if(e==='2'){
            this.checkSex = '女'
          }
          setTimeout( this.showS = false, 450);
          // this.reload();
        },
      onSave() {

        let data = {
          UserId:this.UserId,
          UserName: this.username,
          UserPhone: this.phone,
          Province:JSON.stringify(this.PCT1[0])|| this.Province,
          City:JSON.stringify(this.PCT1[1])|| this.City,
          Town:JSON.stringify(this.PCT1[2])|| this.Town,
          Address:this.address,
          UserSex:this.radio,
          UserAvatar:''
        }
        console.log(data);
        // alert(JSON.stringify(data))
        //定义地址    this.$router.go(-1);
        axios.post('/User/UserAddress',data).then((response)=>{
          this.$router.go(-1);
          // console.log(JSON.parse(response.data));
          // alert(JSON.stringify(response))
          // if(response.data.data==="success"){
          //   this.$router.go(-1);
          //   // this.reload();
          // }
        })
          .catch((error)=>{
            console.log(error);
          })
      },
    }
  }
</script>

<style scoped lang="less">
  .box{
    width: 100%;
    height: auto;
    /*background: fuchsia;*/
  }

  .van-switch--on{
    color: #07c160;
  }

  .title{
    width: 100px;
    /*height: 30px;*/
    /*background: red;*/
    font-size: 14px;
    padding-left: 15px;
    color: #999;
  }
</style>
