<template>
    <div>
        <input type="text" placeholder="Hur mycket (ex 2)" v-model="amount">
        <span class="inputingredient">
            <b-button @click="decreaseUnit">-</b-button>
            <input type="text" disabled :value="weights[unitNavigation].text">
            <b-button @click="increaseUnit">+</b-button>
        </span>
        <span>
            <b-button @click="sendAmount">Lägg till</b-button>
            <b-button @click="reset">Ångra</b-button>
        </span>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            amount: 0,
            value: 0,
            unitNavigation: 0,
            weights: [{value: 1, text: "gr"}, {value: 100, text: "hg"}, {value: 1000, text: "kg"} ],
        }
    },
    methods: {
        increaseUnit() {
            if(this.unitNavigation >= this.weights.length - 1) {
                this.unitNavigation = 0
            } else {
                this.unitNavigation++
            }
        },
        decreaseUnit() {
            if(this.unitNavigation === 0) {
                this.unitNavigation = this.weights.length - 1
            } else {
                this.unitNavigation--
            }
        },
        sendAmount() {
            this.$emit('sendAmount', this.amount)
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