import Vue from 'vue'
import VueRouter from 'vue-router'
import AddRecipe from '../views/AddRecipe.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/addrecipe',
    name: 'about',
    component: AddRecipe
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
