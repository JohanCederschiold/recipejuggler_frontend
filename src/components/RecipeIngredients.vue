<template>
    <div>
        <h1>Registrera ingredienser</h1>
        <p>Registrera ingredienserna till receptet <strong>{{ recipeId.title }}</strong></p>
        <h2>Ingredienser till {{recipeId.title}}</h2>
        <p v-for="recipeIngredient in registeredRecipeIngredients" :key="recipeIngredient.name">
            {{ getAdjustedAmountString(recipeIngredient.amount, recipeIngredient.unit) }} 
            {{ recipeIngredient.name }}
        </p>
        <p>{{ingredientName}}  {{ingredientId}}</p>


            <label for="input-with-list">Lägg till ingrediens</label>
            <b-form-input list="input-list" id="input-with-list" v-model="ingredientName" 
            placeholder="Write ingredient" :disabled="preventSubmit"></b-form-input>
            <b-form-datalist id="input-list" :options="ingredients"></b-form-datalist>

        <b-button type="submit" variant="primary" @click="onSubmit" >Submit</b-button>
        <b-button type="reset" variant="danger" @click="onReset">Reset</b-button>
        <app-new-unit v-on:unitChosen="setUnit" v-if="this.currentIngredientUnit === null"></app-new-unit>
        <app-weight v-on:calculatedAmount="amountReceived" v-if="this.currentIngredientUnit === 'WEIGHT'"></app-weight>
        <app-volume v-on:calculatedAmount="amountReceived" v-if="this.currentIngredientUnit === 'VOLUME'"></app-volume>
        <app-amount v-on:calculatedAmount="amountReceived" v-if="this.currentIngredientUnit === 'AMOUNT'"></app-amount>
    </div>
</template>
<script>
import Volume from '../components/Volume.vue'
import NewUnit from '../components/RegisterUnit.vue'
import Weight from '../components/Weight.vue'
import Amount from '../components/Amount.vue'
export default {
    props: ['recipeId'],
    data: function() {
        return {
            ingredients: [],
            ingredientsJson: [],
            registeredRecipeIngredients: [],
            currentIngredientUnit : '',
            localeGetEndpoint: '/ingredient/all',
            localePostEndpoint: '/ingredient/add',
            localePostRecipeIngredientEndpoint: '/recipe-ingredient/add',
            ingredientName: null,
            amount: null,
            ingredientId: null,
            namePlaceholderMessage: 'Write name of ingredient',
            preventSubmit: false
        }
    },
    computed: {
        renderedGetEndpoint: function() {
            return this.$store.state.mainEndpoint + this.localeGetEndpoint
        },
        renderedPostEndpoint: function() {
            return this.$store.state.mainEndpoint + this.localePostEndpoint
        },
        renderedPostRecipeIngredientEndpoint: function() {
            return this.$store.state.mainEndpoint + this.localePostRecipeIngredientEndpoint
        }
    },
    methods: {
        fetchIngredients(){
            fetch(this.renderedGetEndpoint).then( response => {
                return response.json()
            }).then( result => {
                this.ingredientsJson = result
                for (let i = 0; i < result.length ; i++ ) {
                   this.ingredients.push(result[i].name)
                }
            })
        },
        getUnit() {
            for (let i = 0 ; i < this.ingredientsJson.length ; i++) {
                if(this.ingredientsJson[i].name === this.ingredientName) {
                    return this.ingredientsJson[i]
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
        pushToRegistered(){
            let registeredRecipeIngredient = {
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
        registerNewIngredient() {
            let postRequest = JSON.stringify(
                { 
                    name : this.ingredientName , 
                    unit : this.currentIngredientUnit 
                })

            fetch(this.renderedPostEndpoint, {
                body: postRequest,
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }).then( response => {
                return response.json()
            }).then(result => {
                this.ingredientId = result.id
                this.fetchIngredients()
                this.preventSubmit = false
            })
        },
        registerNewRecipeIngredient() {
            let postRequest = JSON.stringify(
                { 
                    recipeId : this.recipeId.id , 
                    ingredientId : this.ingredientId, 
                    amount : this.amount 
                })
            alert(postRequest)
            fetch(this.renderedPostRecipeIngredientEndpoint, {
                body: postRequest,
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }).then( response => {
                if (response.status === 201) {
                    this.pushToRegistered()
                    this.onReset()
                }
            })
        },
    },
    created: function() {
        this.fetchIngredients()
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