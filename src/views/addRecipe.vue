<template>
    <div>
        <h1>Lägg till recept</h1>
        <p>Här kan du ladda upp ditt eget recept. Följ stegen för att börja</p>
        <app-recipedetails  v-on:recipeRegistered="registerId"></app-recipedetails>
    </div>
</template>
<script>
import Details from '../components/RecipeDetails.vue'
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
        'app-recipedetails': Details
    }   
}
</script>
<style scoped>

</style>