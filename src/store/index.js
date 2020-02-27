import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mainEndpoint: 'http://localhost:8080',
    chosenDrinks: []
  },
  mutations: {
    addChosenDrinkId(state, recipe) {
      state.chosenDrinks.push(recipe)
    } 
  },
  actions: {
  },
  modules: {
  }
})
