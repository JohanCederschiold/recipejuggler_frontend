<template>
    <div>
        {{recipe}}
        <div v-if="!updateMode">
            <div v-for="step in recipeStepsInOrder" :key="step.id">{{step.sequence}}: {{step.instruction}}</div>
            <b-button @click="startUpdate" variant="success">Ändra</b-button> 
        </div>
        <div v-else>
            <div v-for="(step, index) in recipeStepsInOrder" :key="step.id">
                <b-button   @click="moveUp(index)"
                            class="controlButtons"
                            v-if="index !== 0"
                            variant="primary"
                            >
                            Upp
                </b-button>
                <b-button   v-else
                            class="controlButtons"
                            variant="primary"
                            disabled>
                            Upp
                </b-button>
                <b-button   @click="moveDown(index)"
                            class="controlButtons"
                            variant="info"
                            v-if="index !== recipeStepsInOrder.length - 1">Ner</b-button>
                <b-button   v-else
                            class="controlButtons"
                            variant="info"
                            disabled>
                            Ner
                </b-button>
                <b-button   @click="deleteStep(index)" variant="danger">X</b-button>
                <span class="text">
                    {{index + 1}}: {{step.instruction}}
                </span>
            </div>
            <input type="text" v-model="newStep" placeholder="Skriv in nytt steg">
            <b-button @click="addStep" variant="success">Lägg till</b-button>
        </div>
        <div class="navigationButtons">
            <b-button   @click="moveBackward" 
                        variant="danger">
                            Bakåt
            </b-button>
            <b-button @click="stopUpdating" variant="primary">Spara och avsluta</b-button>
        </div>
    </div>
</template>
<script>
import Endpoints from '@/constants/endpoints.json'
import axios from 'axios'
export default {
    props: ['recipe'],
    data: function () {
        return {
            updateMode: false,
            recipeStepsInOrder: [],
            newStep: '',
            recipeId : null
        }
    },
    methods: {
        updateSequence() {
            this.recipeStepsInOrder.sort(this.compare)
            for (let i = 0 ; i < this.recipeStepsInOrder.length ; i++) {
                this.recipeStepsInOrder[i].sequence = i + 1
            } 
        },
        setNewSequence() {
            for (let i = 0 ; i < this.recipeStepsInOrder.length ; i++) {
                this.recipeStepsInOrder[i].sequence = i + 1
            } 
        },
        startUpdate() {
            this.updateMode = true
            this.recipeId = this.recipe.recipeId
        },
        stopUpdating() {

            console.log('My steps ', this.recipeStepsInOrder)

            const message = {
                recipeId: this.recipeId,
                steps: this.recipeStepsInOrder
            }
            axios.put(Endpoints.MAIN + Endpoints.STEPS_UPDATE, message)
                .then(res => {
                    if (res.status === 202) {
                        this.$router.replace('allrecipes')
                    }
                })

        },
        addStep() {
            this.updateSequence()
            this.recipeStepsInOrder.push(
                {
                instruction: this.newStep,
                sequence: this.recipeStepsInOrder.length + 1,
                recipeid: this.recipeId
                }
                )
            this.newStep = ''
        },
        moveUp(index) {
            let instructionToMove = this.recipeStepsInOrder[index]
            this.recipeStepsInOrder.splice(index, 1)
            this.recipeStepsInOrder.splice(index -1, 0, instructionToMove)  
            this.setNewSequence() 
        }, 
        moveDown(index){
            let instructionToMove = this.recipeStepsInOrder[index]
            this.recipeStepsInOrder.splice(index, 1)
            this.recipeStepsInOrder.splice(index + 1, 0, instructionToMove)
            this.setNewSequence()
        },
        moveBackward() {
            this.$emit('moveBack')
        },
        deleteStep(index) {
            this.recipeStepsInOrder.splice(index, 1)
            this.setNewSequence()
        },
        compare(a, b) { //used by the sort methods
                if (a.sequence > b.sequence ) {
                    return 1
                } else if (a.sequence < b.sequence ) {
                    return -1
                } else {
                    return 0
                }
        },
    },
    created() {
            this.recipeStepsInOrder = JSON.parse(JSON.stringify(this.recipe.steps)).sort(this.compare)
    }
}
</script>
<style scoped>

.text {
    margin-left: 1rem;
}

.controlButtons {
    margin-right: 0.2rem;
}

.navigationButtons {
    margin-top: 2rem;
    margin-bottom: 2rem;
}


</style>