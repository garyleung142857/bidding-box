import Vue from 'vue'
import VueRouter from 'vue-router'
import BiddingMain from '../views/BiddingMain.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/', name: 'BiddingMain', component: BiddingMain}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
