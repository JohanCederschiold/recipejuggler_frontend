<template>
    <div>
        <h1>Lägg till receptsteg</h1>
        <p>Nu ska vi beskriva hur man kan laga receptet. Steg för steg.</p>
        <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group
                id="input-group-1">
                <b-form-input
                id="input-1"
                v-model="instruction"
                :placeholder="orderPlaceholderMessage"></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
        <div>
            <h2 v-if="stepInstructions.length > 0">Steg för steg {{ currentRecipe.title }}</h2>
            <ol>
                <li v-for="(step, index) in stepInstructions" :key="index">{{ step }}
                     <b-button variant="outline-primary" @click="changeStep(index, step)">Change</b-button>
                     <b-button variant="outline-success" v-if="index !== 0" @click="moveUp(index)">Upp</b-button>
                     <b-button variant="outline-danger" v-if="index !==stepInstructions.length -1"  @click="moveDown(index)">Ner</b-button>
                </li>
            </ol>
            <b-button variant="success" @click="registerRecipe">Klar...inga fler steg att registrera
            </b-button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import Endpoints from '@/constants/endpoints.json'
export default {
    props: ['currentRecipe'],
    data: function() {
        return {
            orderPlaceholderMessage: 'Vad händer i detta steg',
            currentlyChanginStep: null,
            changedInstruction: null,
            instruction: null,
            stepInstructions: [],
        }
    },
    methods: {
        onSubmit: function(event) {
            event.preventDefault()
            if (this.currentlyChanginStep === null) {
                this.stepInstructions.push(this.instruction)
            } else {
                this.stepInstructions[this.currentlyChanginStep] = this.instruction
                this.currentlyChanginStep = null
            }
            this.instruction = ''

        },
        moveUp(index) {
            let instructionToMove = this.stepInstructions[index]
            this.stepInstructions.splice(index, 1)
            this.stepInstructions.splice(index -1, 0, instructionToMove)   
        }, 
        moveDown(index){
            let instructionToMove = this.stepInstructions[index]
            this.stepInstructions.splice(index, 1)
            this.stepInstructions.splice(index + 1, 0, instructionToMove)
        },
        changeStep(number, step) {
            alert(number + ' ' + step)
            this.instruction = step
            this.currentlyChanginStep = number
        },
        onReset: function() {
            this.orderPlaceholderMessage = 'Vad händer i detta steg'  
        },
        checkAndSend() {
            if(this.instruction === null) {
                this.orderPlaceholderMessage = 'Du måste skriva en instruction'
            }

            if(this.instruction !== null ){
                this.registerRecipe()
            }
        },
        registerRecipe() {

            axios.post(Endpoints.MAIN + Endpoints.ADD_STEPS, this.createRecipeStepObject())
                .then(response => {
                    if (response.status === 201) {
                        this.closeAndReset()
                    }
                })
        },
        createRecipeStepObject() {
            let stepsToRegister = []
            for (let i = 0 ; i < this.stepInstructions.length ; i++) {
                let stepSequence = i + 1
                let step = {
                    sequence: stepSequence,
                    instruction: this.stepInstructions[i]
                }
                stepsToRegister.push(step)
            }
            let wrapper = {
                recipeId: this.currentRecipe.id,
                steps: stepsToRegister
            }

            return wrapper
        },
        closeAndReset() {
            this.$emit('closeAndReset')
        }
    }   
}
</script>
<style scoped>

</style>