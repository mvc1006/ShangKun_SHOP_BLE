<template>
  <div class="hello">
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      disabled-text=""
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
    export default {
        name: "ReceAddress",
        data() {
          return {
            chosenAddressId: '1',
            list: [
              // {
              //   id: '1',
              //   name: '张三',
              //   tel: '13000000000',
              //   address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
              // },
              // {
              //   id: '2',
              //   name: '李四',
              //   tel: '1310000000',
              //   address: '浙江省杭州市拱墅区莫干山路 50 号'
              // }
            ],
          }
        },
        created(){
          // console.log(this.list.length===0);
          // if(this.list.length===0){
          //   this.$router.push('EditOrAddReceAddress');
          // }
        },
        methods: {
          onAdd() {
            this.$router.push('EditOrAddReceAddress')
          },

          onEdit(item, index) {
            this.$router.push('EditOrAddReceAddress')
          }
        }
    }
</script>

<style scoped lang="less">
  .hello{
    margin-top: 10px;
  }
</style>
