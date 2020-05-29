<template>
  <div id="app">
      <app-navigation></app-navigation>
  </div>
</template>
<script>
import Navigation from './components/navigation.vue'
export default {
  created() {
    this.$store.dispatch('getAllRecipes')
    this.$store.dispatch('getAllIngredients')
  },
  components: {
    'app-navigation': Navigation
  }
}
</script>
<style>

</style>
