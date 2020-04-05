<template>
    <div v-if="recipeToUpdate !== null">
        <div>
            <div>Titel</div>
            <input type="text" v-model="title">
        </div>
        <div>
            <div>Beskrivning</div>
            <input type="text" v-model="instructions">
        </div>
        <div>
            <div>Tillagningstid</div>
            <input type="text" v-model="preptime">
        </div>
        <div>
            <div>Antal portioner</div>
            <input type="text" v-model="portions">
        </div>
        <div>
            <Ingredients :ingredients="recipeToUpdate.ingredients" />
        </div>
        <div>
            <AddIngredient :recipeId="recipeToUpdate.recipeId" v-on:addToIngredientList="addToIngredients"/>
        </div>
    </div>
</template>
<script>
import Ingredients from '@/components/shared/ListIngredients.vue'
import AddIngredient from '@/components/shared/AddIngredient.vue'
export default {
    created() {
        this.getCompleteRecipe()
    },
    methods: {
        getCompleteRecipe() {
            if (this.$route.params.id !== undefined && this.$route.params.id !== undefined) {
                fetch(this.$store.state.mainEndpoint + this.getCompleteRecipeEndpoint + this.$route.params.id)
                    .then(response => {return response.json()})
                    .then(result => this.recipeToUpdate = result)
            }
        },
        addToIngredients(newIngredient) {
            console.log(newIngredient)
            this.recipeToUpdate.ingredients.push(newIngredient)
        }
    },
    data: function () {
        return {
            getCompleteRecipeEndpoint: '/recipe-ingredient/get/complete/id/',
            recipeToUpdate: null,
            title: this.$route.params.title,
            instructions: this.$route.params.instructions,
            preptime: this.$route.params.preparationTimeMinutes,
            portions: this.$route.params.noPortions
        }
    },
    components: {
        Ingredients,
        AddIngredient
    }
}
</script>
<style scoped>

</style>