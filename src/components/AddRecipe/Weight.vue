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

            <label class="mr-sm-2" for="inline-form-custom-select-pref">Preference</label>
            <b-form-select
            class="mb-2 mr-sm-2 mb-sm-0"
            :value="null"
            v-model="value"
            :options="options"
            id="inline-form-custom-select-pref"
            >
            <template v-slot:first>
                <option :value="null">Choose...</option>
            </template>
            </b-form-select>


            <b-button variant="primary" @click="onSave">Spara</b-button>
        </b-form>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            options: {'1': 'GR', '2': 'HG', '3':'KG'},
            value: null,
            units: null
        }
    },
    methods: {
        onSave() {
            if (this.value === null || this.units === null || this.units === '' ) {
                alert('Set values')
            } else if (!isNaN(this.units)) {
                this.$emit('calculatedAmount', this.calculateValue())  
            } else {
                let fixedNumber = this.tryToFixNaN()
                if(!isNaN(fixedNumber)) {
                    this.units = fixedNumber
                    this.$emit('calculatedAmount', this.calculateValue())
                }
            }
        },
        tryToFixNaN() {
            return this.units.replace(',', '.')
        },
        calculateValue(){
            switch(this.value) {
                case '1':
                    return this.units
                case '2':
                    return this.units * 100
                case '3':
                    return this.units * 1000
                default:
                    return -1
            }
        }
    }
    
}
</script>
<style scoped>

</style>