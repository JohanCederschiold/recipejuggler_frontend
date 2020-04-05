<template>
    <div>
        <div class="input">
            <label for="input-with-list">Lägg till ingrediens</label>
            <b-form-input   list="input-list" 
                            id="input-with-list" 
                            :disabled="enterInputMode"
                            v-model="ingredientName" 
                            placeholder="Write ingredient"></b-form-input>
            <b-form-datalist id="input-list" :options="ingredients"></b-form-datalist>
        </div>
        <div v-if="chosenIngredient.units !== undefined">
            <InputWeightUnit v-if="chosenIngredient.units ==='WEIGHT'" v-on:sendAmount="register"/>
            <InputVolumeUnit v-if="chosenIngredient.units ==='VOLUME'" v-on:sendAmount="register"/>
            <InputAmountUnit v-if="chosenIngredient.units ==='AMOUNT'" v-on:sendAmount="register"/>
        </div>
        <div>
            <b-button @click="onSubmit" :disabled="enterInputMode">Sök</b-button>
        </div>
        <b-modal hide-footer hide-header v-model="setNewIngredient">
            <RegisterNewIngredient v-on:unitChosen="setUnit"  />
        </b-modal>
    </div>
</template>
<script>
import InputWeightUnit from '@/components/shared/InputWeightUnit'
import InputVolumeUnit from '@/components/shared/InputVolume'
import InputAmountUnit from '@/components/shared/InputAmount'
import RegisterNewIngredient from '@/components/AddRecipe/RegisterUnit'
import axios from 'axios'
export default {
    props: ['recipeId'],
    data: function() {
        return {
            amount: 0,
            ingredientName: '',
            enterInputMode: false,
            chosenIngredient: '',
            setNewIngredient: false,
        }
    },
    methods: {
        onSubmit() {
            this.enterInputMode = true
            const fetchedIngredient = this.getChosenIngredient(this.ingredientName)[0]
            
            if (fetchedIngredient === undefined) {
                this.chosenIngredient = ''
                this.setNewIngredient = true
            } else {
                this.setNewIngredient = false
                this.chosenIngredient = fetchedIngredient
            }

        },
        getChosenIngredient(ingredient) {
            return this.$store.state.allIngredients.filter(item => item.name.toLowerCase() === ingredient.toLowerCase())
        },
        register(amount) {
            this.amount = amount
            this.enterInputMode = false
            this.registerNewRecipeIngredient()
        },
        resetSearchIngredient() {
            this.chosenIngredient = ''
            this.ingredientName = ''
        },
        setUnit(newUnit) {
            this.registerNewIngredient(newUnit)
            this.setNewIngredient = false
        },
        registerNewIngredient(newUnit) {
            const message =   {
                    name: this.ingredientName,
                    unit: newUnit
                }
            
            axios.post(this.$store.state.mainEndpoint + '/ingredient/add', message)
                .then(result => this.chosenIngredient = result.data)
        },
        registerNewRecipeIngredient() {
            const message =  {
                    ingredientId: this.chosenIngredient.id,
                    recipeId: this.recipeId,
                    amount: this.amount
                }

            axios.post(this.$store.state.mainEndpoint + '/recipe-ingredient/add', message)
                .then(result => {
                    if(result.status === 201) {
                        this.resetSearchIngredient()
                    }
            })
        },
        addIngredientToIngredientList() {
            this.$emit('addToIngredientList', this.chosenIngredient)
        }
    },
    computed: {
        ingredients() {
            return this.$store.state.allIngredients.map(item => item.name)
        }
    },
    components: {
        InputWeightUnit,
        InputVolumeUnit,
        InputAmountUnit,
        RegisterNewIngredient
    }
}
</script>
<style scoped>
    .input {
        width: 20%;
        min-width: 10rem;
    }
</style>