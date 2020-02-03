<template>
    <div>
        <b-form inline>
            <label class="sr-only" for="inline-form-input-name">Name</label>
            <b-input
            id="inline-form-input-name"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Write units"
            v-model="units"
            ></b-input>

            <b-button variant="primary" @click="onSave">Save</b-button>
        </b-form>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            units: null
        }
    },
    methods: {
        onSave() {
        this.$emit('calculatedAmount', this.units)  
        }
    }
}
</script>
<style scoped>

</style>