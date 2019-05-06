<template>
  <div class="goods">
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in goods.thumb" :key="thumb">
        <img :src="thumb" >
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goods.title }}</div>
        <div class="goods-price">{{ formatPrice(goods.price) }}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="10">运费：{{ goods.express }}</van-col>
        <van-col span="14">已售：{{ goods.remain }}</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell value="" icon="shop-o">
        <template slot="title">
          <span class="van-cell-text">尚昆的店</span>
          <van-tag class="goods-tag" type="danger">官方</van-tag>
        </template>
      </van-cell>
      <van-cell title="线下门店" icon="location-o"/>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell title="商品详情"/>
      <div class="goodsImgs" v-for="(item,index) in (goods.goodsImgs)" :key="index">
        <img :src="item" alt="">
      </div>
    </van-cell-group>

    <van-goods-action>
      <van-goods-action-big-btn primary @click="sorry">
        立即购买
      </van-goods-action-big-btn>
    </van-goods-action>

    <!--规格-->
    <van-popup
      v-model="showBase"
      position="bottom"
      :overlay="true"
      style="overflow-y:visible">
      <div class="guigeBox">
          <div class="van-sku-header">
            <div class="van-sku-header__img-wrap">
              <img :src="picture" alt="">
            </div>
            <div class="van-sku-header__goods-info">
              <div class="van-sku__goods-name van-ellipsis" v-text="goods.title"></div>
              <div class="van-sku__goods-price">
                <span class="van-sku__price-symbol">￥</span>
                <span class="van-sku__price-num" v-text="newprice"></span>
              </div>
            </div>
          </div>
          <div class="select">  
            <div class="title">规格：</div>
            <span v-for="(item,index) in guigeData" v-if="item.Gname==''?false:true" :key="index"  class="btn" :style="index===0?'backgroundColor:#f44;color:#ffffff;borderColor:#f44;':''" :index="index" :goodPrice="item.GPrice" :Gn="item.Gn"  @click="selectval" v-text="item.Gname"></span>
          </div>
         <div class="selectNum">
            <div class="title">购买数量：</div>
            <div class="count">
              <button class="addorjian" plain   type="primary" :disabled="isdisable" ref="btn_jian" @click="jian"><i class="iconfont iconjian1"></i></button>
              <input type="text" v-model="number">
              <button class="addorjian" plain   type="primary" @click="jia"><i class="iconfont iconjia1"></i></button>
            </div>
         </div>
        <van-button style="width: 100%;position: absolute;bottom: 0" type="danger" @click="submit">下一步</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn
} from 'vant';

export default {
  components: {
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn
  },
  data() {
    return {
      showBase:false,
      goods: {
        title: '',
        price: '',
        express: '免运费',
        remain: '',
        thumb: [],
        goodsImgs:[],
      },
      picture: '',
      isdisable:false,
      guigeData:[],
      index:'',
      code:'',

      Gname:'',
      newprice:'100',
      number:1,

      Gn:'G1',

    };
  },
  created(){
    let code  = this.$route.query.code;
    this.code = code;
    console.log(code);
    axios.get('/Mall/GoodsInfo?Code='+code).then((response)=>{
      let data =  response.data.data;

      let bannerLists = [];
      if(data.BannerUrl!=''){
        bannerLists.push(data.BannerUrl);
      }
      if(data.BannerUrl2!=''){
        bannerLists.push(data.BannerUrl2);
      }
      if(data.BannerUrl3!=''){
        bannerLists.push(data.BannerUrl3);
      }

      this.goods.thumb = bannerLists;
      this.goods.title = data.Name;
      this.goods.price = data.GoodsNewPrice*100;
      this.goods.remain = data.SealNum;

      //详情图片
      let goodsImgs = [];
      if(data.GoodsImg1!=''){
        goodsImgs.push(data.GoodsImg1);
      }
      if(data.GoodsImg2!=''){
        goodsImgs.push(data.GoodsImg2);
      }
      if(data.GoodsImg3!=''){
        goodsImgs.push(data.GoodsImg3);
      }
      if(data.GoodsImg4!=''){
        goodsImgs.push(data.GoodsImg4);
      }
      if(data.GoodsImg5!=''){
        goodsImgs.push(data.GoodsImg5);
      }

      this.goods.goodsImgs = goodsImgs;

      // 规格信息
      this.picture = data.SubImg;
      this.newprice = data.GoodsNewPrice;
      let guigeData = [
        {Gname:data.G1,GPrice:data.G1Price,Gn:'G1'},
        {Gname:data.G2,GPrice:data.G2Price,Gn:'G2'},
        {Gname:data.G3,GPrice:data.G3Price,Gn:'G3'},
        {Gname:data.G4,GPrice:data.G4Price,Gn:'G4'},
        {Gname:data.G5,GPrice:data.G5Price,Gn:'G5'},

      ]
      this.guigeData = guigeData;

      //设置默认值
      this.Gname = guigeData[0].Gname;
      this.newprice = guigeData[0].GPrice;

      console.log(data);
      console.log(bannerLists);


    })
      .catch((error)=>{

      })
  },
  watch:{
    // 监听购买数量变化
    number(e){
      if(e<2){
           this.$toast('至少选择一件商品');
        // Toast('至少选择一件商品');
        this.$refs.btn_jian.style.background="#f8f8f8"
        this.isdisable = true
      }else{
        this.isdisable = false
      }
    }
  },
  methods: {
    formatPrice() {
      return '¥' + (this.goods.price / 100).toFixed(2);
    },
    sorry() {
       this.showBase = true;
    },
    jian(){
      if(this.number===1){
        // Toast('至少选择一件商品');
          this.$toast('至少选择一件商品');
        this.$refs.btn_jian.style.background="#f8f8f8"
        this.isdisable = true
      }else{
        this.number--;
      }

    },
    jia(){
      this.number++;
    },
    selectval(e){
      console.log(e.currentTarget.innerText);
      console.log(e.currentTarget.getAttribute('Gn'));
      //复制当前选择规格
      this.Gn = e.currentTarget.getAttribute('Gn');
      // console.log(e.currentTarget.getAttribute('goodprice'));
      this.newprice = e.currentTarget.getAttribute('goodprice');

      // 重定值
      this.Gname = e.currentTarget.innerText;
      this.newprice = e.currentTarget.getAttribute('goodprice');

      // console.log(document.querySelectorAll('.btn'));
      let btns = document.querySelectorAll('.btn');
      for(let i = 0;i<btns.length;i++){

        if(btns[i].getAttribute('index')===e.currentTarget.getAttribute('index')){
          //  console.log(e.currentTarget.getAttribute('index'));
          //  console.log(btns[i].getAttribute('index'));
             btns[i].style.backgroundColor = '#f44'
             btns[i].style.color = '#ffffff'
             btns[i].style.borderColor = '#f44'
        }else{
             btns[i].style.backgroundColor = 'floralwhite'
             btns[i].style.color = '#323233'
             btns[i].style.borderColor = '#969799'
        }
      }

    },
    submit(e){
    
      // console.log(this.Gn);
      this.$router.push({path:'SubOder',query:{Gn:this.Gn,title:this.goods.title,picture:this.picture,code:this.code,Gname:this.Gname,Gvalue:this.newprice,Num:this.number,Sign:this.$route.path.replace('/','')}});
    },

  }
};
</script>

