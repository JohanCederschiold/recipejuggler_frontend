<template>
    <div v-if="recipeToUpdate !== null" class="content">
        <h1>Uppdatera recept</h1>
        <div v-if="updateStep === 1">
            <div>Kontrollera receptets detaljer och gå vidare.</div>
            <Details    :originalTitle="title" 
                        :originalInstructions="instructions"
                        :originalPreptime ="preptime"
                        :originalPortions ="portions"
                        :currentRecipe="recipeToUpdate"
                        @nextStep="moveForward"/>
        </div>
        <div v-if="updateStep === 2">
            <div>
                <div>Kontrollera receptets ingredienser och gå vidare.</div>
                <Ingredients    :ingredients="recipeToUpdate.ingredients"
                                :currentRecipe="recipeToUpdate"
                                @goBack="moveBackward"
                                @goForward="moveForward"
                                class="ingredientBlock" />
            </div>
        </div>
        <div v-if="updateStep === 3">
            <div>Kontrollera receptets instruktioner och gå vidare.</div>
            <UpdateSteps    :steps="recipeToUpdate.steps"
                            :recipe="recipeToUpdate"
                            @moveBack="moveBackward"/>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import ENDPOINTS from '@/constants/endpoints.json'
import Details from '@/components/UpdateRecipe/RecipeDetails.vue'
import Ingredients from '@/components/UpdateRecipe/ListIngredients.vue'
import UpdateSteps from '@/components/UpdateRecipe/UpdateSteps.vue'
export default {
    created() {
        this.getCompleteRecipe()
    },
    methods: {
        getCompleteRecipe() {
            if (this.$route.params.id !== undefined && this.$route.params.id !== undefined) {
                axios.get(ENDPOINTS.MAIN + ENDPOINTS.GET_RECIPE + this.$route.params.id)
                    .then(response => this.recipeToUpdate = response.data)
            }
        },
        moveForward() {
            if (this.updateStep !== this.numberOfUpdateSteps && this.recipeToUpdate.owner === this.$store.state.userid) {
                this.updateStep++
            } 
        },
        moveBackward() {
            if (this.updateStep !== 1 ) {
                this.updateStep--
            }
        }
    },
    data: function () {
        return {
            recipeToUpdate: null,
            title: this.$route.params.title,
            instructions: this.$route.params.instructions,
            preptime: this.$route.params.preparationTimeMinutes,
            portions: this.$route.params.noPortions,
            updateStep: 1,
            numberOfUpdateSteps: 3
        }
    },
    components: {
        Ingredients,
        UpdateSteps,
        Details
    }
}
</script>
<style scoped>
    .content {
        margin: 3rem;
    }

    .navigationButtons {
        margin-top: 2rem;
        margin-bottom: 2rem;
    }

    .ingredientBlock {
        margin-top: 1rem;
    }
</style>