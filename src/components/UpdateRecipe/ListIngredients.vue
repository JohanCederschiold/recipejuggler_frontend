<template>
    <div>
        <h3>Ingredienser</h3>
        <div v-for="ingredient in ingredients" :key="ingredient.id">
            <div>
                <b-button pill @click="deleteIngredient(ingredient.id)" variant="danger">x</b-button>
                {{getAmountsAsString(ingredient.amount, ingredient.units)}} av {{ingredient.ingredientName}}
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    props: ['ingredients'],
    methods: {
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
        increaseUnit() {
            if(this.unitNavigation >= this.weights.length - 1) {
                this.unitNavigation = 0
            } else {
                this.unitNavigation++
            }
        },
        decreaseUnit() {
            if(this.unitNavigation === 0) {
                this.unitNavigation = this.weights.length - 1
            } else {
                this.unitNavigation--
            }
        },
        deleteIngredient(id) {
            axios.delete(this.$store.state.mainEndpoint + this.localDeleteEndpoint + id)
                .then(result => {
                    if(result.status === 202){
                        const filteredArray = this.ingredients.filter(item => item.id !== id)
                        this.ingredients = filteredArray
                    } 
                })
        }
    },
    data: function () {
        return {
            changeUnitFor: null,
            value: 0,

            unitNavigation: 0,
            weights: [{value: 1, text: "gr"}, {value: 100, text: "hg"}, {value: 1000, text: "kg"} ],
            localUpdateEndpoint: '/recipe-ingredient/update',
            localDeleteEndpoint: '/recipe-ingredient/delete/'
        }
    },
    components: {

    }
    
}
</script>
<style scoped>

    .inputingredient {
        margin-left: 1rem;
        margin-right: 1rem;
    }

</style>