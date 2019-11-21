import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index'
import home from '../pages/home'
import msg from '../pages/msg'
import cart from '../pages/cart'
import my from '../pages/my'
import detail from '../pages/detail'
import props from '../components/detail/props'
import login from '../pages/login'
import reg from '../pages/reg'

import vip from '../pages/admin/vip'
import user from '../pages/admin/user'
import shop from '../pages/admin/shop'
import classs from '../pages/admin/classs'
import banner from '../pages/admin/banner'
import admin_index from '../pages/admin/admin_index'

import shopadd from '../pages/admin/shopadd'
import banneradd from '../pages/admin/banneradd'

import admin_login from '../pages/admin/admin_login'

Vue.use(Router)

export default new Router({

  routes: [
    {
      path: '/index',
      redirect: '/index/home'
    },
    {
      path: "/index",
      component: index,
      children: [{
          path: "home",
          component: home
        },
        {
          path: "msg",
          component: msg
        },
        {
          path: "cart",
          component: cart
        },
        {
          path: "my",
          component: my
        }
      ]
    },
    {
      path: '/detail',
      component: detail
    },
    {
      path: "/props",
      component: props
    },
    {
      path: "/login",
      component: login
    },
    {
      path: "/reg",
      component: reg
    },
    {
      path: '/',
      redirect: '/admin_index'
    },
    {
      path: '/admin_index',
      component: admin_index,
      children: [
        {
          path: 'user',
          component: user
        },
        {
          path: 'vip',
          component: vip
        },
        {
          path: 'classs',
          component: classs
        },
        {
          path: 'shop',
          component: shop
        },
        {
          path: 'banner',
          component: banner
        },
        {
          path:'shopadd',
          component:shopadd
        },
        {
          path:'banneradd',
          component:banneradd
        },
        {
          path:'admin_login',
          component:admin_login
        },
      ]
    },
    
  ]
})
