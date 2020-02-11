<template>
    <div>
        <b-modal hide-footer v-model="show" :title="recipe.title">
            <p> Portions: {{recipe.noPortions}} 
                Preparationtime: {{recipe.preparationTimeMinutes}} minutes
            </p>
            <p>{{recipe.instructions}}</p>
            <div>
                <ul>
                    <li v-for="ingredient in ingredients" :key="ingredient.id">{{getIngredientsName(ingredient.ingredientId)}}</li>
                </ul>
            </div>
            <div>
                <ol>
                    <li v-for="step in steps" :key="step.id">{{step.instruction}}</li>
                </ol>
            </div>
            <b-button class="mt-3" block @click="hideModal">Close Me</b-button>
        </b-modal>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            steps: null,
            ingredients: null,
            allIngredients: null,
            readableIngredients: null,
            localeGetStepsEndpoint: '/steps/find/recipesteps/',
            localeGetIngredientsEndpoint: '/recipe-ingredient/get/id/',
            localeGetAllIngredients: '/ingredient/all'
        }
    },
    methods: {
        renderURL(localeEndpoint, id) {
            return this.$store.state.mainEndpoint + localeEndpoint + id
        },
        hideModal() {
            this.$emit('closeModal')
        },
        getIngredientsName(id) {
            
            for (let i=0; i < this.allIngredients.length ; i++) {
                if(this.allIngredients[i].id === id) {
                    return this.allIngredients[i].name
                }
            }
        },
        fetchSteps() {
            fetch(this.renderURL(this.localeGetStepsEndpoint, this.recipe.id))
            .then(response => {
                return response.json()
            })
            .then(result => {
                this.steps = result
            })
        },
        fetchIngredients() {
            fetch(this.renderURL(this.localeGetIngredientsEndpoint, this.recipe.id))
            .then(response => {
                return response.json()
            })
            .then(result => {
                this.ingredients = result
            })
        },
        fetchAllIngredients() {
            fetch(this.renderURL(this.localeGetAllIngredients, ''))
            .then(response => {
                return response.json()
            })
            .then(result => {
                this.allIngredients = result
            }) 
        }
    },
    watch: {
        recipe: function(){
            this.fetchSteps()
            this.fetchIngredients()
        }
    },
    props: ['recipe', 'show'],
    created() {
        this.fetchAllIngredients()
        this.fetchSteps()
        this.fetchIngredients()
    }
    
}
</script>
<style scoped>

</style>