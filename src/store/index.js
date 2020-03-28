import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mainEndpoint: 'http://localhost:8080',
    chosenDrinks: [],
    allRecipes: null
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
    }
  },
  actions: {
  },
  modules: {
  }
})
