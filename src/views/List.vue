<template>
    <div class="screen">
        <h1>Ingredienser</h1>
        <label>
            Antal portioner
        </label>
        <input type="text" v-model="noServings" />
        <div>
            <ul>
                <li v-for="ingredient in accumulatedIngredients" :key="ingredient.ingredientName">
                    {{getUnitString(ingredient.amount * noServings, ingredient.units)}} of {{ingredient.ingredientName}}
                </li>
            </ul>
        </div>
        <h1>Recept</h1>
        <div>
            <ul>
                <li v-for="recipe in this.$store.state.chosenDrinks" :key="recipe.id">
                    {{recipe.title}}
                    <b-button variant="danger" @click="removeRecipe(recipe.id)">Remove</b-button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import ENDPOINTS from '@/constants/endpoints.json'
export default {
    created: function () {
        this.fetchIngredientsForChosenRecipes()
    }, 
    data: function () {
        return {
            recipeAndIngredients: [],
            accumulatedIngredients: [],
            noServings: 4
        }
    },
    computed : {
        chosenIds: function () {
            return this.$store.state.chosenDrinks.map(item => item.recipeId)
        }
    },
    methods: {
        removeRecipe(id) {
            this.$store.commit('removeRecipe', id)
            this.fetchIngredientsForChosenRecipes()

        },
        getUnitString(amount, unit) {
            switch (unit) {
                case 'AMOUNT': 
                    return amount + 'st'
                case 'WEIGHT': 
                    return this.getWeightString(amount)
                case 'VOLUME':
                    return this.getVolumeString(amount)
            }
        },
        getVolumeString(amount) {
            if (amount % 1000 === 0) {
                return amount / 1000 + ' l'
            } else if (amount % 100 === 0 ) {
                return amount / 100 + ' dl'
            } else if (amount % 10 === 0 ) {
                return amount / 10 + ' cl'
            } else {
                return amount + ' ml'
            }
        }, 
        getWeightString(amount) {
            if (amount % 1000 === 0) {
                return amount / 1000 + ' kg'
            }  else if (amount % 100 === 0 ) {
                return amount / 100 + ' hg'
            } else {
                return amount + ' g'
            }
        },
        fetchIngredientsForChosenRecipes() {
            axios.post(ENDPOINTS.MAIN + ENDPOINTS.RECIPE_INGREDIENTS_LIST, {recipeIds:  this.chosenIds})
                .then(response => this.recipeAndIngredients = response.data )
        },
        accumulateIngredients() {
            let accumulated = []
            for(let i = 0 ; i < this.recipeAndIngredients.length ; i++) {
                console.log('run')
                let found = false
                for(let j = 0 ; j < accumulated.length ; j++) {
                    if (this.recipeAndIngredients[i].ingredientName === accumulated[j].ingredientName) {
                        accumulated[j].amount += this.recipeAndIngredients[i].amount
                        found=true
                    } 
                }
                if(!found) {
                    accumulated.push(this.recipeAndIngredients[i])
                }
            }
            this.accumulatedIngredients = accumulated
        }
    },
    watch : {
        recipeAndIngredients: function() {
            this.accumulateIngredients()
        }
    }
    
}
</script>
<style scoped>
    h1 {
        padding: 50;
        margin: 50;
        color: 'red';
    }

    .screen {
        margin: 2rem;
    }

    input {
        margin-left: 1rem;
        padding: 0.5rem;
    }

</style>