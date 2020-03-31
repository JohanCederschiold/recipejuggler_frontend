<template>
    <div>
        <h1>Ingredienser</h1>
        <div v-for="ingredient in ingredients" :key="ingredient.id">
            <div v-if="changeUnitFor ===ingredient.id">
                    <input type="text" placeholder="Hur mycket (ex 2)">
                    <span class="inputingredient">
                        <b-button @click="decreaseUnit">-</b-button>
                        <input type="text" disabled :value="weights[unitNavigation].text">
                        <b-button @click="increaseUnit">+</b-button>
                    </span>
                <b-button>Ändra</b-button>
                <b-button @click="changeUnitFor = null">Ångra</b-button>
            </div>
            <div v-else>
                {{getAmountsAsString(ingredient.amount, ingredient.units)}} av {{ingredient.ingredientName}}
            </div>
            <b-button @click="changeUnitFor = ingredient.id">Ändra</b-button>
            <b-button @click="deleteIngredient(ingredient.id)">Ta bort</b-button>
        </div>
        <b-button>Lägg till</b-button>
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

/*
        updateIngredient() {
            axios.put(this.$store.state.mainEndpoint + this.localUpdateEndpoint, {
                body : {

                }
            })
        }*/

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
    }
    
}
</script>
<style scoped>

    .inputingredient {
        margin-left: 1rem;
        margin-right: 1rem;
    }

</style>