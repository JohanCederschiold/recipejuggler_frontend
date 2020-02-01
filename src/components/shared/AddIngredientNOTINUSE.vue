<template>
    <div>
        <b-form inline @submit="onSubmit" @reset="onReset">
        <b-form-group
            id="input-group-1"
            label="Ingredient: "
            label-for="input-1">
            
            <b-form-input
            id="input-1"
            type="text"
            required
            v-model="ingredient"
            :placeholder="inputMessageField">
            </b-form-input>

            <b-form-select
            id="input-3"
            v-model="unit"
            :options="unitChoice"
            required>
            </b-form-select>
            

        </b-form-group>

        <div class="buttons">
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </div>

        </b-form>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            ingredient: '',
            localendpoint: '/ingredient/add',
            unit: null,
            inputMessageField: 'Enter ingredient',
            unitChoice: [{ text: 'Unit?', value: null}, 'WEIGHT', 'VOLUME' ]

        }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault()
            if (this.unit !== null) {
                this.sendIngredient()
            } else {
                alert('Please choose a Unit')
            }

        },
        sendIngredient() {
            let postRequest = JSON.stringify({ name : this.ingredient, unit : this.unit })
            fetch(this.renderedEndpoint, {
                body: postRequest,
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }).then( response =>{
                if(response.status === 201) {
                    this.inputMessageField = 'Ingredient saved'
                    this.onReset()
                }
            })
        },
        onReset() {
            this.ingredient = '',
            this.unit = null
        } 
        
    },
    computed: {
        renderedEndpoint: function() {
            return this.$store.state.mainEndpoint + this.localendpoint
        }
    }
    
}
</script>
<style scoped>
    #input-1, .buttons{
        margin-left: 1rem;
    }

</style>