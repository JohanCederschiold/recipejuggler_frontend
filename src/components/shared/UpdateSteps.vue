<template>
    <div>
        <div>
            Receptsteg
        </div>
        <div v-if="!updateMode">
            <div v-for="step in recipeStepsInOrder" :key="step.id">{{step.sequence}}: {{step.instruction}}</div>
            <b-button @click="startUpdate">Ändra</b-button> 
        </div>
        <div v-else>
            <div v-for="(step, index) in recipeStepsInOrder" :key="step.id">
                <b-button   @click="moveUp(index)"
                            v-if="index !== 0">Upp</b-button>
                <b-button   @click="moveDown(index)"
                            v-if="index !== recipeStepsInOrder.length - 1">Ner</b-button>
                <b-button   @click="deleteStep(index)">Radera</b-button>
                {{index + 1}}: {{step.instruction}}
            </div>
            <input type="text" v-model="newStep" placeholder="Skriv in nytt steg">
            <b-button @click="addStep">Lägg till</b-button>
            <div>
                <b-button @click="stopUpdating">Klar</b-button>
            </div>
        </div>
    </div>
</template>
<script>
import Endpoints from '@/constants/endpoints.json'
import axios from 'axios'
export default {
    props: ['steps'],
    data: function () {
        return {
            updateMode: false,
            recipeStepsInOrder: [],
            newStep: '',
            recipeId : null
        }
    },
    methods: {
        startUpdate() {
            this.updateMode = true
            this.recipeId = this.steps[0].recipeid
        },
        stopUpdating() {
            for (let i = 0 ; i < this.recipeStepsInOrder.length ; i++) {
                this.recipeStepsInOrder[i].sequence = i + 1
            }
            const message = {
                recipeId: this.recipeId,
                steps: this.recipeStepsInOrder
            }
            axios.put(Endpoints.MAIN + Endpoints.STEPS_UPDATE, message)
                .then(res => {
                    if (res.status === 202) {
                        this.updateMode = false
                    }
                })

        },
        addStep() {
            this.recipeStepsInOrder.push({
                instruction: this.newStep,
                sequence: this.recipeStepsInOrder.length + 1,
                recipeid: this.recipeId
                })
            this.newStep = ''
        },
        moveUp(index) {
            let instructionToMove = this.recipeStepsInOrder[index]
            this.recipeStepsInOrder.splice(index, 1)
            this.recipeStepsInOrder.splice(index -1, 0, instructionToMove)   
        }, 
        moveDown(index){
            let instructionToMove = this.recipeStepsInOrder[index]
            this.recipeStepsInOrder.splice(index, 1)
            this.recipeStepsInOrder.splice(index + 1, 0, instructionToMove)
        },
        deleteStep(index) {
            this.recipeStepsInOrder.splice(index, 1)
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
            this.recipeStepsInOrder = JSON.parse(JSON.stringify(this.steps)).sort(this.compare)
    }
}
</script>
<style scoped>

</style>