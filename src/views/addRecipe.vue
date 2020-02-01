<template>
    <div>
        {{registeredRecipe}}
        <app-recipedetails v-if="currentRegistrationStep === 1"  v-on:recipeRegistered="registerRecipe"></app-recipedetails>
        <app-ingredients v-if="currentRegistrationStep === 2" :currentRecipe="registeredRecipe"
        v-on:allIngredientsRegistered="allIngredientsRegistered"></app-ingredients>
        <app-steps v-if="currentRegistrationStep === 3" :currentRecipe="registeredRecipe"></app-steps>

    </div>
</template>
<script>
import Details from '../components/RecipeDetails.vue'
import Ingredients from '../components/RecipeIngredients.vue'
import Steps from '../components/RecipeSteps.vue'
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
            alert('Registered')
            this.currentRegistrationStep = 3
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

</style>