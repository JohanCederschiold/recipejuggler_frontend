<template>
    <div>
        <input type="text" placeholder="Hur mycket (ex 2)" v-model="amount">
        <span class="inputingredient">
            <b-button @click="decreaseUnit">-</b-button>
            <input type="text" disabled :value="volumes[unitNavigation].text">
            <b-button @click="increaseUnit">+</b-button>
        </span>
        <span>
            <b-button @click="sendAmount" variant="success">Lägg till</b-button>
            <b-button @click="reset" variant="danger">Ångra</b-button>
        </span>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
          //  changeUnitFor: null,
            amount: 0,
            value: 0,
            unitNavigation: 0,
            volumes: [  
                        {value: 1, text: "ml / krm"},  
                        {value: 5, text: "tsk"}, 
                        {value: 15, text: "msk"}, 
                        {value: 100, text: "dl"}, 
                        {value: 1000, text: "l"} ],
        }
    },
    methods: {
        increaseUnit() {
            if(this.unitNavigation >= this.volumes.length - 1) {
                this.unitNavigation = 0
            } else {
                this.unitNavigation++
            }
        },
        decreaseUnit() {
            if(this.unitNavigation === 0) {
                this.unitNavigation = this.volumes.length - 1
            } else {
                this.unitNavigation--
            }
        },
        sendAmount() {
            this.$emit('sendAmount', this.amount * this.volumes[this.unitNavigation].value)
        },
        reset() {
            this.$emit('reset')
        }
    }
    
}
</script>
<style  scoped>

    .inputingredient {
        margin-left: 1rem;
        margin-right: 1rem;
    }

</style>