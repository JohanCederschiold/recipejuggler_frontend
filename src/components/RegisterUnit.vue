<template>
    <div>
        <h1>Nice, new ingredients</h1>
        <div>Den här ingrediensen känner vi inte till sedan tidigare, så vi skall registrera den 
            åt dig. För att kunna göra det behöver vi din hjälp med att bestämma vilket mått den 
            skall ha.
        </div>
        <div><strong>VOLUME</strong> är för ingredienser som normalt kommer att med något litermått (ex mililiter). Som ris eller mjölk.</div>
        <div><strong>WEIGHT</strong> är för ingredienser som normalt kommer att doseras i gramvikter</div>
        <div><strong>AMOUNT</strong> är för ingredienser som normalt kommer att doseras i antal (ex tre äggulor).</div>
        <b-form inline>
            <label class="mr-sm-2" for="inline-form-custom-select-pref">Choose unit</label>
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
            <b-button variant="primary" @click="onSave">Registrera</b-button>
        </b-form>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            options: {'1': 'VOLUME', '2': 'WEIGHT', '3':'AMOUNT'},
            value: null
        }
    },
    methods: {
        onSave() {
            if(this.value !== null) {
                let chosenUnit = null
                switch(this.value){
                    case '1':
                        chosenUnit = 'VOLUME'
                        break
                    case '2':
                        chosenUnit = 'WEIGHT'
                        break
                    case '3':
                        chosenUnit = 'AMOUNT'
                        break
                }

                this.$emit('unitChosen', chosenUnit)
            }
        },
    }
    
}
</script>
<style scoped>

</style>