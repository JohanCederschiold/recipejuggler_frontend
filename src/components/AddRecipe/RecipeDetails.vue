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

            <b-form-group id="input-group-2">
                <b-form-input
                id="input-2"
                v-model="recipeOwner"
                :placeholder="ownerPlaceholderMessage"
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            recipeName: null,
            recipeOwner: null,
            namePlaceholderMessage: 'Namnge receptet',
            ownerPlaceholderMessage: 'Ditt namn',
            localeEndpoint: '/recipe/add'
        }
    },
    computed: {
        renderedEndpoint: function() {
            return this.$store.state.mainEndpoint + this.localeEndpoint
        }
    },
    methods: {
        onSubmit: function(event) {
            event.preventDefault()
            this.checkAndSend()
        },
        onReset: function() {
            this.recipeName = null
            this.recipeOwner = null
            this.namePlaceholderMessage = 'Namnge receptet'
            this.ownerPlaceholderMessage = 'Ditt namn'
            
        },
        checkAndSend() {
            if(this.recipeName === null) {
                this.namePlaceholderMessage = 'Du måste namnge receptet'
            }
            if(this.recipeOwner === null) {
                this.ownerPlaceholderMessage = 'Du måste ge ett namn'
            }
            if(this.recipeName !== null && this.recipeOwner !== null ){
                this.registerRecipe()
            }
        },
        registerRecipe() {
            let postRequest = JSON.stringify(
                { 
                    title : this.recipeName , 
                    owner : this.recipeOwner 
                })

            fetch(this.renderedEndpoint, {
                body: postRequest,
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }).then( response => {
                return response.json()
            }).then(result => {
                this.onReset()
                this.$emit('recipeRegistered', result)
            })
        }
    }   
}
</script>
<style scoped>

</style>