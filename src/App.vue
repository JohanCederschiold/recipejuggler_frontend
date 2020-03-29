<template>
  <div id="app">
      <app-navigation></app-navigation>
  </div>
</template>
<script>
import Navigation from './components/Navigation.vue'
export default {
  created() {
    this.$store.dispatch('getAllRecipes')
  },
  components: {
    'app-navigation': Navigation
  }
}
</script>
<style>

</style>
