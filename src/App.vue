<template>
  <div id="app">
      <app-navigation></app-navigation>
  </div>
</template>
<script>
import Navigation from './components/Navigation.vue'
export default {
  created() {
    this.getAllRecipes()
  },
  methods: {
    getAllRecipes() {
        fetch(this.renderedEndpoint).then(response => response.json())
              .then(result => this.$store.commit('setAllRecipes', result))
    }
  }, 
  data: function() {
    return {
      allRecipesEndpoint: '/recipe/all'
    }
  },
  computed: {
    renderedEndpoint: function () {
      return this.$store.state.mainEndpoint + this.allRecipesEndpoint
    }
  },
  components: {
    'app-navigation': Navigation
  }
  
}
</script>
<style>

</style>
