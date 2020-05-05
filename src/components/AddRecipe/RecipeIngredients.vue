<template>
    <div>
        <h1>Registrera ingredienser</h1>
        {{ingredients}}
        <p>Registrera ingredienserna till receptet <strong>{{ currentRecipe.title }}</strong></p>
        <h2>Ingredienser till {{currentRecipe.title}}</h2>
        <p v-for="(recipeIngredient, index) in registeredRecipeIngredients" :key="recipeIngredient.name">
            {{ getAdjustedAmountString(recipeIngredient.amount, recipeIngredient.unit) }} 
            {{ recipeIngredient.name }}
            <b-button @click="removeRecipeIngredient(recipeIngredient.id, index)"> Ta bort
            </b-button>
        </p>
            <label for="input-with-list">Lägg till ingrediens</label>
            <b-form-input list="input-list" id="input-with-list" v-model="ingredientName" 
            placeholder="Write ingredient" :disabled="preventSubmit"></b-form-input>
            <b-form-datalist id="input-list" :options="ingredients"></b-form-datalist>

        <b-button type="submit" variant="primary" @click="onSubmit" >Submit</b-button>
        <b-button type="reset" variant="danger" @click="onReset">Reset</b-button>
        <b-modal hide-footer hide-header v-model="show">
            <app-new-unit v-on:unitChosen="setUnit" v-if="this.currentIngredientUnit === null"></app-new-unit>
        </b-modal>
        <app-weight v-on:calculatedAmount="amountReceived" v-if="this.currentIngredientUnit === 'WEIGHT'"></app-weight>
        <app-volume v-on:calculatedAmount="amountReceived" v-if="this.currentIngredientUnit === 'VOLUME'"></app-volume>
        <app-amount v-on:calculatedAmount="amountReceived" v-if="this.currentIngredientUnit === 'AMOUNT'"></app-amount>
        <div>
            <b-button variant="success" @click="noMoreRecipeIngredients" :disabled="notFinishedWithIngredients">Klar!</b-button>
        </div>
    </div>
</template>
<script>
import Volume from './Volume.vue'
import NewUnit from './RegisterUnit.vue'
import Weight from './Weight.vue'
import Amount from './Amount.vue'
import axios from 'axios'
import Endpoints from '@/constants/endpoints.json'
export default {
    props: ['currentRecipe'],
    data: function() {
        return {
            ingredients: [],
            registeredRecipeIngredients: [],
            currentIngredientUnit : '',
            notFinishedWithIngredients: true,
            ingredientName: null,
            amount: null,
            ingredientId: null,
            namePlaceholderMessage: 'Write name of ingredient',
            preventSubmit: false
        }
    },
    computed: {
        show: function () {
            return this.currentIngredientUnit === null
        }
    },
    methods: {
       filterIngredientNames() {
           for(let i = 0 ; i < this.$store.state.allIngredients.length ; i++ ) {
               this.ingredients.push(this.$store.state.allIngredients[i].name)
           } 
       },
        removeRecipeIngredient(ingredientId, index) {
            this.registeredRecipeIngredients.splice(index, 1)
            this.deleteRecipeIngredient(ingredientId)
        },
        deleteRecipeIngredient(ingredientId) {
            axios.delete(Endpoints.MAIN + Endpoints.DELETE_RECIPE_INGREDIENT + ingredientId)
        },
        getUnit() {
            for (let i = 0 ; i < this.$store.state.allIngredients.length ; i++) {
                if(this.$store.state.allIngredients[i].name === this.ingredientName) {
                    return this.$store.state.allIngredients[i]
                }
            }
            return null
        },
        setUnit(newUnit) {
            this.currentIngredientUnit = newUnit
            this.registerNewIngredient()
        },
        amountReceived(volumeValue){
            this.amount = volumeValue
            this.registerNewRecipeIngredient()
            this.notFinishedWithIngredients = false
        },
        onSubmit(event){
            event.preventDefault()
            let ingredientObjekt = this.getUnit()
            if(ingredientObjekt === null) {
                this.currentIngredientUnit = null
            } else {
                this.currentIngredientUnit = ingredientObjekt.units
                this.ingredientId = ingredientObjekt.id
                this.preventSubmit = true
            }
        },
        onReset(){
            this.currentIngredientUnit = ''
            this.ingredientName= null
            this.amount= null
            this.ingredientId= null
            this.preventSubmit = false
        },
        pushToRegistered(registeredId){
            let registeredRecipeIngredient = {
                id: registeredId,
                name: this.ingredientName,
                amount: this.amount,
                unit: this.currentIngredientUnit
            }
            this.registeredRecipeIngredients.push(registeredRecipeIngredient)
        },
        getAdjustedAmountString(amount, unit) {
            switch(unit) {
                case 'WEIGHT':
                    return this.getWeightAmount(amount)
                case 'VOLUME':
                    return this.getVolumeAmount(amount)
                default:
                    return amount + ' st'
            }

        },
        getVolumeAmount(amount) {
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
        getWeightAmount(amount) {
            if (amount % 1000 === 0) {
                return amount / 1000 + ' kg'
            }  else if (amount % 100 === 0 ) {
                return amount / 100 + ' hg'
            } else {
                return amount + ' g'
            }
        },
        noMoreRecipeIngredients() {
            this.$emit('allIngredientsRegistered')
        },
        registerNewIngredient() {

            let postRequest =    { 
                    name : this.ingredientName , 
                    unit : this.currentIngredientUnit 
                }

            axios.post(Endpoints.MAIN + Endpoints.ADD_INGREDIENT, postRequest)
                .then(response => {
                    this.ingredientId = response.data.id
                    this.$store.dispatch('getAllIngredients')
                    this.preventSubmit = false
                })
        },
        registerNewRecipeIngredient() {

            let postRequest = 
                { 
                    recipeId : this.currentRecipe.id , 
                    ingredientId : this.ingredientId, 
                    amount : this.amount 
                }

            axios.post(Endpoints.MAIN + Endpoints.ADD_RECIPE_INGREDIENT, postRequest)
                .then(response => {
                    this.pushToRegistered(response.data.id)
                    this.onReset()
                })
        },
    },
    created: function() {
        this.filterIngredientNames()
    },
    components: {
        'app-volume': Volume,
        'app-weight': Weight,
        'app-new-unit': NewUnit,
        'app-amount': Amount
    }  
    
}
</script>
<style scoped>

</style>