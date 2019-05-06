<template>
    <div class="box">
      <!--显示默认地址-->
      <div v-if="isAddressShow"   @click="setAddress"  class="recevPer">
          <div class="left">
            <div class="top">
              <p style="display: flex;align-items: center;font-size: 16px;">
                <van-icon name="location-o" style="font-size: 20px;" />
                <span style="margin-left: 6px;">收货人：</span>
                <span>{{UserName}}</span>
              </p>
              <p style="margin-right:0px;">{{UserPhone}}</p>
            </div>
            <div style="margin-left: 22px;margin-top: -5px; display: flex;align-items: center;font-size: 12px;color:#666;line-height:16px;">
              <span>收货地址：{{detialAddress}}</span>
            </div>
          </div>
          <van-icon name="arrow" style="margin-top:15px;" />
      </div>
      <!--添加收货地址-->
      <div v-else="isAddressShow" @click="setAddress"  class="recieve">
        <div style="display: flex;align-items: center;justify-content: space-between">
          <van-icon name="add" />
          <span>添加收货地址</span>
        </div>
        <van-icon name="arrow" />
      </div>


      <div class="line">
        <!--<img src="static/img/line.jpg" alt="">-->
      </div>
      <!--精选-->
      <div class="jingxuan">
          <div class="eachOder">
            <p class="eachOderNum" style="width: 315px;margin-left: 15px;font-size: 14px;color: #333;display: flex;align-items: center">
              <van-icon name="shop-o" style="font-size: 20px;"/>
              <span style="margin-left: 10px;">尚鲲精选：</span>
            </p>
            <van-card
              :num="Num"
              tag="疯抢"
              :price="Gvalue"
              :desc="Gname"
              :title="title"
              :thumb="picture"
              
            >
            </van-card>
          </div>
      </div>

      <van-cell title="优惠券" is-link value="无" style="margin: 10px 0px;"/>
      <div class="express" style="">
        <p>配送方式</p>
        <p> 普通快递
           <span>免运费</span>
        </p>
      </div>

      <div class="jine">
        <div class="top">
          <p>商品金额</p>
          <p style="color:#111">
            <span>￥</span>
            <span>{{Gvalue}}</span>
          </p>
        </div>
        <div class="bottom">
          <p>运费</p>
          <p style="color:#111">
            <span>+ ￥</span>
            <span>0.00</span>
          </p>
        </div>
      </div>

      <div class="heji">
        <p></p>
        <div>
          <p>合计：</p>
          <p>
            <span>￥</span>
            <span>{{(totalPrice/100)+'.00'}}</span>
          </p>
        </div>
      </div>
      <van-submit-bar
        :price="totalPrice"
        button-text="提交订单"
        @submit="onSubmit"
      />
    </div>
</template>

