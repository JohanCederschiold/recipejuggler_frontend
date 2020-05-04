<template>
    <div>
        <input type="text" placeholder="Hur många (ex 2)" v-model="amount">
        <span class="inputingredient">
            st
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
            amount: 0
        }
    },
    methods: {
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