<template>
  <div class="hello">
   <van-swipe :autoplay="3000"  indicator-color="white">
    <!--<van-swipe-item>-->
      <!--<img src="static/img/Fmq6__Thi7rLHilvDCyMvWVPtcEi.jpg" alt="">-->
    <!--</van-swipe-item>-->
    <!--<van-swipe-item>-->
      <!--<img src="static/img/Fn9b4lOK_T6zD51ARUi3XPi1Lpg5.jpg" alt="">-->
    <!--</van-swipe-item>-->
    <!--<van-swipe-item>-->
      <!--<img src="static/img/FtDSmPoLDyPJ4hY_NVBHlAruNgLK.jpg" alt="">-->
    <!--</van-swipe-item>-->
     <van-swipe-item>
      <img :src="bner1" alt="">
     </van-swipe-item>
     <van-swipe-item>
       <img :src="bner2" alt="">
     </van-swipe-item>
      <van-swipe-item>
       <img :src="bner3" alt="">
     </van-swipe-item>
  </van-swipe>
      <!-- 通知 -->
    <van-notice-bar
      :text="msg"
      left-icon="volume-o"
    />
    <!--广告-->
    <div class="advertising">
      <img :src="mid" alt="">
    </div>

    <!--商品列表-->
    <div class="productList">
      <!-- index 限制了循环次数  即循环几个大框 -->
        <div class="ductLine" v-for="(item,index) in datalist" :key="index">
          <!-- {{index}} -->         
          <div class="eachDuc" :Code="item.before.Code" @click.stop="openproduct" >
              <div class="img">
                <img :src="item.before.SubImg" alt="" :Code="item.before.Code">
              </div>
              <div class="detial">
                  <div class="wenzi">
                    <span v-text="item.before.Name" :Code="item.before.Code"></span>
                  </div>
                  <div class="price">
                      <span class="num">
                        ￥<span v-text="item.before.GoodsNewPrice" :Code="item.before.Code"></span>
                      </span>
                    <van-button size="mini" round type="danger" :Code="item.before.Code">立即购买</van-button>
                  </div>
              </div>
          </div>

          <div v-if="item.after==null?false:true" class="eachDuc" :Code="item.after.Code" @click.stop="openproduct" >
              <div class="img">
                <img :src="item.after.SubImg" alt="" :Code="item.after.Code">
              </div>
              <div class="detial">
                  <div class="wenzi">
                    <span v-text="item.after.Name" :Code="item.after.Code"></span>
                  </div>
                  <div class="price">
                      <span class="num">
                        ￥<span v-text="item.after.GoodsNewPrice" :Code="item.after.Code"></span>
                      </span>
                    <van-button size="mini" round type="danger" :Code="item.after.Code">立即购买</van-button>
                  </div>
              </div>
          </div>
  
        </div>

    </div>
    <!--<router-view/>-->
    <footer-tab></footer-tab>
  </div>
</template>

