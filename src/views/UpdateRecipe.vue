<template>
    <div v-if="recipeToUpdate !== null" class="content">
        <h1>Uppdatera recept</h1>
        <div v-if="updateStep === 1">
            <div>Kontrollera receptets detaljer och gå vidare.</div>
            <Details    :originalTitle="title" 
                        :originalInstructions="instructions"
                        :originalPreptime ="preptime"
                        :originalPortions ="portions"/>
        </div>
        <div v-if="updateStep === 2">
            <div>
                <div>Kontrollera receptets ingredienser och gå vidare.</div>
                <Ingredients    :ingredients="recipeToUpdate.ingredients"
                                :currentRecipe="recipeToUpdate"
                                class="ingredientBlock" />
            </div>
        </div>
        <div v-if="updateStep === 3">
            <div>Kontrollera receptets instruktioner och gå vidare.</div>
            <UpdateSteps    :steps="recipeToUpdate.steps"
                            :recipe="recipeToUpdate"
                            @moveBack="moveBackward"/>
        </div>
        <div class="navigationButtons">
            <b-button   @click="moveBackward" 
                        v-if="updateStep === 2"
                        variant="danger">
                            Bakåt
            </b-button>
            <b-button   @click="moveForward"
                        v-if="updateStep !==3"
                        variant="primary">
                            Gå vidare
            </b-button>
        </div>
    </div>
</template>
<script>
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
                fetch(this.$store.state.mainEndpoint + this.getCompleteRecipeEndpoint + this.$route.params.id)
                    .then(response => {return response.json()})
                    .then(result => this.recipeToUpdate = result)
            }
        },
        /*
        addToIngredients(newIngredient) {
            console.log(newIngredient)
            this.recipeToUpdate.ingredients.push(newIngredient)
        },*/
        moveForward() {
            if (this.updateStep !== this.numberOfUpdateSteps) {
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
            getCompleteRecipeEndpoint: '/recipe-ingredient/get/complete/id/',
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