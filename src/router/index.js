import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import MyOrder from '@/views/myorder'
import Pay from '@/views/pay'
import Prodetail from '@/views/prodetail'
import Search from '@/views/search'
import SearchList from '@/views/search/list.vue'
import Home from '@/views/layout/home.vue'
import Cart from '@/views/layout/cart.vue'
import Category from '@/views/layout/category.vue'
import User from '@/views/layout/user.vue'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/home',
          component: Home
        },
        {
          path: '/cart',
          component: Cart
        },
        {
          path: '/category',
          component: Category
        },
        {
          path: '/user',
          component: User
        }
      ]
    },
    {
      path: '/myorder',
      component: MyOrder
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/searchlist',
      component: SearchList
    },
    {
      path: '/pay',
      component: Pay
    },
    {
      path: '/prodetail/:id',
      component: Prodetail
    }
  ]
})

const authUrl = ['/pay', '/myorder']

router.beforeEach((to, from, next) => {
  if (!authUrl.includes(to.path)) {
    next()
    return
  }

  if (store.getters.token) {
    next()
  } else {
    next('/login')
  }
})

export default router
