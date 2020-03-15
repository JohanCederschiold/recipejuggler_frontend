<template>
    <div>
        <h1>Ny ingrediens</h1>
        <div class="description">
            Den här ingrediensen känner vi inte till sedan tidigare. För att vi skall kunna Registrera
            den behöver vi veta vilken enhet den skall ha (för att automatiskt kunna summera ingredienser).
        </div>
        <div class="measures"><strong>VOLUME</strong> är för ingredienser som normalt kommer att med något volymmått (ex mililiter). Som ris eller mjölk.</div>
        <div class="measures"><strong>WEIGHT</strong> är för ingredienser som normalt kommer att doseras i gramvikter</div>
        <div class="measures"><strong>AMOUNT</strong> är för ingredienser som normalt kommer att doseras i antal (ex tre äggulor).</div>
        <b-form inline>
            <b-form-select
            class="mb-2 mr-sm-2 mb-sm-0"
            :value="null"
            v-model="value"
            :options="options"
            id="inline-form-custom-select-pref"
            >
            <template v-slot:first>
                <option :value="null">Välj enhet...</option>
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
    .measures {
        margin-bottom: 0.5rem;
    }

    .description {
        margin-bottom: 1rem;
        font-style: italic;
    }

</style>