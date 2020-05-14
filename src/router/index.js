import Vue from 'vue'
import VueRouter from 'vue-router'
import AddRecipe from '../views/AddRecipe.vue'
import AllRecipes from '../views/AllRecipes.vue'
import List from '../views/List.vue'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Update from '../views/UpdateRecipe.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/addrecipe',
    name: 'about',
    component: AddRecipe
  },
  {
    path: '/',
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
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/update',
    name: 'update',
    component: Update
  },
]

const router = new VueRouter({
  routes
})

export default router
