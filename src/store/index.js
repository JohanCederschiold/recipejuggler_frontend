import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import ENDPOINTS from '@/constants/endpoints.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chosenDrinks: [],
    allRecipes: null,
    allIngredients: null,
    userid: null,
    loggedin: false

  },
  mutations: {
    setUser(state, userid){
      console.log('Called', userid)
      if(userid !== null ) {
        state.userid = userid,
        state.loggedin = true
      } else {
        state.userid = null
        state.loggedin = false
      }
    },
    addChosenDrinkId(state, recipe) {
      recipe.id = new Date().getTime()
      state.chosenDrinks.push(recipe)
    },
    removeRecipe(state, idToRemove) {
      const newRecipes = state.chosenDrinks.filter(item => item.id !== idToRemove)
      console.log(newRecipes)
      state.chosenDrinks = newRecipes
    },
    setAllRecipes(state, allRecipes) {
      state.allRecipes = allRecipes
    },
    setAllIngredients(state, allIngredients) {
      state.allIngredients = allIngredients
    }
  },
  actions: {
    getAllRecipes({commit}) {
      axios.get(ENDPOINTS.MAIN + ENDPOINTS.ALL_RECIPES)
        .then(response => commit('setAllRecipes', response.data))
      
    },
    getAllIngredients({commit}) {
      axios.get(ENDPOINTS.MAIN + ENDPOINTS.ALL_INGREDIENTS)
        .then(response => commit('setAllIngredients', response.data))
    }
  },
  modules: {
  }
})