<script>
  import FooterTab from './FooterTab'
  export default {
    name: 'Index',
    data () {
      return {
        datalist:[],
        bner1:'',
        bner2:'',
        bner3:'',
        mid:'',
        msg:'',

        code:'',
        openId:'',
        access_token:''

      }
    },
    computed:{
    },
    created(){

      axios.get('/Mall/MallWeb').then((response)=>{
          let data =  response.data.data;
          // this.datalist = data.list;
          this.datalist =response.data.data.list;

          // console.log(response.data.data.list);
          console.log( this.datalist);
      
          // console.log(JSON.stringify(response.data.data.list) );

          let topInfo = data.top;
          this.bner1 = topInfo.bner1;
          this.bner2 = topInfo.bner2;
          this.bner3 = topInfo.bner3;

          this.mid = topInfo.mid;
          this.msg = topInfo.msg;

      })
      .catch((error)=>{

      })
      

      // 通过url 截取的code 获取用户openID 
      
      // alert(location.search)
      // alert(this.$router)
　    
      // 截取code
      let query = window.location.search.substring(1);
      let vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
          var pair = vars[i].split("=");
          if(pair[0] == 'code'){              
            this.code=pair[1];
            }
      }

      // alert( this.code); 
      //  this.code = request.QueryString("code");
      

       if (this.code == null||this.code ==''||this.code == undefined ) {
            alert(0);
            axios.get('/wx2/GetWxRedirectUrl',{params:{ tp: 2 }}).then((response)=>{
              window.location.href = JSON.parse(response).data;
            })
        }
        else {
            this.getOpenidAndAccessToken();
        }


        // get openid
        axios.post('/wx2/GetOpenidAndAccessToken',{ code: this.code }).then((response)=>{

            this.openId = response.data.data.openid;
            this.access_token = response.data.data.access_token;

           
            //存入本地
           localStorage.setItem('userdatabase',
              JSON.stringify({openId:this.openId,access_token:this.access_token})
            );
        })
        .catch((error)=>{

        })

         //存入本地
            // localStorage.setItem('userdatabase',
            //   JSON.stringify({openId:343434,access_token:5555555})
            // );
            

    },
    components:{
      FooterTab,
    },
    methods:{
    getOpenidAndAccessToken(){
        axios.post('/wx2/GetOpenidAndAccessToken',{ code: this.code }).then((response)=>{
            this.openId =response. data.data.openid;
            this.access_token = response.data.data.access_token;
            
            // alert(this.openId)
            // alert(this.access_token)
        
               //存入本地
            localStorage.setItem('userdatabase',
              JSON.stringify({openId:this.openId,access_token:this.access_token})
            );
        })
    },

      openproduct(e){
        console.log(e.currentTarget.getAttribute('code'));
        let pcode = e.currentTarget.getAttribute('code');
        this.$router.push({path:'ProdcutDetail',query:{code:pcode}});
      }
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .hello{
    width:375px;
    width: 100%;
    height: auto;
    margin: 0 auto;
    .van-swipe{
      /*width: 375px;*/
      // height: 188px;
      img{
        width: 375px;
           width: 100%;
           height: 100%;
        /*height: 188px;*/
      }
    }

    /*advertising*/
    .advertising{
      width: 100%;
      // margin-top: 30px;
      img{
        width: 100%;
      }
    }
    /*productList*/
    .productList{
      width:375px;
         width: 100%;
      height: auto;
      /*height: 1000px;*/
      padding-bottom: 80px;
      .ductLine{
        width: 95%;
        height: 272.5px;
        // background: #66CC99;
        margin: 8px auto;
        display: flex;
        align-items: center;;
        justify-content: space-between;
        .eachDuc{
          width: 175px;
          width: 48%;
          height: 260.5px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          .img{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
            
              width: 100%;   
              min-width: 170px;
              height: 100%;
              height: 170px;
              /*-webkit-border-radius: 8px;*/
              /*-moz-border-radius: 8px;*/
              /*border-radius: 8px;*/
            }
          }
          .detial{
            width: 100%;
            min-width: 172.5px;
            height: 75px;
            /*background: gold;*/
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            .wenzi{
              width: 100%;
              height: 40px;
              /*background: peachpuff;*/
              overflow: hidden;
              text-overflow:ellipsis;
              display:-webkit-box;
              -webkit-line-clamp:2;
              -webkit-box-orient:vertical;
              span{
                width: 100%;
                font-size: 14px;
                font-weight: bold;
                line-height: 42px;
              }
            }

            .price{
              width: 100%;
              height: 30px;
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              .num{
                font-size: 12px;
                /*font-weight: 600;*/
                color: rgb(255, 68, 68);
                // margin-left: 10px;
                span{
                  font-size: 16px;
                  font-weight: bold;
                }
              }
              .van-button{
                width: 60px;
                margin-right: 5px;
              }
            }
          }
        }
      }

    }
  }

</style>
