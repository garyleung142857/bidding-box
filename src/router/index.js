import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BoxSelect from '../views/BoxSelect.vue'
// import BoxSelect2 from '../views/BoxSelect2.vue'
import BiddingTable from '../views/BiddingTable.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {path: '/boxselect', name: 'BoxSelect', component: BoxSelect},
  // {path: '/boxselect2', name: 'BoxSelect2', component: BoxSelect2},
  {path: '/biddingtable', name: 'BiddingTable', component: BiddingTable}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
