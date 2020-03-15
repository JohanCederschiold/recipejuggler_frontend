<template>
    <div>
        <b-modal hide-footer hide-header v-model="show">
            <h1>{{recipe.title}}</h1>
            
            <div>{{completeRecipe.instructions}}</div>
            <div>Tillagning: {{completeRecipe.preparationTimeMinutes}} minuter</div>
            <div>Antal portioner: {{completeRecipe.noPortions}} personer</div>
            <h2>Ingredienser</h2>
            <ul>
                <li v-for="ingredient in completeRecipe.ingredients" :key="ingredient.ingredientName">
                    {{getAmountsAsString(ingredient.amount, ingredient.units)}} {{ingredient.ingredientName}}
                </li>
            </ul>
            <h2>Steg</h2>
            <ol>
                <li v-for="step in completeRecipe.steps" :key="step.id">
                    {{step.instruction}}
                </li>
            </ol>
        <b-button class="mt-3" block @click="sendRecipeId(completeRecipe.recipeId, completeRecipe.title)">Add to list</b-button>
        <b-button class="mt-3" block @click="hideModal">Close Me</b-button>
        </b-modal>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            localEndpoint: '/recipe-ingredient/get/complete/id/',
            completeRecipe: {}
        }
    },
    methods: {
        renderURL(localEndpoint, id) {
            return this.$store.state.mainEndpoint + localEndpoint + id
        },
        fetchCompleteRecipe() {
            fetch(this.renderURL(this.localEndpoint, this.recipe.id)).then(response => { return response.json()})
                            .then(result => {this.completeRecipe = result})
        },
        hideModal(){
            this.$emit('closeModal')
        },
        sendRecipeId(recipeId, recipeTitle) {
            /*
            const ingredientsPerPortion = ingredients.map( item =>  { return { ...item, amount: item.amount / this.recipe.noPortions }})
            this.$store.commit('addAccumulatedIngredients', ingredientsPerPortion)*/
            
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