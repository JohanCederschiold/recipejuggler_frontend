<template>
    <div>
        <div>{{this.$store.state.chosenDrinks}}</div>
        <div>{{accumulated}}</div>
        <button @click="makeUniqueIngredients">Press</button>
        <div>Rawlength: {{rawData.length}} Fetchrounds: {{numberOfFetchrounds}}</div>
        <div v-for="data in finishedArray" :key="data.id">{{data}}</div>
    </div>
</template>
<script>
    export default {
        created() {
            console.log('Created run')
            this.getCompleteIngredients()
            
        },
        data: function() {
            return {
                accumulated : [],
                numberOfFetchrounds : 0,
                numberToFeed: 4,
                finishedArray: []
            }
        },
        methods: {
            getCompleteIngredients() {
                this.accumulated = []
                this.finishedLoading = []
                for(let i = 0 ; i < this.rawData.length ; i++ ) {
                    fetch(this.$store.state.mainEndpoint + '/recipe-ingredient/get/id/' + this.rawData[i].id)
                    .then(response => {return response.json()})
                    .then(result => result.forEach( element => {
                        let newIngredient = {
                            id: this.getRandomId(),
                            recipeId: element.recipeId,
                            ingredientId: element.ingredientId,
                            amount: element.amount / this.rawData[i].portions
                        }
                        console.log(newIngredient)
                        this.accumulated.push(newIngredient)
                    })).then(this.numberOfFetchrounds++)
                }
            },
            getRandomId() {
                return new Date().getTime() - Math.floor(Math.random() * 10000)
            },
            makeUniqueIngredients() {
                let temporaryArray = []
                console.log('Entering accumulation mode', this.finishedArray.length)
                for(let i = 0 ; i < this.accumulated.length ; i++ ) {
                    let found = false
                    for(let j=0 ; j<temporaryArray.length ; j++) {
                        if(temporaryArray[j].ingredientId === this.accumulated[i].ingredientId) {
                            console.log('Before', temporaryArray[j].amount)
                            temporaryArray[j].amount += this.accumulated[i].amount
                            console.log('After', temporaryArray[j].amount)
                            found = true
                        }
                    }
                    if(!found) {
                        temporaryArray.push(this.accumulated[i])
                        console.log('Not found')
                    }  
                }
                this.finishedArray = temporaryArray
            }
        }, 
        computed: {
            rawData: function ( ){
                return this.$store.state.chosenDrinks
            }
        },
        watch: {
            numberOfFetchrounds: function() {
                if(this.numberOfFetchrounds === this.rawData.length) {
                    setTimeout(this.makeUniqueIngredients, 500)
                }
            }
        },

    }
</script>
<style scoped>

</style>