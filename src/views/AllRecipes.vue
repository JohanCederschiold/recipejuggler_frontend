<template>
    <div>
        <div v-for="recipe in allRecipes" :key="recipe.id" @click="chooseRecipe(recipe)">{{recipe.title}}</div>
        <app-recipe v-if="chosenRecipe !== ''" :recipe="chosenRecipe" :show="modalShow" v-on:closeModal="closeModal"></app-recipe>
    </div>
</template>
<script>
import Recipe from '../components/shared/Recipe.vue'
export default {
    created: function () {
        this.fetchRecipes()
    },
    methods: {
        fetchRecipes() {
            fetch(this.renderedEndpoint).then(response => response.json())
                .then(result => { this.allRecipes = result})
        },
        chooseRecipe(aRecipe) {
            this.modalShow = true
            this.chosenRecipe = aRecipe
        },
        closeModal() {
            this.modalShow = false
        }
    },
    data : function () {
        return {
            localeEndpoint: '/recipe/all',
            modalShow: false,
            chosenRecipe: '',
            allRecipes: []
        }
    },
    computed: {
        renderedEndpoint: function() {
            return this.$store.state.mainEndpoint + this.localeEndpoint
        }
    },
    components: {
        'app-recipe': Recipe
    }
    
}
</script>
<style scoped>

</style>