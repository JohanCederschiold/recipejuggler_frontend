<template>
    <div>
        <div>
            <div>Titel</div>
            <input type="text" v-model="title">
        </div>
        <div>
            <div>Beskrivning</div>
            <input type="text" v-model="instructions">
        </div>
        <div>
            <div>Tillagningstid</div>
            <input type="text" v-model="preptime">
        </div>
        <div>
            <div>Antal portioner</div>
            <input type="text" v-model="portions">
        </div>
    </div>
</template>
<script>
export default {
    props: ['originalTitle', 'originalInstructions', 'originalPreptime', 'originalPortions'],
    data: function() {
        return {
            title: '',
            instructions: '',
            preptime: '',
            portions: ''
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

</style>