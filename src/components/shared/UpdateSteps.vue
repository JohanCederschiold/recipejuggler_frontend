<template>
    <div>
        <div>
            Receptsteg
        </div>
        <div v-if="!updateMode">
            <div v-for="step in sortedSteps" :key="step.id">{{step.sequence}}: {{step.instruction}}</div>
            <b-button @click="startUpdate">Ändra</b-button> 
        </div>
        <div v-else>
            {{newSteps}}
            <div v-for="(step, index) in newSteps" :key="step.id">
                <b-button   @click="moveUp(index)"
                            v-if="index !== 0">Upp</b-button>
                <b-button   @click="moveDown(index)"
                            v-if="index !== newSteps.length - 1">Ner</b-button>
                <b-button   @click="deleteStep(index)">Radera</b-button>
                {{index + 1}}: {{step.instruction}}
            </div>
            <input type="text" v-model="newStep" placeholder="Skriv in nytt steg">
            <b-button @click="addStep">Lägg till</b-button>
            <div>
                <b-button @click="stopUpdating">Klar</b-button>
            </div>
        </div>
        {{recipeId}}
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
            newSteps: [],
            newStep: '',
            recipeId : null
        }
    },
    methods: {
        startUpdate() {
            this.updateMode = true
            this.recipeId = this.steps[0].recipeid
            this.newSteps = JSON.parse(JSON.stringify(this.steps)).sort(this.compare)
        },
        stopUpdating() {
            for (let i = 0 ; i < this.newSteps.length ; i++) {
                this.newSteps[i].sequence = i + 1
            }
            const message = {
                recipeId: this.recipeId,
                steps: this.newSteps
            }
            axios.put(Endpoints.MAIN + Endpoints.STEPS_UPDATE, message)
                .then(res => {
                    if (res.status === 202) {
                        this.updateMode = false
                    }
                })

        },
        addStep() {
            this.newSteps.push({
                instruction: this.newStep,
                sequence: this.newSteps.length + 1,
                recipeid: this.recipeId
                })
            this.newStep = ''
        },
        moveUp(index) {
            let instructionToMove = this.newSteps[index]
            this.newSteps.splice(index, 1)
            this.newSteps.splice(index -1, 0, instructionToMove)   
        }, 
        moveDown(index){
            let instructionToMove = this.newSteps[index]
            this.newSteps.splice(index, 1)
            this.newSteps.splice(index + 1, 0, instructionToMove)
        },
        deleteStep(index) {
            this.newSteps.splice(index, 1)
        },
        compare(a, b) { //used by the sort methods
                if (a.sequence > b.sequence ) {
                    return 1
                } else if (a.sequence < b.sequence ) {
                    return -1
                } else {
                    return 0
                }
        }
    },
    computed: {
        sortedSteps() {
            let sortThisArray = JSON.parse(JSON.stringify(this.steps))
            return sortThisArray.sort(this.compare)
        }
    }
}
</script>
<style scoped>

</style>