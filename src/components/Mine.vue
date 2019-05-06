<template>
  <div class="hello">
    <div class="header">
        <div class="touxiang">
          <img :src="UserAvatar" alt="">
        </div>
        <p class="username" v-text="userName">用户名称</p>
    </div>
    <div class="list">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="已购订单" name="1" icon="orders-o">
          <div class="eachOder"  v-for="(item,index) in oderLists" :key="index" style="margin-top:25px; background-color: #fafafa;" >
            <div class="eachOderNum" style=" display: flex; align-items: flex-end; justify-content: space-between; width: 90%;margin-left: 15px;margin-top:10px;font-size: 12px;">
              <p>
                <span>订单编号：</span>
                <span>{{item.OrderId}}</span>
              </p>
              <p>
                {{item.IsDelivery|isDeliveryFilter}}
              </p>
            </div>
            <p v-show="item.IsDelivery==0?false:true" style="margin-left:15px;margin-top:0px;font-size:12px;display:flex;align-items:center;justify-content: flex-start;">快递单号：<span style="margin-left:4px;">{{item.ThirdCode}}</span></p>
            <van-card
              :num=item.ProductNums
              tag="疯抢"
              :price=item.TotalPrice
              :desc=item.GuiGe
              :title=item.ProductTitle
              :thumb= item.SubImg
              :centered="true"
              style="margin-top:3px;background-color: #ffffff;"

            >
            </van-card>
          </div>
          <div class="empty">
            ( ⊙ o ⊙ ) 啊哦，没有更多订单啦
          </div>
        </van-collapse-item>
      </van-collapse>
      <!--<van-cell title="我的订单" icon="orders-o"   to="" is-link></van-cell>-->
      <!-- <van-cell title="个人信息" icon="manager-o" is-link  to="UserInfo" @click = 'dsds' /> -->
      <van-cell title="基本信息" icon="location-o" is-link to="EditOrAddReceAddress_ble"/>
      <van-cell title="商城首页" icon="shop-collect-o" is-link to="Index" />
      <!-- <van-cell title="关于我们" icon="star-o" is-link /> -->
       <van-collapse v-model="activeAbout">
        <van-collapse-item title="关于我们" name="2" icon="star-o">
            山东尚昆富硒农业有限公司，坐落于风景秀丽，闻名天下的“泉城”济南市。是国内大型综合性现代化企业，公司依靠高科技的技术，现代化的管理，始终坚持以维护人类健康为宗旨，以满足社会需求为己任，致力于研发有机硒对人类健康的最大利用价值。现主要研发并经营“阳光尚昆”系列富硒品牌产品，特别精选优质上等配方，专注于专业品牌，致力于安全健康事业。公司立足“诚信，守誉，质量先行”的宗旨，坚持“以质量求生存以信誉求发展”的经营理念，力求塑造品质创新的整体形象，严把质量关。从而生产出一系列的优质健康产品，深受广大消费者的青睐！一流的产品，科学的管理经营模式，出众的质量和完善的服务，为公司赢的社会各界和海内外朋友的信赖于支持！公司如今面向全国诚招各级代理商。锐意进取，蓬勃发展中的山东尚昆富硒农业有限公司，现已成为最具竞争和影响力的知名企业。愿与广大海内外的合作伙伴携手合作，并肩发展。共同开创人类健康事业的新高峰。同时欢迎海内外各界朋友的莅临指导、参观和商务洽谈！
        </van-collapse-item>
      </van-collapse>
    </div>
    <footer-tab></footer-tab>
  </div>
</template>

<script>
  import FooterTab from './FooterTab'
export default {
  name: 'Mine',
  data () {
    return {
    
      activeNames:[],
      activeAbout:[],
      imageURL:'https://img.yzcdn.cn/upload_files/2018/04/26/Fh2RwlpEpaxGrEH7yu6oYWVl1nw9.jpg?imageView2%2F2%2Fw%2F200%2Fh%2F0%2Fq%2F75%2Fformat%2Fwebp',
      userName:'',
      UserAvatar:'',
      UserId:'',
      oderLists:[],
     
    }
  },
  filters:{
    isDeliveryFilter:function(value){
      if(value==0){
       
        return '未发货';
      }else{
     
       return '已发货';
      }
     
    }
  },
  created(){
    //获取code   code 是微信每次随机生成的证书  通过该证书才能获取用户的OpendId
    // let code = this.$router.
    // console.log(this.$router);
    //--------参数依赖------------------
    
          let promise = new Promise((resolve,reject)=>{
            //取出本地openID  
            let userdatabase=JSON.parse(localStorage.getItem('userdatabase'));
            console.log(userdatabase);
          
              let openid = userdatabase.openId;
              axios.post('/User/UserInfoOpenid',{openid:openid}).then((response)=>{
                  console.log(response.data.data);
                  let UserInfo = response.data.data;
                  let UserId = UserInfo.UserId;
                  this.userName = UserInfo.UserName;
                  this.UserAvatar = UserInfo.UserAvatar
                  resolve(UserId);
                  localStorage.setItem('UserInfo',JSON.stringify(UserInfo));
              })
              .catch((error)=>{

              });
          });
    

        promise.then((UserId)=>{
            console.log(UserId);
             //订单列表
            axios.post('/Order/OrderList',{UserId:UserId}).then((response)=>{
              console.log(response.data.data);
              let oderLists = response.data.data;
              this.oderLists= oderLists;
            
            })
            .catch((error)=>{

            });
          });

  },
  components:{
    FooterTab,
  },
  methods:{
    dsds(e){
      this.$router.push({path:'EditOrAddReceAddress_ble',query:{Sign:this.$route.path.replace('/','')}});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .hello{
    width: 375px;
    width: 100%;
    height: auto;
    margin: 0 auto;
    padding-bottom: 100px;
    .header{
      width: 100%;
      height: 172px;
      background-image: url('../../static/img/138296629227681033.jpg');
      background-repeat: no-repeat;
      background-size: cover;
      display: flex;
      align-items: center;

      .touxiang{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: transparent;
        margin-left: 15px;

        img{
          width: 100%;
          border-radius: 50%;
        }
      }
      .username{
        font-size: 18px;
        color: #ffffff;
        margin-left: 15px;
      }
    }

    .eachOder:first-child{
      margin-top:0px !important;
    }

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

    .list{
      width: 375px;
        width: 100%;
      height: auto;
      margin-top: 30px;
      .van-cell{
        margin-top: 1px;

      }
      .empty{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
      
        width: 100%;
        height: 30px;
        margin-top: 10px;
      }
    }
  }
</style>
