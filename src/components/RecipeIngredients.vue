<template>
    <div>
        <h1>Registrera ingredienser</h1>
        <p>Registrera ingredienserna till receptet <strong>{{ recipeId.title }}</strong></p>

            <label for="input-with-list">Input with datalist</label>
            <b-form-input list="input-list" id="input-with-list" v-model="ingredientName" placeholder="Write ingredient"></b-form-input>
            <b-form-datalist id="input-list" :options="ingredients"></b-form-datalist>

        <b-button type="submit" variant="primary" @click="onSubmit">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
        <app-volume v-on:calculatedVolume="volumeValueReceived"></app-volume>
        {{ amount }}
    </div>
</template>
<script>
import Volume from '../components/Volume.vue'
export default {
    props: ['recipeId'],
    data: function() {
        return {
            ingredients: [],
            ingredientsJson: [],
            localeEndpoint: '/ingredient/all',
            ingredientName: null,
            amount: null,
            namePlaceholderMessage: 'Write name of ingredient',
            preventSubmit: true
        }
    },
    computed: {
        renderedEndpoint: function() {
            return this.$store.state.mainEndpoint + this.localeEndpoint
        }
    },
    methods: {
        fetchIngredients(){
            fetch(this.renderedEndpoint).then( response => {
                return response.json()
            }).then( result => {
                this.ingredientsJson = result
                for (let i = 0; i < result.length ; i++ ) {
                   this.ingredients.push(result[i].name)
                }
            })
        },
        checkIngredient(){
            let found = false;
            for (let i = 0 ; i < this.ingredients.length ; i++) {
                if (this.ingredients[i] === this.ingredientName) {
                    found = true;
                    break;
                }
            }
            return found;
        },
        getUnit() {
            for (let i = 0 ; i < this.ingredientsJson.length ; i++) {
                if(this.ingredientsJson[i].name === this.ingredientName) {
                    return this.ingredientsJson[i].units
                }
            }
        },
        volumeValueReceived(volumeValue){
            this.amount = volumeValue
        },
        onSubmit(event){
            event.preventDefault()
            alert(this.getUnit())

        },
        onReset(){

        }
    },
    created: function() {
        this.fetchIngredients()
    },
    components: {
        'app-volume': Volume
    }  
    
}
</script>
<style scoped>

</style>