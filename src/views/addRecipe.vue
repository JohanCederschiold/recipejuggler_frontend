<template>
    <div>
        <app-recipedetails v-if="recipeId === null"  v-on:recipeRegistered="registerId"></app-recipedetails>
        <app-ingredients v-if="recipeId !== null" :recipeId="recipeId"></app-ingredients>

    </div>
</template>
<script>
import Details from '../components/RecipeDetails.vue'
import Ingredients from '../components/RecipeIngredients.vue'
export default {
    data: function(){
        return {
            recipeId: null            
        }
    },
    methods: {
        registerId(newid) {
            this.recipeId = newid
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