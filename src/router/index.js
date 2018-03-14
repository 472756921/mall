import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import m from '@/page/momIndex';

import m_index from '@/page/bf/mall/m_index'
import m_home from '@/page/bf/mall/home/m_home'
import m_car from '@/page/bf/mall/goods/m_car'
import m_goodsList from '@/page/bf/mall/goods/m_goodsList'
import m_pay from '@/page/bf/mall/goods/m_pay'
import m_good from '@/page/bf/mall/goods/m_good'
import addresses from '@/page/bf/mall/addresses'
import order from '@/page/bf/mall/order'

import adminIndex from '@/page/af/adminIndex'
import mallIndex from '@/page/af/mallIndex'
import addGodds from '@/page/af/addGodds'
import editGodds from '@/page/af/editGodds'
import headImg from '@/page/af/headImg'
import oderList from '@/page/af/oderList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/m',
      name: 'm',
      component: m,
      meta: {
        title: '回复患者'
      }
    },
    {
      path: '/m_index',
      name: 'm_index',
      component: m_index,
      children: [
        {
          path: 'home',
          name: 'm_home',
          component: m_home,
        },
        {
          path: 'addresses',
          name: 'addresses',
          component: addresses,
        },
        {
          path: 'm_car',
          name: 'm_car',
          component: m_car,
        },
        {
          path: 'order',
          name: 'order',
          component: order,
        },
        {
          path: 'm_goodsList/:id',
          name: 'm_goodsList',
          component: m_goodsList,
        },
        {
          path: 'm_pay',
          name: 'm_pay',
          component: m_pay,
        },
        {
          path: 'm_good/:id',
          name: 'm_good',
          component: m_good,
        },
      ],
    },
    {
      path: '/admin',
      name: 'admin',
      component: adminIndex,
      children: [
        {
          path: 'mallIndex',
          name: 'mallIndex',
          component: mallIndex,
        },
        {
          path: 'addGodds',
          name: 'addGodds',
          component: addGodds,
        },
        {
          path: 'editGodds',
          name: 'editGodds',
          component: editGodds,
        },
        {
          path: 'headImg',
          name: 'headImg',
          component: headImg,
        },
        {
          path: 'oderList',
          name: 'oderList',
          component: oderList,
        },
      ],
    },
  ]
})
