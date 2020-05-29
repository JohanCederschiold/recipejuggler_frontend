<template>
    <div>
        <h1>Lägg till recept</h1>
        <p>Här kan du ladda upp ditt eget recept. Följ stegen för att börja</p>
        <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group
                id="input-group-1">
                <b-form-input
                id="input-1"
                v-model="recipeName"
                :placeholder="namePlaceholderMessage"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3">
                <b-form-input
                id="input-3"
                v-model="minutesToPrepare"
                :placeholder="minutesPlaceholderMessage"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4">
                <b-form-input
                id="input-4"
                v-model="noServings"
                :placeholder="servingsPlaceholderMessage"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-5">
                <b-form-input
                id="input-5"
                v-model="description"
                :placeholder="descriptionPlaceholderMessage"
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>
<script>
import Endpoints from '@/constants/endpoints.json'
import axios from 'axios'
export default {
    data: function() {
        return {
            recipeName: null,
            minutesToPrepare: null,
            noServings: null,
            description: null,
            namePlaceholderMessage: 'Namn på receptet',
            ownerPlaceholderMessage: 'Ditt namn',
            minutesPlaceholderMessage: 'Antal minuter för tillagning',
            servingsPlaceholderMessage: 'Antal portioner',
            descriptionPlaceholderMessage: 'Kort beskrivning'
        }
    },
    methods: {
        onSubmit: function(event) {
            event.preventDefault()
            this.checkAndSend()
        },
        onReset: function() {
            this.recipeName = null
            this.minutesToPrepare= null,
            this.noServings = null,
            this.description = null,
            this.namePlaceholderMessage = 'Namnge receptet'
            this.minutesPlaceholderMessage = 'Antal minuter för tillagning'
            this.servingsPlaceholderMessage = 'Antal portioner'
            this.descriptionPlaceholderMessage = 'Kort beskrivning'
            
        },
        checkAndSend() {
            if(this.recipeName === null) {
                this.namePlaceholderMessage = 'Du måste namnge receptet'
            }
            if(this.minutesToPrepare === null){
                this.minutesPlaceholderMessage = 'Du måste ange ett minutantal'
            }
            if(this.noServings === null ){
                this.servingsPlaceholderMessage = 'Du måste ange ett antal portioner'
            }
            if(this.description === null ){
                this.descriptionPlaceholderMessage = "Du måste ange en beskrivning"
            }
            if(this.recipeName !== null ){
                this.registerRecipe()
            }
        },
        registerRecipe() {
            let postRequest =
                { 
                    title : this.recipeName , 
                    owner : this.$store.state.userid, 
                    preparationTimeMinutes: this.minutesToPrepare,
                    noPortions: this.noServings,
                    instructions: this.description
                }

            axios.post(Endpoints.MAIN + Endpoints.ADD_RECIPE, postRequest)
                .then(response => {
                    this.onReset()
                    this.$emit('recipeRegistered', response.data)
                })
        }
    }   
}
</script>
<style scoped>

</style>