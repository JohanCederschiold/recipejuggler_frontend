<template>
    <div>
        <div>
            <div>Titel</div>
            <input type="text" v-model="title" :placeholder="placeholderTitle">
        </div>
        <div>
            <div>Beskrivning</div>
            <input type="text" v-model="instructions" :placeholder="placeholderInstruction">
        </div>
        <div>
            <div>Tillagningstid</div>
            <input type="text" v-model="preptime" :placeholder="placeholderPreptime">
        </div>
        <div>
            <div>Antal portioner</div>
            <input type="text" v-model="portions" :placeholder="placeholderPortions">
        </div>
        <div class="navigationButtons">
            <b-button   @click="moveforward" 
                        variant="primary">
                            Gå vidare
            </b-button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import ENDPOINTS from '@/constants/endpoints.json'
export default {
    props: ['originalTitle', 'originalInstructions', 'originalPreptime', 'originalPortions', 'currentRecipe'],
    data: function() {
        return {
            title: '',
            instructions: '',
            preptime: '',
            portions: '',
            placeholderTitle: 'Titel måste anges',
            placeholderInstruction: 'Beskrivning måste anges',
            placeholderPreptime: 'Ett heltal (minuter)',
            placeholderPortions: 'Ett heltal (portioner)',

        }
    },
    methods: {
        moveforward(){
            if (this.originalTitle === this.title && 
                this.originalInstructions === this.instructions && 
                this.originalPreptime === this.preptime &&
                this.originalPortions === this.portions ) {
                    this.$emit('nextStep')
                } else {
                    const checkedPortions = parseInt(this.portions)
                    const checkedPreptime = parseInt(this.preptime)

                    if (!this.checkValues()) {
                        return
                    } else {
                        const message = {
                            id: this.currentRecipe.recipeId,
                                title: this.title,
                                preparationTimeMinutes: checkedPreptime,
                                noPortions: checkedPortions,
                                instructions: this.instructions
                        }
                        axios.put(ENDPOINTS.MAIN + ENDPOINTS.UPDATE_RECIPE, message)
                            .then(response => {
                                if (response.status === 202) {
                                    this.$emit('nextStep')
                                }
                            })

                    }

                }

        },
        checkValues(){
            let valuesValid = true;

            const checkedPortions = parseInt(this.portions)
            const checkedPreptime = parseInt(this.preptime)

            if(isNaN(checkedPortions)){
                this.portions = ''
                valuesValid = false
            }
            if(isNaN(checkedPreptime)){
                valuesValid = false
                this.preptime = ''
            }
            if(this.title === ''){
                valuesValid = false
            }
            if(this.instructions === ''){
                valuesValid = false
            }
            return valuesValid
        }
    },
    created () {
        this.title = this.originalTitle,
        this.instructions = this.originalInstructions,
        this.preptime = this.originalPreptime,
        this.portions = this.originalPortions
    }
    
}
</script>
<style scoped>
    
    .navigationButtons {
        margin-top: 2rem;
        margin-bottom: 2rem;
    }


</style>