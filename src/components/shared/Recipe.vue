<template>
    <div>
        <b-modal hide-footer hide-header v-model="show">
            <h1>{{recipe.title}}</h1>
            <div>{{completeRecipe.instructions}}</div>
            <div>Tillagning: {{completeRecipe.preparationTimeMinutes}} minuter</div>
            <div>Antal portioner: {{completeRecipe.noPortions}} personer</div>
            <h2>Ingredienser</h2>
            <ul>
                <li v-for="ingredient in completeRecipe.ingredients" :key="ingredient.id">
                    {{getAmountsAsString(ingredient.amount, ingredient.units)}} {{ingredient.ingredientName}}
                </li>
            </ul>
            <h2>Steg</h2>
            <ol>
                <li v-for="step in sortedSteps" :key="step.id">
                    {{step.instruction}}
                </li>
            </ol>
        <b-button class="mt-3" block @click="sendRecipeId(completeRecipe.recipeId, completeRecipe.title)">Add to list</b-button>
        <b-button class="mt-3" block @click="hideModal">Close Me</b-button>
        <b-button class="mt-3" block @click="updateRecipe" v-if="$store.state.userid === recipe.owner">Update</b-button>
        </b-modal>
    </div>
</template>
<script>
import axios from 'axios'
import Endpoints from '@/constants/endpoints.json'
export default {
    data: function () {
        return {
            completeRecipe: {},
            sortedSteps: []
        }
    },
    methods: {
        updateRecipe() {
            this.$router.push({name : 'update', params: this.recipe} )
        },
        fetchCompleteRecipe() {
            axios.get(Endpoints.MAIN + Endpoints.GET_RECIPE + this.recipe.id)
                            .then(response => {
                                this.completeRecipe = response.data
                                this.sortedSteps = JSON.parse(JSON.stringify(response.data.steps)).sort(this.compare)
                            })
        },
        hideModal(){
            this.$emit('closeModal')
        },
        sendRecipeId(recipeId, recipeTitle) {          
            this.$store.commit('addChosenDrinkId', { recipeId: recipeId, title: recipeTitle})

        }, 
        getAmountsAsString(amount, unit) {
            switch (unit) {
                case 'AMOUNT' : 
                    return amount + ' st'
                case 'WEIGHT' :
                    if(amount % 1000 === 0) {
                        return amount / 1000 + ' kg'
                    } else if(amount % 100 === 0) {
                        return amount / 100 + ' hg'
                    }  else {
                        return amount + ' g'
                    } 
                case 'VOLUME' : 
                    if (amount % 1000 === 0 ) {
                        return amount / 1000 + ' l'
                    } else if (amount % 100 === 0 ) {
                        return amount / 100 + ' dl'
                    } else if (amount % 10 === 0 ) {
                        return amount / 10 + ' cl'
                    } else {
                        return amount + ' ml'
                    }
            }

        },
        compare(a, b) { //used by the sort methods
                if (a.sequence > b.sequence ) {
                    return 1
                } else if (a.sequence < b.sequence ) {
                    return -1
                } else {
                    return 0
                }
        }

    },
    props : ['recipe', 'show'],
    created() {
        this.fetchCompleteRecipe()
    }, 

    watch: {
        recipe: function () {
            this.fetchCompleteRecipe()
        }
    }

}
</script>
<style scoped>

</style>