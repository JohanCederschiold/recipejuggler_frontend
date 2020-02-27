<template>
    <div>
        <div>
            {{chosenIds}}
        </div>
        <div>
            {{accumulatedIngredients}}
        </div>
    </div>
</template>
<script>
export default {
    created: function () {
        this.fetchIngredientsForChosenRecipes()
    }, 
    data: function () {
        return {
            localEndpoint: '/recipe-ingredient/post/listRecipeIngredients',
            recipeAndIngredients: [],
            accumulatedIngredients: []
        }
    },
    computed : {
        chosenIds: function () {
            return this.$store.state.chosenDrinks.map(item => item.id)
        }
    },
    methods: {
        fetchIngredientsForChosenRecipes() {
            fetch(this.$store.state.mainEndpoint + this.localEndpoint, {
                method: 'POST',
                headers: {
                    'Content-type':'application/json'
                }, 
                body: JSON.stringify( {recipeIds:  this.chosenIds} )
            })
            .then(response => {return response.json()})
            .then(result => this.recipeAndIngredients = result)
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

</style>