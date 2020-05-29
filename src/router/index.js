import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import AddRecipe from '../views/AddRecipe.vue'
import AllRecipes from '../views/AllRecipes.vue'
import List from '../views/List.vue'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Update from '../views/UpdateRecipe.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

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
    component: Home,
    meta: {
      requiresAuth: false,
    },

  },
  {
    path: '/allrecipes',
    name: 'allrecipes',
    component: AllRecipes,
    meta: {
      requiresAuth: false,
    },

  },
  {
    path: '/list',
    name: 'recipelist',
    component: List,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    meta: {
      requiresAuth: false,
    },

  },
  {
    path: '/update',
    name: 'update',
    component: Update
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false,
    },

  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresAuth: false,
    },
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) =>  {
  if(!( to.name === 'login' || 
        to.name === 'register' || 
        to.name === 'allrecipes' ||
        to.name === 'recipelist' ||
        to.name === 'search' ||
        to.name === 'home'
        ) && !store.state.loggedin) {
    next({name: 'login'})
  } else {
    next()
  }
})


export default router
