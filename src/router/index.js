import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/components/Index'
// import Mine from '@/components/Mine'
const Index = r => require.ensure([], () => r(require('@/components/Index')), 'Index');
const Mine = r => require.ensure([], () => r(require('@/components/Mine')), 'Mine');
const UserInfo = r => require.ensure([], () => r(require('@/page/mine/UserInfo')), 'UserInfo');
const ReceAddress = r => require.ensure([], () => r(require('@/page/mine/ReceAddress')), 'ReceAddress');
const EditOrAddReceAddress = r => require.ensure([], () => r(require('@/page/mine/EditOrAddReceAddress')), 'EditOrAddReceAddress');
const ProdcutDetail = r => require.ensure([], () => r(require('@/page/index/ProdcutDetail')), 'ProdcutDetail');
const SubOder = r => require.ensure([], () => r(require('@/page/index/SubOder')), 'SubOder');
const EditOrAddReceAddress_ble = r => require.ensure([], () => r(require('@/page/mine/EditOrAddReceAddress_ble')), 'EditOrAddReceAddress_ble');




Vue.use(Router)   
export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/Index',
      component: Index
    },
    {
      path: '/Mine',
      component: Mine,
    },
    {
      path: '/ProdcutDetail',
      component: ProdcutDetail,
    },
    {
      path: '/SubOder',
      component: SubOder,
    },
    {
      path: '/UserInfo',
      component: UserInfo
    },
    {
      path: '/ReceAddress',
      component: ReceAddress
    },
    {
      path: '/EditOrAddReceAddress',
      component: EditOrAddReceAddress
    },
    {
      path: '/EditOrAddReceAddress_ble',
      component: EditOrAddReceAddress_ble
    },
  ]
})
