<template>
      <van-tabbar
        v-model="active"
        @change="tab"
        active-color="#07c160">
        <van-tabbar-item icon="shop-o" to="Index">商城</van-tabbar-item>
        <van-tabbar-item icon="user-o" to="Mine">我的</van-tabbar-item>
      </van-tabbar>
</template>

<script>
    export default {
        name: "FooterTab",
        data(){
            return{
              active:0
            }
        },
        created(){
          console.log(this.$router.history.current);
          console.log(this.$router.history.current.path.replace('/',''));
          if(this.$router.history.current.path.replace('/','')==='Mine'){
              this.active = 1;
          }
        },
        // watch:{
        //   $route(to,from){
        //     console.log(to);
        //     console.log(1111111111);
        //     // console.log(to.path.replace('/',''));
        //     // if(to.path.replace('/','')==='EditCompony'){
        //     //   this.Active = 'EditCompony';
        //     // }
        //   }
        // },
        methods:{
          tab(e){
            console.log(e);
          }
        }
    }
</script>

<style scoped lang="less">

</style>
