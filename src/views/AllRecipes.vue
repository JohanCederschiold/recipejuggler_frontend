<template>
    <div class="screen">
        <h1>All recipes</h1>
        <div v-for="recipe in $store.state.allRecipes" :key="recipe.id" @click="chooseRecipe(recipe)">{{recipe.title}}</div>
        <app-recipe v-if="chosenRecipe !== ''" :recipe="chosenRecipe" :show="modalShow" v-on:closeModal="closeModal"></app-recipe>
    </div>
</template>
<script>
import Recipe from '../components/shared/Recipe.vue'
export default {
    methods: {
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
            modalShow: false,
            chosenRecipe: '',
            //allRecipes: []
        }
    },
    components: {
        'app-recipe': Recipe
    }
    
}
</script>
<style scoped>
    .screen {
        margin: 2rem;
    }
</style>