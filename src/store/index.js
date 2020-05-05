import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import ENDPOINTS from '@/constants/endpoints.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mainEndpoint: 'http://localhost:8080',
    chosenDrinks: [],
    allRecipes: null,
    allIngredients: null
  },
  mutations: {
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
