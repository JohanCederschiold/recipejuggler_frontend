<template>
    <div>
        <div>
            Receptsteg
        </div>
        <div v-if="!updateMode">
            <div v-for="step in steps" :key="step.id">{{step.sequence}}: {{step.instruction}}</div>
            <b-button @click="startUpdate">Ändra</b-button> 
        </div>
        <div v-else>
            <div v-for="(step, index) in newSteps" :key="step.id">
                <b-button   @click="moveUp(index)"
                            v-if="index !== 0">Upp</b-button>
                <b-button   @click="moveDown(index)"
                            v-if="index !== newSteps.length - 1">Ner</b-button>
                <b-button>Radera</b-button>
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
            this.newSteps = JSON.parse(JSON.stringify(this.steps))
        },
        stopUpdating() {
            this.updateMode = false
        },
        addStep() {
            this.newSteps.push({instruction: this.newStep})
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
    }
}
</script>
<style scoped>

</style>