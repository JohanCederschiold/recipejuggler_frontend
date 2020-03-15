<template>
    <div class="screen">
        <app-recipedetails v-if="currentRegistrationStep === 1"  v-on:recipeRegistered="registerRecipe"></app-recipedetails>
        <app-ingredients v-if="currentRegistrationStep === 2" :currentRecipe="registeredRecipe"
        v-on:allIngredientsRegistered="allIngredientsRegistered"></app-ingredients>
        <app-steps v-if="currentRegistrationStep === 3" :currentRecipe="registeredRecipe" 
        v-on:closeAndReset="recipeComplete"></app-steps>

    </div>
</template>
<script>
import Details from '../components/AddRecipe/RecipeDetails.vue'
import Ingredients from '../components/AddRecipe/RecipeIngredients.vue'
import Steps from '../components/AddRecipe/RecipeSteps.vue'
export default {
    data: function(){
        return {
            registeredRecipe: null,
            currentRegistrationStep: 1
        }
    },
    methods: {
        registerRecipe(newid) {
            this.registeredRecipe = newid
            this.currentRegistrationStep = 2
        },
        allIngredientsRegistered() {
            this.currentRegistrationStep = 3
        },
        recipeComplete() {
            this.registeredRecipe = null
            this.currentRegistrationStep = 1
        }
    },
    components: {
        'app-recipedetails': Details,
        'app-ingredients': Ingredients,
        'app-steps': Steps
    }
}
</script>
<style scoped>
    .screen {
        margin: 2rem;
    }
</style>