<style lang="less">
.goods {
  padding-bottom: 50px;

  .goodsImgs{
    width: 95%;
    margin: 0 auto;
    img{
      width: 100%;
    }
  }
  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }

  &-title {
    font-size: 16px;
  }

  &-price {
    color: #f44;
  }

  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }

  &-cell-group {
    margin: 15px 0;

    .van-cell__value {
      color: #999;
    }
  }

  &-tag {
    margin-left: 5px;
  }

  .guigeBox{
    width: 100%;
    height: 314px;
    /*background: darkgray;*/
    .van-sku-header{
      width: 96%;
      height: 82px;
      /*background: floralwhite;*/
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .van-sku-header__img-wrap{
        width: 80px;
        height: 80px;
        margin-top: -20px;
        margin-left: 10px;
        img{
          width: 100%;
        }
      }
      .van-sku-header__goods-info{
        width: 280px;
        height: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        .van-sku__goods-name{
          width: 210px;
          /*height: 14px;*/
          font-size: 14px;
        }
        .van-ellipsis{
          overflow:hidden;
          white-space:nowrap;
          text-overflow:ellipsis;
        }
        .van-sku__goods-price{
          width: 210px;
          height: 17px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          color: red;
        }
      }
    }
    .select{
      /*width: 345px;*/
      width: 92%;
      height: auto;
      /*max-height: 80px;*/
      /*background: fuchsia;*/
      margin: 20px auto;
      .title{
        font-size: 14px;
        padding-bottom: 13px;
      }
      .btn{
        min-width: 52px;
        height: 28px;
        border-radius: 3px;
        /*background: floralwhite;*/
        border: 1px solid #969799;
        padding: 5px 9px;
        margin: 0px 10px 10px 0px;
        color: #323233;
        font-size: 12px;
      }
    }

    .selectNum{
      /*width: 345px;*/
      width: 92%;
      /*background: forestgreen;*/
      padding: 15px 0px;
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title{
        font-size: 14px;
        /*padding-bottom: 13px;*/
        margin-left: 15px;
      }
      .count{
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        input{
          width: 33px;
          height: 26px;
          padding: 1px;
          border: 1px solid #ebedf0;
          border-width:1px 0;
          box-sizing:content-box;
          color:#7d7e80;
          font-size:14px;
          vertical-align:middle;
          text-align:center;
          -webkit-appearance:none;
        }
        .addorjian{
          width: 40px;
          height: 30px;
          box-sizing:border-box;
          background: #ffffff;
          border: 1px solid #ebedf0;
          /*padding:5px;*/
          border-radius:0 2px 2px 0;
          vertical-align:middle;
           display: flex;
          align-items: center;
          justify-content: center;

        }
      }
    }
  }
}
</style>
