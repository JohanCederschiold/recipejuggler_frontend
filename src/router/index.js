import Vue from 'vue'
import VueRouter from 'vue-router'
import AddRecipe from '../views/AddRecipe.vue'
import AllRecipes from '../views/AllRecipes.vue'
import List from '../views/List.vue'
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
  },
  {
    path: '/allrecipes',
    name: 'allrecipes',
    component: AllRecipes
  },
  {
    path: '/list',
    name: 'recipelist',
    component: List
  },
]

const router = new VueRouter({
  routes
})

export default router
