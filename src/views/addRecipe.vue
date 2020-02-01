<template>
    <div>
        {{registeredRecipe}}
        <app-recipedetails v-if="registeredRecipe === null"  v-on:recipeRegistered="registerRecipe"></app-recipedetails>
        <app-ingredients v-if="registeredRecipe !== null" :currentRecipe="registeredRecipe"></app-ingredients>

    </div>
</template>
<script>
import Details from '../components/RecipeDetails.vue'
import Ingredients from '../components/RecipeIngredients.vue'
export default {
    data: function(){
        return {
            registeredRecipe: null       
        }
    },
    methods: {
        registerRecipe(newid) {
            this.registeredRecipe = newid
        }
    },
    components: {
        'app-recipedetails': Details,
        'app-ingredients': Ingredients
    }   
}
</script>
<style scoped>

</style>