<script>


    export default {
        name: "SubOder",
        inject:['reload'],
        data(){
          return{
            UserId:'',
            Province:'',
            City:'',
            Town:'',
            Address:'',
            UserName:'',
            UserPhone:'',
            isAddressShow:true,
            title:'',
            code:'',
            Gname:'',
            Gvalue:'',
            Num:'',
            picture:'',
            Gn:'',

            userdatabase:'',
            openId:'',

            wxJsApiParam:'',
            detialAddress:''
          }
        },
        computed:{
          totalPrice:function() {
              return this.Gvalue*this.Num*100;
          },
          // detialAddress:function () {

          //      console.log(this.$route.query.Sign);
                
          //     //  if(this.$route.query.Sign==='ProdcutDetail'){
          //     //       return this.Province +' '+this.City+' '+this.Town+' '+this.Address;
          //     //  }else{
          //     //      return JSON.parse(this.Province )+' '+JSON.parse(this.City)+' '+JSON.parse(this.Town)+' '+this.Address;

          //     //  }
          //     if(localStorage.getItem('userdatabase')){
          //         return JSON.parse(this.Province )+' '+JSON.parse(this.City)+' '+JSON.parse(this.Town)+' '+this.Address;  
          //     }else{
          //       return this.Province +' '+this.City+' '+this.Town+' '+this.Address;
          //     }

          // }
        },
        created(){
                // console.log(this.$route.query.Sign);
                   //商品信息
              this. title = this.$router.currentRoute.query.title;
              this. code = this.$router.currentRoute.query.code;
              this. Gname = this.$router.currentRoute.query.Gname;
              this. Gvalue = this.$router.currentRoute.query.Gvalue;
              this. Num = this.$router.currentRoute.query.Num;
              this. picture = this.$router.currentRoute.query.picture;
              this. Gn = this.$router.currentRoute.query.Gn;


              console.log(this. Gname);

               this.userdatabase=JSON.parse(localStorage.getItem('userdatabase'));
              //   console.log(this.userdatabase);
             
                  if(this.userdatabase===null){
                    //  this.$toast('请先完善收货地址');
                  }else{
                   let openid = this.userdatabase.openId;
                   this.openId = openid;
                  // alert( this.openId )
                     axios.post('/User/UserInfoOpenid?openid='+openid).then((response)=>{
                      console.log(response.data.data);

                      let UserInfo = response.data.data;
                      this.UserId =UserInfo. UserId;
                      this.Province =UserInfo. Province;
                      this.City =UserInfo. City;
                      this.Town =UserInfo. Town;
                      this.Address =UserInfo. Address;
                      this.UserName =UserInfo. UserName;
                      this.UserPhone =UserInfo. UserPhone;
                      // localStorage.setItem('UserInfo',JSON.stringify(UserInfo));


                      if(UserInfo.OpenId){
                        this.isAddressShow = true;
                      }else{
                        this.isAddressShow = false;
                      }     

                                  // 异步查看用户是否填写地址
                                axios.post('/User/UserFillAddressOpenid?openid='+openid).then((response)=>{

                                    // alert(JSON.stringify(response.data.data));

                                    let isAddressFlue = response.data.data;
                                    if(isAddressFlue==1){
                                        // alert(1)
                                        this.detialAddress = JSON.parse(this.Province )+' '+JSON.parse(this.City)+' '+JSON.parse(this.Town)+' '+this.Address;
                                    }else{
                                      // alert(0)
                                        this.detialAddress =  this.Province +' '+this.City+' '+this.Town+' '+this.Address;
                                    }

                                })
                                .catch((error)=>{

                                });

                    })
                    .catch((error)=>{

                    });
                }
             
        },
        methods:{
          setAddress(){
            this.$router.push({path:'EditOrAddReceAddress',query:{Sign:this.$route.path.replace('/','')}});
          },
           //微信支付调起一：jsApiCall   ,Sign:this.$route.path.replace('/','')
          jsApiCall() {
            let vm = this;
              WeixinJSBridge.invoke(
              'getBrandWCPayRequest',
              JSON.parse(this.wxJsApiParam),//josn串
              function (res) {
                  WeixinJSBridge.log(res.err_msg);
                  // alert(JSON.stringify(res))
                  //alert(res.err_code + res.err_desc + res.err_msg);
                   if(res.err_msg == "get_brand_wcpay_request:ok"){    
                    //  alert(11)             
                        vm.$router.push('Index');
                      
                   }else{
                       //返回跳转到订单详情页面
                      // alert(22)  
                        vm.$router.go(-1);
                                               
                   }
              }
              );
          },
          //微信支付调起二:callpay
          callpay() {
            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                }
                else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                    document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                }
            }
            else {
                this.jsApiCall();
            }
          },
          onSubmit(){
            if(this.userdatabase==null){
              //  let dd = {
              //      UserId:this.UserId,
              //         code:this.code,
              //         Gname:this.Gn,
              //         Gvalue:this.Gname,
              //         Num:this.Num
              //   }
              //   console.log(dd);
                     this.$toast('请先完善收货地址');
              }else{
               
                  let promise = new Promise((resolve,reject)=>{
                  axios.post('/Order/Order',{
                      UserId:this.UserId,
                      code:this.code,
                      Gname:this.Gn,
                      Gvalue:this.Gname,
                      Num:this.Num
                    }).then((response)=>{
                        console.log(response);
                        if(!response.data.data){
                        this.$toast(response.data.errmsg);
                      
                        }else{
                          let oderId = response.data.data;

                           resolve(oderId);
                        }
                      
                  })
                  .catch((error)=>{

                  })
               });

                 promise.then((oderId)=>{
                    console.log(oderId);
                    //订单列表
                    axios.post('/Order/PayParm',{OpenId:this.openId,OrderId:oderId,Payment:2}).then((response)=>{
                      console.log(response.data.data);
                      this.wxJsApiParam = response.data.data;
                      this.jsApiCall();
                    })
                    .catch((error)=>{

                    });
                  });

              }
           
          }
        }
    }
</script>

<style scoped lang="less">
    .box{
      width: 100%;
      /*height: 1000px;*/
      .recevPer{
        /*width: 100%;*/
        /*height: 50px;*/
        padding: 5px 10px;
        /*background: fuchsia;*/
        /*padding-top: 10px;*/
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left{
          width: 100%;
          /*display: flex;*/
          /*align-items: center;*/
          margin-right: 10px;
          .top{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

          }
        }
      }
      .recieve{
        width: 100%;
        height: 60px;
        padding-top: 10px;
        /*background: forestgreen;*/
        display: flex;
        align-items: center;
        justify-content: space-between;
        div{
          .van-icon{
            font-size: 24px;
            margin-left: 20px;
            color: #0079f3;
          }
          span{
            /*margin-left:4px;*/
            margin-bottom: 2.5px;
          }
        }
        .van-icon{
          /*font-size: 18px;*/
          margin-right: 10px;
        }
      }
      .line{
        width: 100%;
        height: 2px;
        background: repeating-linear-gradient(-45deg,#ff6d6d,#ff6d6d 20%,transparent 0,transparent 25%,#3283fa 0,#3283fa 45%,transparent 0,transparent 50%);
        background-size:80px;
        margin-top: 10px;
      }

      .jingxuan{
        width: 100%;
        /*height: 300px;*/
        margin: 0 auto;
        margin-top: 30px;
        /*background: red;*/

        .van-card__content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-around;

          .van-card__bottom{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;       
          }
    }

      }

      .express{
        width: 93%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        span{
          color: #111;
        }
      }

      .jine{
        width: 92%;
        height: auto;
        margin: 0 auto;
        margin-top: 20px;
        /*background: forestgreen;*/
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        div{
          height: 28px;
        }

        .top{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          p{
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }
        .bottom{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          p{
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }
      }

      .heji{
        width: 92%;
        height: 30px;
        margin: 0 auto;
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        div{
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          color: #111;
          p:last-child{
            font-weight: bold;
            color: #f44;
          }
        }
      }
    }
</style>
